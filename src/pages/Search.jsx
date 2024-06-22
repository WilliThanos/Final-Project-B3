import { useEffect, useState } from "react";
import NavbarLogoBiru from "../components/Navbar2";
import NavbarLogoPutih from "../components/Navbar";
import CariTiketLain from "../components/CariTiketLain";
import Filter from "../components/Filter";
import { useDispatch, useSelector } from "react-redux";
import { GiAirplaneDeparture, GiAirplaneArrival } from "react-icons/gi";
import { HiArrowSmRight } from "react-icons/hi";
import { LiaCircleSolid } from "react-icons/lia";
import {
  setSelectedDepartureFlight,
  setSelectedReturnFlight,
  clearTicket,
} from "../redux/reducers/ticketReducer";
import { FaCircleCheck } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";
import { getSearchTicket } from "../redux/action/dataAction";

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
  const filterClass = useSelector((state) => state?.filter?.filterClass);
  const sortHarga = useSelector((state) => state?.filter?.sortHarga);

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
    const [depHours, depMinutes] = departure.split(":").map(Number);
    const [arrHours, arrMinutes] = arrival.split(":").map(Number);

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
    dispatch(getSearchTicket());
  }, []);

  return (
    <div className="max-w-screen-2xl mx-auto  ">
      <NavbarLogoBiru />
      {/* <div className="mt-24">
        <NavbarLogoPutih />
      </div> */}

      <div className="mt-24">
        <CariTiketLain />
      </div>
      <div className="flex pt-32 gap-8 max-md:flex-col max-md:mx-2 max-md:gap-3  max-lg:pt-40  max-xl:pt-40">
        <div className=" flex ">
          <Filter />
        </div>
        <div className=" bg-white rounded-xl shadow-sm p-6 px-10 max-md:text-sm max-md:px-5">
          <div>
            {/* DEPARTURE FLIGHTS */}
            <div className="bg-[#D9EDFF] font-bold text-lg text-[#2A91E5] p-1 rounded-lg px-72 text-center border  max-md:px-0 max-lg:px-10 max-xl:px-32">
              Tiket Keberangkatan
            </div>
            <div className="bg-[#2A91E5] font-medium text-white p-1 rounded-lg px-64 mt-2 text-center max-md:px-0 max-lg:px-10 max-xl:px-32 ">
              {departureAirport?.city} ({departureAirport?.iata_code}) -{" "}
              {arrivalAirport?.city} ({arrivalAirport?.iata_code}) pada{" "}
              {`${formattedDepartureDate}`}
            </div>
            {selectedDepartureFlight ? (
              <div>
                <div
                  key={selectedDepartureFlight?.id}
                  onClick={() =>
                    handleDropdownToggle(selectedDepartureFlight?.id)
                  }
                  className="bg-white border-x border-t border-gray-300 font-medium text-black p-6 rounded-t-lg mt-2 cursor-pointer"
                >
                  <div className="flex justify-between items-center cursor-pointer max-md:text-sm">
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="text-lime-500">
                          <FaCircleCheck size={25} />
                        </div>
                        <img
                          src={`${selectedDepartureFlight?.airline?.icon_url}`}
                          className="h-7 w-auto rounded"
                        />
                        <div>{selectedDepartureFlight?.airline?.name}</div>{" "}
                        <div>-</div>
                        <div>
                          {(selectedDepartureFlight?.class)
                            .charAt(0)
                            .toUpperCase() +
                            (selectedDepartureFlight?.class)
                              .slice(1)
                              .toLowerCase()}
                        </div>
                      </div>{" "}
                    </div>
                    <div className="text-lg font-bold text-lime-500">
                      {" "}
                      Tiket terpilih
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex pt-6 w-3/4">
                      <div className="flex flex-col text-center">
                        <div className="flex items-center gap-1">
                          <div className="font-bold text-base max-md:text-sm">
                            {selectedDepartureFlight?.departure_airport?.city} (
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
                          <div className="font-bold text-base max-md:text-sm">
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
                    <div className="font-bold text-xl text-[#2A91E5] max-md:text-sm">
                      Rp{" "}
                      {(selectedDepartureFlight?.price).toLocaleString("id-ID")}
                      ,00
                    </div>
                  </div>
                  {/* DROPDOWN DETAILS */}
                  <div
                    className={` dropdown-content ${
                      isDropdownOpen[selectedDepartureFlight?.id] ? "open" : ""
                    }`}
                  >
                    <div className="flex n items-center cursor-pointer border-t border-gray-400 mt-4 ">
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
                          <div className="border-r border-gray-500 h-64 "></div>
                          <LiaCircleSolid size={20} />
                        </div>
                      </div>
                      <div className="flex justify-between pl-3 w-full">
                        <div className="flex flex-col justify-between">
                          <div className="flex flex-col">
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
                          <div className="flex flex-col gap- text-gray-500 text-sm">
                            <div className="">Maskapai : </div>
                            <div className="">Kelas :</div>
                            <div className="">Nomor Penerbangan :</div>
                            <div className="mt-2">Bagasi :</div>
                            <div className="">Bagasi Kabin :</div>
                          </div>
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <div className="font-bold text-lg">
                                {selectedDepartureFlight?.arrival_time}
                              </div>
                              <div className="font-semibold text-base">
                                {selectedDepartureFlight?.arrival_airport?.city}
                              </div>
                            </div>
                            <div className="font-semibold text-base">
                              {`${formattedDepartureDate}`}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col justify-between">
                          <div className="flex flex-col">
                            <div className="font-bold text-lg">
                              {
                                selectedDepartureFlight?.departure_airport
                                  ?.name_airport
                              }
                            </div>
                          </div>

                          <div className="flex flex-col gap- text-gray-500 text-sm">
                            <div className="">
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
                            <div className="mt-2">
                              {selectedDepartureFlight?.free_baggage} kg
                            </div>
                            <div className="">
                              {selectedDepartureFlight?.cabin_baggage} kg
                            </div>
                          </div>
                          <div className="flex flex-col">
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
                    <div className="flex justify-between items-center cursor-pointer  max-md:text-sm">
                      <div>
                        <div className="flex items-center gap-3">
                          <img
                            src={`${flight?.airline?.icon_url}`}
                            className="h-7 w-auto rounded"
                          />
                          <div>{flight?.airline?.name}</div> <div>-</div>
                          <div>
                            {(flight?.class).charAt(0).toUpperCase() +
                              (flight?.class).slice(1).toLowerCase()}
                          </div>
                        </div>{" "}
                      </div>
                      <div className="text-orange-500  max-md:text-sm">
                        {flight.seat_available} kursi tersisa
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
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
                      <div className="font-bold text-xl text-[#2A91E5]  max-md:text-sm">
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
                        <div className="flex  justify-between  pl-3 w-full    ">
                          <div className="flex flex-col justify-between ">
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
                            <div className="flex flex-col gap- text-gray-500 text-sm">
                              <div className="">Maskapai : </div>
                              <div className="">Kelas :</div>
                              <div className="">Nomor Penerbangan :</div>
                              <div className="mt-2">Bagasi :</div>
                              <div className="">Bagasi Kabin :</div>
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

                          <div className="flex flex-col justify-between ">
                            <div className="flex flex-col">
                              <div className="font-bold text-lg">
                                {flight?.departure_airport?.name_airport}
                              </div>
                            </div>

                            <div className="flex flex-col gap- text-gray-500 text-sm">
                              <div className="">{flight?.airline?.name}</div>
                              <div className="">
                                {(flight?.class).charAt(0).toUpperCase() +
                                  (flight?.class).slice(1).toLowerCase()}
                              </div>
                              <div className="">{flight?.flight_number}</div>
                              <div className="mt-2">
                                {flight?.free_baggage} kg
                              </div>
                              <div className="">{flight?.cabin_baggage} kg</div>
                            </div>
                            <div className="flex flex-col">
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
            {/* RETURN FLIGHTS */}
            {roundTrip ? (
              <div>
                <div className="bg-[#D9EDFF] font-bold text-lg mt-2 text-[#2A91E5] p-1 rounded-lg px-72 text-center border  max-md:px-0 max-lg:px-10 max-xl:px-32">
                  Tiket Kembali
                </div>
                <div className="bg-[#2A91E5] font-medium text-white p-1 rounded-lg px-64 mt-2 text-center max-md:px-0 max-lg:px-10 max-xl:px-32 ">
                  {arrivalAirport?.city} ({arrivalAirport?.iata_code}) -{" "}
                  {departureAirport?.city} ({departureAirport?.iata_code}) pada{" "}
                  {`${formattedReturnDate}`}
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
                      <div className="flex justify-between items-center cursor-pointer max-md:text-sm">
                        <div>
                          <div className="flex items-center gap-3">
                            <div className="text-lime-500">
                              <FaCircleCheck size={25} />
                            </div>
                            <img
                              src={`${selectedReturnFlight?.airline?.icon_url}`}
                              className="h-7 w-auto rounded"
                            />
                            <div>{selectedReturnFlight?.airline?.name}</div>{" "}
                            <div>-</div>
                            <div>
                              {(selectedReturnFlight?.class)
                                .charAt(0)
                                .toUpperCase() +
                                (selectedReturnFlight?.class)
                                  .slice(1)
                                  .toLowerCase()}
                            </div>
                          </div>{" "}
                        </div>
                        <div className="text-lg font-bold text-lime-500">
                          {" "}
                          Tiket terpilih
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex pt-6 w-3/4">
                          <div className="flex flex-col text-center">
                            <div className="flex items-center gap-1">
                              <div className="font-bold text-base max-md:text-sm">
                                {selectedReturnFlight?.departure_airport?.city}{" "}
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
                              <div className="font-bold text-base max-md:text-sm">
                                {selectedReturnFlight?.arrival_airport?.city} (
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
                        <div className="font-bold text-xl text-[#2A91E5] max-md:text-sm">
                          Rp{" "}
                          {(selectedReturnFlight?.price).toLocaleString(
                            "id-ID"
                          )}
                          ,00
                        </div>
                      </div>
                      {/* DROPDOWN DETAILS */}
                      <div
                        className={` dropdown-content ${
                          isDropdownOpen[selectedReturnFlight?.id] ? "open" : ""
                        }`}
                      >
                        <div className="flex n items-center cursor-pointer border-t border-gray-400 mt-4 ">
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
                              <div className="border-r border-gray-500 h-64 "></div>
                              <LiaCircleSolid size={20} />
                            </div>
                          </div>
                          <div className="flex justify-between pl-3 w-full">
                            <div className="flex flex-col justify-between">
                              <div className="flex flex-col">
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
                                  {`${formattedReturnDate}`}
                                </div>
                              </div>
                              <div className="flex flex-col gap- text-gray-500 text-sm">
                                <div className="">Maskapai : </div>
                                <div className="">Kelas :</div>
                                <div className="">Nomor Penerbangan :</div>
                                <div className="mt-2">Bagasi :</div>
                                <div className="">Bagasi Kabin :</div>
                              </div>
                              <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                  <div className="font-bold text-lg">
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
                                  {`${formattedReturnDate}`}
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col justify-between">
                              <div className="flex flex-col">
                                <div className="font-bold text-lg">
                                  {
                                    selectedReturnFlight?.departure_airport
                                      ?.name_airport
                                  }
                                </div>
                              </div>

                              <div className="flex flex-col gap- text-gray-500 text-sm">
                                <div className="">
                                  {selectedDepartureFlight?.airline?.name}
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
                                <div className="mt-2">
                                  {selectedReturnFlight?.free_baggage} kg
                                </div>
                                <div className="">
                                  {selectedReturnFlight?.cabin_baggage} kg
                                </div>
                              </div>
                              <div className="flex flex-col">
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

                    {/* <div className="bg-[#2A91E5] mt-2 hover:bg-sky-700 hover:shadow hover:text-gray-200 border border-gray-300 font-medium text-white p-2 rounded-lg text-center cursor-pointer">
                  {" "}
                  Lanjut Ke Pembayaran
                </div> */}
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
                        <div className="flex justify-between items-center cursor-pointer  max-md:text-sm">
                          <div>
                            <div className="flex items-center gap-3">
                              <img
                                src={`${flight?.airline?.icon_url}`}
                                className="h-7 w-auto rounded"
                              />
                              <div>{flight?.airline?.name}</div> <div>-</div>
                              <div>
                                {(flight?.class).charAt(0).toUpperCase() +
                                  (flight?.class).slice(1).toLowerCase()}
                              </div>
                            </div>{" "}
                          </div>
                          <div className="text-orange-500  max-md:text-sm">
                            {flight.seat_available} kursi tersisa
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
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
                          <div className="font-bold text-xl text-[#2A91E5]  max-md:text-sm">
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
                            <div className="flex  justify-between  pl-3 w-full    ">
                              <div className="flex flex-col justify-between ">
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
                                    {`${formattedReturnDate}`}
                                  </div>
                                </div>
                                <div className="flex flex-col gap- text-gray-500 text-sm">
                                  <div className="">Maskapai : </div>
                                  <div className="">Kelas :</div>
                                  <div className="">Nomor Penerbangan :</div>
                                  <div className="mt-2">Bagasi :</div>
                                  <div className="">Bagasi Kabin :</div>
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
                                    {`${formattedReturnDate}`}
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-col justify-between ">
                                <div className="flex flex-col">
                                  <div className="font-bold text-lg">
                                    {flight?.departure_airport?.name_airport}
                                  </div>
                                </div>

                                <div className="flex flex-col gap- text-gray-500 text-sm">
                                  <div className="">
                                    {flight?.airline?.name}
                                  </div>
                                  <div className="">
                                    {(flight?.class).charAt(0).toUpperCase() +
                                      (flight?.class).slice(1).toLowerCase()}
                                  </div>
                                  <div className="">
                                    {flight?.flight_number}
                                  </div>
                                  <div className="mt-2">
                                    {flight?.free_baggage} kg
                                  </div>
                                  <div className="">
                                    {flight?.cabin_baggage} kg
                                  </div>
                                </div>
                                <div className="flex flex-col">
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
                        onClick={() =>
                          dispatch(setSelectedReturnFlight(flight))
                        }
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
              </div>
            ) : null}
          </div>

          {((!roundTrip && selectedDepartureFlight) ||
            (roundTrip && selectedDepartureFlight && selectedReturnFlight)) && (
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
          <div className="w-52 mx-auto bg-white rounded-xl shadow-sm p-4 max-md:mx-0 ">
            <a href="#" className="group relative block h-64 sm:h-80 lg:h-96">
              <span className="absolute inset-0 border rounded-xl bg-[#D9EDFF] border-dashed border-gray-300"></span>

              <div className="relative flex h-full transform items-end border rounded-xl border-gray-300 text-white bg-[#2A91E5] transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
                <div className="p-4 !pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-10 sm:size-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>

                  <h2 className="mt-10 text-lg font-medium  max-md:text-md">
                    Go around the world
                  </h2>
                </div>

                <div className="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-5  lg:p-8">
                  <h3 className="mt-4 text-base sm:text-lg font-medium ">
                    Go around the world
                  </h3>

                  <p className="mt-4 text-sm sm:text-base ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Cupiditate, praesentium voluptatem omnis atque culpa
                    repellendus.
                  </p>
                </div>
              </div>
            </a>
          </div>
          {/* SDG CARD */}
        </div>
      </div>
    </div>
  );
}
