import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const status = params.get("status");
    const message = params.get("message");
    const user = params.get("user");
    const token = params.get("token");

    console.log("status:", status);
    console.log("message:", message);
    console.log("user:", user);
    console.log("token:", token);

    if (status && token && user) {
      const data = JSON.parse(decodeURIComponent(user));
      // Simpan token dan data pengguna di localStorage atau state management lainnya
      console.log("Login successful:", user);

      // localStorage.setItem("userData", JSON.stringify(data));
      // localStorage.setItem("authToken", token);
      // Redirect ke halaman utama atau halaman yang ditentukan
      navigate("/");
    } else {
      // Handle error case
      console.error("Login failed:");
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default AuthCallback;
