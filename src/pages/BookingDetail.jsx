import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NavbarLogoBiru from "../components/Navbar2";
import NavbarLogoPutih from "../components/Navbar";
import CariTiketLain from "../components/CariTiketLain";
import { GiAirplaneDeparture, GiAirplaneArrival } from "react-icons/gi";
import DetailPembayaran from "../components/DetailPembayaran";
import { SlPlane } from "react-icons/sl";
import AirAsiaLogo from "../assets/AirAsia.png";
import { GoTriangleDown } from "react-icons/go";
import { SlCalender } from "react-icons/sl";
import { id } from "date-fns/locale";
import { useDispatch, useSelector } from "react-redux";
import {
  setJenisKelamin,
  setNamaDepan,
  setNamaBelakang,
  setTanggalLahir,
  setEmail,
  setNomorHP,
} from "../redux/reducers/bookingReducer";

import {
  updatePassenger,
  setPassengers,
} from "../redux/reducers/passengersReducer";

import { LiaCircleSolid } from "react-icons/lia";

export default function BookingDetail() {
  const dispatch = useDispatch();
  const passengers = useSelector((state) => state.passengers.passengers);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null);
  // const jenisKelamin = useSelector((state) => state?.booking?.jenisKelamin);
  // const tanggalLahir = useSelector((state) => state?.booking?.tanggalLahir);
  // const namaDepan = useSelector((state) => state?.booking?.namaDepan);
  // const namaBelakang = useSelector((state) => state?.booking?.namaBelakang);
  // const email = useSelector((state) => state?.booking?.email);
  // const nomorHP = useSelector((state) => state?.booking?.nomorHP);
  const jumlahDewasa = useSelector((state) => state?.data?.jumlahDewasa);
  const jumlahAnak = useSelector((state) => state?.data?.jumlahAnak);
  const jumlahBayi = useSelector((state) => state?.data?.jumlahBayi);

  const totalPenumpang = jumlahDewasa + jumlahAnak + jumlahBayi;

  const handleInputGender = (index, field, value) => {
    const newPassengers = [...passengers];
    newPassengers[index][field] = value;
    setPassengers(newPassengers);
  };

  const toggleDropdown = (index) => {
    setDropdownOpenIndex(index === dropdownOpenIndex ? null : index);
  };

  useEffect(() => {
    const maxPassengers = 4; // Maximum number of passengers allowed

    if (passengers.length !== totalPenumpang) {
      if (passengers.length < totalPenumpang) {
        // Add new passengers if needed
        let newPassengers = [
          ...passengers,
          ...Array(totalPenumpang - passengers.length).fill({
            jenisKelamin: "",
            namaDepan: "",
            namaBelakang: "",
            tanggalLahir: null,
            nik: "",
            nomorHP: "",
            isDropdownOpen: false,
          }),
        ];

        // Ensure not exceeding maximum number of passengers
        if (newPassengers.length > maxPassengers) {
          newPassengers = newPassengers.slice(0, maxPassengers);
        }

        // Dispatch the state update only if passengers have changed
        if (
          newPassengers.length !== passengers.length ||
          !newPassengers.every((p, index) => p === passengers[index])
        ) {
          dispatch(setPassengers(newPassengers));
        }
      } else {
        // Reduce passengers if needed
        const newPassengers = passengers.slice(0, totalPenumpang);
        dispatch(setPassengers(newPassengers));
      }
    }
  }, [totalPenumpang, dispatch, passengers]);

  const handleInputChange = (index, field, value) => {
    dispatch(updatePassenger({ index, field, value }));
  };

  const departureFlights = useSelector(
    (state) => state?.ticket?.selectedDepartureFlight
  );
  const returnFlights = useSelector(
    (state) => state?.ticket?.selectedReturnFlight
  );

  const formattedDepartureDate = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })?.format(new Date(departureFlights?.Date));

  const formattedarrivalDate =
    returnFlights && returnFlights.Date
      ? new Intl.DateTimeFormat("id-ID", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(new Date(returnFlights.Date))
      : "Date not available";

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

  const cekPulangPergi = useSelector((state) => state?.data?.roundtrip);

  // const formattedDate = new Intl.DateTimeFormat("id-ID", {
  //   weekday: "long",
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  // })?.format(new Date(tanggalLahir));

  const departureDateRef = useRef(null);

  const handleDropdownToggle = (flightId) => {
    setIsDropdownOpen((prevState) => ({
      ...prevState,
      [flightId]: !prevState[flightId], // Toggle the dropdown state for the specific flightId
    }));
  };

  return (
    <form className="max-w-screen-2xl mx-auto  ">
      <NavbarLogoBiru />
      {/* <div className="mt-24">
        <NavbarLogoPutih />
      </div> */}

      <div className="mt-24">
        <CariTiketLain />
      </div>
      <div className="flex pt-32 gap-8  max-md:mx-2 max-md:gap-3  max-lg:pt-40  max-xl:pt-40 max-xl:flex-col max-xl:mx-2 max-md:pt-32 ">
        <div className="flex flex-col gap-8 w-full">
          <div className="">
            <div className="pb-4 font-bold text-2xl max-lg:text-xl max-sm:text-lg">
              Detail Pemesanan Tiket
            </div>

            <div className=" mx-auto w-full bg-white rounded-xl shadow-sm px-6 max-sm:px-4 ">
              <div className="py-10 flex flex-col gap-10">
                {/* CARD BERANGKAT */}
                <div
                  className="border-2 border-gray-200 rounded-xl p-4 hover:border-blue-400 cursor-pointer"
                  key={departureFlights?.id}
                  onClick={() => handleDropdownToggle(departureFlights?.id)}
                >
                  <div className="flex items-center gap-4">
                    <GiAirplaneDeparture size={20} />
                    <div className="font-bold text-base max-sm:text-sm">
                      Pesawat Keberangkatan
                    </div>
                  </div>
                  <div className="flex items-center gap-6 pt-4 max-lg:gap-4 ">
                    <div>
                      <div className="font-bold text-[22px] max-lg:text-lg max-sm:text-sm">
                        {formattedDepartureDate}
                      </div>
                      <div className="font-semibold text-base max-lg:text-sm max-sm:text-xs">
                        {(departureFlights?.class).charAt(0).toUpperCase() +
                          (departureFlights?.class).slice(1).toLowerCase()}
                      </div>
                    </div>
                    <div className="flex gap-4 max-sm:flex-col max-sm:gap-2">
                      <div className="flex items-center justify-center ">
                        <div className="flex flex-col">
                          <div className="font-bold text-base max-lg:text-sm ">
                            {departureFlights?.departure_airport?.city}
                          </div>
                          <div className=" text-base max-lg:text-sm">
                            ({departureFlights?.departure_airport?.iata_code})
                          </div>
                        </div>
                        <div className="flex items-center ">
                          <div className="border-dashed	border-b-2 border-gray-400 w-[60px] mx-2 max-lg:w-[30px] max-sm:w-[20px]"></div>
                          <div className="">
                            <SlPlane
                              className="tilted-icon max-lg:size-[18px] max-sm:size-[20px]"
                              size={22}
                            />
                          </div>
                          <div className="border-solid border-b-2 border-gray-400 w-[60px] mx-2 max-lg:w-[30px] max-sm:w-[20px]"></div>
                        </div>
                        <div className="flex flex-col">
                          <div className="font-bold text-base max-lg:text-sm">
                            {departureFlights?.arrival_airport?.city}
                          </div>
                          <div className="flex justify-between w-full">
                            <div className="text-base"></div>{" "}
                            <div className="text-base max-lg:text-sm">
                              ({departureFlights?.arrival_airport?.iata_code})
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-4  items-center">
                        <img
                          src={departureFlights?.airline?.icon_url}
                          alt="AirAsia Logo"
                          className="h-auto max-w-12 rounded"
                        />

                        <div className="font-medium text-base max-lg:text-sm">
                          {departureFlights?.airline?.name}
                        </div>
                      </div>

                      <div className="flex items-center justify-center max-sm:justify-start ">
                        <div className="flex flex-col font-semibold text-lg max-lg:text-sm ">
                          {departureFlights?.departure_time}
                        </div>
                        <div className="flex items-center">
                          <div className="border-dashed	border-b-2 border-gray-400 w-[40px] mx-2 max-lg:w-[20px] "></div>
                          <div className="font-bold text-base max-lg:text-sm ">
                            {calculateTravelTime(
                              departureFlights?.departure_time,
                              departureFlights?.arrival_time
                            )}
                          </div>
                          <div className="border-solid border-b border-black w-[40px] mx-2 max-lg:w-[20px] "></div>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex flex-col font-semibold text-lg max-lg:text-sm ">
                            {departureFlights?.arrival_time}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* dropdown */}
                  <div
                    className={` dropdown-content ${
                      isDropdownOpen[departureFlights?.id] ? "open" : ""
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
                              departureFlights?.departure_time,
                              departureFlights?.arrival_time
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
                                {departureFlights?.departure_time}
                              </div>
                              <div className="font-semibold text-base">
                                {departureFlights?.departure_airport?.city}
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
                                {departureFlights?.arrival_time}
                              </div>
                              <div className="font-semibold text-base">
                                {departureFlights?.arrival_airport?.city}
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
                              {
                                departureFlights?.departure_airport
                                  ?.name_airport
                              }
                            </div>
                          </div>

                          <div className="flex flex-col gap- text-gray-500 text-sm">
                            <div className="">
                              {departureFlights?.airline?.name}
                            </div>
                            <div className="">
                              {(departureFlights?.class)
                                .charAt(0)
                                .toUpperCase() +
                                (departureFlights?.class)
                                  .slice(1)
                                  .toLowerCase()}
                            </div>
                            <div className="">
                              {departureFlights?.flight_number}
                            </div>
                            <div className="mt-2">
                              {departureFlights?.free_baggage} kg
                            </div>
                            <div className="">
                              {departureFlights?.cabin_baggage} kg
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <div className="font-bold text-lg">
                              {departureFlights?.arrival_airport?.name_airport}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* card KEMBALI */}
                {cekPulangPergi ? (
                  <div
                    className="border-2 border-gray-200 rounded-xl p-4 hover:border-blue-400 cursor-pointer"
                    key={returnFlights?.id}
                    onClick={() => handleDropdownToggle(returnFlights?.id)}
                  >
                    <div className="flex items-center gap-4">
                      <GiAirplaneArrival size={20} />
                      <div className="font-bold text-base max-sm:text-sm">
                        Pesawat Kembali
                      </div>
                    </div>
                    <div className="flex items-center gap-6 pt-4 max-lg:gap-4 ">
                      <div>
                        <div className="font-bold text-[22px] max-lg:text-lg max-sm:text-sm">
                          {formattedarrivalDate}
                        </div>
                        <div className="font-semibold text-base max-lg:text-sm max-sm:text-xs">
                          {(returnFlights?.class).charAt(0).toUpperCase() +
                            (returnFlights?.class).slice(1).toLowerCase()}
                        </div>
                      </div>
                      <div className="flex gap-4 max-sm:flex-col max-sm:gap-2">
                        <div className="flex items-center justify-center ">
                          <div className="flex flex-col">
                            <div className="font-bold text-base max-lg:text-sm ">
                              {returnFlights?.departure_airport?.city}
                            </div>
                            <div className=" text-base max-lg:text-sm">
                              ({returnFlights?.departure_airport?.iata_code})
                            </div>
                          </div>
                          <div className="flex items-center ">
                            <div className="border-dashed	border-b-2 border-gray-400 w-[60px] mx-2 max-lg:w-[30px] max-sm:w-[20px]"></div>
                            <div className="">
                              <SlPlane
                                className="tilted-icon max-lg:size-[18px] max-sm:size-[20px]"
                                size={22}
                              />
                            </div>
                            <div className="border-solid border-b-2 border-gray-400 w-[60px] mx-2 max-lg:w-[30px] max-sm:w-[20px]"></div>
                          </div>
                          <div className="flex flex-col">
                            <div className="font-bold text-base max-lg:text-sm">
                              {returnFlights?.arrival_airport?.city}
                            </div>
                            <div className="flex justify-between w-full">
                              <div className="text-base"></div>{" "}
                              <div className="text-base max-lg:text-sm">
                                ({returnFlights?.arrival_airport?.iata_code})
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-4 items-center">
                          <img
                            src={returnFlights?.airline?.icon_url}
                            alt="AirAsia Logo"
                            className="h-auto max-w-12 rounded"
                          />

                          <div className="font-medium text-base max-lg:text-sm">
                            {returnFlights?.airline?.name}
                          </div>
                        </div>

                        <div className="flex items-center justify-center max-sm:justify-start ">
                          <div className="flex flex-col font-semibold text-lg max-lg:text-sm ">
                            {returnFlights?.departure_time}
                          </div>
                          <div className="flex items-center">
                            <div className="border-dashed	border-b-2 border-gray-400 w-[40px] mx-2 max-lg:w-[20px] "></div>
                            <div className="font-bold text-base max-lg:text-sm ">
                              {calculateTravelTime(
                                returnFlights?.departure_time,
                                returnFlights?.arrival_time
                              )}
                            </div>
                            <div className="border-solid border-b border-black w-[40px] mx-2 max-lg:w-[20px] "></div>
                          </div>
                          <div className="flex flex-col">
                            <div className="flex flex-col font-semibold text-lg max-lg:text-sm ">
                              {returnFlights?.arrival_time}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* dropdown */}
                    <div
                      className={` dropdown-content ${
                        isDropdownOpen[returnFlights?.id] ? "open" : ""
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
                                returnFlights?.departure_time,
                                returnFlights?.arrival_time
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
                                  {returnFlights?.departure_time}
                                </div>
                                <div className="font-semibold text-base">
                                  {returnFlights?.departure_airport?.city}
                                </div>
                              </div>
                              <div className="font-semibold text-base">
                                {`${formattedarrivalDate}`}
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
                                  {returnFlights?.arrival_time}
                                </div>
                                <div className="font-semibold text-base">
                                  {returnFlights?.arrival_airport?.city}
                                </div>
                              </div>
                              <div className="font-semibold text-base">
                                {`${formattedarrivalDate}`}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col justify-between ">
                            <div className="flex flex-col">
                              <div className="font-bold text-lg">
                                {returnFlights?.departure_airport?.name_airport}
                              </div>
                            </div>

                            <div className="flex flex-col gap- text-gray-500 text-sm">
                              <div className="">
                                {returnFlights?.airline?.name}
                              </div>
                              <div className="">
                                {(returnFlights?.class)
                                  .charAt(0)
                                  .toUpperCase() +
                                  (returnFlights?.class).slice(1).toLowerCase()}
                              </div>
                              <div className="">
                                {returnFlights?.flight_number}
                              </div>
                              <div className="mt-2">
                                {returnFlights?.free_baggage} kg
                              </div>
                              <div className="">
                                {returnFlights?.cabin_baggage} kg
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <div className="font-bold text-lg">
                                {returnFlights?.arrival_airport?.name_airport}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
          {/* detail penumpang */}
          <div className="">
            <div className="pb-4 font-bold text-2xl max-lg:text-xl max-sm:text-lg">
              Detail Penumpang
            </div>
            {passengers.map((passenger, index) => (
              <div
                key={index}
                className="mx-auto w-full bg-white rounded-xl shadow-sm px-6 max-sm:px-4 my-4"
              >
                <div className="w-3/4 pt-10 max-lg:w-full">
                  <div className="font-semibold text-lg max-md:text-base">
                    Informasi Penumpang {index + 1}
                    {/* Judul sesuai dengan tipe penumpang */}
                    {index === 0 && jumlahDewasa > 0 && (
                      <span className="ml-2 text-sm text-gray-500">
                        (Dewasa)
                      </span>
                    )}
                    {index === 1 && jumlahAnak > 0 && (
                      <span className="ml-2 text-sm text-gray-500">(Anak)</span>
                    )}
                    {index === 2 && jumlahBayi > 0 && (
                      <span className="ml-2 text-sm text-gray-500">(Bayi)</span>
                    )}
                  </div>
                  <div className="flex  gap-4 pt-4 max-sm:flex-col">
                    <div className="relative">
                      <div
                        onClick={() =>
                          handleInputChange(
                            index,
                            "isDropdownOpen",
                            !passenger.isDropdownOpen
                          )
                        }
                        className="flex flex-col gap-2 w-full"
                      >
                        <div className="text-xs">Jenis Kelamin</div>
                        <div className="flex justify-between items-center gap-2 px-4 rounded border-2 border-gray-300 h-14 w-40 max-md:h-12">
                          <div className="font-medium text-sm">
                            {passenger.jenisKelamin}
                          </div>
                          <GoTriangleDown
                            className={`transition ${
                              passenger.isDropdownOpen ? "rotate-180" : ""
                            }`}
                          />
                        </div>
                      </div>
                      {passenger.isDropdownOpen && (
                        <div className="absolute  w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                          <a
                            href="#"
                            className="block rounded-md px-4 py-2 text-gray-800/60 hover:bg-gray-300 hover:text-gray-800"
                            onClick={(e) => {
                              e.preventDefault();
                              handleInputChange(index, "jenisKelamin", "Pria");
                              handleInputChange(index, "isDropdownOpen", false);
                            }}
                          >
                            <div className="flex items-center gap-x-2">
                              <div>Pria</div>
                            </div>
                          </a>
                          <a
                            href="#"
                            className="block rounded-md px-4 py-2 text-gray-800/60 hover:bg-gray-300 hover:text-gray-800"
                            onClick={(e) => {
                              e.preventDefault();
                              handleInputChange(
                                index,
                                "jenisKelamin",
                                "Wanita"
                              );
                              handleInputChange(index, "isDropdownOpen", false);
                            }}
                          >
                            <div className="flex items-center gap-x-2">
                              <div>Wanita</div>
                            </div>
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                      <div className="text-xs">Nama Depan</div>
                      <input
                        type="text"
                        required
                        value={passenger.namaDepan}
                        onChange={(e) =>
                          handleInputChange(index, "namaDepan", e.target.value)
                        }
                        className="flex font-medium text-sm items-center px-2 rounded border-2 border-gray-300 focus:border-sky-500 focus:outline-none h-12 w-full max-md:h-10"
                        placeholder="Nama Depan"
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <div className="text-xs">Nama Belakang</div>
                      <input
                        type="text"
                        required
                        value={passenger.namaBelakang}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "namaBelakang",
                            e.target.value
                          )
                        }
                        className="flex font-medium text-sm items-center px-2 rounded border-2 border-gray-300 focus:border-sky-500 focus:outline-none h-12 w-full max-md:h-10"
                        placeholder="Nama Belakang"
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <div className="text-xs">Tanggal Lahir</div>
                      <div className="flex justify-between items-center gap-2 px-4 rounded border-2 border-gray-300 focus:border-sky-500 h-14 w-auto max-md:h-12">
                        <DatePicker
                          selected={passenger.tanggalLahir}
                          onChange={(date) =>
                            handleInputChange(index, "tanggalLahir", date)
                          }
                          dateFormat="EEE, d MMM yyyy"
                          locale={id}
                          placeholderText="Tanggal Lahir"
                          className="cursor-pointer font-medium text-sm w-full p-1"
                        />
                        <SlCalender size={20} className="cursor-pointer" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-3/4 pt-6 pb-10 max-lg:w-full">
                  <div className="font-semibold text-lg max-md:text-base">
                    Detail Kontak
                  </div>
                  <div className="flex items-center gap-4 pt-4">
                    <div className="flex flex-col gap-2 w-full">
                      <div className="text-xs">NIK</div>
                      <input
                        type="text"
                        required
                        value={passenger.nik}
                        onChange={(e) =>
                          handleInputChange(index, "nik", e.target.value)
                        }
                        className="flex justify-between text-sm items-center gap-2 px-4 rounded border-2 border-gray-300 focus:border-sky-500 focus:outline-none h-12 w-full max-md:h-10"
                        placeholder="NIK"
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <div className="text-xs">No. Handphone</div>
                      <input
                        type="text"
                        required
                        value={passenger.nomorHP}
                        onChange={(e) =>
                          handleInputChange(index, "nomorHP", e.target.value)
                        }
                        className="flex justify-between text-sm items-center gap-2 px-4 rounded border-2 border-gray-300 focus:border-sky-500 focus:outline-none h-12 w-full max-md:h-10"
                        placeholder="+62 8123456789"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          {/* Detail Pembayaran Component */}
          <DetailPembayaran />
          {/* Detail Pembayaran Component */}
          <button className="rounded-xl bg-[#2A91E5] px-5 mt-8 py-2.5 w-full font-medium text-white hover:bg-sky-700 hover:text-gray-200 hover:shadow">
            Lanjut ke Pembayaran
          </button>
        </div>
      </div>
    </form>
  );
}
