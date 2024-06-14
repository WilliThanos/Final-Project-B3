import React from "react";
import { GiAirplaneDeparture, GiAirplaneArrival } from "react-icons/gi";
import { HiArrowSmRight } from "react-icons/hi";

export default function InfoBooking() {
  return (
    <div className=" ">
      {/* card perjalanan */}
      <div className="bg-white rounded-xl border-gray-1000 border-2 px-5 py-14 mt-5 hover:border-[#2A91E5] ">
        <div className="flex justify-between ">
          <div className="flex gap-3">
            <div className="w-5 h-5 ">
              <GiAirplaneDeparture />
            </div>
            <div className="flex flex-col gap-1 text-sm ">
              <p className="font-bold">Jakarta</p>
              <p>5 Maret 2024</p>
              <p>19.00</p>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-2  w-2/4">
            <p className="text-center">4h 0m</p>
            <div className="flex items-center ">
              <div className="border-t-2 min-w-full border-gray-700"></div>
              <div>
                <HiArrowSmRight />
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-5 h-5 ">
              <GiAirplaneArrival />
            </div>
            <div className="flex flex-col gap-1 text-sm ">
              <p className="font-bold">Jakarta</p>
              <p>5 Maret 2024</p>
              <p>19.00</p>
            </div>
          </div>
        </div>
        <div className="border-t-2 border-gray-300 mt-3"></div>
        <div className="flex justify-between items-center mt-2">
          <div className="flex flex-col gap-1 text-sm ">
            <p className="font-bold">Kode Pemesanan :</p>
            <p>uhuuy76</p>
          </div>
          <div className="flex flex-col gap-1 text-sm ">
            <p className="font-bold">Kelas :</p>
            <p>Ekonomi</p>
          </div>
          <p className="font-bold text-sm text-[#2A91E5]">Rp 9.500.000</p>
        </div>
      </div>
    </div>
  );
}
