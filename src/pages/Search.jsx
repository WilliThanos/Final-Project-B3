import { useState } from "react";
import NavbarLogoBiru from "../components/Navbar2";
import NavbarLogoPutih from "../components/Navbar";
import CariTiketLain from "../components/CariTiketLain";
import Filter from "../components/Filter";
import { useSelector } from "react-redux";
import { GiAirplaneDeparture, GiAirplaneArrival } from "react-icons/gi";
import { HiArrowSmRight } from "react-icons/hi";
import { LiaCircleSolid } from "react-icons/lia";

export default function Search() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const departureDate = useSelector((state) => state.data.departureDate);

  const formattedDate = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(departureDate));

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="max-w-screen-2xl mx-auto ">
      <NavbarLogoBiru />

      <div className="mt-24">
        <CariTiketLain />
      </div>
      <div className="flex pt-32 justify-between">
        <div className="  ">
          <Filter />
        </div>
        <div className=" bg-white rounded-xl shadow-sm p-6 px-10 ">
          <div className="bg-[#D9EDFF] font-medium text-[#2A91E5] p-1 rounded-lg px-72 text-center border ">
            Tiket Keberangkatan
          </div>
          <div className="bg-[#2A91E5] font-medium text-white p-1 rounded-lg px-64 mt-2 text-center">
            Jakarta (CGK) - Medan (KNO) pada {`${formattedDate}`}
          </div>
          <div>
            <div
              onClick={handleDropdownToggle}
              className="bg-white border-x border-t border-gray-300 font-medium text-black p-6 rounded-t-lg mt-2 cursor-pointer"
            >
              <div className="flex justify-between items-center cursor-pointer">
                <div>AirAsia - Ekonomi</div>
                <div className="text-orange-500">2 kursi tersisa</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex pt-6 w-3/4">
                  <div className="flex flex-col text-center">
                    <div className="flex items-center gap-1">
                      <div className="font-bold text-base">Jakarta (CGK)</div>
                    </div>
                    <div>19.00</div>
                  </div>
                  <div className="flex flex-col justify-center w-2/4">
                    <p className="text-center text-gray-400 text-sm">4h 0m</p>
                    <div className="flex items-center mx-3">
                      <div className="mb-3">
                        <GiAirplaneDeparture />
                      </div>
                      <div className="border-t-2 w-full border-gray-400 mx-2 "></div>
                      <div className="mb-3">
                        <GiAirplaneArrival />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col text-center">
                    <div className="flex items-center gap-1">
                      <div className="font-bold text-base">Medan (KNO)</div>
                    </div>
                    <div>23.00</div>
                  </div>
                </div>
                <div className="font-bold text-xl text-[#2A91E5]">
                  Rp 2.300.000
                </div>
              </div>
              {/* DROPDOWN DETAILS */}
              <div
                className={` dropdown-content ${isDropdownOpen ? "open" : ""}`}
              >
                <div className="flex n items-center cursor-pointer border-t border-gray-400  mt-4 ">
                  <div className="font-bold mt-4 ">Detail Tiket</div>
                </div>
                <div className="flex justify-between items-center ">
                  <div className="flex pt-6 w-3/4">
                    <div className="flex  gap-3 ">
                      <div className="flex flex-col justify-center ">
                        <div className="text-center text-gray-500 text-sm ">
                          4j 0m
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <LiaCircleSolid size={20} />
                        <div className="border-r  border-gray-500 h-64 "></div>
                        <LiaCircleSolid size={20} />
                      </div>
                    </div>
                    <div className="flex flex-col justify-between  pr-32 pl-3 ">
                      <div className="flex flex-col ">
                        <div className="flex items-center gap-2">
                          <div className="font-bold text-lg">19.00</div>
                          <div className="font-semibold text-base">Jakarta</div>
                        </div>
                        <div className="font-semibold text-base">
                          {`${formattedDate}`}
                        </div>
                      </div>
                      <div className="flex flex-col gap- text-gray-500 text-sm">
                        <div className="">Maskapai : </div>
                        <div className="">Kelas :</div>
                        <div className="">Nomor Penerbangan :</div>
                        <div className="">Tipe Pesawat :</div>
                        <div className="mt-2">Bagasi :</div>
                        <div className="">Bagasi Kabin :</div>
                      </div>
                      <div className="flex flex-col ">
                        <div className="flex items-center gap-2">
                          <div className="font-bold text-lg">23.00</div>
                          <div className="font-semibold text-base">Medan</div>
                        </div>
                        <div className="font-semibold text-base">
                          {`${formattedDate}`}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between  ">
                      <div className="flex flex-col">
                        <div className="font-bold text-lg">
                          Bandara Soekarno-Hatta
                        </div>
                        <div className="font-semibold text-base">
                          Terminal 1
                        </div>
                      </div>
                      <div className="flex flex-col gap- text-gray-500 text-sm">
                        <div className="">Air Asia</div>
                        <div className="">Ekonomi</div>
                        <div className="">QZ 7924</div>
                        <div className="">Airbus A320 - 300</div>
                        <div className="mt-2">20 kg</div>
                        <div className="">7 kg</div>
                      </div>

                      <div className="flex flex-col">
                        <div className="font-bold text-lg">
                          Bandara Kualanamu
                        </div>
                        <div className="font-semibold text-base">
                          Terminal Domestik
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* END DROPDOWN DETAILS */}
            </div>
            <div className="bg-[#2A91E5] hover:bg-sky-700 hover:shadow hover:text-gray-200 border-x border-b border-gray-300 font-medium text-white p-2 rounded-b-lg mt-0 text-center cursor-pointer">
              Pilih Tiket
            </div>
          </div>
        </div>
        <div>
          <div className="w-52 mx-auto bg-white rounded-xl shadow-sm p-4">
            <a href="#" className="group relative block h-64 sm:h-80 lg:h-96">
              <span className="absolute inset-0 border rounded-xl bg-[#D9EDFF] border-dashed border-gray-300"></span>

              <div className="relative flex h-full transform items-end border rounded-xl border-gray-300 text-white bg-[#2A91E5] transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
                <div className="p-4 !pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-10 sm:size-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>

                  <h2 className="mt-10 text-lg font-medium ">
                    Go around the world
                  </h2>
                </div>

                <div className="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-5  lg:p-8">
                  <h3 className="mt-4 text-base sm:text-lg font-medium ">
                    Go around the world
                  </h3>

                  <p className="mt-4 text-sm sm:text-base">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Cupiditate, praesentium voluptatem omnis atque culpa
                    repellendus.
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
