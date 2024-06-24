import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NavbarLogoBiru from "../components/Navbar2";
import NavbarLogoPutih from "../components/Navbar";
import CariTiketLain from "../components/CariTiketLain";
import { FaAngleDown } from "react-icons/fa";
import DetailPembayaran from "../components/DetailPembayaran";
import { CgInfo } from "react-icons/cg";
import AirAsiaLogo from "../assets/AirAsia.png";
import { FiCreditCard } from "react-icons/fi";
import { SlCalender } from "react-icons/sl";
import { id } from "date-fns/locale";
import { useDispatch, useSelector } from "react-redux";

export default function Payment() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dispatch = useDispatch();

  const departureDateRef = useRef(null);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <form className="max-w-screen-2xl mx-auto  ">
      <NavbarLogoBiru />
      {/* <div className="mt-24">
        <NavbarLogoPutih />
      </div> */}

      <div className="mt-24">
        <CariTiketLain />
      </div>
      <div className="flex pt-40 gap-10  max-md:mx-2 max-md:gap-3  max-lg:pt-40  max-xl:pt-40 max-xl:flex-col max-xl:mx-2 ">
        <div className="flex flex-col w-full">
          <div className="pb-4 font-bold text-2xl max-lg:text-xl max-sm:text-lg">
            Metode Pembayaran
          </div>
          <div className=" mx-auto bg-white rounded-xl shadow-sm px-6 max-sm:px-4 w-full">
            <div className="w- pt-10 max-lg:w-full ">
              <div className="font text-base text-gray-400 max-md:text-sm">
                Silahkan pilih metode pembayaran{" "}
              </div>
              <div className="flex items-center text-center rounded mt-5 ">
                <div className="flex items-centers  ">
                  <div className=" px-5 py-3 flex gap-1 items-center rounded-l border-gray-300 border-l border-t border-b hover:bg-[#2A91E5] hover:rounded hover:text-white cursor-pointer">
                    <FiCreditCard size={20} className="mr-1" />
                    <div className="text">Credit</div>
                    <div className="text">card</div>
                  </div>
                  <div
                    onClick={handleDropdownToggle}
                    className="hidden cursor-pointer px-2 py-3 border rounded-r border-r border-t border-b border-gray-300 hover:bg-[#2A91E5] hover:rounded hover:text-white max-sm:block "
                  >
                    <FaAngleDown
                      size={20}
                      className={`transition ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>
                {isDropdownOpen && (
                  <div className="absolute mt-64 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    <div
                      onClick={() => {
                        setIsDropdownOpen(false);
                      }}
                      className=" px-5 py-3 flex gap-1 items-center  border-gray-300 border rounded hover:bg-[#2A91E5] hover:rounded hover:text-white cursor-pointer"
                    >
                      <FiCreditCard size={20} className="mr-1" />
                      <div className="text">Credit</div>
                      <div className="text">card</div>
                    </div>
                    <div
                      onClick={() => {
                        setIsDropdownOpen(false);
                      }}
                      className=" px-5 py-3 flex gap-1 items-center  border-gray-300 border rounded hover:bg-[#2A91E5] hover:rounded hover:text-white cursor-pointer"
                    >
                      <FiCreditCard size={20} className="mr-1" />
                      <div className="text">Credit</div>
                      <div className="text">card</div>
                    </div>
                    <div
                      onClick={() => {
                        setIsDropdownOpen(false);
                      }}
                      className="n px-5 py-3 flex gap-1 items-center  border-gray-300 border rounded hover:bg-[#2A91E5] hover:rounded hover:text-white cursor-pointer"
                    >
                      <FiCreditCard size={20} className="mr-1" />
                      <div className="text">Credit</div>
                      <div className="text">card</div>
                    </div>
                    <div
                      onClick={() => {
                        setIsDropdownOpen(false);
                      }}
                      className=" px-5 py-3 flex gap-1 items-center rounded-r border-gray-300 border rounded hover:bg-[#2A91E5] hover:rounded hover:text-white cursor-pointer"
                    >
                      <FiCreditCard size={20} className="mr-1" />
                      <div className="text">Credit</div>
                      <div className="text">card</div>
                    </div>
                  </div>
                )}
                <div className="max-sm:hidden px-5 py-3 flex gap-1 items-center  border-gray-300 border-t border-b hover:bg-[#2A91E5] hover:rounded hover:text-white cursor-pointer">
                  <FiCreditCard size={20} className="mr-1" />
                  <div className="text">Credit</div>
                  <div className="text">card</div>
                </div>
                <div className="max-sm:hidden px-5 py-3 flex gap-1 items-center  border-gray-300 border-t border-b hover:bg-[#2A91E5] hover:rounded hover:text-white cursor-pointer">
                  <FiCreditCard size={20} className="mr-1" />
                  <div className="text">Credit</div>
                  <div className="text">card</div>
                </div>
                <div className="max-sm:hidden px-5 py-3 flex gap-1 items-center  border-gray-300 border-t border-b hover:bg-[#2A91E5] hover:rounded hover:text-white cursor-pointer">
                  <FiCreditCard size={20} className="mr-1" />
                  <div className="text">Credit</div>
                  <div className="text">card</div>
                </div>
                <div className="max-sm:hidden px-5 py-3 flex gap-1 items-center rounded-r border-gray-300 border-t border-b border-r hover:bg-[#2A91E5] hover:rounded hover:text-white cursor-pointer">
                  <FiCreditCard size={20} className="mr-1" />
                  <div className="text">Credit</div>
                  <div className="text">card</div>
                </div>
              </div>
            </div>
            <div className="w-3/5 pt-6 pb-10 max-lg:w-full">
              <div className="font-semibold text-lg text-gray-400 max-md:text-base">
                Credit card details{" "}
              </div>
              <div className="flex flex-col gap-6 pt-5">
                <input
                  type="text"
                  required
                  onChange={() => dispatch(set())}
                  className="flex justify-between  items-center py-2 px-3 rounded border border-gray-400  focus:border-sky-500 focus:outline-none  "
                  placeholder="Name on card"
                />{" "}
                <input
                  type="text"
                  required
                  onChange={() => dispatch(set())}
                  className="flex justify-between  items-center py-2 px-3 rounded border border-gray-400  focus:border-sky-500 focus:outline-none "
                  placeholder="Card number"
                />{" "}
                <div className="flex  gap-8 ">
                  <div className="w-full flex flex-col gap-1">
                    <input
                      type="text"
                      required
                      onChange={() => dispatch(set())}
                      className="flex justify-between items-center  py-2 px-3 rounded border border-gray-400 focus:border-sky-500 focus:outline-none w-full   "
                      placeholder="Expiration date"
                    />{" "}
                    <div className="w-full text-xs pt-1 text-gray-400 ">
                      MM/YY
                    </div>
                  </div>
                  <div className="w-full  relative z-">
                    <input
                      type="text"
                      required
                      onChange={() => dispatch(set())}
                      className="py-2 px-3 rounded border border-gray-400 focus:border-sky-500 focus:outline-none w-full "
                      placeholder="CCV"
                    />{" "}
                    <CgInfo
                      size={20}
                      className="cursor-pointer text-gray-400 absolute top-3 transform  right-3"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          {/* Detail Pembayaran Component */}
          <DetailPembayaran />
          {/* Detail Pembayaran Component */}
          <button className="rounded-xl bg-[#2A91E5] px-5 mt-8 py-2.5 w-full font-medium text-white hover:bg-sky-700 hover:text-gray-200 hover:shadow">
            Lanjut ke Pembayaran
          </button>
        </div>
      </div>
    </form>
  );
}
