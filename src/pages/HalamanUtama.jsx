import React, { useState } from 'react';
import image from '../assets/bg-plane.jpg';
import { BiSolidPlaneAlt, BiSolidPlaneTakeOff, BiSolidPlaneLand } from "react-icons/bi";
import { MdDateRange } from "react-icons/md";
import { FaUserCheck, FaSearch } from "react-icons/fa";

export default function HalamanUtama() {
  const [isRoundTrip, setIsRoundTrip] = useState(false);

  const handleOptionChange = (event) => {
    setIsRoundTrip(event.target.value === 'pulang pergi');
  };

  return (
    <div>
      <div className='flex flex-col justify-center items-center py-40 px-10 lg:px-40 bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${image})` }}>
        <h1 className='text-4xl font-semibold text-white'>Rasakan Pengalaman Terbaik Anda Dimulai Dari Kami</h1>
        <p className='text-white opacity-80 mt-4'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex reprehenderit impedit atque ratione nam iste ea at expedita excepturi! Placeat rem quos veniam libero nemo eveniet dicta dignissimos fugiat quo.</p>
        <div className='bg-white p-4 rounded-xl mt-14 flex flex-col justify-center items-center gap-4 py-8 px-10'>
          <div className='flex gap-10 pb-5'>
            <div>
              <label className='font-semibold'>
                <input
                  type="radio"
                  name="option"
                  value="pergi"
                  className='mr-2'
                  checked={!isRoundTrip}
                  onChange={handleOptionChange}
                />
                Pergi
              </label>
            </div>
            <div>
              <label className='font-semibold'>
                <input
                  type="radio"
                  name="option"
                  value="pulang pergi"
                  className='mr-2'
                  checked={isRoundTrip}
                  onChange={handleOptionChange}
                />
                Pulang pergi
              </label>
            </div>
          </div>
          <div className='flex flex-col xl:flex-row gap-4 items-center'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4'>
              <div className='flex flex-col gap-2'>
                <label className='font-semibold'>
                  <BiSolidPlaneTakeOff className='inline mr-2' />
                  Asal bandara
                </label>
                <select name="asal" className='p-2 rounded-lg outline-none border border-black border-opacity-10'>
                  <option value="" disabled selected className="bg-gray-200">Pilih</option>
                  <option value="bandara1" className="bg-white">Bandara 1</option>
                  <option value="bandara2" className="bg-white">Bandara 2</option>
                  <option value="bandara3" className="bg-white">Bandara 3</option>
                </select>
              </div>
              <div className='flex flex-col gap-2'>
                <label className='font-semibold'>
                  <BiSolidPlaneLand className='inline mr-2' />
                  Bandara tujuan
                </label>
                <select name="tujuan" className='p-2 rounded-lg outline-none border border-black border-opacity-10'>
                  <option value="" disabled selected>Pilih</option>
                  <option value="bandara1">Bandara 1</option>
                  <option value="bandara2">Bandara 2</option>
                  <option value="bandara3">Bandara 3</option>
                </select>
              </div>
              <div className='flex flex-col gap-2'>
                <label className='font-semibold'>
                  <MdDateRange className='inline mr-2' />
                  Waktu pergi
                </label>
                <input type="date" name="pergi" className='p-2 rounded-lg outline-none border border-black border-opacity-10' />
              </div>
              <div className='flex flex-col gap-2'>
                <label className={`font-semibold ${!isRoundTrip && 'opacity-50'}`}>
                  <MdDateRange className='inline mr-2' />
                  Waktu kembali
                </label>
                <input
                  type="date"
                  name="kembali"
                  className={`p-2 rounded-lg outline-none border border-black border-opacity-10 ${!isRoundTrip && 'opacity-50'}`}
                  disabled={!isRoundTrip}
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label className='font-semibold'>
                  <FaUserCheck className='inline mr-2' />
                  Kelas kabin & penumpang
                </label>
                <select name="kelas" className='p-2 rounded-lg outline-none border border-black border-opacity-10'>
                  <option value="" disabled selected>Pilih</option>
                  <option value="ekonomi">1 Dewasa, ekonomi</option>
                  <option value="premium">2 Dewasa, premium</option>
                  <option value="vip">3 Dewasa, VIP</option>
                </select>
              </div>
            </div>
            <div className='w-full xl:w-auto'>
              <button className='bg-blue-500 text-white p-2 rounded-lg w-full'>
                <FaSearch className='inline' />
                Cari
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col md:flex-row items-center mt-10 px-4 lg:px-16'>
        <div className='md:w-2/5 px-10 flex flex-col gap-4'>
          <h2 className='text-3xl font-semibold'>Destinasi terbaik</h2>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus animi minima, ducimus autem quibusdam sequi quis veniam earum similique dolorum dignissimos. Inventore nostrum, magnam minus reprehenderit atque unde distinctio vero?</p>
          <div>
            <button className='bg-blue-500 text-white p-2 rounded-lg px-8'>Discover More</button>
          </div>
        </div>
        <div className='md:w-3/5 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10 md:gap-4 mt-5 md:mt-5'>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className='rounded-3xl p-4'>
      <img src={image} alt="" className='w-56 h-64 fill rounded-3xl' />
      <div className='flex justify-between items-center mt-2'>
        <div>
          <div>Tokyo, <span className='text-yellow-500 text-xl font-bold'>Japan</span></div>
          <div>Rs. 24000 onwards.</div>
        </div>
        <div className='p-2 rounded-full border border-yellow-500'>
          <BiSolidPlaneAlt className='text-yellow-500' />
        </div>
      </div>
    </div>
  );
}