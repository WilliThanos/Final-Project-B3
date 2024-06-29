import React, { useState } from "react";
import deo from "../assets/deo.jpg";
import wili from "../assets/wili.jpg";
import niko from "../assets/niko.jpg";
import amar from "../assets/amar.jpg";
import { AiFillInstagram } from "react-icons/ai";

const people = [
  {
    name: "Deo Septry Wengi",
    role: "Frond End Developer",
    imageUrl: deo,
    instagram:
      "https://www.instagram.com/d_septryy?igsh=MXV2bGh1MXExNjh4NQ%3D%3D&utm_source=qr ",
    linkedinUrl: "https://www.linkedin.com/in/deo-septry-9a3b132b1/",
  },
  {
    name: "Nikodemus Hendrojoyo Suryokuncoro",
    role: "Frond End Developer",
    imageUrl: niko,
    instagram: "https://www.instagram.com/nikohs__/ ",
    linkedinUrl:
      "https://www.linkedin.com/in/nikodemus-suryokuncoro-aab5722a3/",
  },
  {
    name: "WILLIAM RAYHAN HARSONO",
    role: "Frond End Developer",
    imageUrl: wili,
    instagram: "https://instagram.com/willi.ry",
    linkedinUrl: "https://linkedin.com/in/williamrayhan",
  },
  {
    name: "Muhammad Ammar Izzudin",
    role: "Back End Developer",
    imageUrl: amar,
    instagram:
      "https://news.detik.com/berita/d-2444584/aneh-dan-bejat-remaja-di-tasik-mengaku-perkosa-300-ayam ",
    linkedinUrl: "https://www.linkedin.com/in/deo-septry-9a3b132b1/",
  },
  {
    name: "Regis Syawaludin Rifaldi",
    role: "Back End Developer",
    imageUrl: amar,
    instagram: "https://www.instagram.com/regissyawaludinrifaldi/ ",
    linkedinUrl: "https://www.linkedin.com/in/regissyawaludinrifaldi/",
  },
  {
    name: "Rengga Dwi Pribadii",
    role: "Back End Developer",
    imageUrl: amar,
    instagram:
      "https://www.instagram.com/rengga_dwiphew?igsh=M3FtOXY2Ync2Y2d0 ",
    linkedinUrl: "https://www.linkedin.com/in/rengga-dwi-4690431a2",
  },
];

export default function OurTeam() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl max-sm:text-2xl font-bold">
          Kelompok Infotiket.in MSIB Batch 6 Binar Akademi
        </h1>
        <p className="text-gray-600 mt-4 text-base">
          Kami berkomitmen untuk merevolusi cara Anda memesan dan mengelola
          tiket perjalanan. Dengan semangat inovasi dan fokus pada pengalaman
          pengguna yang luar biasa, kelompok profesional kami yang beragam
          bekerja sama erat untuk menghadirkan solusi terdepan. Kami bersatu
          dengan visi bersama untuk membuat perencanaan perjalanan menjadi lebih
          lancar, efisien, dan menyenangkan bagi semua orang.
        </p>
      </div>

      <div className="bg-white">
        <div className=" max-w-7xl mx-auto py-5 px-4 text-center sm:px-6 lg:px-8 lg:py-10">
          <div className="space-y-12">
            <ul
              role="list"
              className="mx-auto space-y-16 sm:grid sm:grid-cols-2 sm:gap-16 sm:space-y-0 lg:grid-cols-3 lg:max-w-5xl"
            >
              {people.map((person) => (
                <li key={person.name}>
                  <div className="space-y-6">
                    <img
                      className="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56"
                      src={person.imageUrl}
                      alt=""
                    />
                    <div className="space-y-2">
                      <div className="text-lg leading-6 font-medium space-y-1">
                        <h3>{person.name}</h3>
                        <p className="text-blue-500">{person.role}</p>
                      </div>
                      <ul
                        role="list"
                        className="flex justify-center items-center space-x-5"
                      >
                        <li>
                          <a
                            href={person.instagram}
                            className="text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">Instagram</span>

                            <AiFillInstagram className="w-6 h-6" />
                          </a>
                        </li>
                        <li>
                          <a
                            href={person.linkedinUrl}
                            className="text-gray-400 hover:text-gray-500 "
                          >
                            <span className="sr-only">LinkedIn</span>
                            <svg
                              className="w-5 h-5"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
