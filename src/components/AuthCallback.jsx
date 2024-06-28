import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setUser, setToken, setMessage } from "../redux/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import weblogo from "../assets/weblogo.png";
import pesawat from "../assets/pesawat.png";

const AuthCallback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cekState = useSelector((state) => state);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const status = params.get("status");
    const message = params.get("message");
    const user = params.get("user");
    const token = params.get("token");

    if (status && token && user) {
      const decodedUser = decodeURIComponent(user);
      const data = JSON.parse(decodedUser);
      const messageLogin = JSON.parse(message);
      // Simpan token dan data pengguna di localStorage atau state management lainnya
      console.log("user:", user);

      console.log("userData", data);
      console.log("token", token);
      console.log("message:", messageLogin);
      dispatch(setToken(token));
      dispatch(setUser(data));
      dispatch(setMessage(messageLogin));

      // Redirect ke halaman utama atau halaman yang ditentukan
      navigate("/");
    } else {
      // Handle error case
      console.error("Login failed:");
    }
  }, [navigate]);
  console.log("cekState :>> ", cekState);

  return (
    <div className="">
      <div className="bg-blue-500 flex items-center justify-center min-h-screen">
        <div className="bg-white p-20 rounded-3xl shadow-2xl text-center transform hover:scale-105 transition-transform duration-500">
          <img
            src={pesawat}
            alt="Success"
            className="mb-6 w-24 h-auto mx-auto"
          />
          <img
            src={weblogo}
            alt="Success"
            className="mb-6 w-72 h-auto mx-auto"
          />
          <div className="relative block rounded-full bg-gray-200 mb-4 ">
            <div className="absolute inset-0 flex items-center justify-center text-[10px]/4">
              <div className="font-bold text-white"> 75% </div>
            </div>

            <div className="block h-4 rounded-full bg-indigo-600 text-center w-3/4">
              {" "}
            </div>
          </div>
          <p className="text-gray-700 mb-4">Login Google anda gagal </p>
          <p className="text-gray-700 mb-8">Silahkan login kembali </p>
          <a
            className="rounded-xl bg-[#2A91E5] px-6 py-3 transition text-base font-medium text-white hover:text-gray-200 hover:bg-sky-700 hover:shadow"
            href="/login"
          >
            Kembali ke Beranda{" "}
          </a>
        </div>
      </div>
    </div>
  );
};

export default AuthCallback;
