import React, { useEffect, useState } from "react";
import { GoTriangleDown } from "react-icons/go";
import { SlCalender } from "react-icons/sl";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { id } from "date-fns/locale";
import { IoWarning } from "react-icons/io5";
export default function DetailPenumpangBayi({
  passenger,
  index,
  handleInputChange,
  handleDateChange,
}) {
  const [passengerAge, setPassengerAge] = useState(null);

  useEffect(() => {
    // Calculate passenger's age
    if (passenger.tanggalLahir) {
      const birthDate = new Date(passenger.tanggalLahir);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      setPassengerAge(age);
    } else {
      setPassengerAge(null); // Reset passengerAge to null if tanggalLahir is null
    }
  }, [passenger.tanggalLahir]);

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

  const validateAge = () => {
    if (!passenger.tanggalLahir) {
      return true; // Return true if tanggalLahir is null
    }

    if (passengerAge < 2) {
      return true; // Valid bayi
    } else {
      return false; // Tidak sesuai kategori
    }
  };

  useEffect(() => {
    handleInputChange(index, "kategori", "Bayi");
  }, [handleInputChange, index]);

  return (
    <div className="mx-auto w-full bg-white rounded-xl shadow-sm px-6 max-sm:px-4 my-4">
      <div className="w-3/4 pt-10 max-lg:w-full">
        <div className="font-semibold text-lg max-md:text-base">
          Informasi Penumpang {index + 1}{" "}
          <span className="ml-2 text-sm text-gray-500">(Bayi)</span>
        </div>
        <div className="flex  gap-4 pt-4 max-sm:flex-col">
          <div className="relative">
            <div
              onClick={() =>
                handleInputChange(
                  index,
                  "isDropdownOpen",
                  !passenger.isDropdownOpen
                )
              }
              className="flex flex-col gap-2 w-full"
            >
              <div className="text-xs">Jenis Kelamin</div>
              <div className="flex justify-between items-center gap-2 px-4 rounded border-2 border-gray-300 h-14 w-40 max-md:h-12">
                <div className="font-medium text-sm">
                  {passenger.jenisKelamin}
                </div>
                <GoTriangleDown
                  className={`transition ${
                    passenger.isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>
            {passenger.isDropdownOpen && (
              <div className="absolute  w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <a
                  href="#"
                  className="block rounded-md px-4 py-2 text-gray-800/60 hover:bg-gray-300 hover:text-gray-800"
                  onClick={(e) => {
                    e.preventDefault();
                    handleInputChange(index, "jenisKelamin", "Pria");
                    handleInputChange(index, "isDropdownOpen", false);
                  }}
                >
                  <div className="flex items-center gap-x-2">
                    <div>Pria</div>
                  </div>
                </a>
                <a
                  href="#"
                  className="block rounded-md px-4 py-2 text-gray-800/60 hover:bg-gray-300 hover:text-gray-800"
                  onClick={(e) => {
                    e.preventDefault();
                    handleInputChange(index, "jenisKelamin", "Wanita");
                    handleInputChange(index, "isDropdownOpen", false);
                  }}
                >
                  <div className="flex items-center gap-x-2">
                    <div>Wanita</div>
                  </div>
                </a>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 w-full">
            <div className="text-xs">Nama Depan</div>
            <input
              type="text"
              required
              value={passenger.namaDepan}
              onChange={(e) =>
                handleInputChange(index, "namaDepan", e.target.value)
              }
              className="flex font-medium text-sm items-center px-2 rounded border-2 border-gray-300 focus:border-sky-500 focus:outline-none h-12 w-full max-md:h-10"
              placeholder="Nama Depan"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="text-xs">Nama Belakang</div>
            <input
              type="text"
              required
              value={passenger.namaBelakang}
              onChange={(e) =>
                handleInputChange(index, "namaBelakang", e.target.value)
              }
              className="flex font-medium text-sm items-center px-2 rounded border-2 border-gray-300 focus:border-sky-500 focus:outline-none h-12 w-full max-md:h-10"
              placeholder="Nama Belakang"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="text-xs">Tanggal Lahir</div>
            <div className="flex justify-between items-center gap-2 px-4 rounded border-2 border-gray-300 focus:border-sky-500 h-14 w-auto max-md:h-12">
              <DatePicker
                selected={passenger.tanggalLahir}
                onChange={(date) => handleDateChange(date, index)}
                dateFormat="EEE, d MMM yyyy"
                locale={id}
                placeholderText="Tanggal Lahir"
                className="cursor-pointer font-medium text-sm w-full p-1"
              />
              <SlCalender size={20} className="cursor-pointer" />
            </div>
            {validateAge() ? null : (
              <div className="flex items-center gap-2 text-red-500 font-normal text-xs">
                <IoWarning size={20} />
                <div>Umur tidak sesuai kategori</div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-3/4 pt-6 pb-10 max-lg:w-full">
        <div className="font-semibold text-lg max-md:text-base">
          Detail Kontak
        </div>
        <div className="flex items-center gap-4 pt-4">
          <div className="flex flex-col gap-2 w-full">
            <div className="text-xs">NIK</div>
            <input
              type="text"
              required
              value={passenger.nik}
              onChange={(e) => handleInputChange(index, "nik", e.target.value)}
              className="flex justify-between text-sm items-center gap-2 px-4 rounded border-2 border-gray-300 focus:border-sky-500 focus:outline-none h-12 w-full max-md:h-10"
              placeholder="NIK"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="text-xs">No. Handphone</div>
            <input
              type="text"
              required
              value={passenger.nomorHP}
              onChange={(e) =>
                handleInputChange(index, "nomorHP", e.target.value)
              }
              className="flex justify-between text-sm items-center gap-2 px-4 rounded border-2 border-gray-300 focus:border-sky-500 focus:outline-none h-12 w-full max-md:h-10"
              placeholder="+62 8123456789"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
