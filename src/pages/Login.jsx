import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import mascot from "../assets/mascot.png";
import logo from "../assets/weblogo.png";
import bg from "../assets/bg.png";
import bgresp from "../assets/bgresp.png";
import NavbarLogoBiru from "../components/Navbar2";
import Footer from "../components/Footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://expressjs-develop-b4d1.up.railway.app/api/v1/auth/masuk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network response was not ok');
      }

      const data = await response.json();

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.data));

      // Show success toast
      toast.success(data.message);

      setTimeout(() => {
        window.location.href = "/landing";
      }, 3000); // Redirect after showing success message
    } catch (error) {
      // Show error toast
      toast.error(error.toString());
    }
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
        <NavbarLogoBiru />
        <main className="flex-1 flex items-center justify-center p-6 relative z-10">
          <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-10">
            <div className="text-center">
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Selamat Datang Di
              </h2>
              <img className="mx-auto h-16 w-auto" src={logo} alt="Logo" />
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
                    href="/register"
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

      {/* ToastContainer for displaying toasts */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
