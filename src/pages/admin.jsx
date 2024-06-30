import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import Pesawat from "../assets/pesawat.png";
import { getProfile } from "../redux/action/dataAction";
import PotoProfile from "../assets/profile.png";
import { getAllUser, hapusAkun } from "../redux/action/AdminAction";
import { hapusProfile, setModal } from "../redux/reducers/profileReducer";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { setId, setPesanAdmin } from "../redux/reducers/adminReducer";
import { RiUserSharedLine } from "react-icons/ri";

export default function Admin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [dataFilter, setFilterData] = useState([]);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  const data = useSelector((state) => state?.profile?.profile?.user);
  const cekPP = data?.image_url;
  const dataAkun = useSelector((state) => state?.admin?.akun);

  //fungsi filter
  useEffect(() => {
    if (dataAkun) {
      setFilterData(
        dataAkun.filter((user) =>
          `${user.first_name} ${user.last_name}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, dataAkun]);

  const handleButtonHapus = (id) => {
    dispatch(setPesanAdmin("Apakah anda yakin ingin menghapus akun ini?"));
    dispatch(setId(id));
    dispatch(setModal(true));
  };

  const handleButtonHappusKonfirmasi = () => {
    dispatch(hapusAkun());
    dispatch(setModal(true));
  };

  const modal = useSelector((state) => state?.profile?.Modal);
  const pesan = useSelector((state) => state?.admin?.pesan);

  function close() {
    dispatch(setModal(false));
    dispatch(setPesanAdmin(""));
    dispatch(getAllUser());
  }

  const cekState = useSelector((state) => state);

  return (
    <div className="min-h-screen mx-auto max-w-screen-2xl">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* INFO PROFILE */}
        <div className="bg-white rounded-2xl shadow-sm mt-5">
          <div className="flex justify-between px-5 py-5">
            <div className="flex justify-start items-center gap-3">
              <img
                className="max-md:w-20 w-24 rounded-full"
                src={cekPP === null ? PotoProfile : cekPP}
                alt=""
              />
              <div className="flex flex-col gap-1 cursor-pointer ">
                <p className="text-xl font-medium max-sm:text-base">
                  {data?.email}
                </p>
                <p className="text-xl font-medium max-sm:text-sm">
                  {data?.first_name} {data?.last_name}
                </p>
                <div
                  onClick={() => {
                    navigate("/profile");
                  }}
                  className="flex gap-2 cursor-pointer items-center"
                >
                  <RiUserSharedLine className="text-blue-500" />
                  <p className="text-sm text-blue-500 cursor-pointer">
                    Kembali ke halaman user
                  </p>
                </div>
              </div>
            </div>
            <img className="w-24 max-md:hidden" src={Pesawat} alt="" />
          </div>
        </div>
        {/* KOLOM PENCARIAN */}
        <div className="flex justify-between items-center">
          <p className="text-xl font-semibold max-sm:text-base o">
            Data Pengguna
          </p>
          <form className="flex md:ml-0 mt-2">
            <label htmlFor="search-field" className="sr-only">
              Cari Nama Pengguna
            </label>
            <div className="relative w-full text-gray-400 focus-within:text-gray-600">
              <div className="absolute mx-2 inset-y-0 left-0 flex items-center pointer-events-none">
                <IoIosSearch className="h-5 w-5" aria-hidden="true" />
              </div>
              <input
                id="search-field"
                className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                placeholder="Search"
                type="search"
                name="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
        </div>
        {/* TABEL */}
        <div className="mt-2 flex flex-col max-sm:mx-4">
          <div className="flex-1 flex"></div>
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Nama
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Status Verivikasi
                      </th>

                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Role
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {dataFilter?.map((e) => (
                      <tr key={e?.email}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {e?.first_name} {e?.last_name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {e?.email}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm ">
                          {e?.is_verified === true ? (
                            <p className="text-green-500">Sudah Verivikasi</p>
                          ) : (
                            <p className="text-red-500">Belum Verivikasi</p>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {e?.role}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button
                            href="#"
                            className="text-white hover:bg-red-700 bg-red-500 px-3 py-2 rounded-lg "
                            onClick={() => handleButtonHapus(e?.id)}
                          >
                            Hapus
                            {/* <span className="sr-only">, {e?.name}</span> */}
                          </button>
                        </td>
                      </tr>
                    ))}
                    {dataFilter?.length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                        >
                          Data Akun Tidak Ditemukan
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <>
        <Dialog
          open={modal}
          as="div"
          className="relative z-10 focus:outline-none"
          onClose={close}
          __demoMode
        >
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto backdrop-blur-md bg-black/30">
            <div className="flex min-h-full items-center justify-center p-4">
              <DialogPanel
                transition
                className="flex flex-col justify-center w-full max-w-md rounded-xl bg-white p-3 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
              >
                <button
                  className="inline-flex justify-end gap-2 rounded-md "
                  onClick={close}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <div className="flex flex-col items-center justify-center ">
                  <p className="mt-2 text-center text-base">{pesan} </p>
                  <div className="flex gap-2 mt-4">
                    {pesan ===
                      "Apakah anda yakin ingin menghapus akun ini?" && (
                      <div className="flex gap-2">
                        <button
                          onClick={close}
                          className="text-green-500 hover:border-green-700 border-2 border-green-500 rounded-md px-2 py-1"
                        >
                          Batal
                        </button>
                        <button
                          onClick={() => handleButtonHappusKonfirmasi()}
                          className="text-white hover:bg-red-700 bg-red-500 rounded-md px-2 py-1"
                        >
                          Happus
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </>
    </div>
  );
}
