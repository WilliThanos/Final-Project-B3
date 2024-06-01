import { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GiAirplaneDeparture, GiAirplaneArrival } from "react-icons/gi";
import { SlCalender } from "react-icons/sl";
import { id } from "date-fns/locale";
import { useDispatch, useSelector } from "react-redux";
import {
  setDepartureDate,
  setReturnDate,
  setClass,
  setPenumpang,
  setJumlahDewasa,
  setJumlahAnak,
  setJumlahBayi,
} from "../redux/reducers/dataReducer";

export default function CariTiketLain() {
  const dispatch = useDispatch();
  const departureDate = useSelector((state) => state.data.departureDate);
  const returnDate = useSelector((state) => state.data.returnDate);
  const seatClass = useSelector((state) => state?.data?.class);
  const jumlahDewasa = useSelector((state) => state?.data?.jumlahDewasa);
  const jumlahAnak = useSelector((state) => state?.data?.jumlahAnak);
  const jumlahBayi = useSelector((state) => state?.data?.jumlahBayi);
  const totalPenumpang = jumlahAnak + jumlahDewasa + jumlahBayi;

  // const [departureDate, setDepartureDate] = useState(new Date());
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);

  const kurangJumlahDewasa = () => {
    if (jumlahDewasa > 0) {
      dispatch(setJumlahDewasa(jumlahDewasa - 1));
    }
  };

  const tambahJumlahDewasa = () => {
    dispatch(setJumlahDewasa(jumlahDewasa + 1));
  };

  const kurangJumlahAnak = () => {
    if (jumlahAnak > 0) {
      dispatch(setJumlahAnak(jumlahAnak - 1));
    }
  };

  const tambahJumlahAnak = () => {
    dispatch(setJumlahAnak(jumlahAnak + 1));
  };

  const kurangJumlahBayi = () => {
    if (jumlahBayi > 0) {
      dispatch(setJumlahBayi(jumlahBayi - 1));
    }
  };

  const tambahJumlahBayi = () => {
    dispatch(setJumlahBayi(jumlahBayi + 1));
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownToggle2 = () => {
    setIsDropdownOpen2(!isDropdownOpen2);
    setIsDropdownOpen3(false);
  };

  const handleDropdownToggle3 = () => {
    setIsDropdownOpen3(!isDropdownOpen3);
    setIsDropdownOpen2(false);
  };

  const departureDateRef = useRef(null);
  const returnDateRef = useRef(null);

  const updatePenumpang = () => {
    dispatch(setPenumpang(totalPenumpang));
  };

  useEffect(() => {
    updatePenumpang();
  }, [totalPenumpang]);

  return (
    <div className="mx-auto fixed left-0 right-0 max-w-screen-2xl flex justify-between items-center bg-white rounded-xl shadow-sm max-md:mx-2 max-md:text-sm">
      <div className="flex items-center p-8">
        <div className="block sm:hidden pr-5 absolute ">
          <button
            onClick={handleDropdownToggle}
            className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          {isDropdownOpen && (
            <div className="absolute  mt-2 w-72 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <a
                href="#"
                className="block rounded-md  px-4 py-2 text-gray-800/60  hover:text-gray-800 font-semibold"
              >
                <div className="flex items-center gap-x-2 ">
                  <div className="cursor-pointer">
                    <SlCalender
                      onClick={() => departureDateRef.current.setFocus()}
                    />
                  </div>
                  <div className="font-medium">Waktu Keberangkatan</div>
                </div>
                <DatePicker
                  selected={departureDate}
                  onChange={(date) => dispatch(setDepartureDate(date))}
                  dateFormat="EEE, d MMM yyyy"
                  locale={id}
                  className="cursor-pointer text-[#0C68BE]"
                  ref={departureDateRef}
                />
              </a>
              <a
                href="#"
                className="block rounded-md  px-4 py-2 text-gray-800/60  hover:text-gray-800 font-semibold"
              >
                <div className="flex items-center gap-x-2 ">
                  <div className="cursor-pointer ">
                    <SlCalender
                      onClick={() => returnDateRef.current.setFocus()}
                    />
                  </div>
                  <div className="font-medium ">Waktu Kembali</div>
                </div>
                <DatePicker
                  selected={returnDate}
                  onChange={(date) => dispatch(setReturnDate(date))}
                  dateFormat="EEE, d MMM yyyy"
                  locale={id}
                  className="cursor-pointer text-[#0C68BE]"
                  ref={returnDateRef}
                />
              </a>
              <a
                href="#"
                className="block rounded-md  px-4 py-2 text-gray-800/60 hover:bg-gray-300 hover:text-gray-800 font-semibold sm:hidden"
              >
                <div className="flex items-center font-semibold gap-x-2">
                  <div className="flex items-center gap-2">
                    <GiAirplaneDeparture />
                    <div>Jakarta (CGK)</div>
                  </div>
                </div>
              </a>
              <a
                href="#"
                className="block rounded-md  px-4 py-2 text-gray-800/60 hover:bg-gray-300 hover:text-gray-800 font-semibold sm:hidden"
              >
                <div className="flex items-center font-semibold gap-x-2">
                  <div className="flex items-center gap-2">
                    <GiAirplaneArrival />
                    <div>Medan (KLM)</div>
                  </div>
                </div>
              </a>
              <a
                href="#"
                className="block rounded-md  px-4 py-2 text-gray-800/60 hover:bg-gray-300 hover:text-gray-800 font-semibold sm:hidden"
              >
                <div className="flex items-center gap-x-2 px-">
                  <div>
                    <div
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={handleDropdownToggle3}
                    >
                      <div>{totalPenumpang}</div>

                      <div>Penumpang</div>
                      <span
                        className={`transition ${
                          isDropdownOpen3 ? "rotate-180" : ""
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-4 w-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      </span>
                    </div>
                    {isDropdownOpen3 && (
                      <div className="absolute mt- w-44  bg-white border border-gray-200 rounded-md shadow-lg z-10">
                        <a
                          href="#"
                          className="block rounded-md px-4 py-2 text-gray-800/60  hover:text-gray-800"
                        >
                          <div className="flex items-center gap-x-2">
                            <div className="">Dewasa</div>
                            <div class="flex items-center rounded border border-gray-200 ">
                              <button
                                type="button"
                                onClick={kurangJumlahDewasa}
                                class="size-6 leading-6 text-gray-600 transition hover:opacity-75 hover:bg-gray-300"
                              >
                                -
                              </button>

                              <input
                                type="number"
                                id="Quantity"
                                value={jumlahDewasa}
                                onChange={(e) =>
                                  dispatch(setJumlahDewasa(jumlahDewasa))
                                }
                                class="h-6 w-8 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                              />

                              <button
                                type="button"
                                onClick={tambahJumlahDewasa}
                                class="size-6 leading-6 text-gray-600 transition hover:opacity-75 hover:bg-gray-300"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </a>
                        <a
                          href="#"
                          className="block rounded-md px-4 py-2 text-gray-800/60  hover:text-gray-800"
                        >
                          <div className="flex items-center gap-x-[27px]">
                            <div className="font-">Anak</div>
                            <div class="flex items-center rounded border border-gray-200  ">
                              <button
                                type="button"
                                onClick={kurangJumlahAnak}
                                class="size-6 leading-6 text-gray-600 transition hover:opacity-75 hover:bg-gray-300"
                              >
                                -
                              </button>

                              <input
                                type="number"
                                id="Quantity"
                                value={jumlahAnak}
                                onChange={(e) =>
                                  dispatch(setJumlahAnak(jumlahAnak))
                                }
                                class="h-6 w-8 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                              />

                              <button
                                type="button"
                                onClick={tambahJumlahAnak}
                                class="size-6 leading-6 text-gray-600 transition hover:opacity-75 hover:bg-gray-300"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </a>
                        <a
                          href="#"
                          className="block rounded-md px-4 py-2 text-gray-800/60  hover:text-gray-800"
                        >
                          <div className="flex items-center gap-x-[18px]">
                            <div className="font-">Bayi</div>
                            <div class="flex items-center rounded border border-gray-200 ml-4">
                              <button
                                type="button"
                                onClick={kurangJumlahBayi}
                                class="size-6 leading-6 text-gray-600 transition hover:opacity-75 hover:bg-gray-300"
                              >
                                -
                              </button>

                              <input
                                type="number"
                                id="Quantity"
                                value={jumlahBayi}
                                onChange={(e) =>
                                  dispatch(setJumlahBayi(jumlahBayi))
                                }
                                class="h-6 w-8 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                              />

                              <button
                                type="button"
                                onClick={tambahJumlahBayi}
                                class="size-6 leading-6 text-gray-600 transition hover:opacity-75 hover:bg-gray-300"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </a>
                      </div>
                    )}
                  </div>
                  <div className=""> |</div>
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={handleDropdownToggle2}
                  >
                    <div>{`${seatClass}`} </div>
                    <span
                      className={`transition ${
                        isDropdownOpen2 ? "rotate-180" : ""
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </span>
                  </div>
                  {isDropdownOpen2 && (
                    <div className="absolute mt-36 ml-28 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      <a
                        href="#"
                        className="block rounded-md px-4 py-2 text-gray-800/60 hover:bg-gray-300 hover:text-gray-800"
                        onClick={() => {
                          dispatch(setClass("Eksekutif"));
                          setIsDropdownOpen2(false);
                        }}
                      >
                        <div className="flex items-center gap-x-2">
                          <div className="font-">Eksekutif</div>
                        </div>
                      </a>
                      <a
                        href="#"
                        className="block rounded-md px-4 py-2 text-gray-800/60 hover:bg-gray-300 hover:text-gray-800"
                        onClick={() => {
                          dispatch(setClass("Bisnis"));
                          setIsDropdownOpen2(false);
                        }}
                      >
                        <div className="flex items-center gap-x-2">
                          <div className="font-">Bisnis</div>
                        </div>
                      </a>
                      <a
                        href="#"
                        className="block rounded-md px-4 py-2 text-gray-800/60 hover:bg-gray-300 hover:text-gray-800"
                        onClick={() => {
                          dispatch(setClass("Ekonomi"));
                          setIsDropdownOpen2(false);
                        }}
                      >
                        <div className="flex items-center gap-x-2">
                          <div className="font-">Ekonomi</div>
                        </div>
                      </a>
                    </div>
                  )}
                </div>
              </a>
            </div>
          )}
        </div>
        <div
          className="hidden flex-col pr-20 border-r border-gray-500 sm:flex max-xl:pr-0 max-lg:pr-0"
          style={{ borderRight: "1px solid", height: "40px" }}
        >
          <div className="flex items-center font-semibold max-xl:pr-20 max-lg:pr-20">
            <div className="flex items-center gap-2">
              <GiAirplaneDeparture />
              <div>Jakarta (CGK)</div>
            </div>
            <div className="px-2"> - </div>
            <div className="flex items-center gap-2">
              <GiAirplaneArrival />
              <div>Medan (KNO)</div>
            </div>
          </div>
          <div className="flex items-center gap-x-2 ">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleDropdownToggle3}
            >
              <div>{totalPenumpang}</div>

              <div>Penumpang</div>
              <span
                className={`transition ${isDropdownOpen3 ? "rotate-180" : ""}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </div>
            {isDropdownOpen3 && (
              <div className="absolute mt-40 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <a
                  href="#"
                  className="block rounded-md px-4 py-2 text-gray-800/60  hover:text-gray-800"
                >
                  <div className="flex items-center gap-x-2">
                    <div className="">Dewasa</div>
                    <div class="flex items-center rounded border border-gray-200 ">
                      <button
                        type="button"
                        onClick={kurangJumlahDewasa}
                        class="size-6 leading-6 text-gray-600 transition hover:opacity-75 hover:bg-gray-300"
                      >
                        -
                      </button>

                      <input
                        type="number"
                        id="Quantity"
                        value={jumlahDewasa}
                        onChange={(e) =>
                          dispatch(setJumlahDewasa(jumlahDewasa))
                        }
                        class="h-6 w-8 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                      />

                      <button
                        type="button"
                        onClick={tambahJumlahDewasa}
                        class="size-6 leading-6 text-gray-600 transition hover:opacity-75 hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </a>
                <a
                  href="#"
                  className="block rounded-md px-4 py-2 text-gray-800/60  hover:text-gray-800"
                >
                  <div className="flex items-center gap-x-[27px]">
                    <div className="font-">Anak</div>
                    <div class="flex items-center rounded border border-gray-200  ">
                      <button
                        type="button"
                        onClick={kurangJumlahAnak}
                        class="size-6 leading-6 text-gray-600 transition hover:opacity-75 hover:bg-gray-300"
                      >
                        -
                      </button>

                      <input
                        type="number"
                        id="Quantity"
                        value={jumlahAnak}
                        onChange={(e) => dispatch(setJumlahAnak(jumlahAnak))}
                        class="h-6 w-8 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                      />

                      <button
                        type="button"
                        onClick={tambahJumlahAnak}
                        class="size-6 leading-6 text-gray-600 transition hover:opacity-75 hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </a>
                <a
                  href="#"
                  className="block rounded-md px-4 py-2 text-gray-800/60  hover:text-gray-800"
                >
                  <div className="flex items-center gap-x-[18px]">
                    <div className="font-">Bayi</div>
                    <div class="flex items-center rounded border border-gray-200 ml-4">
                      <button
                        type="button"
                        onClick={kurangJumlahBayi}
                        class="size-6 leading-6 text-gray-600 transition hover:opacity-75 hover:bg-gray-300"
                      >
                        -
                      </button>

                      <input
                        type="number"
                        id="Quantity"
                        value={jumlahBayi}
                        onChange={(e) => dispatch(setJumlahBayi(jumlahBayi))}
                        class="h-6 w-8 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                      />

                      <button
                        type="button"
                        onClick={tambahJumlahBayi}
                        class="size-6 leading-6 text-gray-600 transition hover:opacity-75 hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </a>
              </div>
            )}
            <div>|</div>
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleDropdownToggle2}
            >
              <div>{`${seatClass}`} </div>
              <span
                className={`transition ${isDropdownOpen2 ? "rotate-180" : ""}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </div>
            {isDropdownOpen2 && (
              <div className="absolute mt-40 ml-28 w-28 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <a
                  href="#"
                  className="block rounded-md px-4 py-2 text-gray-800/60 hover:bg-gray-300 hover:text-gray-800"
                  onClick={() => {
                    dispatch(setClass("Eksekutif"));
                    setIsDropdownOpen2(false);
                  }}
                >
                  <div className="flex items-center gap-x-2">
                    <div className="font-">Eksekutif</div>
                  </div>
                </a>
                <a
                  href="#"
                  className="block rounded-md px-4 py-2 text-gray-800/60 hover:bg-gray-300 hover:text-gray-800"
                  onClick={() => {
                    dispatch(setClass("Bisnis"));
                    setIsDropdownOpen2(false);
                  }}
                >
                  <div className="flex items-center gap-x-2">
                    <div className="font-">Bisnis</div>
                  </div>
                </a>
                <a
                  href="#"
                  className="block rounded-md px-4 py-2 text-gray-800/60 hover:bg-gray-300 hover:text-gray-800"
                  onClick={() => {
                    dispatch(setClass("Ekonomi"));
                    setIsDropdownOpen2(false);
                  }}
                >
                  <div className="flex items-center gap-x-2">
                    <div className="font-">Ekonomi</div>
                  </div>
                </a>
              </div>
            )}
          </div>
        </div>

        <div
          className="hidden flex-col pr-20 pl-20 border-r border-gray-500 md:flex "
          style={{ borderRight: "1px solid", height: "40px" }}
        >
          <div className="flex items-center gap-x-2 ">
            <div className="cursor-pointer">
              <SlCalender onClick={() => departureDateRef.current.setFocus()} />
            </div>
            <div className="font-medium">Waktu Keberangkatan</div>
          </div>
          <DatePicker
            selected={departureDate}
            onChange={(date) => {
              dispatch(setDepartureDate(date));
              console.log("date :>> ", typeof date);
            }}
            dateFormat="EEE, d MMM yyyy"
            locale={id}
            className="cursor-pointer text-[#0C68BE]"
            ref={departureDateRef}
          />
        </div>
        <div
          className="hidden flex-col pl-20 md:flex"
          style={{ borderRight: "1px", height: "40px" }}
        >
          <div className="flex items-center gap-x-2 ">
            <div className="cursor-pointer ">
              <SlCalender onClick={() => returnDateRef.current.setFocus()} />
            </div>
            <div className="font-medium ">Waktu Kembali</div>
          </div>
          <DatePicker
            selected={returnDate}
            onChange={(date) => dispatch(setReturnDate(date))}
            dateFormat="EEE, d MMM yyyy"
            locale={id}
            className="cursor-pointer text-[#0C68BE]"
            ref={returnDateRef}
          />
        </div>
      </div>
      <div className="flex items-center p-8">
        <div className="hidden sm:block md:hidden pr-5 relative">
          <button
            onClick={handleDropdownToggle}
            className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <a
                href="#"
                className="block rounded-md  px-4 py-2 text-gray-800/60  hover:text-gray-800 font-semibold"
              >
                <div className="flex items-center gap-x-2 ">
                  <div className="cursor-pointer">
                    <SlCalender
                      onClick={() => departureDateRef.current.setFocus()}
                    />
                  </div>
                  <div className="font-medium">Waktu Keberangkatan</div>
                </div>
                <DatePicker
                  selected={departureDate}
                  onChange={(date) => dispatch(setDepartureDate(date))}
                  dateFormat="EEE, d MMM yyyy"
                  locale={id}
                  className="cursor-pointer text-[#0C68BE]"
                  ref={departureDateRef}
                />
              </a>
              <a
                href="#"
                className="block rounded-md  px-4 py-2 text-gray-800/60  hover:text-gray-800 font-semibold"
              >
                <div className="flex items-center gap-x-2 ">
                  <div className="cursor-pointer ">
                    <SlCalender
                      onClick={() => returnDateRef.current.setFocus()}
                    />
                  </div>
                  <div className="font-medium ">Waktu Kembali</div>
                </div>
                <DatePicker
                  selected={returnDate}
                  onChange={(date) => dispatch(setReturnDate(date))}
                  dateFormat="EEE, d MMM yyyy"
                  locale={id}
                  className="cursor-pointer text-[#0C68BE]"
                  ref={returnDateRef}
                />
              </a>
              <a
                href="#"
                className="block rounded-md  px-4 py-2 text-gray-800/60 hover:bg-gray-300 hover:text-gray-800 font-semibold sm:hidden"
              >
                <div className="flex items-center font-semibold gap-x-2">
                  <div className="flex items-center gap-2">
                    <GiAirplaneDeparture />
                    <div>Jakarta (CGK)</div>
                  </div>
                </div>
              </a>
              <a
                href="#"
                className="block rounded-md  px-4 py-2 text-gray-800/60 hover:bg-gray-300 hover:text-gray-800 font-semibold sm:hidden"
              >
                <div className="flex items-center font-semibold gap-x-2">
                  <div className="flex items-center gap-2">
                    <GiAirplaneArrival />
                    <div>Medan (KLM)</div>
                  </div>
                </div>
              </a>
              <a
                href="#"
                className="block rounded-md  px-4 py-2 text-gray-800/60 hover:bg-gray-300 hover:text-gray-800 font-semibold sm:hidden"
              >
                <div className="flex items-center gap-x-2 px-">
                  <div className="text">1 penumpang</div>
                  <div className=""> |</div>
                  <div className="" onClick={handleDropdownToggle2}>
                    {`${seatClass}`}
                  </div>
                  {isDropdownOpen2 && (
                    <div className="absolute mt-36 ml-28 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      <a
                        href="#"
                        className="block rounded-md px-4 py-2 text-gray-800/60 hover:bg-gray-300 hover:text-gray-800"
                        onClick={() => {
                          dispatch(setClass("Eksekutif"));
                          setIsDropdownOpen2(false);
                        }}
                      >
                        <div className="flex items-center gap-x-2">
                          <div className="font-">Eksekutif</div>
                        </div>
                      </a>
                      <a
                        href="#"
                        className="block rounded-md px-4 py-2 text-gray-800/60 hover:bg-gray-300 hover:text-gray-800"
                        onClick={() => {
                          dispatch(setClass("Bisnis"));
                          setIsDropdownOpen2(false);
                        }}
                      >
                        <div className="flex items-center gap-x-2">
                          <div className="font-">Bisnis</div>
                        </div>
                      </a>
                      <a
                        href="#"
                        className="block rounded-md px-4 py-2 text-gray-800/60 hover:bg-gray-300 hover:text-gray-800"
                        onClick={() => {
                          dispatch(setClass("Ekonomi"));
                          setIsDropdownOpen2(false);
                        }}
                      >
                        <div className="flex items-center gap-x-2">
                          <div className="font-">Ekonomi</div>
                        </div>
                      </a>
                    </div>
                  )}
                </div>
              </a>
            </div>
          )}
        </div>
        <button className="rounded-xl bg-[#2A91E5] px-5 py-2.5 font-medium text-white hover:bg-sky-700 hover:text-gray-200 hover:shadow">
          Cari Tiket Lainnya
        </button>
      </div>
    </div>
  );
}
