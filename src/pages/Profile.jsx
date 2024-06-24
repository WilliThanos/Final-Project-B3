import React, { useEffect, useState } from "react";
import Pesawat from "../assets/pesawat.png";
import PotoProfile from "../assets/profile.png";
import InfoBooking from "../components/InfoBooking";
import Navbar from "../components/Navbar2";
import { getProfile, updateProfile } from "../redux/action/dataAction";
import { useDispatch, useSelector } from "react-redux";
import { setUpdateProfile } from "../redux/reducers/profileReducer";

export default function Profile() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const data = useSelector((state) => state.profile.profile.user);

  const handledisabled = () => {
    alert("email tidak bisa dirubah");
  };

  //fungsi handle update data
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const updatedProfile = {
      first_name,
      last_name,
      password,
      confirmPassword,
    };
    dispatch(setUpdateProfile(updatedProfile));
    dispatch(updateProfile());
  };

  const cekPP = data?.image_url;

  return (
    <div className="min-h-screen mx-auto max-w-screen-2xl">
      <div className="mt-2">
        <Navbar />
      </div>
      {/* profil info */}
      <div className="bg-white rounded-2xl shadow-sm mt-24">
        <div className="flex justify-between px-5 py-5">
          <div className="flex justify-start items-center gap-5">
            <img
              className="max-md:w-20 w-28 rounded-full"
              src={cekPP === null ? PotoProfile : cekPP}
              alt=""
            />
            <div className="flex flex-col gap-7 max-md:gap-3">
              <p className="text-xl font-medium">{data?.email}</p>
              <p>
                {data?.first_name} {data?.last_name}
              </p>
            </div>
          </div>
          <img className="w-[120px] max-md:hidden" src={Pesawat} alt="" />
        </div>
      </div>
      <div>
        <div className="flex justify-between max-md:flex-col max-md:items-center gap-5 mt-3 max-md:gap-2">
          <div className="bg-white rounded-2xl w-2/3 px-5 py-3 shadow-sm max-md:w-full">
            <label className="font-bold text-2xl ">
              Transaksi Terakhir {data?.first_name}
            </label>
            {/* card perjalanan */}
            <InfoBooking />
          </div>
          <div className="bg-white rounded-2xl px-5 py-3 shadow-sm w-1/3 max-md:w-full">
            <label className="font-bold text-2xl">Ubah Profil Anda</label>
            {/* form ubah profil */}
            <form
              className="flex flex-col gap-3 mt-5"
              onSubmit={handleUpdateProfile}
            >
              <div className="flex justify-between gap-3">
                <div className="border-2 border-gray-200 rounded-xl px-2 py-1 hover:border-[#2A91E5] text-sm w-1/2">
                  <p className="">Nama</p>
                  <input
                    className="w-full border-none focus:outline-none"
                    type="text"
                    placeholder={data?.first_name}
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="border-2 border-gray-200 rounded-xl px-2 py-1 hover:border-[#2A91E5] text-sm w-1/2">
                  <p className="">Nama Terahir</p>
                  <input
                    className="w-full border-none focus:outline-none"
                    type="text"
                    placeholder={data?.last_name}
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div
                className="border-2 border-gray-200 rounded-xl px-2 py-1 hover:border-red-500 text-sm bg-red-100"
                onClick={() => handledisabled()}
              >
                <p className="">Email</p>
                <input
                  className="w-full bg-red-100"
                  type="text"
                  placeholder="slamet"
                  value={data?.email || ""}
                  disabled
                />
              </div>
              <div className="border-2 border-gray-200 rounded-xl px-2 py-1 hover:border-[#2A91E5] text-sm">
                <p className="">Ubah Password</p>
                <input
                  className="w-full border-none focus:outline-none"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="border-2 border-gray-200 rounded-xl px-2 py-1 hover:border-[#2A91E5] text-sm">
                <p className="">konfirmasi Password</p>
                <input
                  className="w-full border-none focus:outline-none"
                  type="password"
                  placeholder="Password"
                  value={confirmPassword}
                  onChange={(e) => setconfirmPassword(e.target.value)}
                />
              </div>
              <button
                className="bg-[#2A91E5] rounded-3xl py-2 text-white font-semibold focus:bg-[#094D85]"
                type="submit"
              >
                Konfirmasi
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
