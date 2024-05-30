// components/GoogleLogin.js
import React from 'react';
import { GoogleLogin } from 'react-google-login';

const clientId = 'YOUR_GOOGLE_CLIENT_ID';  // Ganti dengan Client ID Anda

const GoogleLoginButton = ({ buttonText }) => {
  const onSuccess = (response) => {
    console.log('[Login Success] currentUser:', response.profileObj);
    // Tambahkan logika yang diperlukan setelah login berhasil
  };

  const onFailure = (response) => {
    console.log('[Login Failed] response:', response);
    // Tambahkan logika yang diperlukan setelah login gagal
  };

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText={buttonText}
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
      style={{ marginTop: '100px' }}
      className="google-login-button"
    />
  );
};

export default GoogleLoginButton;
