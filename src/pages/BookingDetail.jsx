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
import DetailPenumpangAnak from "../components/DetailPenumpangAnak";
import DetailPenumpangBayi from "../components/DetailPenumpangBayi";
import DetailPenumpangDewasa from "../components/DetailPenumpangDewasa";
import { getSearchTicket } from "../redux/action/dataAction";
import { useNavigate } from "react-router-dom";

export default function BookingDetail({ index }) {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const passengers = useSelector((state) => state.passengers.passengers);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [passengerAge, setPassengerAge] = useState(null);

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
        // Menambahkan penumpang baru jika diperlukan
        let newPassengers = [
          ...passengers,
          ...Array(totalPenumpang - passengers.length).fill({
            jenisKelamin: "",
            namaDepan: "",
            namaBelakang: "",
            tanggalLahir: null,
            nik: "",
            nomorHP: "",
            kategori: "", // Menambahkan properti kategori
            isDropdownOpen: false,
          }),
        ];

        // Mengatur kategori untuk setiap penumpang baru
        for (let i = passengers.length; i < newPassengers.length; i++) {
          if (i < jumlahDewasa) {
            newPassengers[i].kategori = "Dewasa";
          } else if (i >= jumlahDewasa && i < jumlahDewasa + jumlahAnak) {
            newPassengers[i].kategori = "Anak";
          } else if (i >= jumlahDewasa + jumlahAnak) {
            newPassengers[i].kategori = "Bayi";
          }
        }

        // Memastikan tidak melebihi jumlah maksimum penumpang
        if (newPassengers.length > maxPassengers) {
          newPassengers = newPassengers.slice(0, maxPassengers);
        }

        // Dispatch state hanya jika terdapat perubahan pada penumpang
        if (
          newPassengers.length !== passengers.length ||
          !newPassengers.every((p, index) => p === passengers[index])
        ) {
          dispatch(setPassengers(newPassengers));
        }
      } else {
        // Mengurangi penumpang jika diperlukan
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

  const formattedDepartureDate = departureFlights?.Date
    ? new Intl.DateTimeFormat("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(departureFlights.Date))
    : "Invalid Date";

  console.log("DepartureDate", departureFlights?.Date);
  console.log("formattedDepartureDate", formattedDepartureDate);

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
    if (!departure || !arrival) {
      return null; // Handle case where either departure or arrival is undefined or null
    }

    // Parse the time strings
    const depParts = departure.split(":");
    const arrParts = arrival.split(":");

    if (depParts.length !== 2 || arrParts.length !== 2) {
      return null; // Handle cases where departure or arrival doesn't have correct format
    }

    const [depHours, depMinutes] = depParts.map(Number);
    const [arrHours, arrMinutes] = arrParts.map(Number);

    // Convert times to minutes since the start of the day
    const departureInMinutes = depHours * 60 + depMinutes;
    const arrivalInMinutes = arrHours * 60 + arrMinutes;

    // Calculate the difference in minutes
    let differenceInMinutes = arrivalInMinutes - departureInMinutes;
    if (differenceInMinutes < 0) {
      // If the arrival time is the next day
      differenceInMinutes += 24 * 60;
    }
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

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleDateChange = (date, index) => {
    handleInputChange(index, "tanggalLahir", date);
    const age = calculateAge(date);
    setPassengerAge(age);
  };

  useEffect(() => {
    dispatch(getSearchTicket());
  }, []);

  useEffect(() => {
    if (!departureFlights) {
      navigate("/search");
    }
  }, [departureFlights, navigate]);

  return (
    <form className="max-w-screen-2xl mx-auto  ">
      <NavbarLogoBiru />
      {/* <div className="mt-24">
        <NavbarLogoPutih />
      </div> */}

      <div className="mt-24">
        <CariTiketLain />
      </div>
      <div className="flex pt-40 gap-8  max-md:mx-2 max-md:gap-3  max-lg:pt-40  max-xl:pt-40 max-xl:flex-col max-xl:mx-2 max-md:pt-32 ">
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
                        {departureFlights?.class?.charAt(0)?.toUpperCase() +
                          departureFlights?.class?.slice(1)?.toLowerCase()}
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
                              {departureFlights?.class
                                ?.charAt(0)
                                ?.toUpperCase() +
                                departureFlights?.class
                                  ?.slice(1)
                                  ?.toLowerCase()}
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
                {cekPulangPergi && returnFlights ? (
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
                          {returnFlights?.class?.charAt(0)?.toUpperCase() +
                            returnFlights?.class?.slice(1)?.toLowerCase()}
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
                                {returnFlights?.class
                                  ?.charAt(0)
                                  ?.toUpperCase() +
                                  returnFlights?.class?.slice(1)?.toLowerCase()}
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
            {passengers.map((passenger, index) => {
              if (index < jumlahDewasa) {
                return (
                  <DetailPenumpangDewasa
                    key={index}
                    passenger={passenger}
                    index={index}
                    handleInputChange={handleInputChange}
                    handleDateChange={handleDateChange}
                  />
                );
              } else if (
                index >= jumlahDewasa &&
                index < jumlahDewasa + jumlahAnak
              ) {
                return (
                  <DetailPenumpangAnak
                    key={index}
                    passenger={passenger}
                    index={index}
                    handleInputChange={handleInputChange}
                    handleDateChange={handleDateChange}
                  />
                );
              } else {
                return (
                  <DetailPenumpangBayi
                    key={index}
                    passenger={passenger}
                    index={index}
                    handleInputChange={handleInputChange}
                    handleDateChange={handleDateChange}
                  />
                );
              }
            })}
          </div>
        </div>

        <div>
          {/* Detail Pembayaran Component */}
          <DetailPembayaran />
          {/* Detail Pembayaran Component */}
          <button
            onClick={() => navigate("/payment")}
            className="rounded-xl bg-[#2A91E5] px-5 mt-8 py-2.5 w-full font-medium text-white hover:bg-sky-700 hover:text-gray-200 hover:shadow"
          >
            Lanjut ke Pembayaran
          </button>
        </div>
      </div>
    </form>
  );
}
