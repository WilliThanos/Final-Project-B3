import React, { useEffect, useState } from "react";
import Pesawat from "../assets/pesawat.png";
import PotoProfile from "../assets/profile.png";
import InfoBooking from "../components/InfoBooking";
import Navbar from "../components/Navbar2";
import { getProfile, updateProfile } from "../redux/action/dataAction";
import { useDispatch, useSelector } from "react-redux";
import { setModal, setUpdateProfile } from "../redux/reducers/profileReducer";
import MyModal from "../components/NotifUpdateProfile";
import { useNavigate } from "react-router-dom";
import {
  setSelectedDepartureFlight,
  setSelectedReturnFlight,
} from "../redux/reducers/ticketReducer";
import { setStatus } from "../redux/reducers/paymentReducer";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { getAllUser } from "../redux/action/AdminAction";
import { RiUserSharedLine } from "react-icons/ri";

export default function Profile() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [showWarning, setShowWarning] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const data = useSelector((state) => state?.profile?.profile?.user);

  //fungsi handle update data
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (first_name.trim() === "" || last_name.trim() === "") {
      dispatch(
        setUpdateProfile("Tolong inputkan nama depan dan belakang anda")
      );
      dispatch(setModal(true));
      return;
    }
    const updatedProfile = {
      first_name,
      last_name,
      password,
      confirmPassword,
    };
    dispatch(setUpdateProfile(updatedProfile));
    dispatch(updateProfile());

    dispatch(setModal(true));
  };

  const cekPP = data?.image_url;
  const modal = useSelector((state) => state?.profile?.Modal);

  const lihatPassword = (setType, type) => {
    setType(type === "password" ? "text" : "password");
  };

  const handleButtonAdmin = () => {
    if (data?.role === "admin") {
      navigate("/admin");
    }
    setShowWarning(true);
    setTimeout(() => {
      setShowWarning(false);
    }, 10000);
  };

  return (
    <div className="min-h-screen mx-auto max-w-screen-2xl">
      <div className="mt-2">
        <Navbar />
      </div>
      <div className="max-sm:px-2">
        {/* profil info */}
        <div className="bg-white rounded-2xl shadow-sm mt-24">
          <div className="flex justify-between px-5 py-5">
            <div className="flex justify-start items-center gap-5">
              <img
                className="max-md:w-20 w-28 rounded-full"
                src={cekPP === null ? PotoProfile : cekPP}
                alt=""
              />
              <div className="flex flex-col gap-2 max-md:gap-3">
                <p className="text-xl font-medium max-sm:text-base">
                  {data?.email}
                </p>
                <p className="text-xl font-medium max-sm:text-sm">
                  {data?.first_name} {data?.last_name}
                </p>
                <div className="flex gap-1">
                  <div
                    className="flex gap-1 items-center cursor-pointer"
                    onClick={handleButtonAdmin}
                  >
                    <RiUserSharedLine className="text-blue-500" />
                    <p className="text-sm text-blue-500 cursor-pointer">
                      Dasboard Admin
                    </p>
                  </div>
                  {showWarning && (
                    <div>
                      <p className="text-red-500 text-sm font-semibold">
                        Maaf, anda bukan admin
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <img className="w-[120px] max-md:hidden" src={Pesawat} alt="" />
          </div>
        </div>

        <div>
          <div className="flex justify-between max-xl:flex-col max-md:flex-col max-md:items-center gap-5 mt-3 max-md:gap-2">
            <div className="bg-white rounded-2xl max-xl:w-full w-2/3 px-5 py-3 shadow-sm max-md:w-full">
              <div className="flex justify-between items-center">
                <label className="font-bold text-2xl max-sm:text-xl">
                  Transaksi Terakhir {data?.first_name}
                </label>
                <p
                  className="text-blue-500 cursor-pointer"
                  onClick={() => {
                    dispatch(setSelectedDepartureFlight(null));
                    dispatch(setSelectedReturnFlight(null));
                    dispatch(setStatus(null));
                    navigate("/history");
                  }}
                >
                  Lihat Detail Tiket
                </p>
              </div>
              {/* card perjalanan */}
              <div className="mt-5 overflow-y-auto h-[550px] max-sm:h-[400px]">
                <InfoBooking />
              </div>
            </div>

            {/* INPUT UBAH PROFIL */}
            <div className="bg-white max-h-96 max-xl:w-full rounded-2xl px-5 py-3 shadow-sm w-1/3 max-md:w-full">
              <label className=" font-bold text-2xl max-sm:text-xl">
                Ubah Profil Anda
              </label>
              {/* form ubah profil */}
              <form
                className="flex flex-col gap-3 mt-5"
                onSubmit={handleUpdateProfile}
              >
                <div className="flex justify-between gap-3">
                  <div className="relative w-1/2 ">
                    <input
                      type="text"
                      id="floating_first_name"
                      className="block px-2.5 pb-2.5 pt-4 w-full text-base text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none   dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      value={first_name}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <label
                      htmlFor="floating_first_name"
                      className="mx-2 absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      Nama
                    </label>
                  </div>
                  <div className="relative w-1/2">
                    <input
                      type="text"
                      id="floating_last_name"
                      className="block px-2.5 pb-2.5 pt-4 w-full text-base text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none   dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      value={last_name}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <label
                      htmlFor="floating_last_name"
                      className=" mx-2 bg-white absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      Nama Terahir
                    </label>
                  </div>
                </div>

                <div className="border-2 border-gray-200 rounded-xl px-2 py-1 hover:border-red-500 text-sm bg-red-50">
                  <p className="">Email</p>
                  <input
                    className="w-full bg-red-50 text-black/50"
                    type="text"
                    placeholder="slamet"
                    value={data?.email || ""}
                    disabled
                  />
                </div>
                <div className="relative">
                  <input
                    type={passwordType}
                    id="floating_password"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-base text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label
                    htmlFor="floating_password"
                    className="mx-2 absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                  >
                    password
                  </label>
                  <span
                    onClick={() => lihatPassword(setPasswordType, passwordType)}
                    className="absolute end-2.5 bottom-3.5 cursor-pointer"
                  >
                    {passwordType === "password" ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
                <div className="relative">
                  <input
                    type={confirmPasswordType}
                    id="floating_confirmPassword"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-base text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={confirmPassword}
                    onChange={(e) => setconfirmPassword(e.target.value)}
                  />
                  <label
                    htmlFor="floating_confirmPassword"
                    className="mx-2 absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                  >
                    konfirmasi Password
                  </label>
                  <span
                    onClick={() =>
                      lihatPassword(setConfirmPasswordType, confirmPasswordType)
                    }
                    className="absolute end-2.5 bottom-3.5 cursor-pointer"
                  >
                    {confirmPasswordType === "password" ? (
                      <FaEye />
                    ) : (
                      <FaEyeSlash />
                    )}
                  </span>
                </div>

                <button
                  className="bg-[#2A91E5] rounded-xl w-48 self-center max-xl:w-full py-2 text-white font-semibold focus:bg-[#094D85]"
                  type="submit"
                >
                  Konfirmasi
                </button>
              </form>
              <MyModal />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
