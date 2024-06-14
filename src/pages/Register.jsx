import { useEffect, useState } from "react";
import mascot from "../assets/mascot.png";
import logo from "../assets/weblogo.png";
import bg from "../assets/bg.png";
import bgresp from "../assets/bgresp.png";
import NavbarLogoBiru from "../components/Navbar2";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/action/authAction";
import FlashMessage from "../components/FlashMessage";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const error = authState.error;
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorFirstName, setErrorFirstName] = useState("");
  const [errorLastName, setErrorLastName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");

  const validateFirstName = () => {
    if (firstName.trim() === "") {
      setErrorFirstName("First name is required");
      return false;
    }
    setErrorFirstName("");
    return true;
  };

  const validateLastName = () => {
    if (lastName.trim() === "") {
      setErrorLastName("Last name is required");
      return false;
    }
    setErrorLastName("");
    return true;
  };

  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setErrorEmail("Invalid email address");
      return false;
    }
    setErrorEmail("");
    return true;
  };

  const validatePassword = () => {
    if (password.length < 6) {
      setErrorPassword("Password must be at least 6 characters long");
      return false;
    }
    setErrorPassword("");
    return true;
  };

  const validateConfirmPassword = () => {
    if (password !== confirmPassword) {
      setErrorConfirmPassword("Passwords do not match");
      return false;
    }
    setErrorConfirmPassword("");
    return true;
  };
  
  const handleRegister = async (event) => {
    event.preventDefault();
    // Handle registration logic here
    const isValidFirstName = validateFirstName();
    const isValidLastName = validateLastName();
    const isValidEmail = validateEmail();
    const isValidPassword = validatePassword();
    const isValidConfirmPassword = validateConfirmPassword();
    if (isValidFirstName &&
      isValidLastName &&
      isValidEmail &&
      isValidPassword &&
      isValidConfirmPassword) {
      const userData = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        confirmPassword: confirmPassword
      };
      const result = await dispatch(register(userData));

      if(result.payload) {
        setFirstName("")
        setLastName("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
      }
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
              <FlashMessage />
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
                      onBlur={validateFirstName}
                    />
                    {errorFirstName && (
                      <p className="text-red-500 text-xs mt-1">{errorFirstName}</p>
                    )}
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
                      onBlur={validateLastName}
                    />
                    {errorLastName && (
                      <p className="text-red-500 text-xs mt-1">{errorLastName}</p>
                    )}
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
                    onBlur={validateEmail}
                  />
                  {errorEmail && (
                      <p className="text-red-500 text-xs mt-1">{errorEmail}</p>
                    )}
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
                    onBlur={validatePassword}
                  />
                  {errorPassword && (
                      <p className="text-red-500 text-xs mt-1">{errorPassword}</p>
                    )}
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
                    onBlur={validateConfirmPassword}
                  />
                  {errorConfirmPassword && (
                      <p className="text-red-500 text-xs mt-1">{errorConfirmPassword}</p>
                    )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2a91e5] hover:bg-[#1e73b5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Register
                </button>
                {/* {authState.loading && <p>Loading...</p>}
                {authState.error && <p>Error: {authState.error}</p>}
                {authState.user && <p>Registration successful!</p>} */}
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Sudah Punya Akun?{" "}
                  <a
                    href="/"
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
