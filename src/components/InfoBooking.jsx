import React, { useEffect } from "react";
import { GiAirplaneDeparture, GiAirplaneArrival } from "react-icons/gi";
import { HiArrowSmRight } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { getBookingHistory } from "../redux/action/bookingAction";
import { SlPlane } from "react-icons/sl";
import { setBookedPassengers } from "../redux/reducers/passengersReducer";
import {
  setSelectedDepartureFlight,
  setSelectedReturnFlight,
  setSelectedDepartureFlightId,
  setSelectedReturnFlightId,
} from "../redux/reducers/ticketReducer";
import { useNavigate } from "react-router-dom";

export default function InfoBooking() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getBookingHistory());
  }, [dispatch]);

  const dataHistory = useSelector((state) => state?.history?.historyPemesanan);
  console.log("dataHistory :>> ", dataHistory);

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

  const status = useSelector(
    (state) => state?.history?.historyPemesanan?.status
  );

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };
  const formatTanggal = (tanggal) => {
    const date = new Date(tanggal);
    const days = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    const dayName = days[date.getDay()];
    const day = String(date.getDate()).padStart(2, "0");
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${dayName}, ${day} ${month} ${year}`;
  };

  const handleButtonPayment = (id, schedule, returnSchedule) => {
    dispatch(setSelectedDepartureFlight(schedule));
    dispatch(setSelectedReturnFlight(returnSchedule));
    dispatch(setBookedPassengers(id));
  };

  return (
    <div className="flex flex-col gap-2 ">
      {dataHistory?.map((e) => {
        // HARGA
        const hargaTiket =
          (e?.returnSchedule?.price || 0) + (e?.schedule?.price || 0);
        const biayaAdmin = (2 / 100) * hargaTiket;
        const pajak = (10 / 100) * hargaTiket;
        const totalHarga = (hargaTiket || 0) + (pajak || 0) + (biayaAdmin || 0);
        console.log("cek ID", e?.id);
        return (
          <div
            key={e?.id}
            className="border bg-white border-gray-300 rounded-xl hover:border-blue-500"
            onClick={() => {
              dispatch(setSelectedDepartureFlight(e.schedule));
              dispatch(setSelectedReturnFlight(e.returnSchedule));
              dispatch(setBookedPassengers(e.id));
              navigate("/payment");
            }}
          >
            <div className=" p-4 rounded-lg">
              {/* KEPALA KONTEN */}
              <div className="flex justify-between items-center">
                {e?.status === "PENDING" ? (
                  <p className="bg-red-500 rounded-xl text-white font-semibold text-center max-w-24 py-1 px-2">
                    {e?.status?.charAt(0).toUpperCase() +
                      e?.status?.slice(1).toLowerCase()}
                  </p>
                ) : (
                  <p className="bg-green-500 rounded-xl text-white font-semibold text-center max-w-24 py-1 px-2">
                    {e?.status?.charAt(0).toUpperCase() +
                      e?.status?.slice(1).toLowerCase()}
                  </p>
                )}

                <div className="font-bold text-xl ">
                  {formatRupiah(totalHarga)}
                </div>
              </div>
              <p className="border-b-2 border-gray-300 mt-3"></p>
              <div className="mt-3 flex  justify-between items-center cursor-pointer  max-lg:text-sm max-lg:flex-col max-lg:items-start">
                <div className=" w-full flex justify-between">
                  <div className="flex items-center max-sm:gap-1 gap-3 max-lg:flex-col max-lg:items-start">
                    <img
                      src={`${e?.schedule?.airline?.icon_url}`}
                      className="max-h-7 max-w-28  max-sm:h-4"
                    />
                  </div>

                  <div className="flex flex-col text-right gap-1">
                    <div>{formatTanggal(e?.schedule?.Date)}</div>
                    <div className="font-semibold">
                      {e?.schedule?.class?.charAt(0).toUpperCase() +
                        e?.schedule?.class?.slice(1).toLowerCase()}
                    </div>
                  </div>
                </div>
              </div>

              {/* ISI KONTEN */}
              <div className="flex w-full  justify-between place-items-stretch max-lg:flex-col max-md: max-lg:gap-3">
                <div className="flex justify-between mt-4  w-full">
                  <div className="  flex flex-col  w-1/4">
                    <div className="flex items-center gap-1">
                      <div className="font-bold text-base max-md:text-sm">
                        {e?.schedule?.departure_airport?.city} (
                        {e?.schedule?.departure_airport?.iata_code})
                      </div>
                    </div>
                    <div className="">{e?.schedule?.departure_time}</div>
                  </div>
                  <div className="flex flex-col justify-center w-2/4">
                    <p className="text-center text-gray-400 text-sm">
                      {calculateTravelTime(
                        e?.schedule?.departure_time,
                        e?.schedule?.arrival_time
                      )}
                    </p>
                    <div className="flex justify-center items-center mx-3">
                      <div className="border-dashed	border-b-2 border-gray-400 w-[60px] mx-2 max-lg:w-[30px] max-sm:w-[20px]"></div>
                      <div className="">
                        <SlPlane
                          className="tilted-icon max-lg:size-[18px] max-sm:size-[20px]"
                          size={22}
                        />
                      </div>
                      <div className="border-dashed	border-b-2 border-gray-400 w-[60px] mx-2 max-lg:w-[30px] max-sm:w-[20px]"></div>
                    </div>
                  </div>
                  <div className="flex max-sm:justify-between flex-col items-end  w-1/4">
                    <div className="flex items-center gap-1">
                      <div className="font-bold text-base text-right  max-md:text-sm">
                        {e?.schedule?.arrival_airport?.city} (
                        {e?.schedule?.arrival_airport?.iata_code})
                      </div>
                    </div>
                    <div>{e?.schedule?.arrival_time}</div>
                  </div>
                </div>
              </div>
              <div>
                {/* CEK KONDISI PP */}
                {e?.returnSchedule === null ? (
                  <div></div>
                ) : (
                  <div>
                    <p className="border-b-2 border-gray-300 mt-3"></p>
                    {/* KEPALA KONTEN */}
                    <div className="mt-3 flex  justify-between items-center cursor-pointer  max-lg:text-sm max-lg:flex-col max-lg:items-start">
                      <div className=" w-full flex justify-between">
                        <div className="flex items-center max-sm:gap-1 gap-3 max-lg:flex-col max-lg:items-start">
                          <img
                            src={`${e?.returnSchedule?.airline?.icon_url}`}
                            className="h-7 w-auto  max-sm:h-4"
                          />
                        </div>

                        <div className="flex flex-col text-right gap-1">
                          <div>{formatTanggal(e?.schedule?.Date)}</div>
                          <div className="font-semibold">
                            {e?.returnSchedule?.class?.charAt(0).toUpperCase() +
                              e?.returnSchedule?.class?.slice(1).toLowerCase()}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* ISI KONTEN */}
                    <div className="flex w-full  justify-between place-items-stretch max-lg:flex-col max-md: max-lg:gap-3">
                      <div className="flex justify-between mt-4  w-full">
                        <div className="  flex flex-col  w-1/4">
                          <div className="flex items-center gap-1">
                            <div className="font-bold text-base max-md:text-sm">
                              {e?.returnSchedule?.departure_airport?.city} (
                              {e?.returnSchedule?.departure_airport?.iata_code})
                            </div>
                          </div>
                          <div className="">
                            {e?.returnSchedule?.departure_time}
                          </div>
                        </div>
                        <div className="flex flex-col justify-center w-2/4">
                          <p className="text-center text-gray-400 text-sm">
                            {calculateTravelTime(
                              e?.returnSchedule?.departure_time,
                              e?.returnSchedule?.arrival_time
                            )}
                          </p>
                          <div className="flex justify-center items-center mx-3">
                            <div className="border-dashed	border-b-2 border-gray-400 w-[60px] mx-2 max-lg:w-[30px] max-sm:w-[20px]"></div>
                            <div className="">
                              <SlPlane
                                className="tilted-icon max-lg:size-[18px] max-sm:size-[20px]"
                                size={22}
                              />
                            </div>
                            <div className="border-dashed	border-b-2 border-gray-400 w-[60px] mx-2 max-lg:w-[30px] max-sm:w-[20px]"></div>
                          </div>
                        </div>
                        <div className="flex max-sm:justify-between flex-col items-end  w-1/4">
                          <div className="flex items-center gap-1">
                            <div className="font-bold text-base text-right  max-md:text-sm">
                              {e?.returnSchedule?.arrival_airport?.city} (
                              {e?.returnSchedule?.arrival_airport?.iata_code})
                            </div>
                          </div>
                          <div>{e?.returnSchedule?.arrival_time}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
      {/* card perjalanan */}
    </div>
  );
}
