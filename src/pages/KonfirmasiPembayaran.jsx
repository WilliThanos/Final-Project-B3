import React, { useEffect, useState } from "react";
import weblogo from "../assets/weblogo.png";
import pesawat from "../assets/pesawat.png";
import { baseApiURL } from "../App.jsx";

const KonfirmasiPembayaran = () => {
  return (
    <div className="bg-blue-500 flex items-center justify-center min-h-screen">
      <div className="bg-white p-20 rounded-3xl shadow-2xl text-center transform hover:scale-105 transition-transform duration-500">
        <img src={pesawat} alt="Success" className="mb-6 w-24 h-auto mx-auto" />
        <img src={weblogo} alt="Success" className="mb-6 w-72 h-auto mx-auto" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Terima Kasih!</h1>
        <p className="text-gray-700 mb-4">
          Pembayaran Anda sudah diterima oleh sistem.
        </p>
        <p className="text-gray-700 mb-8">
          Detail pemesanan tiket telah dikirimkan ke email Anda.
        </p>
        <a
          className="rounded-xl bg-[#2A91E5] px-6 py-3 transition text-base font-medium text-white hover:text-gray-200 hover:bg-sky-700 hover:shadow"
          href="/"
        >
          Kembali ke Beranda{" "}
        </a>
      </div>
    </div>
  );
};

export default KonfirmasiPembayaran;
