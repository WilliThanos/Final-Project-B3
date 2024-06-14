import React, { useState } from 'react';
import image from '../assets/bg-plane.jpg';
import { BiSolidPlaneAlt, BiSolidPlaneTakeOff, BiSolidPlaneLand } from "react-icons/bi";
import { MdDateRange } from "react-icons/md";
import { FaPersonCircleCheck } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import NavbarLogoPutih from '../components/Navbar';
import Footer from '../components/Footer';

export default function Landing() {
  const [isRoundTrip, setIsRoundTrip] = useState(false);

  const handleOptionChange = (event) => {
    setIsRoundTrip(event.target.value === 'pulang pergi');
  };

  return (
    <div>
      <div className='flex flex-col justify-center items-center py-20 px-10 lg:px-40 bg-cover bg-center bg-no-repeat relative' style={{ backgroundImage: `url(${image})`, height: '90vh' }}>
        <div className='absolute inset-0 bg-black opacity-50'></div>
        <div className='relative z-10'>
          <NavbarLogoPutih />
          <h1 className='text-5xl font-bold text-white text-center leading-tight mt-10'>Rasakan Pengalaman Terbaik Anda Dimulai Dari Kami</h1>
          <p className='text-white opacity-80 text-center mt-4 max-w-2xl mx-auto'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex reprehenderit impedit atque ratione nam iste ea at expedita excepturi! Placeat rem quos veniam libero nemo eveniet dicta dignissimos fugiat quo.</p>
          <div className='bg-white p-8 rounded-xl mt-14 flex flex-col justify-center items-center gap-6 w-full max-w-5xl shadow-2xl'>
            <div className='flex gap-10'>
              <div>
                <label className='font-semibold text-lg'>
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
                <label className='font-semibold text-lg'>
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
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6 w-full'>
              <div className='flex flex-col gap-2'>
                <label className='font-semibold text-lg'>
                  <BiSolidPlaneTakeOff className='inline mr-2' />
                  Asal bandara
                </label>
                <select name="asal" className='p-3 rounded-lg outline-none border border-gray-300'>
                  <option value="" disabled selected>Pilih</option>
                  <option value="bandara1">Bandara 1</option>
                  <option value="bandara2">Bandara 2</option>
                  <option value="bandara3">Bandara 3</option>
                </select>
              </div>
              <div className='flex flex-col gap-2'>
                <label className='font-semibold text-lg'>
                  <BiSolidPlaneLand className='inline mr-2' />
                  Bandara tujuan
                </label>
                <select name="tujuan" className='p-3 rounded-lg outline-none border border-gray-300'>
                  <option value="" disabled selected>Pilih</option>
                  <option value="bandara1">Bandara 1</option>
                  <option value="bandara2">Bandara 2</option>
                  <option value="bandara3">Bandara 3</option>
                </select>
              </div>
              <div className='flex flex-col gap-2'>
                <label className='font-semibold text-lg'>
                  <MdDateRange className='inline mr-2' />
                  Waktu pergi
                </label>
                <input type="date" name="pergi" className='p-3 rounded-lg outline-none border border-gray-300' />
              </div>
              <div className='flex flex-col gap-2'>
                <label className={`font-semibold text-lg ${!isRoundTrip && 'opacity-50'}`}>
                  <MdDateRange className='inline mr-2' />
                  Waktu kembali
                </label>
                <input
                  type="date"
                  name="kembali"
                  className={`p-3 rounded-lg outline-none border border-gray-300 ${!isRoundTrip && 'opacity-50'}`}
                  disabled={!isRoundTrip}
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label className='font-semibold text-lg'>
                  <FaPersonCircleCheck className='inline mr-2' />
                  Kelas kabin & penumpang
                </label>
                <select name="kelas" className='p-3 rounded-lg outline-none border border-gray-300'>
                  <option value="" disabled selected>Pilih</option>
                  <option value="ekonomi">1 Dewasa, ekonomi</option>
                  <option value="premium">2 Dewasa, premium</option>
                  <option value="vip">3 Dewasa, VIP</option>
                </select>
              </div>
              <div className='flex flex-col gap-2 justify-end'>
                <button className='bg-blue-600 text-white p-3 rounded-lg flex items-center text-lg shadow-md hover:bg-blue-700 transition duration-300'>
                  <FaSearch className='inline mr-2' /> Cari
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col md:flex-row items-center mt-16 px-4 lg:px-16'>
        <div className='md:w-2/5 px-10 flex flex-col gap-6'>
          <h2 className='text-4xl font-semibold'>Destinasi terbaik</h2>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus animi minima, ducimus autem quibusdam sequi quis veniam earum similique dolorum dignissimos. Inventore nostrum, magnam minus reprehenderit atque unde distinctio vero?</p>
          <div>
            <button className='bg-blue-600 text-white p-3 rounded-lg px-8 text-lg shadow-md hover:bg-blue-700 transition duration-300'>Discover More</button>
          </div>
        </div>
        <div className='md:w-3/5 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-10'>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
      <Footer />
    </div>
  );
}

function Card() {
  return (
    <div className='shadow-xl rounded-3xl p-4 hover:shadow-2xl transition duration-300'>
      <img src={image} alt="Destination" className='w-full h-64 object-cover rounded-3xl' />
      <div className='flex justify-between items-center mt-4'>
        <div>
          <div className='text-lg'>Tokyo, <span className='text-yellow-500 text-xl font-bold'>Japan</span></div>
          <div className='text-gray-700'>Rs. 24000 onwards.</div>
        </div>
        <div className='p-2 rounded-full border border-yellow-500'>
          <BiSolidPlaneAlt className='text-yellow-500' />
        </div>
      </div>
    </div>
  );
}