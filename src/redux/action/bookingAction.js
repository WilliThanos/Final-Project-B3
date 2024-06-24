import axios from "axios";

export const booking = () => async (dispatch, getState) => {
  try {
    const response = await axios.post(
      "http://expressjs-develop-b4d1.up.railway.app/api/v1/auth/verifikasi?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE4MjAzMjgyfQ.PCQvMZBgiO3PaotvcwbXVIkFz2uSGwdK6C0thtr9vAw",
      {
        email: emailData,
        password: passwordData,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("response Booking :>> ", response);
    // dispatch(setToken(responseLogin.data.data.token));
    // if (response?.status === 200) {
    //   //   navigate("/");
    //   //   dispatch(setMessage("Login successful"));
    // }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.message);
      return;
    }
    alert(error.message);
  }
};
