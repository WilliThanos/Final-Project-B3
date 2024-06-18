// FlashMessage.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../redux/reducers/authReducer";
import Cookies from "js-cookie";

const FlashMessage = () => {
  const dispatch = useDispatch();
  const flashMessage = useSelector((state) => state?.auth?.message);

  useEffect(() => {
    const storedFlashMessage = Cookies.get("flashMessage");
    if (storedFlashMessage) {
      //   dispatch(registerSuccess(storedFlashMessage));
      // localStorage.removeItem('flashMessage');
      Cookies.remove("flashMessage");
    }

    return () => {
      dispatch(clearMessage());
    };
    // if(flashMessage.typeMessage == 'login') {
    //   return () => {
    //     dispatch(clearMessage());
    //   };
    // }
  }, [dispatch]);

  if (!flashMessage) return null;

  return (
    // <div className={`alert alert-${flashMessage.type === 'success' ? 'success' : 'danger'}`} role="alert">
    //   {flashMessage.message}
    // </div>
    <div
      className={
        flashMessage.type === "success"
          ? "flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-white dark:text-green-400 dark:border-green-800"
          : "flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-gray-800 dark:bg-white dark:text-red-400 dark:border-red-800"
      }
      role="alert"
    >
      <svg
        className="flex-shrink-0 inline w-4 h-4 me-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span className="sr-only">Info</span>
      <div>
        <span className="font-medium">{flashMessage.message}</span>
      </div>
    </div>
  );
};

export default FlashMessage;
