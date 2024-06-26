import { useEffect, useRef, useState } from "react";
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
import { getMethodPayment } from "../redux/action/bookingAction";
import DetailBooking from "../components/DetailBooking";
import { GiAirplaneDeparture, GiAirplaneArrival } from "react-icons/gi";
import { SlPlane } from "react-icons/sl";
import { LiaCircleSolid } from "react-icons/lia";
import { setMetode } from "../redux/reducers/paymentReducer";
import { payment } from "../redux/action/paymentAction";

import PaymentMethodCard from "../components/MetodePembayaran";

import { useNavigate } from "react-router-dom";

export default function Payment() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMethodPayment());
  }, [dispatch]);

  const dataMethod = useSelector((state) => state?.payment?.Method);

  const handleMethod = (e) => {
    const selectedCode = e.target.value;
    dispatch(setMetode(selectedCode));
  };

  const dataCek = useSelector((state) => state?.payment?.Metode);

  const isButtonDisabled = dataCek === "";
  const departureFlights = useSelector(
    (state) => state?.ticket?.selectedDepartureFlight
  );
  useEffect(() => {
    if (!departureFlights) {
      navigate("/search");
    }
  }, [departureFlights, navigate]);
  const selectedMethod = useSelector((state) => state?.payment?.Metode);

  const handleSelect = (code) => {
    dispatch(setMetode(code));
  };

  const handleButtonPayment = (e) => {
    e.preventDefault();
    dispatch(payment());
  };

  return (
    <form className="max-w-screen-2xl mx-auto  ">
      <NavbarLogoBiru />

      <div className="flex pt-24 gap-10   max-md:mx-2 max-md:gap-3   max-xl:flex-col max-xl:mx-2 ">
        {/* METODE PEMBAYARAN */}
        <div className="flex flex-col w-1/3 max-md:w-full">
          <div className="pb-4 font-bold text-2xl max-lg:text-xl max-sm:text-lg">
            Metode Pembayaran
          </div>
          <div className=" mx-auto bg-white rounded-xl shadow-sm px-6 max-sm:px-4 w-full">
            <div className=" my-5 max-lg:w-full ">
              <div className="font text-base text-gray-600 max-md:text-sm">
                Silahkan pilih metode pembayaran{" "}
              </div>
              <div className="mt-2">
                <div className="flex flex-col gap-2">
                  {dataMethod.map((e) => (
                    <PaymentMethodCard
                      key={e?.code}
                      e={e}
                      handleSelect={handleSelect}
                      selectedMethod={selectedMethod}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-2/3 max-md:w-full">
          <label className="font-bold text-2xl max-lg:text-xl max-sm:text-lg">
            Detail Pemesanan
          </label>
          <div className=" mt-4 mx-auto w-full bg-white rounded-xl shadow-sm px-6 max-sm:px-4 ">
            <DetailBooking />
          </div>
          <button
            onClick={handleButtonPayment}
            className={`rounded-xl bg-[#2A91E5] px-5 mt-8 py-2.5 w-full font-medium text-white hover:bg-sky-700 hover:text-gray-200 hover:shadow ${
              isButtonDisabled ? "bg-gray-400 cursor-not-allowed" : ""
            }`}
            disabled={isButtonDisabled}
          >
            Lanjut ke Pembayaran
          </button>
        </div>
      </div>
    </form>
  );
}
