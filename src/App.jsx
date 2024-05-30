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

import { GoogleOAuthProvider } from "@react-oauth/google";
import { useSelector } from "react-redux";

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
  ]);

  return (
    <GoogleOAuthProvider clientId="577039318480-keloe0f9dbv0haradhntr0792eu1bfcs.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  );
}
