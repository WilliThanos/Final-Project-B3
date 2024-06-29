import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { GiAirplaneDeparture, GiAirplaneArrival } from "react-icons/gi";
import { SlCalender } from "react-icons/sl";
import { setFilterClass, setSortHarga } from "../redux/reducers/filterReducer";
import { useDispatch, useSelector } from "react-redux";
import sdgpohon from "../assets/sdgpohon.jpg";
import sdglaut from "../assets/sdglaut.jpg";
import sdgmonyet from "../assets/sdgmonyet.jpg";

export default function SdgCard() {
  const [backgroundImage, setBackgroundImage] = useState(sdgpohon);
  const [textContent, setTextContent] = useState({
    title: "Lestarikan Hutan ",
    description:
      "Ayo Lestarikan Hutan dengan kami! Kami menyisihkan 0,2% dari keuntungan kami untuk mendukung pelestarian hutan, sebagai bagian dari komitmen kami terhadap pelestarian lingkungan.",
  });

  // Daftar gambar dan teks yang akan digunakan
  const imageList = [sdgpohon, sdglaut, sdgmonyet];
  const textList = [
    {
      title: "Lestarikan Hutan ",
      description:
        "Ayo Lestarikan Hutan dengan kami! Kami menyisihkan 0,2% dari keuntungan kami untuk mendukung pelestarian hutan, sebagai bagian dari komitmen kami terhadap pelestarian lingkungan.",
    },
    {
      title: "Jelajahi Keindahan Laut",
      description:
        "Temukan keindahan laut dengan kami! Kami menyisihkan 0,2% dari keuntungan kami untuk mendukung pelestarian laut, sebagai bagian dari komitmen kami terhadap pelestarian lingkungan.",
    },
    {
      title: "Selamatkan Satwa Langka",
      description:
        "Ayo Selamatkan satwa langka bersama kami! Kami menyisihkan 0,2% dari keuntungan kami untuk mendukung pelestarian satwa langka, sebagai bagian dari komitmen kami terhadap pelestarian lingkungan.",
    },
  ];

  // State untuk mengatur indeks gambar dan teks saat ini
  const [currentIndex, setCurrentIndex] = useState(0);

  // Efek untuk mengubah gambar dan teks setiap 3 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageList.length);
    }, 3000);

    return () => clearInterval(interval); // Membersihkan interval saat komponen di-unmount
  }, []);

  // Update gambar dan teks saat indeks berubah
  useEffect(() => {
    setBackgroundImage(imageList[currentIndex]);
    setTextContent(textList[currentIndex]);
  }, [currentIndex]);

  return (
    <div className="w-52 mx-auto bg-white rounded-xl shadow-sm p-4 max-md:mx-0 ">
      <a href="#" className="group relative block h-72 sm:h-96 lg:h-[500px]">
        <span className="absolute inset-0 border rounded-xl bg-[#D9EDFF] border-dashed border-gray-300"></span>

        <div
          className="relative flex w-full h-full transform items-end border rounded-xl border-gray-300 text-white bg-cover bg-center transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2"
          style={{
            backgroundImage: `url('${backgroundImage}')`,
          }}
        >
          {/* Overlay to darken the background */}
          <div className="absolute inset-0 bg-black opacity-50 rounded-xl"></div>

          {/* Content */}
          <div className="relative p-4 pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-10 sm:size-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <h2 className="mt-10 text-lg font-medium max-md:text-md">
              {textContent.title}{" "}
            </h2>
          </div>

          <div className="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-5 lg:p-8">
            <h3 className="mt-4 text-base sm:text-lg font-medium">
              {textContent.title}{" "}
            </h3>

            <p className="mt-4 text-xs sm:text-sm w-full">
              {textContent.description}
            </p>
          </div>
        </div>
      </a>
    </div>
  );
}
