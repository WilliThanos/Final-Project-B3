import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setUser, setToken, setMessage } from "../redux/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";

const AuthCallback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cekState = useSelector((state) => state);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const status = params.get("status");
    const message = params.get("message");
    const user = params.get("user");
    const token = params.get("token");

    if (status && token && user) {
      const decodedUser = decodeURIComponent(user);
      const data = JSON.parse(decodedUser);
      const messageLogin = JSON.parse(message);
      // Simpan token dan data pengguna di localStorage atau state management lainnya
      console.log("user:", user);

      console.log("userData", data);
      console.log("token", token);
      console.log("message:", messageLogin);
      dispatch(setToken(token));
      dispatch(setUser(data));
      dispatch(setMessage(messageLogin));

      // Redirect ke halaman utama atau halaman yang ditentukan
      navigate("/");
    } else {
      // Handle error case
      console.error("Login failed:");
    }
  }, [navigate]);
  console.log("cekState :>> ", cekState);

  return <div>Loading...</div>;
};

export default AuthCallback;
