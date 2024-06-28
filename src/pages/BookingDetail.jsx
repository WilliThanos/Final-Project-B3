import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NavbarLogoBiru from "../components/Navbar2";
import NavbarLogoPutih from "../components/Navbar";
import CariTiketLain from "../components/CariTiketLain";
import { GiAirplaneDeparture, GiAirplaneArrival } from "react-icons/gi";
import DetailPembayaran from "../components/DetailPembayaran";
import { IoWarning } from "react-icons/io5";

import { useDispatch, useSelector } from "react-redux";

import {
  updatePassenger,
  setPassengers,
} from "../redux/reducers/passengersReducer";
import { LiaCircleSolid } from "react-icons/lia";
import DetailPenumpangAnak from "../components/DetailPenumpangAnak";
import DetailPenumpangBayi from "../components/DetailPenumpangBayi";
import DetailPenumpangDewasa from "../components/DetailPenumpangDewasa";
import { getSearchTicket } from "../redux/action/dataAction";
import { useNavigate } from "react-router-dom";
import DetailBooking from "../components/DetailBooking";
import { getBooking } from "../redux/action/bookingAction";

export default function BookingDetail({ index }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [passengerAge, setPassengerAge] = useState(null);

  const passengers = useSelector((state) => state.passengers.passengers);
  const jumlahDewasa = useSelector((state) => state?.data?.jumlahDewasa);
  const jumlahAnak = useSelector((state) => state?.data?.jumlahAnak);
  const jumlahBayi = useSelector((state) => state?.data?.jumlahBayi);
  const [showWarning, setShowWarning] = useState(false);
  console.log("showWarning :>> ", showWarning);

  const totalPenumpang = jumlahDewasa + jumlahAnak + jumlahBayi;

  useEffect(() => {
    const maxPassengers = 4; // Maximum number of passengers allowed

    if (passengers.length !== totalPenumpang) {
      if (passengers.length < totalPenumpang) {
        // Menambahkan penumpang baru jika diperlukan
        let newPassengers = [
          ...passengers,
          ...Array(totalPenumpang - passengers.length).fill({
            jenisKelamin: "",
            namaDepan: "",
            namaBelakang: "",
            tanggalLahir: null,
            nik: "",
            nomorHP: "",
            kategori: "", // Menambahkan properti kategori
            isDropdownOpen: false,
          }),
        ];

        // Mengatur kategori untuk setiap penumpang baru
        for (let i = passengers.length; i < newPassengers.length; i++) {
          if (i < jumlahDewasa) {
            newPassengers[i].kategori = "Dewasa";
          } else if (i >= jumlahDewasa && i < jumlahDewasa + jumlahAnak) {
            newPassengers[i].kategori = "Anak";
          } else if (i >= jumlahDewasa + jumlahAnak) {
            newPassengers[i].kategori = "Bayi";
          }
        }

        // Memastikan tidak melebihi jumlah maksimum penumpang
        if (newPassengers.length > maxPassengers) {
          newPassengers = newPassengers.slice(0, maxPassengers);
        }

        // Dispatch state hanya jika terdapat perubahan pada penumpang
        if (
          newPassengers.length !== passengers.length ||
          !newPassengers.every((p, index) => p === passengers[index])
        ) {
          dispatch(setPassengers(newPassengers));
        }
      } else {
        // Mengurangi penumpang jika diperlukan
        const newPassengers = passengers.slice(0, totalPenumpang);
        dispatch(setPassengers(newPassengers));
      }
    }
  }, [totalPenumpang, dispatch, passengers]);

  const handleInputChange = (index, field, value) => {
    dispatch(updatePassenger({ index, field, value }));
  };

  const departureFlights = useSelector(
    (state) => state?.ticket?.selectedDepartureFlight
  );

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }

    return age;
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (date, index) => {
    const formattedDate = formatDate(date);

    handleInputChange(index, "tanggalLahir", formattedDate);
    const age = calculateAge(date);
    setPassengerAge(age);
  };

  const validateAgeAnak = () => {
    const anakPassengers = passengers.filter(
      (passenger) => passenger.kategori === "Anak"
    );

    for (let passenger of anakPassengers) {
      if (
        !passenger.tanggalLahir ||
        !passenger.jenisKelamin ||
        !passenger.namaBelakang ||
        !passenger.namaDepan ||
        !passenger.nik ||
        !passenger.nomorHP
      ) {
        return false; // Return false if tanggalLahir is null
      }

      const age = calculateAge(passenger.tanggalLahir);

      if (age < 2 || age > 12) {
        return false; // Tidak sesuai kategori
      }
    }

    return true; // Semua penumpang anak valid
  };

  // Fungsi validasi untuk bayi
  const validateAgeBayi = () => {
    const bayiPassengers = passengers.filter(
      (passenger) => passenger.kategori === "Bayi"
    );

    for (let passenger of bayiPassengers) {
      if (
        !passenger.tanggalLahir ||
        !passenger.jenisKelamin ||
        !passenger.namaBelakang ||
        !passenger.namaDepan ||
        !passenger.nik ||
        !passenger.nomorHP
      ) {
        return false; // Return false if tanggalLahir is null
      }

      const age = calculateAge(passenger.tanggalLahir);

      if (age >= 2) {
        return false; // Tidak sesuai kategori
      }
    }

    return true; // Semua penumpang bayi valid
  };

  // Fungsi validasi untuk dewasa
  const validateAgeDewasa = () => {
    const dewasaPassengers = passengers.filter(
      (passenger) => passenger.kategori === "Dewasa"
    );

    for (let passenger of dewasaPassengers) {
      if (
        !passenger.tanggalLahir ||
        !passenger.jenisKelamin ||
        !passenger.namaBelakang ||
        !passenger.namaDepan ||
        !passenger.nik ||
        !passenger.nomorHP
      ) {
        return false; // Return false if tanggalLahir is null
      }

      const age = calculateAge(passenger.tanggalLahir);

      if (age < 12 || age > 100) {
        return false; // Tidak sesuai kategori
      }
    }

    return true; // Semua penumpang dewasa valid
  };

  useEffect(() => {
    dispatch(getSearchTicket());
  }, []);

  useEffect(() => {
    if (!departureFlights) {
      navigate("/search");
    }
  }, [departureFlights, navigate]);

  const handleButtonBooking = (e) => {
    if (!(validateAgeAnak() && validateAgeBayi() && validateAgeDewasa())) {
      e.preventDefault();
      setShowWarning(true);
    } else {
      e.preventDefault();
      navigate("/payment");
      dispatch(getBooking());
    }
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
      <div className="flex pt-40 gap-8  max-md:mx-2 max-md:gap-3  max-lg:pt-40  max-xl:pt-40 max-xl:flex-col max-xl:mx-2 max-md:pt-32 ">
        <div className="flex flex-col gap-3 w-full">
          <div className="">
            <div className="pb-4 font-bold text-2xl max-lg:text-xl max-sm:text-lg">
              Detail Pemesanan Tiket
            </div>

            <div className=" mx-auto w-full bg-white rounded-xl shadow-sm px-6 max-sm:px-4 ">
              <DetailBooking />
            </div>
          </div>
          {/* detail penumpang */}
          <div className="">
            <div className="pb-4 max-sm:pb-2 font-bold text-2xl max-lg:text-xl max-sm:text-lg">
              Detail Penumpang
            </div>
            {passengers.map((passenger, index) => {
              if (index < jumlahDewasa) {
                return (
                  <DetailPenumpangDewasa
                    key={index}
                    passenger={passenger}
                    index={index}
                    handleInputChange={handleInputChange}
                    handleDateChange={handleDateChange}
                  />
                );
              } else if (
                index >= jumlahDewasa &&
                index < jumlahDewasa + jumlahAnak
              ) {
                return (
                  <DetailPenumpangAnak
                    key={index}
                    passenger={passenger}
                    index={index}
                    handleInputChange={handleInputChange}
                    handleDateChange={handleDateChange}
                  />
                );
              } else {
                return (
                  <DetailPenumpangBayi
                    key={index}
                    passenger={passenger}
                    index={index}
                    handleInputChange={handleInputChange}
                    handleDateChange={handleDateChange}
                  />
                );
              }
            })}
          </div>
        </div>

        <div>
          {/* Detail Pembayaran Component */}
          <DetailPembayaran />
          {/* Detail Pembayaran Component */}.
          <div>
            <button
              onClick={handleButtonBooking}
              className={`rounded-xl bg-[#2A91E5] px-5 mt-8 max-sm:my-2 py-2.5 w-full font-medium text-white hover:bg-sky-700 hover:text-gray-200 hover:shadow `}
            >
              Lanjut ke Pembayaran
            </button>
          </div>
          {showWarning && (
            <div className="flex items-center gap-2 text-red-500 font-normal text-xs mt-2">
              <IoWarning size={20} />
              <div>Mohon isi data pemesanan</div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
