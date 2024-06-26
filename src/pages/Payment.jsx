import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NavbarLogoBiru from "../components/Navbar2";
import NavbarLogoPutih from "../components/Navbar";
import CariTiketLain from "../components/CariTiketLain";
import { FaAngleDown } from "react-icons/fa";
import DetailPembayaran from "../components/DetailPembayaran";
import { CgInfo } from "react-icons/cg";
import AirAsiaLogo from "../assets/AirAsia.png";
import { FiCreditCard } from "react-icons/fi";
import { SlCalender } from "react-icons/sl";
import { id } from "date-fns/locale";
import { useDispatch, useSelector } from "react-redux";
import { getMethodPayment } from "../redux/action/bookingAction";
import DetailBooking from "../components/DetailBooking";
import { GiAirplaneDeparture, GiAirplaneArrival } from "react-icons/gi";
import { SlPlane } from "react-icons/sl";
import { LiaCircleSolid } from "react-icons/lia";
import { setMetode } from "../redux/reducers/paymentReducer";
import { payment } from "../redux/action/paymentAction";

export default function Payment() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMethodPayment());
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(payment());
  // }, [dispatch]);

  const departureDateRef = useRef(null);

  const handleDropdownToggle = (flightId) => {
    setIsDropdownOpen((prevState) => ({
      ...prevState,
      [flightId]: !prevState[flightId], // Toggle the dropdown state for the specific flightId
    }));
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
  const dataMethod = useSelector((state) => state?.payment?.Method);

  const handleMethod = (e) => {
    const selectedCode = e.target.value;
    dispatch(setMetode(selectedCode));
  };

  const dataCek = useSelector((state) => state?.payment?.Metode);
  const handleButtonPayment = (e) => {
    e.preventDefault();
    if (!dataCek) {
      alert("Sepertinya anda belum memilih metode pembayaran");
      return;
    }
    dispatch(payment());
  };

  return (
    <form className="max-w-screen-2xl mx-auto  ">
      <NavbarLogoBiru />
      {/* <div className="mt-24">
        <NavbarLogoPutih />
      </div> */}

      {/* <div className="mt-24">
        <CariTiketLain />
      </div> */}
      <div className="flex pt-24 gap-10   max-md:mx-2 max-md:gap-3   max-xl:flex-col max-xl:mx-2 ">
        {/* METODE PEMBAYARAN */}
        <div className="flex flex-col w-1/3 max-md:w-full">
          <div className="pb-4 font-bold text-2xl max-lg:text-xl max-sm:text-lg">
            Metode Pembayaran
          </div>
          <div className=" mx-auto bg-white rounded-xl shadow-sm px-6 max-sm:px-4 w-full">
            <div className=" my-5 max-lg:w-full ">
              <div className="font text-base text-gray-600 max-md:text-sm">
                Silahkan pilih metode pembayaran{" "}
              </div>
              <select
                onChange={handleMethod}
                className="font-semibold mt-4 w-full border-b-2  p-2 hover:border-blue-400 focus:outline-none"
              >
                {dataMethod?.map((e) => (
                  <option className="" key={e?.code} value={e?.code}>
                    {e?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="w-2/3 max-md:w-full">
          <label className="font-bold text-2xl max-lg:text-xl max-sm:text-lg">
            Detail Pemesanan
          </label>
          <div className=" mt-4 mx-auto w-full bg-white rounded-xl shadow-sm px-6 max-sm:px-4 ">
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
                            {departureFlights?.departure_airport?.name_airport}
                          </div>
                        </div>

                        <div className="flex flex-col gap- text-gray-500 text-sm">
                          <div className="">
                            {departureFlights?.airline?.name}
                          </div>
                          <div className="">
                            {departureFlights?.class?.charAt(0)?.toUpperCase() +
                              departureFlights?.class?.slice(1)?.toLowerCase()}
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
                              {returnFlights?.class?.charAt(0)?.toUpperCase() +
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
          <button
            onClick={() => {
              dispatch(payment());
            }}
            className="mb-10 rounded-xl bg-[#2A91E5] px-5 mt-8 py-2.5 w-full font-medium text-white hover:bg-sky-700 hover:text-gray-200 hover:shadow"
          >
            Lanjut ke Pembayaran
          </button>
        </div>
      </div>
    </form>
  );
}
