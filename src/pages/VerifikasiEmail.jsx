import React, { useEffect, useState } from "react";
import weblogo from "../assets/weblogo.png";
import pesawat from "../assets/pesawat.png";
import { baseApiURL } from "../App.jsx";

const VerifikasiEmail = () => {
  const [verificationStatus, setVerificationStatus] = useState({
    verified: false,
    message: "",
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("token");

    if (tokenFromUrl) {
      const verifyEmail = async () => {
        try {
          console.log(`Mengirim permintaan ke ${baseApiURL}/v1/auth/verifikasi?token=${tokenFromUrl}`);
          const response = await fetch(`${baseApiURL}/v1/auth/verifikasi?token=${tokenFromUrl}`);

          if (!response.ok) {
            throw new Error(`Server merespon dengan status ${response.status}`);
          }

          const data = await response.json();
          console.log("Data respon:", data);

          setVerificationStatus({
            verified: data.status,
            message: data.message,
          });
        } catch (error) {
          console.error("Kesalahan verifikasi email:", error);
          setVerificationStatus({
            verified: false,
            message: "Gagal melakukan verifikasi. Mohon coba lagi nanti.",
          });
        }
      };

      verifyEmail();
    } else {
      setVerificationStatus({
        verified: false,
        message: "Token verifikasi tidak ditemukan.",
      });
    }
  }, []);

  return (
    <div className="bg-blue-500 flex items-center justify-center min-h-screen">
      <div className="bg-white p-20 rounded-3xl shadow-2xl text-center transform hover:scale-105 transition-transform duration-500">
        <img src={pesawat} alt="Success" className="mb-6 w-24 h-auto mx-auto" />
        <img src={weblogo} alt="Success" className="mb-6 w-72 h-auto mx-auto" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Terima Kasih!</h1>
        <p className="text-gray-700 mb-2">{verificationStatus.message}</p>
        {verificationStatus.verified && (
          <p className="text-gray-700 mb-6">
            Silahkan masuk dengan email dan kata sandi Anda.
          </p>
        )}
        {verificationStatus.verified && (
          <a
            className="rounded-xl bg-[#2A91E5] px-6 py-3 transition text-base font-medium text-white hover:text-gray-200 hover:bg-sky-700 hover:shadow"
            href="/login"
          >
            Masuk
          </a>
        )}
      </div>
    </div>
  );
};

export default VerifikasiEmail;
