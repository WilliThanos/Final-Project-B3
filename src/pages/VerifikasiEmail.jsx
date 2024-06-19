import React from "react";
import weblogo from "..//assets/weblogo.png";
import pesawat from "..//assets/pesawat.png";

export default function VerifikasiEmail() {
  return (
    <div className="bg-blue-500 flex items-center justify-center min-h-screen ">
      <div className="bg-white p-20 rounded-3xl shadow-2xl   text-center transform hover:scale-105 transition-transform duration-500">
        <img src={pesawat} alt="Success" className="mb-6 w-24 h-auto mx-auto" />
        <img src={weblogo} alt="Success" className="mb-6 w-72 h-auto mx-auto" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Terima Kasih!</h1>
        <p className="text-gray-700 mb-2">
          Email Anda telah berhasil diverifikasi.
        </p>
        <p className="text-gray-700 mb-6">
          Silahkan masuk dengan email dan kata sandi Anda.
        </p>
        <a
          className="rounded-xl bg-[#2A91E5] px-6 py-3 transition text-base font-medium text-white hover:text-gray-200 hover:bg-sky-700 hover:shadow"
          href="/login"
        >
          Masuk
        </a>
      </div>
    </div>
  );
}
