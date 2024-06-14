import { useRef, useState } from "react";
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

import { LiaCircleSolid } from "react-icons/lia";

export default function BookingDetail() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const jenisKelamin = useSelector((state) => state?.booking?.jenisKelamin);
  const tanggalLahir = useSelector((state) => state?.booking?.tanggalLahir);
  const namaDepan = useSelector((state) => state?.booking?.namaDepan);
  const namaBelakang = useSelector((state) => state?.booking?.namaBelakang);
  const email = useSelector((state) => state?.booking?.email);
  const nomorHP = useSelector((state) => state?.booking?.nomorHP);

  const dispatch = useDispatch();

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

  const formattedarrivalDate = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })?.format(new Date(returnFlights?.Date));

  console.log("roundTrip :>> ", departureFlights);
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

  const formattedDate = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })?.format(new Date(tanggalLahir));

  const departureDateRef = useRef(null);

  const handleDropdownToggle = (flightId) => {
    setIsDropdownOpen((prevState) => ({
      ...prevState,
      [flightId]: !prevState[flightId], // Toggle the dropdown state for the specific flightId
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setNamaDepan(namaDepan));
    dispatch(setNamaBelakang(namaBelakang));
    dispatch(setNomorHP(nomorHP));
    dispatch(setEmail(email));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-screen-2xl mx-auto  ">
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
            <div className=" mx-auto w-full bg-white rounded-xl shadow-sm px-6 max-sm:px-4 ">
              <div className="w-3/4 pt-10 max-lg:w-full ">
                <div className="font-semibold text-lg max-md:text-base">
                  Informasi Penumpang
                </div>
                <div className="flex items-center gap-4 pt-4 max-sm:flex-col">
                  <div
                    onClick={handleDropdownToggle}
                    className="flex flex-col gap-2 w-full "
                  >
                    <div className=" text-xs">Jenis Kelamin</div>
                    <div className="flex  justify-between items-center gap-2 px-4 rounded border-2  border-gray-300  h-14 w-auto max-md:h-12">
                      <div className="font-medium text-sm  ">
                        {jenisKelamin}
                      </div>
                      <GoTriangleDown
                        className={`transition ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </div>

                  {isDropdownOpen && (
                    <div className="absolute mt-44  w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      <a
                        href="#"
                        className="block rounded-md px-4 py-2 text-gray-800/60 hover:bg-gray-300 hover:text-gray-800"
                        onClick={() => {
                          dispatch(setJenisKelamin("Pria"));
                          setIsDropdownOpen(false);
                        }}
                      >
                        <div className="flex items-center gap-x-2">
                          <div className="font-">Pria</div>
                        </div>
                      </a>
                      <a
                        href="#"
                        className="block rounded-md px-4 py-2 text-gray-800/60 hover:bg-gray-300 hover:text-gray-800"
                        onClick={() => {
                          dispatch(setJenisKelamin("Wanita"));
                          setIsDropdownOpen(false);
                        }}
                      >
                        <div className="flex items-center gap-x-2">
                          <div className="font-">Wanita</div>
                        </div>
                      </a>
                    </div>
                  )}
                  <div className="flex flex-col gap-2 w-full">
                    <div className="text-xs">Nama Depan</div>
                    <input
                      type="text"
                      required
                      value={namaDepan}
                      onChange={(e) => dispatch(setNamaDepan(e.target.value))}
                      className="flex  font-medium text-sm items-center  px-2 rounded border-2 border-gray-300 focus:border-sky-500 focus:outline-none h-12 w-full max-md:h-10 "
                      placeholder="Nama Depan"
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <div className=" text-xs">Nama Belakang</div>
                    <input
                      type="text"
                      required
                      value={namaBelakang}
                      onChange={(e) =>
                        dispatch(setNamaBelakang(e.target.value))
                      }
                      className="flex  font-medium text-sm items-center  px-2 rounded border-2 border-gray-300 focus:border-sky-500 focus:outline-none h-12 w-full max-md:h-10 "
                      placeholder="Nama Belakang"
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <div className=" text-xs">Tanggal Lahir</div>
                    <div className="flex  justify-between items-center gap-2 px-2 rounded border-2 border-gray-300 focus:border-sk h-14 w-auto max-md:h-12 ">
                      <div>
                        <DatePicker
                          selected={tanggalLahir}
                          onChange={(date) => {
                            dispatch(setTanggalLahir(date));
                            console.log("date :>> ", typeof date);
                          }}
                          dateFormat="EEE, d MMM yyyy"
                          locale={id}
                          placeholderText="y/MM/dd"
                          className="cursor-pointer  font-medium text-sm w-full"
                          ref={departureDateRef}
                        />
                      </div>
                      <SlCalender
                        className="cursor-pointer"
                        onClick={() => departureDateRef.current.setFocus()}
                      />{" "}
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
                    <div className=" text-xs">Email</div>
                    <input
                      type="text"
                      required
                      value={email}
                      onChange={(e) => dispatch(setEmail(e.target.value))}
                      className="flex justify-between text-sm items-center gap-2 px-4 rounded border-2 border-gray-300 focus:border-sky-500 focus:outline-none h-12 w-full  max-md:h-10"
                      placeholder="abc@gmail.com"
                    />{" "}
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <div className=" text-xs">No. Handphone</div>
                    <input
                      type="text"
                      required
                      value={nomorHP}
                      onChange={(e) => dispatch(setNomorHP(e.target.value))}
                      className="flex justify-between text-sm items-center gap-2 px-4 rounded border-2 border-gray-300 focus:border-sky-500 focus:outline-none h-12 w-full pr-10 max-md:h-10"
                      placeholder="+62 8123456789"
                    />{" "}
                  </div>
                </div>
              </div>
            </div>
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
