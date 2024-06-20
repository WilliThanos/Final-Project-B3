import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import ReactDOM from "react-dom/client";
import Login from "./pages/Login.jsx";
import Landing from "./pages/Landing.jsx";
import Register from "./pages/Register.jsx";
import Search from "./pages/Search.jsx";
import BookingDetail from "./pages/BookingDetail.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useSelector } from "react-redux";
import Payment from "./pages/Payment.jsx";
import Profile from "./pages/Profile.jsx";
import VerifikasiEmail from "./pages/VerifikasiEmail.jsx";

export const baseApiURL = "https://expressjs-develop-b4d1.up.railway.app/api";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/search",
      element: <Search />,
    },
    {
      path: "/booking-detail",
      element: <BookingDetail />,
    },
    {
      path: "/payment",
      element: <Payment />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/verifikasi-email",
      element: <VerifikasiEmail />,
    },
  ]);

  return (
    <GoogleOAuthProvider clientId="577039318480-keloe0f9dbv0haradhntr0792eu1bfcs.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  );
}