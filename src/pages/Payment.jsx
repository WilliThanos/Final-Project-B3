import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";
import NavbarLogoBiru from "../components/Navbar2";
import { getMethodPayment } from "../redux/action/bookingAction";
import DetailBooking from "../components/DetailBooking";
import {
  setKondisi,
  setMetode,
  setPesan,
} from "../redux/reducers/paymentReducer";
import { payment } from "../redux/action/paymentAction";
import PaymentMethodCard from "../components/MetodePembayaran";
import { setModal } from "../redux/reducers/profileReducer";
import ModalPayment from "../components/notifPayment";

export default function Payment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMethodPayment());
  }, [dispatch]);

  const dataMethod = useSelector((state) => state?.payment?.Method);
  const dataCek = useSelector((state) => state?.payment?.Metode);

  const isButtonDisabled = dataCek === "";
  const departureFlights = useSelector(
    (state) => state?.ticket?.selectedDepartureFlight
  );

  const returnFlights = useSelector(
    (state) => state?.ticket?.selectedReturnFlight
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
    dispatch(setPesan(null));

    dispatch(payment())
      .then((result) => {
        if (result?.error) {
          dispatch(setModal(true));
        } else {
          dispatch(setKondisi(true));
          navigate("/history");
        }
      })
      .catch(() => {
        dispatch(setModal(true));
      });
  };

  return (
    <form className="max-w-screen-2xl mx-auto">
      <NavbarLogoBiru />

      <div className="flex pt-24 gap-10 max-md:mx-2 max-md:gap-3 max-xl:flex-col max-xl:mx-2">
        <div className="flex flex-col w-1/3 max-md:w-full">
          <div className="pb-4 font-bold text-2xl max-lg:text-xl max-sm:text-lg">
            Metode Pembayaran
          </div>
          <div className="mx-auto bg-white rounded-xl shadow-sm px-6 max-sm:px-4 w-full">
            <div className="my-5 max-lg:w-full">
              <div className="font text-base text-gray-600 max-md:text-sm mb-2">
                Silahkan pilih metode pembayaran{" "}
              </div>
              <div className="mt-2">
                <div className="flex flex-col gap-2">
                  {dataMethod?.map((e) => (
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
          <div className="mt-4 mx-auto w-full bg-white rounded-xl shadow-sm px-6 max-sm:px-4">
            <DetailBooking />
          </div>
          <button
            onClick={handleButtonPayment}
            className={`mb-4 rounded-xl bg-[#2A91E5] px-5 mt-8 py-2.5 w-full font-medium text-white hover:bg-sky-700 hover:text-gray-200 hover:shadow ${
              isButtonDisabled ? "bg-gray-400 cursor-not-allowed" : ""
            }`}
            disabled={isButtonDisabled}
          >
            Bayar Sekarang
          </button>
        </div>
      </div>
      <ModalPayment />
    </form>
  );
}
