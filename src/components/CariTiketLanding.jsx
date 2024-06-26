import { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GiAirplaneDeparture, GiAirplaneArrival } from "react-icons/gi";
import { SlCalender } from "react-icons/sl";
import { IoWarning } from "react-icons/io5";

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
  setArrivalAirportId,
  setDepartureAirportId,
  setRoundTrip,
} from "../redux/reducers/dataReducer";
import {
  getAllAirports,
  getDepartureAirport,
  getArrivalAirport,
  getSearchTicket,
} from "../redux/action/dataAction";
import { useNavigate } from "react-router-dom";

export default function CariTiketLanding() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dataSearch = useSelector((state) => state?.data);
  const departureDate = useSelector((state) => state?.data?.departureDate);
  const returnDate = useSelector((state) => state?.data?.returnDate);
  const seatClass = useSelector((state) => state?.data?.class);
  const jumlahDewasa = useSelector((state) => state?.data?.jumlahDewasa);
  const jumlahAnak = useSelector((state) => state?.data?.jumlahAnak);
  const jumlahBayi = useSelector((state) => state?.data?.jumlahBayi);
  const allAirport = useSelector((state) => state?.data?.allAirport);
  const roundTrip = useSelector((state) => state?.data?.roundtrip);
  const departureAirport = useSelector(
    (state) => state?.data?.departureAirport
  );
  const arrivalAirport = useSelector((state) => state?.data?.arrivalAirport);
  const selectedReturnFlight = useSelector(
    (state) => state?.ticket?.selectedReturnFlight
  );

  const totalPenumpang = jumlahAnak + jumlahDewasa + jumlahBayi;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);
  const [isDropdownOpen4, setIsDropdownOpen4] = useState(false);
  const [isDropdownOpen5, setIsDropdownOpen5] = useState(false);
  const [airportQuery, setAirportQuery] = useState("");

  console.log("roundTrip :>> ", roundTrip);

  useEffect(() => {
    if (seatClass === "") {
      dispatch(setClass(""));
    }
  }, [seatClass, dispatch]);

  useEffect(() => {
    if (departureAirport === null) {
      dispatch(setDepartureAirportId(37));
    }
  }, [departureAirport, dispatch]);

  useEffect(() => {
    if (arrivalAirport === null) {
      dispatch(setArrivalAirportId(47));
    }
  }, [arrivalAirport, dispatch]);

  useEffect(() => {
    if (!departureDate) {
      dispatch(setDepartureDate(new Date())); // Dispatch current date if departureDate is null or undefined
    }
  }, [departureDate, dispatch]);

  useEffect(() => {
    if (!returnDate) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      dispatch(setReturnDate(tomorrow));
    }
  }, [returnDate, dispatch]);

  useEffect(() => {
    dispatch(getAllAirports());
  }, []);

  // const [departureDate, setDepartureDate] = useState(new Date());

  const filteredAirports = allAirport?.filter(
    (airport) =>
      airport?.city.toLowerCase().includes(airportQuery.toLowerCase()) ||
      airport?.iata_code.toLowerCase().includes(airportQuery.toLowerCase())
  );

  useEffect(() => {
    console.log(dataSearch);
  }, [dataSearch]);

  useEffect(() => {
    dispatch(getSearchTicket());
  }, []);

  useEffect(() => {
    dispatch(getDepartureAirport());
    dispatch(getArrivalAirport());
  }, []);

  const kurangJumlahDewasa = () => {
    if (jumlahDewasa > 0) {
      dispatch(setJumlahDewasa(jumlahDewasa - 1));
    }
  };

  const tambahJumlahDewasa = () => {
    if (jumlahDewasa < 5) {
      dispatch(setJumlahDewasa(jumlahDewasa + 1));
    }
  };

  const kurangJumlahAnak = () => {
    if (jumlahAnak > 0) {
      dispatch(setJumlahAnak(jumlahAnak - 1));
    }
  };

  const tambahJumlahAnak = () => {
    if (jumlahDewasa < 5) {
      dispatch(setJumlahAnak(jumlahAnak + 1));
    }
  };

  const kurangJumlahBayi = () => {
    if (jumlahBayi > 0) {
      dispatch(setJumlahBayi(jumlahBayi - 1));
    }
  };

  const tambahJumlahBayi = () => {
    if (jumlahDewasa < 5) {
      dispatch(setJumlahBayi(jumlahBayi + 1));
    }
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownToggle2 = () => {
    setIsDropdownOpen2(!isDropdownOpen2);
    setIsDropdownOpen3(false);
    setIsDropdownOpen4(false);
    setIsDropdownOpen5(false);
  };

  const handleDropdownToggle3 = () => {
    setIsDropdownOpen3(!isDropdownOpen3);
    setIsDropdownOpen2(false);
    setIsDropdownOpen4(false);
    setIsDropdownOpen5(false);
  };

  const handleDropdownToggle4 = () => {
    setIsDropdownOpen4(!isDropdownOpen4);
    setIsDropdownOpen2(false);
    setIsDropdownOpen3(false);
    setIsDropdownOpen5(false);
  };

  const handleDropdownToggle5 = () => {
    setIsDropdownOpen5(!isDropdownOpen5);
    setIsDropdownOpen2(false);
    setIsDropdownOpen3(false);
    setIsDropdownOpen4(false);
  };

  const departureDateRef = useRef(null);
  const returnDateRef = useRef(null);

  const updatePenumpang = () => {
    dispatch(setPenumpang(totalPenumpang));
  };

  useEffect(() => {
    updatePenumpang();
  }, [totalPenumpang]);

  // Convert to Date object
  const dateObject = new Date(departureDate);

  // Extract components
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1; // getMonth() returns zero-based month
  const day = dateObject.getDate();

  // Format as "YYYY-MM-DD"
  const formattedDepartureDate = `${year}-${month
    .toString()
    .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

  console.log("formattedDepartureDate:>> ", formattedDepartureDate); // Output: "2024-06-15"

  // Convert to Date object
  const returnDateObject = new Date(returnDate);

  // Extract components
  const returnYear = returnDateObject.getFullYear();
  const returnMonth = returnDateObject.getMonth() + 1; // getMonth() returns zero-based month
  const returnDay = returnDateObject.getDate();

  // Format as "YYYY-MM-DD"
  const formattedReturnDate = `${returnYear}-${returnMonth
    .toString()
    .padStart(2, "0")}-${returnDay.toString().padStart(2, "0")}`;

  console.log("formattedReturnDate:>> ", formattedReturnDate);

  const isSameDate =
    formattedDepartureDate === formattedReturnDate && roundTrip;
  const isReturnDateBeforeDeparture =
    formattedReturnDate &&
    formattedDepartureDate &&
    roundTrip &&
    formattedReturnDate < formattedDepartureDate;

  const isDateBeforeToday = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time components for accurate comparison
    return date < today;
  };

  // Check if the departure date is before today
  const isDepartureDateBeforeToday =
    formattedDepartureDate &&
    isDateBeforeToday(new Date(formattedDepartureDate));

  const isButtonEnabled = !(
    departureAirport?.id === arrivalAirport?.id ||
    isSameDate ||
    isReturnDateBeforeDeparture ||
    totalPenumpang === 0 ||
    isDepartureDateBeforeToday ||
    totalPenumpang > 4
  );

  useEffect(() => {
    console.log("Deparature = ", departureAirport);
    console.log("Arrival = ", arrivalAirport);
  }, []);

  return (
    <div className="mx-auto left-0 right-0 z-40 max-w-screen-2xl flex justify-between items-center bg-white rounded-xl shadow-sm max-md:mx-2 max-md:text-sm">
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
                <div className="flex flex-col gap-y-">
                  <div className="flex items-center gap-x-2">
                    <div className="cursor-pointer">
                      <SlCalender
                        onClick={() => departureDateRef.current.setFocus()}
                      />
                    </div>
                    <div className="font-medium">Tanggal Keberangkatan</div>
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
                    placeholderText="Pilih tanggal keberangkatan"
                  />
                </div>
                {isSameDate && (
                  <div className="flex items-center gap-2 mt-1 text-red-500 font-normal  text-sm">
                    <IoWarning size={20} />
                    <div>
                      Tanggal keberangkatan dan kembali tidak boleh sama
                    </div>
                  </div>
                )}
                {isDepartureDateBeforeToday && (
                  <div className="flex items-center gap-2 text-red-500 font-normal text-sm">
                    <IoWarning size={20} />
                    <div>
                      Tanggal keberangkatan tidak boleh lebih awal dari hari ini
                    </div>
                  </div>
                )}
              </a>
              <a
                href="#"
                className="block rounded-md  px-4 py-2 text-gray-800/60  hover:text-gray-800 font-semibold"
              >
                <div className="flex flex-col  gap-x-2 ">
                  <div className="flex gap-2">
                    <div className="font-medium text-sm">Pulang - Pergi</div>
                    <div className=" items-center gap-x-4  flex-col  ">
                      <label
                        htmlFor="AcceptConditions"
                        className="relative inline-block h-5 w-9 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-[#2A91E5]"
                      >
                        <input
                          type="checkbox"
                          id="AcceptConditions"
                          className="peer sr-only"
                          checked={roundTrip}
                          onChange={() => {
                            dispatch(setRoundTrip(!roundTrip));
                          }}
                        />

                        <span className="absolute inset-y-0 start-0 m-1 size-3 rounded-full bg-white transition-all peer-checked:start-4"></span>
                      </label>
                    </div>
                  </div>
                  <div
                    className={`flex items-center gap-x-2 ${
                      !roundTrip && "opacity-50"
                    }`}
                  >
                    <div className="cursor-pointer">
                      <SlCalender
                        onClick={() => returnDateRef.current.setFocus()}
                      />
                    </div>
                    <div className="font-medium">Tanggal Kembali </div>
                  </div>
                  <DatePicker
                    selected={roundTrip ? returnDate : null}
                    onChange={(date) => dispatch(setReturnDate(date))}
                    dateFormat="EEE, d MMM yyyy"
                    locale={id}
                    className="cursor-pointer text-[#0C68BE]"
                    ref={returnDateRef}
                    disabled={!roundTrip}
                    placeholderText="Pilih tanggal kembali"
                  />
                </div>
                {isReturnDateBeforeDeparture && (
                  <div className="flex items-center gap-2 text-red-500 font-normal  text-sm">
                    <IoWarning size={20} />
                    <div>
                      Tanggal kembali tidak boleh lebih awal dari tanggal
                      keberangkatan
                    </div>
                  </div>
                )}
              </a>
              <a
                href="#"
                className="block rounded-md  px-4 py-2 text-gray-800/60 hover:bg-gray-300 hover:text-gray-800 font-semibold sm:hidden"
              >
                <div className="flex items-center font-semibold gap-x-2">
                  <div className="relative">
                    <div
                      onClick={handleDropdownToggle4}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <GiAirplaneDeparture />
                      <div>
                        {departureAirport
                          ? `${departureAirport.city} (${departureAirport.iata_code})`
                          : " Keberangkatan"}
                      </div>
                    </div>
                    {isDropdownOpen4 && (
                      <div className="absolute mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                        <input
                          type="text"
                          value={airportQuery}
                          onChange={(e) => setAirportQuery(e.target.value)}
                          placeholder="Search..."
                          className="w-full px-3 py-2  border rounded border-gray-300 focus:outline-none"
                        />
                        <div
                          className={`overflow-y-auto ${
                            filteredAirports?.length > 5 ? "h-60" : "max-h-auto"
                          }`}
                        >
                          {filteredAirports?.length > 0 ? (
                            filteredAirports?.map((airport) => (
                              <div
                                key={airport?.id}
                                onClick={() => {
                                  dispatch(setDepartureAirportId(airport?.id));
                                  dispatch(getDepartureAirport());
                                  setIsDropdownOpen4(false);
                                }}
                                className="px-3 py-2 flex gap-1 items-center border-gray-300 border-b last:border-0 hover:bg-[#2A91E5] hover:text-white cursor-pointer"
                              >
                                {airport?.city} ({airport?.iata_code})
                              </div>
                            ))
                          ) : (
                            <div className="px-3 py-2 text-center text-gray-500 border-gray-300 border rounded">
                              Bandara Tidak Ditemukan
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </a>
              <a
                href="#"
                className="block rounded-md  px-4 py-2 text-gray-800/60 hover:bg-gray-300 hover:text-gray-800 font-semibold sm:hidden"
              >
                <div className="flex items-center font-semibold gap-x-2">
                  <div className="relative">
                    <div
                      onClick={handleDropdownToggle5}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <GiAirplaneArrival />
                      <div>
                        {arrivalAirport
                          ? `${arrivalAirport.city} (${arrivalAirport.iata_code})`
                          : "Tujuan"}
                      </div>
                    </div>
                    {isDropdownOpen5 && (
                      <div className="absolute mt-1 w-48  bg-white border border-gray-200 rounded-md shadow-lg z-10">
                        <input
                          type="text"
                          value={airportQuery}
                          onChange={(e) => setAirportQuery(e.target.value)}
                          placeholder="Search..."
                          className="w-full px-3 py-2  border rounded border-gray-300 focus:outline-none"
                        />
                        <div
                          className={`overflow-y-auto ${
                            filteredAirports.length > 5 ? "h-60" : "max-h-auto"
                          }`}
                        >
                          {filteredAirports.length > 0 ? (
                            filteredAirports.map((airport) => (
                              <div
                                key={airport?.id}
                                onClick={() => {
                                  dispatch(setArrivalAirportId(airport?.id));
                                  dispatch(getArrivalAirport());
                                  setIsDropdownOpen5(false);
                                }}
                                className=" px-3 py-2 flex gap-1 items-center  border-gray-300 border rounded hover:bg-[#2A91E5] hover:rounded hover:text-white cursor-pointer"
                              >
                                {airport?.city} ({airport?.iata_code})
                              </div>
                            ))
                          ) : (
                            <div className="px-3 py-2 text-center text-gray-500 border-gray-300 border rounded">
                              Bandara Tidak Ditemukan
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </a>
              {departureAirport &&
                arrivalAirport &&
                departureAirport.id === arrivalAirport.id && (
                  <div className="flex items-center gap-2 text-red-500 font-normal text-sm">
                    <IoWarning size={20} />
                    <div>Bandara keberangkatan dan tujuan tidak boleh sama</div>
                  </div>
                )}
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

                    {totalPenumpang < 1 && (
                      <div className="flex items-center gap-2 text-red-500  text-sm">
                        <IoWarning size={20} />
                        <div>Mohon isi jumlah penumpang</div>
                      </div>
                    )}
                    {totalPenumpang > 4 && (
                      <div className="flex items-center gap-2 text-red-500  text-sm">
                        <IoWarning size={20} />
                        <div>Jumlah penumpang tidak boleh lebih dari 4</div>
                      </div>
                    )}

                    {isDropdownOpen3 && (
                      <div className="absolute mt- w-44  bg-white border border-gray-200 rounded-md shadow-lg z-10">
                        <a
                          href="#"
                          className="block rounded-md px-4 py-2 text-gray-800/60  hover:text-gray-800"
                        >
                          <div className="flex items-center gap-x-2">
                            <div className="flex flex-col ">
                              {" "}
                              <div className="text-md">Dewasa </div>
                              <div className="text-xs ">12+ </div>
                            </div>{" "}
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
                            <div className="flex flex-col ">
                              {" "}
                              <div className="text-md">Anak </div>
                              <div className="text-xs ">2-12 </div>
                            </div>{" "}
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
                            <div className="flex flex-col ">
                              {" "}
                              <div className="text-md">Bayi </div>
                              <div className="text-xs ">{"<"}2 </div>
                            </div>{" "}
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
                    <div>{seatClass === "" ? "Semua" : seatClass}</div>
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
                          dispatch(setClass(""));
                          setIsDropdownOpen2(false);
                        }}
                      >
                        <div className="flex items-center gap-x-2">
                          <div className="font-">Semua</div>
                        </div>
                      </a>
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
        {/* NON RESPONSIVE LOOK  */}
        <div
          className="flex flex-col pr-10 border-r border-gray-500 max-sm:hidden max-xl:pr-0 max-lg:pr-0"
          style={{ borderRight: "1px solid", height: "40px" }}
        >
          <div className="flex items-center gap-4  font-semibold max-xl:pr-20 max-lg:pr-20">
            <div className="relative">
              <div
                onClick={handleDropdownToggle4}
                className="flex items-center gap-2 cursor-pointer"
              >
                <GiAirplaneDeparture />
                <div>
                  {departureAirport
                    ? `${departureAirport.city} (${departureAirport.iata_code})`
                    : "Keberangkatan"}
                </div>
              </div>
              {isDropdownOpen4 && (
                <div className="absolute mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <input
                    type="text"
                    value={airportQuery}
                    onChange={(e) => setAirportQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full px-3 py-2  border rounded border-gray-300 focus:outline-none"
                  />
                  <div
                    className={`overflow-y-auto ${
                      filteredAirports.length > 5 ? "h-60" : "max-h-auto"
                    }`}
                  >
                    {filteredAirports.length > 0 ? (
                      filteredAirports.map((airport) => (
                        <div
                          key={airport?.id}
                          onClick={() => {
                            dispatch(setDepartureAirportId(airport?.id));
                            dispatch(getDepartureAirport());
                            setIsDropdownOpen4(false);
                          }}
                          className="px-3 py-2 flex gap-1 items-center border-gray-300 border-b last:border-0 hover:bg-[#2A91E5] hover:text-white cursor-pointer"
                        >
                          {airport?.city} ({airport?.iata_code})
                        </div>
                      ))
                    ) : (
                      <div className="px-3 py-2 text-center text-gray-500 border-gray-300 border rounded">
                        Bandara Tidak Ditemukan
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="px-2"> - </div>
            <div className="relative">
              <div
                onClick={handleDropdownToggle5}
                className="flex items-center gap-2 cursor-pointer"
              >
                <GiAirplaneArrival />
                <div>
                  {arrivalAirport
                    ? `${arrivalAirport.city} (${arrivalAirport.iata_code})`
                    : "Tujuan"}
                </div>
              </div>
              {isDropdownOpen5 && (
                <div className="absolute mt-1 w-48  bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <input
                    type="text"
                    value={airportQuery}
                    onChange={(e) => setAirportQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full px-3 py-2  border rounded border-gray-300 focus:outline-none"
                  />
                  <div
                    className={`overflow-y-auto ${
                      filteredAirports.length > 5 ? "h-60" : "max-h-auto"
                    }`}
                  >
                    {filteredAirports.length > 0 ? (
                      filteredAirports.map((airport) => (
                        <div
                          key={airport?.id}
                          onClick={() => {
                            dispatch(setArrivalAirportId(airport?.id));
                            dispatch(getArrivalAirport());
                            setIsDropdownOpen5(false);
                          }}
                          className=" px-3 py-2 flex gap-1 items-center  border-gray-300 border rounded hover:bg-[#2A91E5] hover:rounded hover:text-white cursor-pointer"
                        >
                          {airport?.city} ({airport?.iata_code})
                        </div>
                      ))
                    ) : (
                      <div className="px-3 py-2 text-center text-gray-500 border-gray-300 border rounded">
                        Bandara Tidak Ditemukan
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            {departureAirport &&
              arrivalAirport &&
              departureAirport.id === arrivalAirport.id && (
                <div className="flex items-center gap-2 text-red-500 font-normal text-sm">
                  <IoWarning size={20} />
                  <div>Bandara keberangkatan dan tujuan tidak boleh sama</div>
                </div>
              )}
          </div>

          <div className="flex items-center gap-x-2 ">
            <div className="relative">
              <div className="flex items-center gap-2">
                <div
                  className="flex-col items-center  "
                  onClick={handleDropdownToggle3}
                >
                  <div className="flex items-center gap-2 cursor-pointer">
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
                </div>
                {totalPenumpang < 1 && (
                  <div className="flex items-center gap-2 text-red-500  text-sm">
                    <IoWarning size={20} />
                    <div>Mohon isi jumlah penumpang</div>
                  </div>
                )}
                {totalPenumpang > 4 && (
                  <div className="flex items-center gap-2 text-red-500  text-sm">
                    <IoWarning size={20} />
                    <div>Jumlah penumpang tidak boleh lebih dari 4</div>
                  </div>
                )}
              </div>

              {isDropdownOpen3 && (
                <div className="absolute  w-44 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <a
                    href="#"
                    className="block rounded-md px-4 py-2 text-gray-800/60  hover:text-gray-800"
                  >
                    <div className="flex items-center gap-x-2">
                      <div className="flex flex-col ">
                        {" "}
                        <div className="text-md">Dewasa </div>
                        <div className="text-xs ">12+ </div>
                      </div>{" "}
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
                      <div className="flex flex-col ">
                        {" "}
                        <div className="text-md">Anak </div>
                        <div className="text-xs ">2-12 </div>
                      </div>{" "}
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
                      <div className="flex flex-col ">
                        {" "}
                        <div className="text-md">Bayi </div>
                        <div className="text-xs ">{"<"}2 </div>
                      </div>{" "}
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
            </div>
            <div>|</div>
            <div className="relative">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={handleDropdownToggle2}
              >
                <div>{seatClass === "" ? "Semua" : seatClass}</div>
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
                <div className="absolute w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <a
                    href="#"
                    className="block rounded-md px-4 py-2 text-gray-800/60 hover:bg-gray-300 hover:text-gray-800"
                    onClick={() => {
                      dispatch(setClass(""));
                      setIsDropdownOpen2(false);
                    }}
                  >
                    <div className="flex items-center gap-x-2">
                      <div className="font-">Semua</div>
                    </div>
                  </a>
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
        </div>
        {/* NON RESPONSIVE LOOK 2  */}
        <div
          className="hidden flex-col pr-10 pl-10 border-r border-gray-500 md:flex "
          style={{ borderRight: "1px solid", height: "40px" }}
        >
          <div className="flex">
            <div className="flex flex-col gap-y-">
              <div className="flex items-center gap-x-2">
                <div className="cursor-pointer">
                  <SlCalender
                    onClick={() => departureDateRef.current.setFocus()}
                  />
                </div>
                <div className="font-medium">Tanggal Keberangkatan</div>
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
                placeholderText="Pilih tanggal keberangkatan"
              />
            </div>
            <div>
              {isSameDate && (
                <div className="hidden md:flex items-center gap-2 text-red-500 font-normal  text-sm">
                  <IoWarning size={20} />
                  <div>Tanggal keberangkatan dan kembali tidak boleh sama</div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center pl-10 gap-x-8">
          <div className="flex flex-col text-center gap-1">
            <div className="font-medium text-md max-md:hidden">
              Pulang - Pergi
            </div>
            <div className=" items-center gap-x-4 hidden flex-col  md:flex">
              <label
                htmlFor="AcceptConditionsMD"
                className="relative inline-block h-5 w-9 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-[#2A91E5]"
              >
                <input
                  type="checkbox"
                  id="AcceptConditionsMD"
                  className="peer sr-only"
                  checked={roundTrip}
                  onChange={() => {
                    dispatch(setRoundTrip(!roundTrip));
                  }}
                />

                <span className="absolute inset-y-0 start-0 m-1 size-3 rounded-full bg-white transition-all peer-checked:start-4"></span>
              </label>
            </div>
          </div>
          <div className="max-md:hidden">
            <div className="flex gap-4">
              <div
                className="hidden flex-col md:flex"
                style={{ borderRight: "1px solid #ccc", height: "40px" }}
              >
                <div
                  className={`flex items-center gap-x-2 ${
                    !roundTrip && "opacity-50"
                  }`}
                >
                  <div className="cursor-pointer">
                    <SlCalender
                      onClick={() => returnDateRef.current.setFocus()}
                    />
                  </div>
                  <div className="font-medium">Tanggal Kembali </div>
                </div>
                <DatePicker
                  selected={roundTrip ? returnDate : null}
                  onChange={(date) => dispatch(setReturnDate(date))}
                  dateFormat="EEE, d MMM yyyy"
                  locale={id}
                  className="cursor-pointer text-[#0C68BE]"
                  ref={returnDateRef}
                  disabled={!roundTrip}
                  placeholderText="Pilih tanggal kembali"
                />
              </div>

              <div>
                {isReturnDateBeforeDeparture && (
                  <div className="flex items-center gap-2 text-red-500 font-normal  text-sm">
                    <IoWarning size={20} />
                    <div>
                      Tanggal kembali tidak boleh lebih awal dari tanggal
                      keberangkatan
                    </div>
                  </div>
                )}
                {isDepartureDateBeforeToday && (
                  <div className="flex items-center gap-2 text-red-500 font-normal text-sm">
                    <IoWarning size={20} />
                    <div>
                      Tanggal keberangkatan tidak boleh lebih awal dari hari ini
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
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
                <div className="flex flex-col gap-y-">
                  <div className="flex items-center gap-x-2">
                    <div className="cursor-pointer">
                      <SlCalender
                        onClick={() => departureDateRef.current.setFocus()}
                      />
                    </div>
                    <div className="font-medium">Tanggal Keberangkatan</div>
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
                    placeholderText="Pilih tanggal keberangkatan"
                  />
                </div>
                {isSameDate && (
                  <div className="flex items-center gap-2 mt-1 text-red-500 font-normal  text-sm">
                    <IoWarning size={20} />
                    <div>
                      Tanggal keberangkatan dan kembali tidak boleh sama
                    </div>
                  </div>
                )}
              </a>
              <a
                href="#"
                className="block rounded-md  px-4 py-2 text-gray-800/60  hover:text-gray-800 font-semibold"
              >
                <div className="flex flex-col  gap-x-2 ">
                  <div className="flex gap-2">
                    <div className="font-medium text-sm">Pulang - Pergi</div>
                    <div className=" items-center gap-x-4  flex-col  ">
                      <label
                        htmlFor="AcceptConditionsSM"
                        className="relative inline-block h-5 w-9 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-[#2A91E5]"
                      >
                        <input
                          type="checkbox"
                          id="AcceptConditionsSM"
                          className="peer sr-only"
                          checked={roundTrip}
                          onChange={() => {
                            dispatch(setRoundTrip(!roundTrip));
                          }}
                        />

                        <span className="absolute inset-y-0 start-0 m-1 size-3 rounded-full bg-white transition-all peer-checked:start-4"></span>
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <div
                      className={`flex items-center gap-x-2 ${
                        !roundTrip && "opacity-50"
                      }`}
                    >
                      <div className="cursor-pointer">
                        <SlCalender
                          onClick={() => returnDateRef.current.setFocus()}
                        />
                      </div>
                      <div className="font-medium">Tanggal Kembali </div>
                    </div>
                    <DatePicker
                      selected={roundTrip ? returnDate : null}
                      onChange={(date) => dispatch(setReturnDate(date))}
                      dateFormat="EEE, d MMM yyyy"
                      locale={id}
                      className="cursor-pointer text-[#0C68BE]"
                      ref={returnDateRef}
                      disabled={!roundTrip}
                      placeholderText="Pilih tanggal kembali"
                    />
                  </div>
                </div>
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
                    <div>{seatClass === "" ? "Semua" : seatClass}</div>
                  </div>
                  {isDropdownOpen2 && (
                    <div className="absolute mt-36 ml-28 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      <a
                        href="#"
                        className="block rounded-md px-4 py-2 text-gray-800/60 hover:bg-gray-300 hover:text-gray-800"
                        onClick={() => {
                          dispatch(setClass(""));
                          setIsDropdownOpen2(false);
                        }}
                      >
                        <div className="flex items-center gap-x-2">
                          <div className="font-">Semua</div>
                        </div>
                      </a>
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
        <button
          onClick={() => {
            if (isButtonEnabled) {
              navigate("/search");

              dispatch(getSearchTicket());
              {
                setIsDropdownOpen(false);
              }
            }
          }}
          className={`rounded-xl px-5 py-2.5 font-medium text-white hover:shadow ${
            isButtonEnabled
              ? "bg-[#2A91E5] hover:bg-sky-700 hover:text-gray-200"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!isButtonEnabled}
        >
          Cari Tiket Lainnya
        </button>
      </div>
    </div>
  );
}
