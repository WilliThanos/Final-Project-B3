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
import {
  setArrivalAirport,
  setArrivalAirportId,
  setClass,
  setDepartureAirport,
  setDepartureAirportId,
  setDepartureDate,
  setReturnDate,
  setRoundTrip,
} from "../redux/reducers/dataReducer";
import { useNavigate } from "react-router-dom";
import CariTiketLanding from "../components/CariTiketLanding";

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
    kelas: "",
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
        setErrorKembali(
          "Waktu Kembali tidak boleh lebih awal dari Waktu Pergi"
        );
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
    const { name, value } = e.target;
    if (name === "asal" || name === "tujuan") {
      const [airportName, airportId] = value.split("-");
      setInputSearch({
        ...inputSearch,
        [name]: airportName,
        [`${name}Id`]: airportId,
      });
    } else {
      setInputSearch({
        ...inputSearch,
        [name]: value,
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
    if (
      isInvalidAsal &&
      isInvalidTujuan &&
      isInvalidPergi &&
      isInvalidKembali &&
      isInvalidKelas
    ) {
      dispatch(setDepartureDate(inputSearch.pergi));
      if (isRoundTrip) {
        dispatch(setReturnDate(inputSearch.kembali));
      } else {
        dispatch(setReturnDate(new Date()));
      }
      dispatch(setClass(inputSearch.kelas));
      dispatch(setDepartureAirport(inputSearch.asal));
      dispatch(setDepartureAirportId(inputSearch.asalId));
      dispatch(setArrivalAirport(inputSearch.tujuan));
      dispatch(setArrivalAirportId(inputSearch.tujuanId));
      localStorage.setItem("inputSearch", JSON.stringify(inputSearch));
      navigate("/search");
    }
  };

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
          <CariTiketLanding />
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
