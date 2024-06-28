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
      <div className="mt-24 flex justify-between gap-3 max-sm:flex-col">
        <div className="w-2/3 max-sm:w-full">
          <label className="font-bold text-2xl max-sm:text-xl">
            Riwayat Pembelian Tiket
          </label>
          <div className="mt-5 max-sm:mt-2 bg-white px-4 py-4 rounded-2xl">
            <InfoBooking />
          </div>
        </div>
        <div className="w-1/3 max-sm:w-full">
          <label className="font-bold text-2xl max-sm:text-xl">
            Detail Pemesanan
          </label>
          <div className="bg-white px-4 py-4 rounded-2xl mt-5 max-sm:mt-2">
            <DetailBooking />
          </div>
        </div>
      </div>
    </div>
  );
}
