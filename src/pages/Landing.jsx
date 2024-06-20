import React, { useEffect, useState } from "react";
import image from "../assets/bg-plane.jpg";
import {
  BiSolidPlaneAlt,
  BiSolidPlaneTakeOff,
  BiSolidPlaneLand,
} from "react-icons/bi";
import { MdDateRange } from "react-icons/md";
import { FaPersonCircleCheck } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import NavbarLogoPutih from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch } from "react-redux";
import { setArrivalAirport, setArrivalAirportId, setClass, setDepartureAirport, setDepartureAirportId, setDepartureDate, setReturnDate, setRoundTrip } from "../redux/reducers/dataReducer";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [inputSearch, setInputSearch] = useState({
    asal: "",
    asalId: "",
    tujuan: "",
    tujuanId: "",
    pergi: "",
    kembali: "",
    kelas: ""
  });
  const [errorAsal, setErrorAsal] = useState("");
  const [errorTujuan, setErrorTujuan] = useState("");
  const [errorPergi, setErrorPergi] = useState("");
  const [errorKembali, setErrorKembali] = useState("");
  const [errorKelas, setErrorKelas] = useState("");

  const validateAsal = () => {
    if (inputSearch.asal === "") {
      setErrorAsal("Asal Bandara is required");
      return false;
    }
    setErrorAsal("");
    return true;
  };
  const validateTujuan = () => {
    if (inputSearch.tujuan === "") {
      setErrorTujuan("Bandara Tujuan is required");
      return false;
    }
    setErrorTujuan("");
    return true;
  };
  const validatePergi = () => {
    if (inputSearch.pergi === "") {
      setErrorPergi("Waktu Pergi is required");
      return false;
    }
    setErrorPergi("");
    return true;
  };
  const validateKembali = () => {
    if (isRoundTrip) {
      if (inputSearch.kembali === "") {
        setErrorKembali("Waktu Kembali is required");
        return false;
      }
      const pergiDate = new Date(inputSearch.pergi);
      const kembaliDate = new Date(inputSearch.kembali);
      if (kembaliDate < pergiDate) {
        setErrorKembali("Waktu Kembali tidak boleh lebih awal dari Waktu Pergi");
        return false;
      }
    }
    setErrorKembali("");
    return true;
  };
  const validateKelas = () => {
    if (inputSearch.kelas === "") {
      setErrorKelas("Kelas is required");
      return false;
    }
    setErrorKelas("");
    return true;
  };
  const onChangeValue = (e) => {
    const {name, value} = e.target;
    if (name === "asal" || name === "tujuan") {
      const [airportName, airportId] = value.split("-");
      setInputSearch({
        ...inputSearch,
        [name]: airportName,
        [`${name}Id`]: airportId
      });
    } else {
      setInputSearch({
        ...inputSearch,
        [name]: value
      });
    }
  };

  const handleOptionChange = (event) => {
    setIsRoundTrip(event.target.value === "pulang pergi");
    dispatch(setRoundTrip(event.target.value === "pulang pergi"));
    setErrorKembali("");
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    const isInvalidAsal = validateAsal();
    const isInvalidTujuan = validateTujuan();
    const isInvalidPergi = validatePergi();
    const isInvalidKembali = validateKembali();
    const isInvalidKelas = validateKelas();
    if(isInvalidAsal && isInvalidTujuan && isInvalidPergi && isInvalidKembali && isInvalidKelas) {
      dispatch(setDepartureDate(inputSearch.pergi));
      if(isRoundTrip) {
        dispatch(setReturnDate(inputSearch.kembali));
      }
      else {
        dispatch(setReturnDate(new Date));
      }
      dispatch(setClass(inputSearch.kelas));
      dispatch(setDepartureAirport(inputSearch.asal));
      dispatch(setDepartureAirportId(inputSearch.asalId));
      dispatch(setArrivalAirport(inputSearch.tujuan));
      dispatch(setArrivalAirportId(inputSearch.tujuanId));
      localStorage.setItem("inputSearch", JSON.stringify(inputSearch));
      navigate("/search");
    }
  }

  useEffect(() => {
    dispatch(setRoundTrip(false));
  }, [dispatch]);

  useEffect(() => {
    console.log(inputSearch);
  }, [inputSearch]);

  return (
    <div>
      <div
        className="flex flex-col justify-center items-center py-20 px-10 lg:px-40 bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: `url(${image})`, height: "90vh" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10">
          <NavbarLogoPutih />
          <h1 className="text-5xl font-bold text-white text-center leading-tight mt-10">
            Rasakan Pengalaman Terbaik Anda Dimulai Dari Kami
          </h1>
          <p className="text-white opacity-80 text-center mt-4 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex
            reprehenderit impedit atque ratione nam iste ea at expedita
            excepturi! Placeat rem quos veniam libero nemo eveniet dicta
            dignissimos fugiat quo.
          </p>
          <div className="bg-white p-8 rounded-xl mt-14 flex flex-col justify-center items-center gap-6 w-full max-w-7xl shadow-2xl">
            <div className="flex gap-10">
              <div>
                <label className="font-semibold text-lg">
                  <input
                    type="radio"
                    name="option"
                    value="pergi"
                    className="mr-2"
                    checked={!isRoundTrip}
                    onChange={handleOptionChange}
                  />
                  Pergi
                </label>
              </div>

              <div>
                <label className="font-semibold text-lg">
                  <input
                    type="radio"
                    name="option"
                    value="pulang pergi"
                    className="mr-2"
                    checked={isRoundTrip}
                    onChange={handleOptionChange}
                  />
                  Pulang pergi
                </label>
              </div>
            </div>
            <div className="flex  gap-6 w-full">
              <div className="flex flex-col  gap-2">
                <label className="font-semibold text-lg">
                  <BiSolidPlaneTakeOff className="inline mr-2" />
                  Asal Bandara
                </label>
                <select
                  name="asal"
                  className="p-3 rounded-lg outline-none border border-gray-300" value={inputSearch.asal ? `${inputSearch.asal}-${inputSearch.asalId}` : ""} onChange={(e) => onChangeValue(e)} onBlur={validateAsal}
                >
                  <option value="" disabled selected>
                    Pilih
                  </option>
                  <option value="Samarinda-1">Samarinda (AAP)</option>
                  <option value="Malang-2">Malang (MLG)</option>
                  <option value="Semarang-3">Semarang (SRG)</option>
                </select>
                {errorAsal && (
                      <p className="text-red-500 text-xs mt-1">
                        {errorAsal}
                      </p>
                    )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-lg">
                  <BiSolidPlaneLand className="inline mr-2" />
                  Bandara Tujuan
                </label>
                <select
                  name="tujuan"
                  className="p-3 rounded-lg outline-none border border-gray-300" value={inputSearch.tujuan ? `${inputSearch.tujuan}-${inputSearch.tujuanId}` : ""} onChange={(e) => onChangeValue(e)} onBlur={validateTujuan}
                >
                  <option value="" disabled selected>
                    Pilih
                  </option>
                  <option value="Samarinda-1">Samarinda (AAP)</option>
                  <option value="Malang-2">Malang (MLG)</option>
                  <option value="Semarang-3">Semarang (SRG)</option>
                </select>
                {errorTujuan && (
                      <p className="text-red-500 text-xs mt-1">
                        {errorTujuan}
                      </p>
                    )}
              </div>
              <div className="flex flex-col justify-end gap-2">
                <label className="font-semibold text-lg">
                  <MdDateRange className="inline mr-2" />
                  Waktu Pergi
                </label>
                <input
                  type="date"
                  name="pergi"
                  className="p-3 rounded-lg outline-none border border-gray-300"
                  value={inputSearch.pergi}
                  onChange={(e) => onChangeValue(e)}
                  onBlur={validatePergi}
                />
                {errorPergi && (
                      <p className="text-red-500 text-xs mt-1">
                        {errorPergi}
                      </p>
                    )}
              </div>
              <div className="flex flex-col justify-end gap-2">
                <label
                  className={`font-semibold text-lg ${
                    !isRoundTrip && "opacity-50"
                  }`}
                >
                  <MdDateRange className="inline mr-2" />
                  Waktu Kembali
                </label>
                <input
                  type="date"
                  name="kembali"
                  className={`p-3 rounded-lg outline-none border border-gray-300 ${
                    !isRoundTrip && "opacity-50"
                  }`}
                  disabled={!isRoundTrip}
                  value={inputSearch.kembali}
                  onChange={(e) => onChangeValue(e)}
                  onBlur={validateKembali}
                />
                {errorKembali && (
                      <p className="text-red-500 text-xs mt-1">
                        {errorKembali}
                      </p>
                    )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-lg text-nowrap">
                  <FaPersonCircleCheck className="inline mr-2" />
                  Kelas Kabin & Penumpang
                </label>
                <select
                  name="kelas"
                  className="p-3 rounded-lg outline-none border border-gray-300" value={inputSearch.kelas}
                  onChange={(e) => onChangeValue(e)} onBlur={validateKelas}
                >
                  <option value="" disabled selected>
                    Pilih
                  </option>
                  <option value="ekonomi">1 Dewasa, ekonomi</option>
                  <option value="premium">2 Dewasa, premium</option>
                  <option value="vip">3 Dewasa, VIP</option>
                </select>
                {errorKelas && (
                      <p className="text-red-500 text-xs mt-1">
                        {errorKelas}
                      </p>
                    )}
              </div>
              <div className="flex flex-col gap-2 justify-end">
                <button className="bg-blue-600 text-white p-3 rounded-lg flex items-center text-lg shadow-md hover:bg-blue-700 transition duration-300" type="submit" onClick={(e) => handleOnClick(e)}>
                  <FaSearch className="inline mr-2" /> Cari
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center mt-16 px-4 lg:px-16">
        <div className="md:w-2/5 px-10 flex flex-col gap-6">
          <h2 className="text-4xl font-semibold">Destinasi terbaik</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Necessitatibus animi minima, ducimus autem quibusdam sequi quis
            veniam earum similique dolorum dignissimos. Inventore nostrum,
            magnam minus reprehenderit atque unde distinctio vero?
          </p>
          <div>
            <button className="bg-blue-600 text-white p-3 rounded-lg px-8 text-lg shadow-md hover:bg-blue-700 transition duration-300">
              Discover More
            </button>
          </div>
        </div>
        <div className="md:w-3/5 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-10">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
      <Footer />
    </div>
  );
}

function Card() {
  return (
    <div className="shadow-xl rounded-3xl p-4 hover:shadow-2xl transition duration-300">
      <img
        src={image}
        alt="Destination"
        className="w-full h-64 object-cover rounded-3xl"
      />
      <div className="flex justify-between items-center mt-4">
        <div>
          <div className="text-lg">
            Tokyo,{" "}
            <span className="text-yellow-500 text-xl font-bold">Japan</span>
          </div>
          <div className="text-gray-700">Rs. 24000 onwards.</div>
        </div>
        <div className="p-2 rounded-full border border-yellow-500">
          <BiSolidPlaneAlt className="text-yellow-500" />
        </div>
      </div>
    </div>
  );
}