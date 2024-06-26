import React, { useState } from "react";
import { GiAirplaneDeparture, GiAirplaneArrival } from "react-icons/gi";
import { SlPlane } from "react-icons/sl";
import { LiaCircleSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
export default function DetailBooking() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
  return (
    <div className="py-3">
      {/* card keberangkatan */}
      <div className="flex flex-row items-center gap-3">
        <GiAirplaneDeparture size={20} />
        <label className="text-xl font-semibold max-sm:text-base">
          Berangkat
        </label>
      </div>
      <div
        key={departureFlights?.id}
        onClick={() => handleDropdownToggle(departureFlights?.id)}
        className="bg-white border border-gray-300 font-medium text-black p-6 rounded-lg mt-2 cursor-pointer hover:border-blue-500"
      >
        {/* KEPALA KONTEN */}
        <div className="flex  justify-between items-center cursor-pointer  max-lg:text-sm max-lg:flex-col max-lg:items-start">
          <div className=" w-full flex justify-between">
            <div className="flex items-center max-sm:gap-1 gap-3 max-lg:flex-col max-lg:items-start">
              <img
                src={`${departureFlights?.airline?.icon_url}`}
                className="h-7 w-auto rounded max-sm:h-4"
              />
            </div>{" "}
            <div className="flex gap-3">
              <div>
                {departureFlights?.class?.charAt(0).toUpperCase() +
                  departureFlights?.class?.slice(1).toLowerCase()}
              </div>
            </div>
          </div>
        </div>

        {/* ISI KONTEN */}
        <div className="flex w-full  justify-between place-items-stretch max-lg:flex-col max-md: max-lg:gap-3">
          <div className="flex justify-between mt-2  w-full">
            <div className="  flex flex-col  w-1/4">
              <div className="flex items-center gap-1">
                <div className="font-bold text-base max-md:text-sm">
                  {departureFlights?.departure_airport?.city} (
                  {departureFlights?.departure_airport?.iata_code})
                </div>
              </div>
              <div className="">{departureFlights?.departure_time}</div>
            </div>
            <div className="flex flex-col justify-center w-2/4">
              <p className="text-center text-gray-400 text-sm">
                {calculateTravelTime(
                  departureFlights?.departure_time,
                  departureFlights?.arrival_time
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
                  {departureFlights?.arrival_airport?.city} (
                  {departureFlights?.arrival_airport?.iata_code})
                </div>
              </div>
              <div>{departureFlights?.arrival_time}</div>
            </div>
          </div>
        </div>
        {/* DROPDOWN DETAILS */}
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
            <div className="flex  justify-between  pl-3 w-full max-lg: gap-10 ">
              <div className="flex flex-col justify-between  ">
                <div className="flex max-sm:justify-between flex-col ">
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
                <div className="flex flex-col gap- text-gray-500 text-sm max-sm:hidden">
                  <div className="">Maskapai : </div>
                  <div className="">Kelas :</div>
                  <div className="">Nomor Penerbangan :</div>
                  <div className="mt-2">Bagasi :</div>
                  <div className="">Bagasi Kabin :</div>
                </div>
                <div className="hidden max-sm:flex flex-col gap- text-gray-500 text-sm max-lg:py-5 ">
                  <div className="">
                    Maskapai : {departureFlights?.airline?.name}
                  </div>
                  <div className="">
                    Kelas :{" "}
                    {departureFlights?.class?.charAt(0).toUpperCase() +
                      departureFlights?.class?.slice(1).toLowerCase()}
                  </div>
                  <div className="">
                    Nomor Penerbangan :{" "}
                    {departureFlights?.departureFlights_number}
                  </div>
                  <div className="mt-2 ">
                    Bagasi : {departureFlights?.free_baggage} kg
                  </div>
                  <div className="">
                    Bagasi Kabin : {departureFlights?.cabin_baggage} kg
                  </div>
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

              <div className="flex flex-col justify-between max-sm:hidden ">
                <div className="flex flex-col">
                  <div className="font-bold text-lg">
                    {departureFlights?.departure_airport?.name_airport}
                  </div>
                </div>

                <div className="flex flex-col gap- text-gray-500 text-sm max-lg:py-5 ">
                  <div className="max-lg:pt-11">
                    {departureFlights?.airline?.name}
                  </div>
                  <div className="">
                    {departureFlights?.class?.charAt(0).toUpperCase() +
                      departureFlights?.class?.slice(1).toLowerCase()}
                  </div>
                  <div className="">
                    {departureFlights?.departureFlights_number}
                  </div>
                  <div className="mt-2 max-lg:pt-4">
                    {departureFlights?.free_baggage} kg
                  </div>
                  <div className="">{departureFlights?.cabin_baggage} kg</div>
                </div>
                <div className="flex flex-col ">
                  <div className="font-bold text-lg">
                    {departureFlights?.arrival_airport?.name_airport}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* END DROPDOWN DETAILS */}
      </div>

      {/* DROPDOWN KEMBALI */}
      <div className="mt-4">
        {cekPulangPergi && returnFlights ? (
          <div>
            <div className="flex flex-row items-center gap-3">
              <GiAirplaneArrival size={20} />
              <label className="text-xl font-semibold max-sm:text-base">
                Berangkat
              </label>
            </div>
            <div
              key={returnFlights?.id}
              onClick={() => handleDropdownToggle(returnFlights?.id)}
              className="bg-white border border-gray-300 font-medium text-black p-6 rounded-lg mt-2 cursor-pointer hover:border-blue-500"
            >
              {/* KEPALA KONTEN */}
              <div className="flex  justify-between items-center cursor-pointer  max-lg:text-sm max-lg:flex-col max-lg:items-start">
                <div className=" w-full flex justify-between">
                  <div className="flex items-center max-sm:gap-1 gap-3 max-lg:flex-col max-lg:items-start">
                    <img
                      src={`${returnFlights?.airline?.icon_url}`}
                      className="h-7 w-auto rounded max-sm:h-4"
                    />
                  </div>{" "}
                  <div className="flex gap-3">
                    <div>
                      {returnFlights?.class?.charAt(0).toUpperCase() +
                        returnFlights?.class?.slice(1).toLowerCase()}
                    </div>
                  </div>
                </div>
              </div>

              {/* ISI KONTEN */}
              <div className="flex w-full  justify-between place-items-stretch max-lg:flex-col max-md: max-lg:gap-3">
                <div className="flex justify-between mt-2  w-full">
                  <div className="flex flex-col max-sm:justify-between  w-1/4">
                    <div className="flex items-center gap-1">
                      <div className="font-bold text-base max-md:text-sm">
                        {returnFlights?.departure_airport?.city} (
                        {returnFlights?.departure_airport?.iata_code})
                      </div>
                    </div>
                    <div className="">{returnFlights?.departure_time}</div>
                  </div>
                  <div className="flex flex-col justify-center w-2/4">
                    <p className="text-center text-gray-400 text-sm">
                      {calculateTravelTime(
                        returnFlights?.departure_time,
                        returnFlights?.arrival_time
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
                  <div className="flex max-sm:justify-between items-end flex-col text-center w-1/4">
                    <div className="flex items-center gap-1">
                      <div className="font-bold text-base text-right max-md:text-sm">
                        {returnFlights?.arrival_airport?.city} (
                        {returnFlights?.arrival_airport?.iata_code})
                      </div>
                    </div>
                    <div>{returnFlights?.arrival_time}</div>
                  </div>
                </div>
              </div>
              {/* DROPDOWN DETAILS */}
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
                  <div className="flex  justify-between  pl-3 w-full max-lg: gap-10 ">
                    <div className="flex flex-col justify-between  ">
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
                          Maskapai : {returnFlights?.airline?.name}
                        </div>
                        <div className="">
                          Kelas :{" "}
                          {returnFlights?.class?.charAt(0).toUpperCase() +
                            returnFlights?.class?.slice(1).toLowerCase()}
                        </div>
                        <div className="">
                          Nomor Penerbangan :{" "}
                          {returnFlights?.returnFlights_number}
                        </div>
                        <div className="mt-2 ">
                          Bagasi : {returnFlights?.free_baggage} kg
                        </div>
                        <div className="">
                          Bagasi Kabin : {returnFlights?.cabin_baggage} kg
                        </div>
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
                          {`${formattedDepartureDate}`}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between max-sm:hidden ">
                      <div className="flex flex-col">
                        <div className="font-bold text-lg">
                          {returnFlights?.departure_airport?.name_airport}
                        </div>
                      </div>

                      <div className="flex flex-col gap- text-gray-500 text-sm max-lg:py-5 ">
                        <div className="max-lg:pt-11">
                          {returnFlights?.airline?.name}
                        </div>
                        <div className="">
                          {returnFlights?.class?.charAt(0).toUpperCase() +
                            returnFlights?.class?.slice(1).toLowerCase()}
                        </div>
                        <div className="">
                          {returnFlights?.returnFlights_number}
                        </div>
                        <div className="mt-2 max-lg:pt-4">
                          {returnFlights?.free_baggage} kg
                        </div>
                        <div className="">
                          {returnFlights?.cabin_baggage} kg
                        </div>
                      </div>
                      <div className="flex flex-col ">
                        <div className="font-bold text-lg">
                          {returnFlights?.arrival_airport?.name_airport}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* END DROPDOWN DETAILS */}
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
