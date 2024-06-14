import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { GiAirplaneDeparture, GiAirplaneArrival } from "react-icons/gi";
import { SlCalender } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";

export default function DetailPembayaran() {
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMaxMd, setIsMaxMd] = useState(false);

  const departureFlights = useSelector(
    (state) => state?.ticket?.selectedDepartureFlight
  );
  const returnFlights = useSelector(
    (state) => state?.ticket?.selectedReturnFlight
  );

  const jmlPenumpang = useSelector((state) => state?.data?.penumpang);
  //formating ke bentuk ruupiah
  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };
  // harga tiket
  const hargaTiket =
    ((departureFlights?.price || 0) + (returnFlights?.price || 0)) *
    jmlPenumpang;

  const cekPulangPergi = useSelector((state) => state?.data?.roundtrip);
  // cek harga
  const cekHarga = cekPulangPergi ? hargaTiket : departureFlights?.price;

  //pajak
  const pajak = (10 / 100) * hargaTiket;
  //biayayaa admin
  const biayaAdmin = (2 / 100) * hargaTiket;

  //harga total
  const totalHarga = (pajak || 0) + (biayaAdmin || 0) + (cekHarga || 0);
  //harga total bgt

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMaxMd(window.innerWidth <= 768);
    };

    // Initial check
    checkScreenSize();

    // Add event listener
    window.addEventListener("resize", checkScreenSize);

    // Cleanup event listener
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const handleDropdownToggle = () => {
    if (isMaxMd) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  return (
    <div className="w-[535px] max-xl:w-full">
      <div className="pb-4 font-bold text-2xl max-lg:text-xl max-sm:text-lg">
        Detail Pembayaran
      </div>
      <div className=" mx-auto bg-white rounded-xl shadow-sm px-6 max-sm:px-4 ">
        <div className="pt-10">
          <div className="flex justify-between p-6 text-lg max-lg:text-base max-sm:text-sm">
            <div className="flex flex-col gap-2">
              <div className="">Harga Tiket</div>
              <div className="">Biaya Administrasi</div>
              <div className="">Pajak 10%</div>
            </div>
            <div className="flex flex-col gap-2 ">
              <div className="font-semibold">
                {cekPulangPergi
                  ? formatRupiah(hargaTiket)
                  : formatRupiah(departureFlights?.price)}
              </div>
              <div className="font-semibold">{formatRupiah(biayaAdmin)}</div>
              <div className="font-semibold">{formatRupiah(pajak)}</div>
            </div>
          </div>

          <div className="border-b border-gray-300 pb-10 "></div>
          <div className="flex justify-between items-center py-10 text-lg max-lg:text-base max-sm:text-sm">
            <div className="">
              <div className="">Jumlah Yang Dibayarkan</div>
            </div>
            <div className="">
              <div className="font-bold text-3xl text-[#2A91E5] max-lg:text-2xl max-sm:text-xl">
                {formatRupiah(totalHarga)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
