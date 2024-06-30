import React from "react";
import Navbar from "../components/Navbar2";
import InfoBooking from "../components/InfoBooking";
import DetailBooking from "../components/DetailBooking";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setKondisi } from "../redux/reducers/paymentReducer";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import done from "../assets/done.png";

export default function History() {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const handlebuttonPayment = () => {
    Navigate("/payment");
  };
  const state = useSelector((state) => state);
  console.log("state :>> ", state);

  const status = useSelector((state) => state?.payment?.status);
  const kondisi = useSelector((state) => state?.payment?.kondisi);

  const close = () => {
    dispatch(setKondisi(false));
  };
  const dataWaktu = useSelector(
    (state) => state?.payment?.Data?.transaction?.expired_time
  );

  const unixTimestamp = dataWaktu * 1000; // Convert to milliseconds
  const date = new Date(unixTimestamp);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
    timeZoneName: "short",
  };

  const dateString = date.toLocaleString("id-ID", options);

  return (
    <div className="min-h-screen mx-auto max-w-screen-2xl">
      <div className="mt-2">
        <Navbar />
      </div>
      <div className="mt-24 flex justify-between gap-3 max-xl:flex-col max-sm:flex-col max-sm:px-2">
        <div className="w-2/3 max-sm:w-full max-xl:w-full">
          <label className="font-bold text-2xl max-sm:text-xl">
            Riwayat Pembelian Tiket
          </label>
          <div className=" mt-5 max-sm:mt-2 max-sm:overflow-y-auto max-sm:h-[550px] bg-white px-4 py-4 rounded-2xl">
            <InfoBooking />
          </div>
        </div>
        <div className="w-1/3 max-sm:w-full mb-2 max-xl:w-full">
          <label className="font-bold text-2xl max-sm:text-xl">
            Detail Pemesanan
          </label>
          <div className="bg-white px-4 py-4 rounded-2xl mt-5 max-sm:mt-2">
            <DetailBooking />
          </div>
          {status && status !== "SELESAI" && (
            <button
              onClick={handlebuttonPayment}
              className="rounded-xl bg-[#2A91E5] px-5 mt-4   py-2.5 w-full font-medium text-white hover:bg-sky-700 hover:text-gray-200 "
            >
              Lanjutkan pembayaran
            </button>
          )}
        </div>
      </div>
      <Dialog
        open={kondisi}
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
              <Button
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
              </Button>

              <DialogTitle
                as="h3"
                className="text-base/7 font-medium"
              ></DialogTitle>
              <div className="flex flex-col items-center">
                <img className="w-44" src={done} alt="" />
                <p className="mt-2 text-center text-base">
                  Selamat, anda sudah melakukan transaksi. Segera lunasi
                  pembayaran anda sebelum{" "}
                  <a className="font-semibold text-red-500">{dateString}</a>
                </p>
              </div>

              <div className="mt-4"></div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
