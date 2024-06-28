import React from "react";
import Navbar from "../components/Navbar2";
import InfoBooking from "../components/InfoBooking";
import DetailBooking from "../components/DetailBooking";

export default function History() {
  return (
    <div className="min-h-screen mx-auto max-w-screen-2xl">
      <div className="mt-2">
        <Navbar />
      </div>
      <div className="mt-24 flex justify-between gap-3">
        <div className="w-2/3">
          <label className="font-bold text-2xl ">Riwayat Pembelian Tiket</label>
          <div className="mt-5">
            <InfoBooking />
          </div>
        </div>
        <div className="w-1/3">
          <label className="font-bold text-2xl ">Detail Pemesanan</label>
          <DetailBooking />
          <button className="bg-[#2A91E5] text-white font-semibold mt-5 focus:bg-[#094D85] rounded-2xl text-base  py-3 w-full">
            Cetak Tiket
          </button>
        </div>
      </div>
    </div>
  );
}
