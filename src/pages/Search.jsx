import { useState } from "react";
import NavbarLogoBiru from "../components/Navbar2";
import CariTiketLain from "../components/CariTiketLain";
import Filter from "../components/Filter";
import { useSelector } from "react-redux";

export default function Search() {
  const departureDate = useSelector((state) => state.data.departureDate);

  const formattedDate = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(departureDate));

  return (
    <div className="min-h-screen w-full ">
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
            <div className="bg-[#2A91E5] font-medium text-white p-1 rounded-lg px-72 mt-2">
              Jakarta (CGK) - Medan (KLM) pada {`${formattedDate}`}
            </div>
            <div className="bg-white border border-gray-300 font-medium text-black p-1 rounded-lg px-72 mt-2">
              <div>AirAsia - Economy </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
