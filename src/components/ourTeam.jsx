import React from "react";
import deo from "../assets/deo.jpg";
import wili from "../assets/wili.jpg";
import niko from "../assets/niko.jpg";
import amar from "../assets/amar.jpg";
import { AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import PropTypes from "prop-types";

const people = [
  {
    name: "Nikodemus Hendrojoyo Suryokuncoro",
    role: "Front End Developer",
    imageUrl: niko,
    instagram: "https://www.instagram.com/nikohs__/",
    linkedinUrl:
      "https://www.linkedin.com/in/nikodemus-suryokuncoro-aab5722a3/",
    bio: "Every Man Will Not Be Great, But Every Great Man will Have 4 Wives",
  },
  {
    name: "Deo Septry Wengi",
    role: "Front End Developer",
    imageUrl: deo,
    instagram:
      "https://www.instagram.com/d_septryy?igsh=MXV2bGh1MXExNjh4NQ%3D%3D&utm_source=qr",
    linkedinUrl: "https://www.linkedin.com/in/deo-septry-9a3b132b1/",
    bio: "Mangan, Turu, Ngoding, Mokel, Repeat.",
  },
  {
    name: "William Rayhan Harsono",
    role: "Front End Developer",
    imageUrl: wili,
    instagram: "https://instagram.com/willi.ry",
    linkedinUrl: "https://linkedin.com/in/williamrayhan",
    bio: "A MAN MAKE HIS OWN LUCK!",
  },
  {
    name: "Muhammad Ammar Izzudin",
    role: "Back End Developer",
    imageUrl: amar,
    instagram:
      "https://news.detik.com/berita/d-2444584/aneh-dan-bejat-remaja-di-tasik-mengaku-perkosa-300-ayam",
    linkedinUrl: "https://www.linkedin.com/in/deo-septry-9a3b132b1/",
    bio: "Jagalah Satwa dan Alam Semesta",
  },
  {
    name: "Regis Syawaludin Rifaldi",
    role: "Back End Developer",
    imageUrl:
      "https://media.licdn.com/dms/image/D5603AQEN15h8tlpC0A/profile-displayphoto-shrink_200_200/0/1693289871232?e=2147483647&v=beta&t=RGfJ-5ZC5W_UeDI-rWeZZcxutRdQ7EY6Awz67RA7vQM",
    instagram: "https://www.instagram.com/regissyawaludinrifaldi/",
    linkedinUrl: "https://www.linkedin.com/in/regissyawaludinrifaldi/",
    bio: "Ensuring smooth and efficient server-side operations.",
  },
  {
    name: "Rengga Dwi Pribadii",
    role: "Back End Developer",
    imageUrl:
      "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQQtA0QY4ctimQS7Ztse3ZUFxRsSRiUr4h5nTYg62ARBxo7ojia",
    instagram: "https://www.instagram.com/rengga_dwiphew?igsh=M3FtOXY2Ync2Y2d0",
    linkedinUrl: "https://www.linkedin.com/in/rengga-dwi-4690431a2",
    bio: "Laptop Patah Bukan Penghalangku.",
  },
];

const TeamMemberItem = ({ member }) => (
  <div className="bg-white shadow-2xl rounded-full hover:-translate-y-1 duration-500 max-w-72 h-full min-h-56 min-w-60 p-6 lg:p-8 border">
    <img
      src={member.imageUrl}
      alt={member.name}
      className="max-w-full h-auto rounded-full border-4 p-1 shadow-2xl mx-auto"
      width="120"
    />
    <div className="mt-6">
      <h4 className="text-2xl font-medium mb-1 text-black">{member.name}</h4>
      <p className="mb-4 text-sm text-black">{member.role}</p>
      <p className="opacity-50">{member.bio}</p>
      <div className="mt-6">
        <a
          href={member.instagram}
          className="inline-block opacity-60 transition duration-300 hover:translate-y-1 hover:opacity-100 mr-4 text-black"
        >
          <AiFillInstagram className="w-6 h-6" />
        </a>
        <a
          href={member.linkedinUrl}
          className="inline-block opacity-60 transition duration-300 hover:translate-y-1 hover:opacity-100 text-black"
        >
          <FaLinkedinIn className="w-6 h-6" />
        </a>
      </div>
    </div>
  </div>
);

TeamMemberItem.propTypes = {
  member: PropTypes.object.isRequired,
};

const OurTeam = () => {
  return (
    <section className="py-14 md:py-24 bg-white text-zinc-900">
      <div className="container px-4 mx-auto">
        <div className="flex justify-center mb-6 md:mb-12">
          <div className="max-w-lg text-center">
            <h2 className="text-3xl leading-none font-bold md:text-[45px] mb-4 text-black">
              Kelompok Infotiket.in MSIB Batch 6 Binar Akademi
            </h2>
            <p>
              Kami berkomitmen untuk merevolusi cara Anda memesan dan mengelola
              tiket perjalanan. Dengan semangat inovasi dan fokus pada
              pengalaman pengguna yang luar biasa, kelompok profesional kami
              yang beragam bekerja sama erat untuk menghadirkan solusi terdepan.
              Kami bersatu dengan visi bersama untuk membuat perencanaan
              perjalanan menjadi lebih lancar, efisien, dan menyenangkan bagi
              semua orang.
            </p>
          </div>
        </div>

        <div className=" grid grid-cols-1 md:grid-cols-3 gap-6 text-center pt-6 mx-28 ">
          {people.map((member, i) => (
            <div className=" flex justify-center" key={i}>
              <TeamMemberItem member={member} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
