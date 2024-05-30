import { useState } from "react";
import mascot from "../assets/mascot.png";
import logo from "../assets/weblogo.png";
import bg from "../assets/bg.png";
import bgresp from "../assets/bgresp.png";
import NavbarLogoBiru from "../components/Navbar2";
import NavbarLogoPutih from "../components/Navbar";
import Footer from "../components/Footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    // Handle login logic here
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRememberMeToggle = () => {
    setRememberMe(!rememberMe);
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
                Selamat Datang Di
              </h2>
              <img className="mx-auto h-16 w-auto" src={logo} alt="Logo" />
              <a
                href="#"
                className="shadow-2xl mt-11 flex w-full items-center justify-center gap-3 rounded-md px-3 py-1.5 text-black bg-gradient-to-r focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:from-white hover:to-blue-200"
              >
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  ></path>
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  ></path>
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                </svg>
                <span className="text-sm font-semibold leading-6">
                  Continue With Google
                </span>
              </a>

              <svg
                className="w-auto mt-10"
                viewBox="0 0 673 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line y1="10.5" x2="292" y2="10.5" stroke="#BFBFBF" />
                <line x1="385" y1="10.5" x2="673" y2="10.5" stroke="#BFBFBF" />
                <path
                  d="M333.288 17.112C332.253 17.112 331.309 16.872 330.456 16.392C329.603 15.9013 328.925 15.224 328.424 14.36C327.933 13.4853 327.688 12.504 327.688 11.416C327.688 10.328 327.933 9.352 328.424 8.488C328.925 7.61333 329.603 6.936 330.456 6.456C331.309 5.96533 332.253 5.72 333.288 5.72C334.333 5.72 335.283 5.96533 336.136 6.456C336.989 6.936 337.661 7.608 338.152 8.472C338.643 9.336 338.888 10.3173 338.888 11.416C338.888 12.5147 338.643 13.496 338.152 14.36C337.661 15.224 336.989 15.9013 336.136 16.392C335.283 16.872 334.333 17.112 333.288 17.112ZM333.288 15.848C334.067 15.848 334.765 15.6667 335.384 15.304C336.013 14.9413 336.504 14.424 336.856 13.752C337.219 13.08 337.4 12.3013 337.4 11.416C337.4 10.52 337.219 9.74133 336.856 9.08C336.504 8.408 336.019 7.89067 335.4 7.528C334.781 7.16533 334.077 6.984 333.288 6.984C332.499 6.984 331.795 7.16533 331.176 7.528C330.557 7.89067 330.067 8.408 329.704 9.08C329.352 9.74133 329.176 10.52 329.176 11.416C329.176 12.3013 329.352 13.08 329.704 13.752C330.067 14.424 330.557 14.9413 331.176 15.304C331.805 15.6667 332.509 15.848 333.288 15.848ZM346.682 17L344.026 12.44H342.266V17H340.81V5.848H344.41C345.253 5.848 345.962 5.992 346.538 6.28C347.125 6.568 347.562 6.95733 347.85 7.448C348.138 7.93867 348.282 8.49867 348.282 9.128C348.282 9.896 348.058 10.5733 347.61 11.16C347.173 11.7467 346.511 12.136 345.626 12.328L348.426 17H346.682ZM342.266 11.272H344.41C345.199 11.272 345.791 11.08 346.186 10.696C346.581 10.3013 346.778 9.77867 346.778 9.128C346.778 8.46667 346.581 7.95467 346.186 7.592C345.802 7.22933 345.21 7.048 344.41 7.048H342.266V11.272Z"
                  fill="#2F2F2F"
                />
              </svg>
            </div>

            <form onSubmit={handleLogin} className="mt-8 space-y-6">
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
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                    <button
                      type="button"
                      className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M18.364 5.636a6 6 0 00-8.485 0M20.485 9.05a9 9 0 00-12.728 0M2 12h0M22 12h0M18.364 18.364a6 6 0 01-8.485 0M9.05 20.485a9 9 0 01-6.364-6.364M12 22v0"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 rounded"
                    checked={rememberMe}
                    onChange={handleRememberMeToggle}
                  />

                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-[#2a91e5] hover:text-[#1e73b5]"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2a91e5] hover:bg-[#1e73b5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </button>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Belum Punya Akun?{" "}
                  <a
                    href="#"
                    className="font-medium text-[#2a91e5] hover:text-[#1e73b5]"
                  >
                    Register
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
