import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import ReactDOM from "react-dom/client";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Search from "./pages/Search.jsx";
import BookingDetail from "./pages/BookingDetail.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useSelector } from "react-redux";
import Payment from "./pages/Payment.jsx";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
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
  ]);

  return (
    <GoogleOAuthProvider clientId="577039318480-keloe0f9dbv0haradhntr0792eu1bfcs.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  );
}
