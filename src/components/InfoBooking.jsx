import React, { useEffect, useState } from "react";
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
import Kosong from "../assets/empty.png";
import { IoWarning } from "react-icons/io5";
import { setRoundTrip } from "../redux/reducers/dataReducer";
import { setStatus } from "../redux/reducers/paymentReducer";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

export default function InfoBooking() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showWarning, setShowWarning] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [filterClass, setFilterClass] = useState("");
  const [filterMonth, setFilterMonth] = useState("");

  useEffect(() => {
    dispatch(getBookingHistory());
  }, [dispatch]);

  const dataHistory = useSelector((state) => state?.history?.historyPemesanan);
  console.log("dataHistory :>> ", dataHistory);

  const calculateTravelTime = (departure, arrival) => {
    if (!departure || !arrival) {
      return null;
    }

    // Parse the time strings
    const depParts = departure.split(":");
    const arrParts = arrival.split(":");

    if (depParts.length !== 2 || arrParts.length !== 2) {
      return null;
    }

    const [depHours, depMinutes] = depParts.map(Number);
    const [arrHours, arrMinutes] = arrParts.map(Number);

    const departureInMinutes = depHours * 60 + depMinutes;
    const arrivalInMinutes = arrHours * 60 + arrMinutes;

    let differenceInMinutes = arrivalInMinutes - departureInMinutes;
    if (differenceInMinutes < 0) {
      differenceInMinutes += 24 * 60;
    }
    const hours = Math.floor(differenceInMinutes / 60);
    const minutes = differenceInMinutes % 60;

    return `${hours}j ${minutes}m`;
  };

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

  //HANDEL FILTER
  const filteredDataHistory = dataHistory?.filter((e) => {
    const itemMonth = new Date(e?.schedule?.Date).getMonth() + 1;

    return (
      (filterClass
        ? e?.schedule?.class === filterClass ||
          e?.returnSchedule?.class === filterClass
        : true) && (filterMonth ? itemMonth === parseInt(filterMonth) : true)
    );
  });

  return (
    <div>
      {dataHistory === null ? (
        <div className="flex flex-col items-center gap-2">
          <img className="max-w-60" src={Kosong} alt="" />
          <p>hmmm Sepertinya Anda belum memesan Tiket</p>
          <p
            onClick={() => navigate("/search")}
            className="text-blue-500 cursor-pointer"
          >
            Pesan Tiket Sekarang
          </p>
        </div>
      ) : (
        <div>
          <div className=" flex justify-between sticky top-0 bg-white">
            <p>Urutkan berdasarkan</p>
            <div className="flex justify-end gap-4 mb-4 ">
              {/* FILTER KELAS */}
              <select
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
                className="= outline-none "
              >
                <option value="">Semua Kelas</option>
                <option value="EKONOMI">Ekonomi</option>
                <option value="BISNIS">Bisnis</option>
                <option value="EKSEKUTIF">Eksekutif</option>
              </select>

              {/* FILTER BULAN */}
              <select
                value={filterMonth}
                onChange={(e) => setFilterMonth(e?.target?.value)}
                className="= outline-none"
              >
                <option value="">Semua Bulan</option>
                <option value="1">Januari</option>
                <option value="2">Februari</option>
                <option value="3">Maret</option>
                <option value="4">April</option>
                <option value="5">Mei</option>
                <option value="6">Juni</option>
                <option value="7">Juli</option>
                <option value="8">Agustus</option>
                <option value="9">September</option>
                <option value="10">Oktober</option>
                <option value="11">November</option>
                <option value="12">Desember</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-3 ">
            {filteredDataHistory?.map((e) => {
              const hargaTiket =
                (e?.returnSchedule?.price || 0) + (e?.schedule?.price || 0);
              const biayaAdmin = (2 / 100) * hargaTiket;
              const pajak = (10 / 100) * hargaTiket;
              const totalHarga =
                (hargaTiket || 0) + (pajak || 0) + (biayaAdmin || 0);
              console.log("cek ID", e?.id);
              return (
                <div
                  key={e?.id}
                  className="border bg-white border-gray-300 rounded-xl hover:border-blue-500"
                  onClick={() => {
                    if (e?.status === "SELESAI") {
                      setSelectedId(e?.id);
                      setShowWarning(true);
                      dispatch(setSelectedDepartureFlight(e?.schedule));
                      dispatch(setSelectedReturnFlight(e?.returnSchedule));
                      dispatch(setStatus(e?.status));
                      return;
                    }

                    if (e?.returnSchedule !== null) {
                      dispatch(setRoundTrip(true));
                    }
                    dispatch(setSelectedDepartureFlight(e?.schedule));
                    dispatch(setSelectedReturnFlight(e?.returnSchedule));
                    dispatch(setBookedPassengers(e.id));
                    dispatch(setStatus(e?.status));
                    setShowWarning(false);
                    // navigate("/payment");
                  }}
                >
                  <div className=" p-4 rounded-lg">
                    {/* KEPALA KONTEN */}
                    <div className="flex justify-between items-center">
                      {e?.status === "PENDING" ? (
                        <p className="max-sm:text-sm bg-red-500 rounded-xl text-white font-semibold text-center max-w-24 py-1 px-2">
                          {e?.status?.charAt(0).toUpperCase() +
                            e?.status?.slice(1).toLowerCase()}
                        </p>
                      ) : (
                        <p className="bg-green-500 rounded-xl text-white font-semibold text-center max-w-24 py-1 px-2">
                          {e?.status?.charAt(0).toUpperCase() +
                            e?.status?.slice(1).toLowerCase()}
                        </p>
                      )}

                      <div className="font-bold text-xl max-sm:text-base">
                        {formatRupiah(totalHarga)}
                      </div>
                    </div>
                    <p className="border-b-2 border-gray-300 mt-3"></p>
                    <div className="mt-2 flex justify-start items-center gap-2">
                      <GiAirplaneDeparture />
                      <p className="font-semibold">Berangkat</p>
                    </div>
                    <div className=" flex  justify-between items-center cursor-pointer  max-lg:text-sm max-lg:flex-col max-lg:items-start">
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
                        <div className="  flex flex-col max-sm:justify-between  w-1/4">
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
                    {showWarning && selectedId === e.id && (
                      <div className=" flex items-center gap-2 text-green-500 font-normal text-xs mt-2">
                        <IoCheckmarkDoneCircle size={20} />
                        <div>
                          Anda Sudah Membayar Tiket Ini, silahkan cek email anda
                        </div>
                      </div>
                    )}

                    <div>
                      {/* CEK KONDISI PP */}
                      {e?.returnSchedule === null ? (
                        <div></div>
                      ) : (
                        <div>
                          <p className="border-b-2 border-gray-300 mt-3"></p>
                          {/* KEPALA KONTEN */}
                          <div className="mt-2 flex justify-start items-center gap-2">
                            <GiAirplaneArrival />
                            <p className="font-semibold">Pulang</p>
                          </div>
                          <div className="  flex  justify-between items-center cursor-pointer  max-lg:text-sm max-lg:flex-col max-lg:items-start">
                            <div className=" w-full flex justify-between">
                              <div className="flex items-center max-sm:gap-1 gap-3 max-lg:flex-col max-lg:items-start">
                                <img
                                  src={`${e?.returnSchedule?.airline?.icon_url}`}
                                  className="h-7 w-auto  max-sm:h-4"
                                />
                              </div>

                              <div className="flex flex-col text-right gap-1">
                                <div>
                                  {formatTanggal(e?.returnSchedule?.Date)}
                                </div>
                                <div className="font-semibold">
                                  {e?.returnSchedule?.class
                                    ?.charAt(0)
                                    .toUpperCase() +
                                    e?.returnSchedule?.class
                                      ?.slice(1)
                                      .toLowerCase()}
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
                                    {e?.returnSchedule?.departure_airport?.city}{" "}
                                    (
                                    {
                                      e?.returnSchedule?.departure_airport
                                        ?.iata_code
                                    }
                                    )
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
                                    {
                                      e?.returnSchedule?.arrival_airport
                                        ?.iata_code
                                    }
                                    )
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
          </div>
        </div>
      )}
    </div>
  );
}
