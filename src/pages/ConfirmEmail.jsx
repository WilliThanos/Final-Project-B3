import { useState } from "react";
import mascot from "../assets/mascot.png";
import logo from "../assets/weblogo.png";
import bg from "../assets/bg.png";
import bgresp from "../assets/bgresp.png";
import emailLogo from "../assets/gmail.gif";

export default function ConfirmEmail() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-cover bg-center" style={{ backgroundImage: `url(${bg})` }}>
      <div className="absolute inset-0 opacity-80 md:opacity-0" style={{ backgroundImage: `url(${bgresp})`}}></div>
      <main className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-10">
          <div className="text-center">
            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Forgot Password
            </h2>
            <img className="mx-auto h-16 w-auto" src={logo} alt="Logo" />
          </div>

          <h3 className="mt-8 font-medium leading-9 text-center tracking-tight text-gray-900">
            Kami telah mengirimkan e-mail konfirmasi ke Email Anda.
            <div className="mt-4 flex justify-center">
            <img className=" h-12 w-auto" src={emailLogo} alt="Email Logo" />
          </div>
            Silahkan cek e-mail Anda dan klik link konfirmasi untuk melanjutkan.
          </h3>
          <div className="text-center mt-8">
              <p className="text-sm text-gray-600">
                <a
                  href="#"
                  className="font-medium text-[#2a91e5] hover:text-[#1e73b5]"
                >
                  Kembali?
                </a>
              </p>
            </div>
        </div>
        
      </main>
      <div className="hidden lg:block lg:w-1/2">
        <img
          className="h-4/6 w-4/6 object-contain ml-52"
          src={mascot}
          alt="Mascot"
        />
      </div>
    </div>
  );
}
