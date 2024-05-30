import { useState } from "react";
import NavbarLogoBiru from "../components/Navbar2";
import CariTiketLain from "../components/CariTiketLain";
import Filter from "../components/Filter";
import { useSelector } from "react-redux";
import { GiAirplaneDeparture, GiAirplaneArrival } from "react-icons/gi";
import { HiArrowSmRight } from "react-icons/hi";

export default function Search() {
  const departureDate = useSelector((state) => state.data.departureDate);

  const formattedDate = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(departureDate));

  return (
    <div className="max-w-screen-2xl mx-auto ">
      <NavbarLogoBiru />
      <div className="mt-24">
        <CariTiketLain />
      </div>
      <div className="flex mt-8 gap-5">
        <div className="  ">
          <Filter />
        </div>
        <div className=" bg-gray-300 rounded-xl shadow-lg p-6 px-10 ">
          <div className="bg-[#D9EDFF] font-medium text-[#2A91E5] p-1 rounded-lg px-72 text-center">
            Tiket Keberangkatan
          </div>
          <div className="bg-[#2A91E5] font-medium text-white p-1 rounded-lg px-72 mt-2 text-center">
            Jakarta (CGK) - Medan (KLM) pada {`${formattedDate}`}
          </div>
          <div className="bg-white border border-gray-300 font-medium text-black p-6 rounded-lg  mt-2">
            <div className="flex justify-between ">
              <div className="">AirAsia - Economy </div>
              <div className="text-orange-500">2 kursi tersisa </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex  pt-6 w-3/4">
                <div className="flex flex-col text-center">
                  <div className="flex items-center gap-1 ">
                    <div className="">
                      <GiAirplaneDeparture />
                    </div>
                    <div className="font-bold text-base">Jakarta (CGK)</div>
                  </div>
                  <div className="">19.00</div>
                </div>
                <div className="flex flex-col justify-center w-2/4">
                  <p className="text-center text-gray-400 text-sm">4h 0m</p>
                  <div className="flex items-center">
                    <div className="border-t-2 w-full border-gray-400 mx-4 "></div>
                  </div>
                </div>

                <div className="flex flex-col text-center">
                  <div className="flex items-center gap-1 ">
                    <div className="">
                      <GiAirplaneArrival />
                    </div>
                    <div className="font-bold text-base">Medan (KLM)</div>
                  </div>
                  <div className="">23.00</div>
                </div>
              </div>
              <div className="font-bold text-xl text-[#2A91E5]">
                Rp 2.300.000
              </div>
            </div>
          </div>
          <div className="bg-[#2A91E5] font-medium text-white p-1 rounded-lg px-72 text-center">
            Pilih Tiket
          </div>
        </div>
      </div>
    </div>
  );
}
