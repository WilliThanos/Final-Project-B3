import { useEffect, useState } from "react";
import logo from "../assets/weblogo.png";
import bg from "../assets/bg.png";
import NavbarLogoPutih from "../components/Navbar";
import Footer from "../components/Footer";
import FlashMessage from "../components/FlashMessage";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../redux/action/authAction";

export default function ConfirmPassword() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");

  const validatePassword = () => {
    if (newPassword.length < 6) {
      setErrorPassword("Password must be at least 6 characters long");
      return false;
    }
    setErrorPassword("");
    return true;
  };

  const validateConfirmPassword = () => {
    if (confirmPassword !== newPassword) {
      setErrorConfirmPassword("Passwords do not match");
      return false;
    }
    setErrorConfirmPassword("");
    return true;
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    const isValidPassword = validatePassword();
    const isValidConfirmPassword = validateConfirmPassword();
    if (isValidPassword && isValidConfirmPassword) {
      const data = {
        password: newPassword,
        confirmPassword: confirmPassword
      };
      const result = await dispatch(resetPassword({data, token}))
      // Handling the result based on your redux implementation
      if(result) {

      }
      else {

      }
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenParam = params.get('token');
    if(!tokenParam) {
      navigate("/forgot-password")
    }
    setToken(tokenParam);
  }, [location])

  return (
    <div>
      <div
        className="min-h-screen flex items-center justify-center relative bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <NavbarLogoPutih />
        <main className="flex-1 flex items-center justify-center p-6 relative z-10">
          <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-10">
            <div className="text-center">
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Reset Your Password
              </h2>
              <img className="mx-auto h-16 w-auto" src={logo} alt="Logo" />
            </div>

            <form onSubmit={handleResetPassword} className="mt-8 space-y-6">
              <FlashMessage />
              <div>
                <label htmlFor="new-password" className="block text-sm font-medium leading-6 text-gray-700">
                  New Password
                </label>
                <div className="mt-1">
                  <input
                    id="new-password"
                    name="new-password"
                    type="password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    onBlur={validatePassword}
                  />
                  {errorPassword && <p className="text-red-500 text-xs mt-1">{errorPassword}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-gray-700">
                  Confirm New Password
                </label>
                <div className="mt-1">
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    onBlur={validateConfirmPassword}
                  />
                  {errorConfirmPassword && <p className="text-red-500 text-xs mt-1">{errorConfirmPassword}</p>}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2a91e5] hover:bg-[#1e73b5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
