import React from "react";
import Navbar from "../components/Navbar2";
import InfoBooking from "../components/InfoBooking";
import DetailBooking from "../components/DetailBooking";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function History() {
  const Navigate = useNavigate();
  const handlebuttonPayment = () => {
    Navigate("/payment");
  };
  const status = useSelector((state) => state?.payment?.status);
  return (
    <div className="min-h-screen mx-auto max-w-screen-2xl">
      <div className="mt-2">
        <Navbar />
      </div>
      <div className="mt-24 flex justify-between gap-3 max-xl:flex-col max-sm:flex-col max-sm:px-2">
        <div className="w-2/3 max-sm:w-full max-xl:w-full">
          <label className="font-bold text-2xl max-sm:text-xl">
            Riwayat Pembelian Tiket
          </label>
          <div className=" mt-5 max-sm:mt-2 max-sm:overflow-y-auto max-sm:h-[550px] bg-white px-4 py-4 rounded-2xl">
            <InfoBooking />
          </div>
        </div>
        <div className="w-1/3 max-sm:w-full mb-2 max-xl:w-full">
          <label className="font-bold text-2xl max-sm:text-xl">
            Detail Pemesanan
          </label>
          <div className="bg-white px-4 py-4 rounded-2xl mt-5 max-sm:mt-2">
            <DetailBooking />
          </div>
          {status && status !== "SELESAI" && (
            <button
              onClick={handlebuttonPayment}
              className="rounded-xl bg-[#2A91E5] px-5 mt-4   py-2.5 w-full font-medium text-white hover:bg-sky-700 hover:text-gray-200 "
            >
              Lanjutkan pembayaran
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
