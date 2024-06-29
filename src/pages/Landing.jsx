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
import NavbarLanding from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch } from "react-redux";
import TicketIcon from "../assets/TicketIcon";
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
import { AiOutlineSearch } from "react-icons/ai";
import BangOwi from "../assets/BangOwi.jpeg";
import beachVid from "../assets/beachVid.mp4";
import OurTeam from "../components/ourTeam.jsx";

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

  useEffect(() => {
    dispatch(setRoundTrip(false));
  }, [dispatch]);

  useEffect(() => {
    console.log(inputSearch);
  }, [inputSearch]);

  const jobOpenings = [
    {
      id: 1,
      role: "Mendapatkan Penghargaan Dari Bapak Presiden & Kompas.com",
      href: "#",
      location: "Jakarta, Indonesia",
    },
    {
      id: 2,
      role: "Bekerja Sama Dengan Maskapai Terbaik",
      href: "#",
      description:
        "Layanan wajib didasari Oleh rasa kenyamanan, Maka dari itu kami memastikan pengguna agar mendapatkan tingkat kenyamanan dan layanan terbaik.",
    },
    {
      id: 3,
      role: "Dibangun Dengan Inovasi",
      href: "#",
      description:
        "Memastikan pengguna agar mengerti secara keseluruhan flow penggunaan aplikasi serta memberikan fitur-fitur yang memudahkan pengguna.",
    },
  ];

  return (
    <div>
      <div className="w-full h-screen relative">
        <video
          className="w-full h-full object-cover"
          src={beachVid}
          autoPlay
          loop
          muted
        />
        <div className="absolute w-full h-full top-0 left-0 bg-gray-900/10"></div>
        <NavbarLanding />
        <div className="absolute top-0 w-full h-full flex flex-col justify-center text-center p-4">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10">
            <h1 className="text-5xl font-bold text-center text-white leading-tight mt-10">
              Rasakan Pengalaman Terbaik Anda Dimulai Dari Kami
            </h1>
            <p className="text-white opacity-80 text-center mt-4 max-w-2xl mx-auto">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex
              reprehenderit impedit atque ratione nam iste ea at expedita
              excepturi! Placeat rem quos veniam libero nemo eveniet dicta
              dignissimos fugiat quo.
            </p>
            <div className="flex justify-center mt-10">
              <CariTiketLanding />
            </div>
          </div>
        </div>
      </div>

      <section id="tujuanterbaik" className="bg-white">
        <div className="mx-auto max-w-screen-xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <header className="text-center">
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Tujuan Terbaik
            </h2>

            <p className="mx-auto mt-4 max-w-md text-gray-500">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
              praesentium cumque iure dicta incidunt est ipsam, officia dolor
              fugit natus?
            </p>
          </header>

          <ul className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <li className="bg-gray-900/30">
              <a href="#" className="group relative block">
                <img
                  src="https://travelingwithami.wordpress.com/wp-content/uploads/2012/10/sudirman-night-2.jpg"
                  alt=""
                  className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
                />

                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-medium text-white">
                    Pesona Jakarta Raya
                  </h3>
                </div>
              </a>
            </li>

            <li>
              <a href="#" className="group relative block">
                <img
                  src="https://asset-2.tstatic.net/batam/foto/bank/images/tangkapan-hp_20181019_104504.jpg"
                  alt=""
                  className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
                />

                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-medium text-white">
                    Batam Black Market
                  </h3>
                </div>
              </a>
            </li>

            <li>
              <a href="#" className="group relative block">
                <img
                  src="https://media.tenor.com/WXaUiPSDqHcAAAAM/sigit-rendang-sigit-acumalaka.gif"
                  alt=""
                  className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
                />

                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-medium text-white">
                    Madura Kota Seni
                  </h3>
                </div>
              </a>
            </li>

            <li>
              <a href="#" className="group relative block">
                <img
                  src="https://images.unsplash.com/photo-1624623278313-a930126a11c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                  alt=""
                  className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
                />

                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-medium text-white">
                    Winter Jumpers
                  </h3>
                </div>
              </a>
            </li>
            <li>
              <a href="#" className="group relative block">
                <img
                  src="https://images.unsplash.com/photo-1618898909019-010e4e234c55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                  alt=""
                  className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
                />

                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-medium text-white">
                    Casual Trainers
                  </h3>
                </div>
              </a>
            </li>

            <li className="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
              <a href="#" className="group relative block">
                <img
                  src="https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_1280/v1554180259/r0ufruaisjbs6ijyczea.jpg"
                  alt=""
                  className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
                />

                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-medium text-white">
                    Tempat Wisata Terbaik Di Bali
                  </h3>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section id="maskapai">
        <div className="overflow-hidden bg-white py-32 max-sm:py-10">
          <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
              <div className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Kami Bekerja Sama Dengan Semua Maskapai Terbaik
                </h2>
                <p className="mt-6 text-xl leading-8 text-gray-600">
                  Kualitas layanan kami telah diakui oleh berbagai maskapai
                  terbaik.
                </p>
                <p className="mt-6 text-base leading-7 text-gray-600">
                  Temukan harga tiket pesawat terbaik dari berbagai maskapai
                  terbaik di Indonesia. Kami bekerja sama dengan maskapai
                  terbaik di Indonesia untuk memberikan layanan terbaik bagi
                  Anda.
                </p>
                <div className="mt-10 flex">
                  <a
                    href="#"
                    className="rounded-md bg-sky-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Cari Tiket Sekarang <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
              <div className="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
                <div className="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
                  <img
                    src="https://amartha.com/_next/image/?url=https%3A%2F%2Faccess.amartha.com%2Fuploads%2F9_naga_rusdi_kirana_si_bos_lion_air_group_ddb10e55eb.jpeg&w=1920&q=75"
                    alt="Rusdi Kirana - Lion Air"
                    className="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                  />
                </div>
                <div className="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8">
                  <div className="order-first flex w-64 flex-none justify-end self-end lg:w-auto">
                    <img
                      src="https://cdn0-production-images-kly.akamaized.net/smif8gvAPWOpflXtjZHuvHT21w4=/1200x900/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3446589/original/031856900_1620026885-Super_Air_Jet_6.jpg"
                      alt=""
                      className="aspect-[4/3] w-[24rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                    />
                  </div>
                  <div className="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
                    <img
                      src="https://ulasan.co/wp-content/uploads/2023/06/IMG-20230613-WA0069.jpg"
                      alt=""
                      className="aspect-[7/5] w-[37rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                    />
                  </div>
                  <div className="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
                    <img
                      src="https://i0.wp.com/pinterpoin.com/wp-content/uploads/2020/03/Garuda2.jpeg?fit=1280%2C960&ssl=1"
                      alt=""
                      className="aspect-[4/3] w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section id="mengapakami">
        <div  className="bg-white py-32 max-sm:py-10">

          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto flex max-w-2xl flex-col items-end justify-between gap-16 lg:mx-0 lg:max-w-none lg:flex-row">
              <div className="w-full lg:max-w-lg lg:flex-auto">
                <h2 className="text-3xl font-bold tracking-widest text-gray-900 sm:text-4xl">
                  Mengapa Kami?
                </h2>
                <p className="mt-6 text-xl leading-8 text-gray-600 tracking-widest">
                  Layanan Kami Diakui Oleh Bapak Presiden Indonesia Jokowi Dodo.
                  Tidak hanya itu, kami juga telah mendapatkan penghargaan dari
                  berbagai media ternama di Indonesia.
                </p>
                <img
                  src={BangOwi}
                  alt=""
                  className="mx-10 shadow-xl mt-16 aspect-[6/5] w-full rounded-2xl bg-gray-50 object-cover lg:aspect-auto lg:h-[34.5rem]"
                />
              </div>
              <div className="w-full lg:max-w-xl lg:flex-auto">
                <h3 className="sr-only">Job openings</h3>
                <ul className="-my-8 divide-y divide-gray-100">
                  {jobOpenings.map((opening) => (
                    <li key={opening.id} className="py-8">
                      <dl className="relative flex flex-wrap gap-x-3">
                        <dt className="sr-only">Role</dt>
                        <dd className="w-full flex-none text-lg font-semibold tracking-tight text-gray-900">
                          <a href={opening.href}>
                            {opening.role}
                            <span
                              className="absolute inset-0"
                              aria-hidden="true"
                            />
                          </a>
                        </dd>
                        <dt className="sr-only">Description</dt>
                        <dd className="mt-2 w-full flex-none text-base leading-7 text-gray-600">
                          {opening.description}
                        </dd>
                        <dt className="sr-only">Salary</dt>
                        <dd className="mt-4 text-base font-semibold leading-7 text-gray-900">
                          {opening.salary}
                        </dd>
                        <dt className="sr-only">Location</dt>
                        <dd className="mt-4 flex items-center gap-x-3 text-base leading-7 text-gray-500">
                          <svg
                            viewBox="0 0 2 2"
                            className="h-0.5 w-0.5 flex-none fill-gray-300"
                            aria-hidden="true"
                          >
                            <circle cx={1} cy={1} r={1} />
                          </svg>
                          {opening.location}
                        </dd>
                      </dl>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white">
        <OurTeam />
      </section>

      <Footer />
    </div>
  );
}
