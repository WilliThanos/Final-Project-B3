import React from "react";

export default function DetailBooking() {
  return (
    <div className="bg-white  rounded-2xl px-5 py-3 shadow-sm w-1/3 w-full max-md:w-full mt-5">
      <div className="px-4 py-4">
        <p className="">
          Kode Pemesanan : <a className="font-medium text-[#2A91E5]">66669</a>
        </p>
        <div className="flex justify-between gap-2 mt-2">
          <div className="flex flex-col gap-1  ">
            <p className="font-bold">19.00</p>
            <p>5 Maret 2024</p>
          </div>
          <p className="font-semibold text-sm text-[#2A91E5]">Keberangkatan</p>
        </div>
        <p>Bulupitu - Gerbang A</p>
        <div className="border-t-2 border-gray-200 mt-3"></div>
        <div className="flex justify-between gap-2 mt-2">
          <div className="flex flex-col gap-1  ">
            <p className="font-bold">19.00</p>
            <p>5 Maret 2024</p>
          </div>
          <p className="font-semibold text-sm text-[#2A91E5]">Keberangkatan</p>
        </div>
        <p>Bulupitu - Gerbang A</p>
        <div className="border-t-2 border-gray-200 mt-3"></div>
        <div className="mt-3 pl-3">
          <p className="font-semibold">Rincian Harga</p>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <p>2 Dewasa</p>
              <p>Pajak</p>
            </div>
            <div className="flex flex-col gap-1 text-end">
              <p>Rp.5000.000</p>
              <p>Rp.500.000</p>
            </div>
          </div>
        </div>
        <div className="border-t-2 border-gray-200 mt-3"></div>
        <div className="flex justify-between mt-3">
          <p className="font-bold">Total</p>
          <p className="font-bold text-[#2A91E5]">Rp.5000.000</p>
        </div>
      </div>
    </div>
  );
}
