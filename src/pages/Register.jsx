import { useState } from "react";
import mascot from "../assets/mascot.png";
import logo from "../assets/weblogo.png";
import bg from "../assets/bg.png";
import bgresp from "../assets/bgresp.png";
import NavbarLogoBiru from "../components/Navbar2";
import Footer from "../components/Footer";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (event) => {
    event.preventDefault();
    // Handle registration logic here
    if (password === confirmPassword) {
      // Proceed with registration
    } else {
      // Show error message for password mismatch
    }
  };

  return (
    <div>
      <div
        className="min-h-screen flex items-center justify-center relative bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div
          className="absolute inset-0 opacity-80 md:opacity-0"
          style={{ backgroundImage: `url(${bgresp})` }}
        ></div>
        <main className="flex-1 flex items-center justify-center p-6 relative z-10">
          <NavbarLogoBiru />
          <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-10">
            <div className="text-center">
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Register
              </h2>
              <img className="mx-auto h-16 w-auto" src={logo} alt="Logo" />
            </div>

            <form onSubmit={handleRegister} className="mt-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-700"
                  >
                    First Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="first-name"
                      name="first-name"
                      type="text"
                      autoComplete="given-name"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-gray-700"
                  >
                    Last Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="last-name"
                      name="last-name"
                      type="text"
                      autoComplete="family-name"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={lastName}
                      onChange={(event) => setLastName(event.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-700"
                >
                  Email address
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
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium leading-6 text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2a91e5] hover:bg-[#1e73b5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Register
                </button>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Sudah Punya Akun?{" "}
                  <a
                    href="#"
                    className="font-medium text-[#2a91e5] hover:text-[#1e73b5]"
                  >
                    Login
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
      <Footer />
    </div>
  );
}
