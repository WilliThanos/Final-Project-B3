import { useState } from "react";
import mascot from "../assets/mascot.png";
import logo from "../assets/weblogo.png";
import bg from "../assets/bg.png";
import bgresp from "../assets/bgresp.png";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleForgotPassword = (event) => {
    event.preventDefault();
    // Handle forgot password logic here
  };

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

          <form onSubmit={handleForgotPassword} className="mt-8 space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-700"
              >
                Enter your email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2a91e5] hover:bg-[#1e73b5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Send Reset Link
              </button>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">
                <a
                  href="#"
                  className="font-medium text-[#2a91e5] hover:text-[#1e73b5]"
                >
                  Kembali?
                </a>
              </p>
            </div>
          </form>
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
