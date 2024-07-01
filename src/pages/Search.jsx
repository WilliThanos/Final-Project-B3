import { useEffect, useState } from "react";
import NavbarLogoBiru from "../components/Navbar2";
import CariTiketLain from "../components/CariTiketLain";
import Filter from "../components/Filter";
import { useDispatch, useSelector } from "react-redux";
import { GiAirplaneDeparture, GiAirplaneArrival } from "react-icons/gi";
import { HiArrowSmRight } from "react-icons/hi";
import { LiaCircleSolid } from "react-icons/lia";
import {
  setSelectedDepartureFlight,
  setSelectedReturnFlight,
  setSelectedDepartureFlightId,
  setSelectedReturnFlightId,
} from "../redux/reducers/ticketReducer";
import { FaCircleCheck } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";
import {
  getSearchTicketReturn,
  getSearchTicketDeparture,
} from "../redux/action/dataAction";
import sdgpohon from "../assets/sdgpohon.jpg";
import sdglaut from "../assets/sdglaut.jpg";
import SdgCard from "../components/SdgCard";
import Footer from "../components/Footer";
import { setPageDeparture, setPageReturn } from "../redux/reducers/dataReducer";

export default function Search() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState({});

  const totalPenumpang = useSelector((state) => state?.data?.penumpang);
  const departureFlights = useSelector(
    (state) => state?.ticket?.departureFlights
  );
  const returnFlights = useSelector((state) => state?.ticket?.returnFlights);
  const selectedDepartureFlight = useSelector(
    (state) => state?.ticket?.selectedDepartureFlight
  );
  const selectedReturnFlight = useSelector(
    (state) => state?.ticket?.selectedReturnFlight
  );
  const selectedDepartureFlightId = useSelector(
    (state) => state?.ticket?.selectedDepartureFlightId
  );
  const selectedReturnFlightId = useSelector(
    (state) => state?.ticket?.selectedReturnFlightId
  );
  const filterClass = useSelector((state) => state?.filter?.filterClass);
  const sortHarga = useSelector((state) => state?.filter?.sortHarga);
  const pageDeparture = useSelector((state) => state?.data?.pageDeparture);
  const pageReturn = useSelector((state) => state?.data?.pageReturn);

  const filteredAndSortedDepartureFlights = departureFlights
    ?.filter((flight) => {
      // Check if filterClass is not empty
      if (filterClass !== "") {
        // Perform case-insensitive comparison using toLowerCase()
        return flight?.class?.toLowerCase() === filterClass?.toLowerCase();
      }
      // If filterClass is empty, do not filter
      return true;
    })

    .sort((a, b) => {
      if (sortHarga === "asc") {
        return a.price - b.price;
      } else if (sortHarga === "desc") {
        return b.price - a.price;
      }
      return 0;
    });

  const filteredAndSortedReturnFlights = returnFlights
    ?.filter((flight) => {
      // Check if filterClass is not empty
      if (filterClass !== "") {
        // Perform case-insensitive comparison using toLowerCase()
        return flight?.class?.toLowerCase() === filterClass?.toLowerCase();
      }
      // If filterClass is empty, do not filter
      return true;
    })
    .sort((a, b) => {
      if (sortHarga === "asc") {
        return a.price - b.price;
      } else if (sortHarga === "desc") {
        return b.price - a.price;
      }
      return 0;
    });

  const roundTrip = useSelector((state) => state?.data?.roundtrip);

  const departureAirport = useSelector(
    (state) => state?.data?.departureAirport
  );
  const arrivalAirport = useSelector((state) => state?.data?.arrivalAirport);

  const departureDate = useSelector((state) => state?.data?.departureDate);
  const returnDate = useSelector((state) => state?.data?.returnDate);
  const formattedDepartureDate = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(departureDate));
  const formattedReturnDate = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(returnDate));

  const handleDropdownToggle = (flightId) => {
    setIsDropdownOpen((prevState) => ({
      ...prevState,
      [flightId]: !prevState[flightId], // Toggle the dropdown state for the specific flightId
    }));
  };

  const calculateTravelTime = (departure, arrival) => {
    // Parse the time strings
    const [depHours, depMinutes] = departure?.split(":")?.map(Number);
    const [arrHours, arrMinutes] = arrival?.split(":")?.map(Number);

    // Convert times to minutes since the start of the day
    const departureInMinutes = depHours * 60 + depMinutes;
    const arrivalInMinutes = arrHours * 60 + arrMinutes;

    // Calculate the difference in minutes
    let differenceInMinutes = arrivalInMinutes - departureInMinutes;
    if (differenceInMinutes < 0) {
      // If the arrival time is the next day
      differenceInMinutes += 24 * 60;
    }

    // Convert the difference to hours and minutes
    const hours = Math.floor(differenceInMinutes / 60);
    const minutes = differenceInMinutes % 60;

    // Return the formatted string
    return `${hours}j ${minutes}m`;
  };

  useEffect(() => {
    dispatch(getSearchTicketReturn());
    dispatch(getSearchTicketDeparture());
  }, []);

  return (
    <div>
      <div className="max-w-screen-2xl mx-auto  ">
        <NavbarLogoBiru />
        {/* <div className="mt-24">
        <NavbarLogoPutih />
      </div> */}

        <div className="mt-24">
          <CariTiketLain />
        </div>
        <div className="flex pt-6 gap-8 max-md:flex-col max-md:mx-2 max-md:gap-3  max-lg:pt-6  max-xl:pt-6">
          <div className="flex ">
            <Filter />
          </div>
          <div className=" bg-white  rounded-xl shadow-sm p-6 px-10 max-md:text-sm max-md:px-5">
            <div className="">
              {/* DEPARTURE FLIGHTS */}
              <div className="bg-[#D9EDFF] font-bold text-lg text-[#2A91E5] p-1 rounded-lg px-72 text-center border  max-md:px-0 max-lg:px-10 max-xl:px-32">
                Tiket Keberangkatan
              </div>
              <div className="bg-[#2A91E5] font-medium text-white p-1 rounded-lg px-64 mt-2 text-center max-md:px-0 max-lg:px-10 max-xl:px-32 ">
                {departureAirport?.city} ({departureAirport?.iata_code}) -{" "}
                {arrivalAirport?.city} ({arrivalAirport?.iata_code}) pada{" "}
                {`${formattedDepartureDate}`}
              </div>
              {selectedDepartureFlight && selectedDepartureFlightId ? (
                <div>
                  <div
                    key={selectedDepartureFlight?.id}
                    onClick={() =>
                      handleDropdownToggle(selectedDepartureFlight?.id)
                    }
                    className="bg-white border-x border-t border-gray-300 font-medium text-black p-6 rounded-t-lg mt-2 cursor-pointer"
                  >
                    <div className="flex  justify-between items-center cursor-pointer  max-lg:text-sm max-lg:flex-col max-lg:items-start">
                      <div>
                        <div className="flex items-center gap-3 max-lg:flex-col max-lg:items-start">
                          <div className="flex gap-3">
                            <div className="text-lime-500">
                              <FaCircleCheck size={25} />
                            </div>
                            <div className="hidden text-lg font-bold text-lime-500 max-lg:flex ">
                              {" "}
                              Tiket terpilih
                            </div>
                          </div>

                          <img
                            src={`${selectedDepartureFlight?.airline?.icon_url}`}
                            className="h-7 w-auto rounded"
                          />
                          <div className="flex gap-3">
                            <div>{selectedDepartureFlight?.airline?.name}</div>{" "}
                            <div>-</div>
                            <div>
                              {selectedDepartureFlight?.class
                                .charAt(0)
                                .toUpperCase() +
                                selectedDepartureFlight?.class
                                  .slice(1)
                                  .toLowerCase()}
                            </div>
                          </div>
                        </div>{" "}
                      </div>
                      <div className="text-lg font-bold text-lime-500 max-lg:hidden">
                        {" "}
                        Tiket terpilih
                      </div>
                    </div>
                    <div className="flex justify-between items-center max-lg:flex-col max-md: max-lg:gap-3">
                      <div className="flex pt-6 w-3/4">
                        <div className="flex flex-col text-center">
                          <div className="flex items-center gap-1">
                            <div className="font-bold text-base max-md:text-sm">
                              {selectedDepartureFlight?.departure_airport?.city}{" "}
                              (
                              {
                                selectedDepartureFlight?.departure_airport
                                  ?.iata_code
                              }
                              )
                            </div>
                          </div>
                          <div className="">
                            {selectedDepartureFlight?.departure_time}
                          </div>
                        </div>
                        <div className="flex flex-col justify-center w-2/4">
                          <p className="text-center text-gray-400 text-sm">
                            {calculateTravelTime(
                              selectedDepartureFlight?.departure_time,
                              selectedDepartureFlight?.arrival_time
                            )}
                          </p>
                          <div className="flex items-center mx-3">
                            <div className="mb-3">
                              <GiAirplaneDeparture />
                            </div>
                            <div className="border-t-2 w-full border-gray-400 mx-2 "></div>
                            <div className="mb-3">
                              <GiAirplaneArrival />
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col text-center">
                          <div className="flex items-center gap-1">
                            <div className="font-bold text-base  max-md:text-sm">
                              {selectedDepartureFlight?.arrival_airport?.city} (
                              {
                                selectedDepartureFlight?.arrival_airport
                                  ?.iata_code
                              }
                              )
                            </div>
                          </div>
                          <div>{selectedDepartureFlight?.arrival_time}</div>
                        </div>
                      </div>
                      <div className="font-bold text-xl text-[#2A91E5]">
                        Rp{" "}
                        {selectedDepartureFlight?.price.toLocaleString("id-ID")}
                        ,00
                      </div>
                    </div>
                    {/* DROPDOWN DETAILS */}
                    <div
                      className={` dropdown-content ${
                        isDropdownOpen[selectedDepartureFlight?.id]
                          ? "open"
                          : ""
                      }`}
                    >
                      <div className="flex n items-center cursor-pointer border-t border-gray-400  mt-4 ">
                        <div className="font-bold mt-4 ">Detail Tiket</div>
                      </div>
                      <div className="flex pt-6 w-4/5">
                        <div className="flex ">
                          <div className="flex flex-col justify-center ">
                            <div className="text-center text-gray-500 text-sm ">
                              {calculateTravelTime(
                                selectedDepartureFlight?.departure_time,
                                selectedDepartureFlight?.arrival_time
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col items-center">
                            <LiaCircleSolid size={20} />
                            <div className="border-r  border-gray-500 h-64 "></div>
                            <LiaCircleSolid size={20} />
                          </div>
                        </div>
                        <div className="flex  justify-between  pl-3 w-full max-lg: gap-10 ">
                          <div className="flex flex-col justify-between  ">
                            <div className="flex flex-col ">
                              <div className="flex items-center gap-2">
                                <div className="font-bold text-lg">
                                  {selectedDepartureFlight?.departure_time}
                                </div>
                                <div className="font-semibold text-base">
                                  {
                                    selectedDepartureFlight?.departure_airport
                                      ?.city
                                  }
                                </div>
                              </div>
                              <div className="font-semibold text-base">
                                {`${formattedDepartureDate}`}
                              </div>
                            </div>
                            <div className="flex flex-col gap- text-gray-500 text-sm max-sm:hidden">
                              <div className="">Maskapai : </div>
                              <div className="">Kelas :</div>
                              <div className="">Nomor Penerbangan :</div>
                              <div className="mt-2">Bagasi :</div>
                              <div className="">Bagasi Kabin :</div>
                            </div>
                            <div className="hidden max-sm:flex flex-col gap- text-gray-500 text-sm max-lg:py-5 ">
                              <div className="">
                                Maskapai :{" "}
                                {selectedDepartureFlight?.airline?.name}
                              </div>
                              <div className="">
                                Kelas :{" "}
                                {(selectedDepartureFlight?.class)
                                  .charAt(0)
                                  .toUpperCase() +
                                  (selectedDepartureFlight?.class)
                                    .slice(1)
                                    .toLowerCase()}
                              </div>
                              <div className="">
                                Nomor Penerbangan :{" "}
                                {selectedDepartureFlight?.flight_number}
                              </div>
                              <div className="mt-2 ">
                                Bagasi : {selectedDepartureFlight?.free_baggage}{" "}
                                kg
                              </div>
                              <div className="">
                                Bagasi Kabin :{" "}
                                {selectedDepartureFlight?.cabin_baggage} kg
                              </div>
                            </div>
                            <div className="flex flex-col ">
                              <div className="flex items-center gap-2">
                                <div className="font-bold text-lg">
                                  {" "}
                                  {selectedDepartureFlight?.arrival_time}
                                </div>
                                <div className="font-semibold text-base">
                                  {
                                    selectedDepartureFlight?.arrival_airport
                                      ?.city
                                  }
                                </div>
                              </div>
                              <div className="font-semibold text-base">
                                {`${formattedDepartureDate}`}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col justify-between max-sm:hidden ">
                            <div className="flex flex-col">
                              <div className="font-bold text-lg">
                                {
                                  selectedDepartureFlight?.departure_airport
                                    ?.name_airport
                                }
                              </div>
                            </div>

                            <div className="flex flex-col gap- text-gray-500 text-sm max-lg:py-5 ">
                              <div className="max-lg:pt-11">
                                {selectedDepartureFlight?.airline?.name}
                              </div>
                              <div className="">
                                {(selectedDepartureFlight?.class)
                                  .charAt(0)
                                  .toUpperCase() +
                                  (selectedDepartureFlight?.class)
                                    .slice(1)
                                    .toLowerCase()}
                              </div>
                              <div className="">
                                {selectedDepartureFlight?.flight_number}
                              </div>
                              <div className="mt-2 max-lg:pt-4">
                                {selectedDepartureFlight?.free_baggage} kg
                              </div>
                              <div className="">
                                {selectedDepartureFlight?.cabin_baggage} kg
                              </div>
                            </div>
                            <div className="flex flex-col ">
                              <div className="font-bold text-lg">
                                {
                                  selectedDepartureFlight?.arrival_airport
                                    ?.name_airport
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* END DROPDOWN DETAILS */}
                  </div>
                  <div
                    onClick={() => dispatch(setSelectedDepartureFlight(null))}
                    className="bg-[#2A91E5] flex items-center justify-center gap-2 hover:bg-sky-700 hover:shadow hover:text-gray-200 border-x border-b border-gray-300 font-medium text-white p-2 rounded-b-lg mt-0 text-center cursor-pointer"
                  >
                    Pilih Tiket Lain
                    <FaRegEdit />
                  </div>
                </div>
              ) : filteredAndSortedDepartureFlights &&
                filteredAndSortedDepartureFlights.length > 0 ? (
                filteredAndSortedDepartureFlights?.map((flight) => (
                  <div key={flight?.id}>
                    <div
                      key={flight?.id}
                      onClick={() => handleDropdownToggle(flight?.id)}
                      className="bg-white border-x border-t border-gray-300 font-medium text-black p-6 rounded-t-lg mt-2 cursor-pointer"
                    >
                      <div className="flex  justify-between items-center cursor-pointer  max-lg:text-sm max-lg:flex-col max-lg:items-start">
                        <div>
                          <div className="flex items-center gap-3 max-lg:flex-col max-lg:items-start">
                            <img
                              src={`${flight?.airline?.icon_url}`}
                              className="h-7 w-auto rounded"
                            />
                            <div className="flex gap-3">
                              <div>{flight?.airline?.name}</div> <div>-</div>
                              <div>
                                {(flight?.class).charAt(0).toUpperCase() +
                                  (flight?.class).slice(1).toLowerCase()}
                              </div>
                            </div>
                          </div>{" "}
                        </div>
                        <div className="text-orange-500  max-md:text-sm">
                          {flight.seat_available} kursi tersisa
                        </div>
                      </div>
                      <div className="flex justify-between items-center max-lg:flex-col max-md: max-lg:gap-3">
                        <div className="flex pt-6 w-3/4">
                          <div className="flex flex-col text-center">
                            <div className="flex items-center gap-1">
                              <div className="font-bold text-base max-md:text-sm">
                                {flight?.departure_airport?.city} (
                                {flight?.departure_airport?.iata_code})
                              </div>
                            </div>
                            <div className="">{flight?.departure_time}</div>
                          </div>
                          <div className="flex flex-col justify-center w-2/4">
                            <p className="text-center text-gray-400 text-sm">
                              {calculateTravelTime(
                                flight?.departure_time,
                                flight?.arrival_time
                              )}
                            </p>
                            <div className="flex items-center mx-3">
                              <div className="mb-3">
                                <GiAirplaneDeparture />
                              </div>
                              <div className="border-t-2 w-full border-gray-400 mx-2 "></div>
                              <div className="mb-3">
                                <GiAirplaneArrival />
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col text-center">
                            <div className="flex items-center gap-1">
                              <div className="font-bold text-base  max-md:text-sm">
                                {flight?.arrival_airport?.city} (
                                {flight?.arrival_airport?.iata_code})
                              </div>
                            </div>
                            <div>{flight?.arrival_time}</div>
                          </div>
                        </div>
                        <div className="font-bold text-xl text-[#2A91E5]">
                          Rp {flight?.price.toLocaleString("id-ID")},00
                        </div>
                      </div>
                      {/* DROPDOWN DETAILS */}
                      <div
                        className={` dropdown-content ${
                          isDropdownOpen[flight?.id] ? "open" : ""
                        }`}
                      >
                        <div className="flex n items-center cursor-pointer border-t border-gray-400  mt-4 ">
                          <div className="font-bold mt-4 ">Detail Tiket</div>
                        </div>
                        <div className="flex pt-6 w-4/5">
                          <div className="flex ">
                            <div className="flex flex-col justify-center ">
                              <div className="text-center text-gray-500 text-sm ">
                                {calculateTravelTime(
                                  flight?.departure_time,
                                  flight?.arrival_time
                                )}
                              </div>
                            </div>
                            <div className="flex flex-col items-center">
                              <LiaCircleSolid size={20} />
                              <div className="border-r  border-gray-500 h-64 "></div>
                              <LiaCircleSolid size={20} />
                            </div>
                          </div>
                          <div className="flex  justify-between  pl-3 w-full max-lg: gap-10 ">
                            <div className="flex flex-col justify-between  ">
                              <div className="flex flex-col ">
                                <div className="flex items-center gap-2">
                                  <div className="font-bold text-lg">
                                    {flight?.departure_time}
                                  </div>
                                  <div className="font-semibold text-base">
                                    {flight?.departure_airport?.city}
                                  </div>
                                </div>
                                <div className="font-semibold text-base">
                                  {`${formattedDepartureDate}`}
                                </div>
                              </div>
                              <div className="flex flex-col gap- text-gray-500 text-sm max-sm:hidden">
                                <div className="">Maskapai : </div>
                                <div className="">Kelas :</div>
                                <div className="">Nomor Penerbangan :</div>
                                <div className="mt-2">Bagasi :</div>
                                <div className="">Bagasi Kabin :</div>
                              </div>
                              <div className="hidden max-sm:flex flex-col gap- text-gray-500 text-sm max-lg:py-5 ">
                                <div className="">
                                  Maskapai : {flight?.airline?.name}
                                </div>
                                <div className="">
                                  Kelas :{" "}
                                  {(flight?.class).charAt(0).toUpperCase() +
                                    (flight?.class).slice(1).toLowerCase()}
                                </div>
                                <div className="">
                                  Nomor Penerbangan : {flight?.flight_number}
                                </div>
                                <div className="mt-2 ">
                                  Bagasi : {flight?.free_baggage} kg
                                </div>
                                <div className="">
                                  Bagasi Kabin : {flight?.cabin_baggage} kg
                                </div>
                              </div>
                              <div className="flex flex-col ">
                                <div className="flex items-center gap-2">
                                  <div className="font-bold text-lg">
                                    {" "}
                                    {flight?.arrival_time}
                                  </div>
                                  <div className="font-semibold text-base">
                                    {flight?.arrival_airport?.city}
                                  </div>
                                </div>
                                <div className="font-semibold text-base">
                                  {`${formattedDepartureDate}`}
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col justify-between max-sm:hidden ">
                              <div className="flex flex-col">
                                <div className="font-bold text-lg">
                                  {flight?.departure_airport?.name_airport}
                                </div>
                              </div>

                              <div className="flex flex-col gap- text-gray-500 text-sm max-lg:py-5 ">
                                <div className="max-lg:pt-11">
                                  {flight?.airline?.name}
                                </div>
                                <div className="">
                                  {(flight?.class).charAt(0).toUpperCase() +
                                    (flight?.class).slice(1).toLowerCase()}
                                </div>
                                <div className="">{flight?.flight_number}</div>
                                <div className="mt-2 max-lg:pt-4">
                                  {flight?.free_baggage} kg
                                </div>
                                <div className="">
                                  {flight?.cabin_baggage} kg
                                </div>
                              </div>
                              <div className="flex flex-col ">
                                <div className="font-bold text-lg">
                                  {flight?.arrival_airport?.name_airport}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* END DROPDOWN DETAILS */}
                    </div>
                    <div
                      onClick={() => {
                        dispatch(setSelectedDepartureFlight(flight));
                        dispatch(setSelectedDepartureFlightId(flight.id));
                      }}
                      className="bg-[#2A91E5] hover:bg-sky-700 hover:shadow hover:text-gray-200 border-x border-b border-gray-300 font-medium text-white p-2 rounded-b-lg mt-0 text-center cursor-pointer"
                    >
                      Pilih Tiket
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white font-medium text-red-500 p-1 mt-2 rounded-lg px-72 text-center border  max-md:px-0 max-lg:px-10 max-xl:px-32">
                  Tiket Tidak Ditemukan{" "}
                </div>
              )}
              <div className=" ">
                {/* Pagination */}
                {!selectedDepartureFlight && (
                  <div className="flex justify-center items-center gap-1 mt-4">
                    <div
                      onClick={() => {
                        if (pageDeparture > 1) {
                          dispatch(setPageDeparture(pageDeparture - 1));
                          dispatch(getSearchTicketDeparture());
                        }
                      }}
                      className="cursor-pointer inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 hover:bg-gray-300 hover:text-gray-700"
                    >
                      <span className="sr-only">Prev Page</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>

                    <div>
                      <div className="p-2 rounded  bg-white text-center text-xs font-medium text-gray-900 [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none">
                        {pageDeparture}
                      </div>
                    </div>

                    <div
                      onClick={() => {
                        if (pageDeparture < 6) {
                          dispatch(setPageDeparture(pageDeparture + 1));
                          dispatch(getSearchTicketDeparture());
                        }
                      }}
                      className="cursor-pointer inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 hover:bg-gray-300 hover:text-gray-700"
                    >
                      <span className="sr-only">Next Page</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              {/* RETURN FLIGHTS */}
              {roundTrip ? (
                <div>
                  <div className="bg-[#D9EDFF] font-bold text-lg mt-2 text-[#2A91E5] p-1 rounded-lg px-72 text-center border  max-md:px-0 max-lg:px-10 max-xl:px-32">
                    Tiket Kembali
                  </div>
                  <div className="bg-[#2A91E5] font-medium text-white p-1 rounded-lg px-64 mt-2 text-center max-md:px-0 max-lg:px-10 max-xl:px-32 ">
                    {arrivalAirport?.city} ({arrivalAirport?.iata_code}) -{" "}
                    {departureAirport?.city} ({departureAirport?.iata_code})
                    pada {`${formattedReturnDate}`}
                  </div>
                  {selectedReturnFlight ? (
                    <div>
                      <div
                        key={selectedReturnFlight?.id}
                        onClick={() =>
                          handleDropdownToggle(selectedReturnFlight?.id)
                        }
                        className="bg-white border-x border-t border-gray-300 font-medium text-black p-6 rounded-t-lg mt-2 cursor-pointer"
                      >
                        <div className="flex  justify-between items-center cursor-pointer  max-lg:text-sm max-lg:flex-col max-lg:items-start">
                          <div>
                            <div className="flex items-center gap-3 max-lg:flex-col max-lg:items-start">
                              <div className="flex gap-3">
                                <div className="text-lime-500">
                                  <FaCircleCheck size={25} />
                                </div>
                                <div className="hidden text-lg font-bold text-lime-500 max-lg:flex">
                                  {" "}
                                  Tiket terpilih
                                </div>
                              </div>

                              <img
                                src={`${selectedReturnFlight?.airline?.icon_url}`}
                                className="h-7 w-auto rounded"
                              />
                              <div className="flex gap-3">
                                <div>{selectedReturnFlight?.airline?.name}</div>{" "}
                                <div>-</div>
                                <div>
                                  {selectedReturnFlight?.class
                                    .charAt(0)
                                    .toUpperCase() +
                                    selectedReturnFlight?.class
                                      .slice(1)
                                      .toLowerCase()}
                                </div>
                              </div>
                            </div>{" "}
                          </div>
                          <div className="text-lg font-bold text-lime-500 max-lg:hidden">
                            {" "}
                            Tiket terpilih
                          </div>
                        </div>
                        <div className="flex justify-between items-center max-lg:flex-col max-md: max-lg:gap-3">
                          <div className="flex pt-6 w-3/4">
                            <div className="flex flex-col text-center">
                              <div className="flex items-center gap-1">
                                <div className="font-bold text-base max-md:text-sm">
                                  {
                                    selectedReturnFlight?.departure_airport
                                      ?.city
                                  }{" "}
                                  (
                                  {
                                    selectedReturnFlight?.departure_airport
                                      ?.iata_code
                                  }
                                  )
                                </div>
                              </div>
                              <div className="">
                                {selectedReturnFlight?.departure_time}
                              </div>
                            </div>
                            <div className="flex flex-col justify-center w-2/4">
                              <p className="text-center text-gray-400 text-sm">
                                {calculateTravelTime(
                                  selectedReturnFlight?.departure_time,
                                  selectedReturnFlight?.arrival_time
                                )}
                              </p>
                              <div className="flex items-center mx-3">
                                <div className="mb-3">
                                  <GiAirplaneDeparture />
                                </div>
                                <div className="border-t-2 w-full border-gray-400 mx-2 "></div>
                                <div className="mb-3">
                                  <GiAirplaneArrival />
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col text-center">
                              <div className="flex items-center gap-1">
                                <div className="font-bold text-base  max-md:text-sm">
                                  {selectedReturnFlight?.arrival_airport?.city}{" "}
                                  (
                                  {
                                    selectedReturnFlight?.arrival_airport
                                      ?.iata_code
                                  }
                                  )
                                </div>
                              </div>
                              <div>{selectedReturnFlight?.arrival_time}</div>
                            </div>
                          </div>
                          <div className="font-bold text-xl text-[#2A91E5]">
                            Rp{" "}
                            {selectedReturnFlight?.price.toLocaleString(
                              "id-ID"
                            )}
                            ,00
                          </div>
                        </div>
                        {/* DROPDOWN DETAILS */}
                        <div
                          className={` dropdown-content ${
                            isDropdownOpen[selectedReturnFlight?.id]
                              ? "open"
                              : ""
                          }`}
                        >
                          <div className="flex n items-center cursor-pointer border-t border-gray-400  mt-4 ">
                            <div className="font-bold mt-4 ">Detail Tiket</div>
                          </div>
                          <div className="flex pt-6 w-4/5">
                            <div className="flex ">
                              <div className="flex flex-col justify-center ">
                                <div className="text-center text-gray-500 text-sm ">
                                  {calculateTravelTime(
                                    selectedReturnFlight?.departure_time,
                                    selectedReturnFlight?.arrival_time
                                  )}
                                </div>
                              </div>
                              <div className="flex flex-col items-center">
                                <LiaCircleSolid size={20} />
                                <div className="border-r  border-gray-500 h-64 "></div>
                                <LiaCircleSolid size={20} />
                              </div>
                            </div>
                            <div className="flex  justify-between  pl-3 w-full max-lg: gap-10 ">
                              <div className="flex flex-col justify-between  ">
                                <div className="flex flex-col ">
                                  <div className="flex items-center gap-2">
                                    <div className="font-bold text-lg">
                                      {selectedReturnFlight?.departure_time}
                                    </div>
                                    <div className="font-semibold text-base">
                                      {
                                        selectedReturnFlight?.departure_airport
                                          ?.city
                                      }
                                    </div>
                                  </div>
                                  <div className="font-semibold text-base">
                                    {`${formattedDepartureDate}`}
                                  </div>
                                </div>
                                <div className="flex flex-col gap- text-gray-500 text-sm max-sm:hidden">
                                  <div className="">Maskapai : </div>
                                  <div className="">Kelas :</div>
                                  <div className="">Nomor Penerbangan :</div>
                                  <div className="mt-2">Bagasi :</div>
                                  <div className="">Bagasi Kabin :</div>
                                </div>
                                <div className="hidden max-sm:flex flex-col gap- text-gray-500 text-sm max-lg:py-5 ">
                                  <div className="">
                                    Maskapai :{" "}
                                    {selectedReturnFlight?.airline?.name}
                                  </div>
                                  <div className="">
                                    Kelas :{" "}
                                    {(selectedReturnFlight?.class)
                                      .charAt(0)
                                      .toUpperCase() +
                                      (selectedReturnFlight?.class)
                                        .slice(1)
                                        .toLowerCase()}
                                  </div>
                                  <div className="">
                                    Nomor Penerbangan :{" "}
                                    {selectedReturnFlight?.flight_number}
                                  </div>
                                  <div className="mt-2 ">
                                    Bagasi :{" "}
                                    {selectedReturnFlight?.free_baggage} kg
                                  </div>
                                  <div className="">
                                    Bagasi Kabin :{" "}
                                    {selectedReturnFlight?.cabin_baggage} kg
                                  </div>
                                </div>
                                <div className="flex flex-col ">
                                  <div className="flex items-center gap-2">
                                    <div className="font-bold text-lg">
                                      {" "}
                                      {selectedReturnFlight?.arrival_time}
                                    </div>
                                    <div className="font-semibold text-base">
                                      {
                                        selectedReturnFlight?.arrival_airport
                                          ?.city
                                      }
                                    </div>
                                  </div>
                                  <div className="font-semibold text-base">
                                    {`${formattedDepartureDate}`}
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-col justify-between max-sm:hidden ">
                                <div className="flex flex-col">
                                  <div className="font-bold text-lg">
                                    {
                                      selectedReturnFlight?.departure_airport
                                        ?.name_airport
                                    }
                                  </div>
                                </div>

                                <div className="flex flex-col gap- text-gray-500 text-sm max-lg:py-5 ">
                                  <div className="max-lg:pt-11">
                                    {selectedReturnFlight?.airline?.name}
                                  </div>
                                  <div className="">
                                    {(selectedReturnFlight?.class)
                                      .charAt(0)
                                      .toUpperCase() +
                                      (selectedReturnFlight?.class)
                                        .slice(1)
                                        .toLowerCase()}
                                  </div>
                                  <div className="">
                                    {selectedReturnFlight?.flight_number}
                                  </div>
                                  <div className="mt-2 max-lg:pt-4">
                                    {selectedReturnFlight?.free_baggage} kg
                                  </div>
                                  <div className="">
                                    {selectedReturnFlight?.cabin_baggage} kg
                                  </div>
                                </div>
                                <div className="flex flex-col ">
                                  <div className="font-bold text-lg">
                                    {
                                      selectedReturnFlight?.arrival_airport
                                        ?.name_airport
                                    }
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* END DROPDOWN DETAILS */}
                      </div>
                      <div
                        onClick={() => dispatch(setSelectedReturnFlight(null))}
                        className="bg-[#2A91E5] flex items-center justify-center gap-2 hover:bg-sky-700 hover:shadow hover:text-gray-200 border-x border-b border-gray-300 font-medium text-white p-2 rounded-b-lg mt-0 text-center cursor-pointer"
                      >
                        Pilih Tiket Lain
                        <FaRegEdit />
                      </div>
                    </div>
                  ) : filteredAndSortedReturnFlights &&
                    filteredAndSortedReturnFlights.length > 0 ? (
                    filteredAndSortedReturnFlights.map((flight) => (
                      <div key={flight?.id}>
                        <div
                          key={flight?.id}
                          onClick={() => handleDropdownToggle(flight?.id)}
                          className="bg-white border-x border-t border-gray-300 font-medium text-black p-6 rounded-t-lg mt-2 cursor-pointer"
                        >
                          <div className="flex  justify-between items-center cursor-pointer  max-lg:text-sm max-lg:flex-col max-lg:items-start">
                            <div>
                              <div className="flex items-center gap-3 max-lg:flex-col max-lg:items-start">
                                <img
                                  src={`${flight?.airline?.icon_url}`}
                                  className="h-7 w-auto rounded"
                                />
                                <div className="flex gap-3">
                                  <div>{flight?.airline?.name}</div>{" "}
                                  <div>-</div>
                                  <div>
                                    {(flight?.class).charAt(0).toUpperCase() +
                                      (flight?.class).slice(1).toLowerCase()}
                                  </div>
                                </div>
                              </div>{" "}
                            </div>
                            <div className="text-orange-500  max-md:text-sm">
                              {flight.seat_available} kursi tersisa
                            </div>
                          </div>
                          <div className="flex justify-between items-center max-lg:flex-col max-md: max-lg:gap-3">
                            <div className="flex pt-6 w-3/4">
                              <div className="flex flex-col text-center">
                                <div className="flex items-center gap-1">
                                  <div className="font-bold text-base max-md:text-sm">
                                    {flight?.departure_airport?.city} (
                                    {flight?.departure_airport?.iata_code})
                                  </div>
                                </div>
                                <div className="">{flight?.departure_time}</div>
                              </div>
                              <div className="flex flex-col justify-center w-2/4">
                                <p className="text-center text-gray-400 text-sm">
                                  {calculateTravelTime(
                                    flight?.departure_time,
                                    flight?.arrival_time
                                  )}
                                </p>
                                <div className="flex items-center mx-3">
                                  <div className="mb-3">
                                    <GiAirplaneDeparture />
                                  </div>
                                  <div className="border-t-2 w-full border-gray-400 mx-2 "></div>
                                  <div className="mb-3">
                                    <GiAirplaneArrival />
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col text-center">
                                <div className="flex items-center gap-1">
                                  <div className="font-bold text-base  max-md:text-sm">
                                    {flight?.arrival_airport?.city} (
                                    {flight?.arrival_airport?.iata_code})
                                  </div>
                                </div>
                                <div>{flight?.arrival_time}</div>
                              </div>
                            </div>
                            <div className="font-bold text-xl text-[#2A91E5]">
                              Rp {flight?.price.toLocaleString("id-ID")},00
                            </div>
                          </div>
                          {/* DROPDOWN DETAILS */}
                          <div
                            className={` dropdown-content ${
                              isDropdownOpen[flight?.id] ? "open" : ""
                            }`}
                          >
                            <div className="flex n items-center cursor-pointer border-t border-gray-400  mt-4 ">
                              <div className="font-bold mt-4 ">
                                Detail Tiket
                              </div>
                            </div>
                            <div className="flex pt-6 w-4/5">
                              <div className="flex ">
                                <div className="flex flex-col justify-center ">
                                  <div className="text-center text-gray-500 text-sm ">
                                    {calculateTravelTime(
                                      flight?.departure_time,
                                      flight?.arrival_time
                                    )}
                                  </div>
                                </div>
                                <div className="flex flex-col items-center">
                                  <LiaCircleSolid size={20} />
                                  <div className="border-r  border-gray-500 h-64 "></div>
                                  <LiaCircleSolid size={20} />
                                </div>
                              </div>
                              <div className="flex  justify-between  pl-3 w-full max-lg: gap-10 ">
                                <div className="flex flex-col justify-between  ">
                                  <div className="flex flex-col ">
                                    <div className="flex items-center gap-2">
                                      <div className="font-bold text-lg">
                                        {flight?.departure_time}
                                      </div>
                                      <div className="font-semibold text-base">
                                        {flight?.departure_airport?.city}
                                      </div>
                                    </div>
                                    <div className="font-semibold text-base">
                                      {`${formattedDepartureDate}`}
                                    </div>
                                  </div>
                                  <div className="flex flex-col gap- text-gray-500 text-sm max-sm:hidden">
                                    <div className="">Maskapai : </div>
                                    <div className="">Kelas :</div>
                                    <div className="">Nomor Penerbangan :</div>
                                    <div className="mt-2">Bagasi :</div>
                                    <div className="">Bagasi Kabin :</div>
                                  </div>
                                  <div className="hidden max-sm:flex flex-col gap- text-gray-500 text-sm max-lg:py-5 ">
                                    <div className="">
                                      Maskapai : {flight?.airline?.name}
                                    </div>
                                    <div className="">
                                      Kelas :{" "}
                                      {(flight?.class).charAt(0).toUpperCase() +
                                        (flight?.class).slice(1).toLowerCase()}
                                    </div>
                                    <div className="">
                                      Nomor Penerbangan :{" "}
                                      {flight?.flight_number}
                                    </div>
                                    <div className="mt-2 ">
                                      Bagasi : {flight?.free_baggage} kg
                                    </div>
                                    <div className="">
                                      Bagasi Kabin : {flight?.cabin_baggage} kg
                                    </div>
                                  </div>
                                  <div className="flex flex-col ">
                                    <div className="flex items-center gap-2">
                                      <div className="font-bold text-lg">
                                        {" "}
                                        {flight?.arrival_time}
                                      </div>
                                      <div className="font-semibold text-base">
                                        {flight?.arrival_airport?.city}
                                      </div>
                                    </div>
                                    <div className="font-semibold text-base">
                                      {`${formattedDepartureDate}`}
                                    </div>
                                  </div>
                                </div>

                                <div className="flex flex-col justify-between max-sm:hidden ">
                                  <div className="flex flex-col">
                                    <div className="font-bold text-lg">
                                      {flight?.departure_airport?.name_airport}
                                    </div>
                                  </div>

                                  <div className="flex flex-col gap- text-gray-500 text-sm max-lg:py-5 ">
                                    <div className="max-lg:pt-11">
                                      {flight?.airline?.name}
                                    </div>
                                    <div className="">
                                      {(flight?.class).charAt(0).toUpperCase() +
                                        (flight?.class).slice(1).toLowerCase()}
                                    </div>
                                    <div className="">
                                      {flight?.flight_number}
                                    </div>
                                    <div className="mt-2 max-lg:pt-4">
                                      {flight?.free_baggage} kg
                                    </div>
                                    <div className="">
                                      {flight?.cabin_baggage} kg
                                    </div>
                                  </div>
                                  <div className="flex flex-col ">
                                    <div className="font-bold text-lg">
                                      {flight?.arrival_airport?.name_airport}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* END DROPDOWN DETAILS */}
                        </div>
                        <div
                          onClick={() => {
                            dispatch(setSelectedReturnFlight(flight));
                            dispatch(setSelectedReturnFlightId(flight.id));
                          }}
                          className="bg-[#2A91E5] hover:bg-sky-700 hover:shadow hover:text-gray-200 border-x border-b border-gray-300 font-medium text-white p-2 rounded-b-lg mt-0 text-center cursor-pointer"
                        >
                          Pilih Tiket
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="bg-white font-medium text-red-500 p-1 mt-2 rounded-lg px-72 text-center border  max-md:px-0 max-lg:px-10 max-xl:px-32">
                      Tiket Tidak Ditemukan{" "}
                    </div>
                  )}
                  <div className=" ">
                    {/* Pagination */}
                    {!selectedReturnFlight && (
                      <div className="flex justify-center items-center gap-1 mt-4">
                        <div
                          onClick={() => {
                            if (pageReturn > 1) {
                              dispatch(setPageReturn(pageReturn - 1));
                              dispatch(getSearchTicketReturn());
                            }
                          }}
                          className="cursor-pointer inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 hover:bg-gray-300 hover:text-gray-700"
                        >
                          <span className="sr-only">Prev Page</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>

                        <div>
                          <div className="p-2 rounded  bg-white text-center text-xs font-medium text-gray-900 [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none">
                            {pageReturn}
                          </div>
                        </div>

                        <div
                          onClick={() => {
                            if (pageReturn < 6) {
                              dispatch(setPageReturn(pageReturn + 1));
                              dispatch(getSearchTicketReturn());
                            }
                          }}
                          className="cursor-pointer inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 hover:bg-gray-300 hover:text-gray-700"
                        >
                          <span className="sr-only">Next Page</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
            </div>

            {((!roundTrip && selectedDepartureFlight) ||
              (roundTrip &&
                selectedDepartureFlight &&
                selectedReturnFlight)) && (
              <div
                onClick={() => navigate("/booking-detail")}
                className="bg-lime-500 mt-2 hover:bg-lime-600 hover:shadow hover:text-gray-200 border border-gray-300 font-medium text-white p-2 rounded-lg text-center cursor-pointer"
              >
                Pesan Tiket{" "}
              </div>
            )}
          </div>
          <div>
            {/* SDG CARD */}
            <SdgCard />
            {/* SDG CARD */}
          </div>
        </div>
      </div>
      <div className="pt-56">
        <Footer />
      </div>
    </div>
  );
}
