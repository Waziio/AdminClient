/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import AuthService from "../services/AuthService";

export default function AuthRoute({ component }) {
  const [isJwtValid, setIsJwtValid] = useState(true);

  async function checkJwtValidity() {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      const now = Date.now() / 1000;
      const delayBeforeExpiration = 5 * 60;
      // If token will expire in 5 min
      if (decodedToken?.exp && decodedToken?.exp - now < delayBeforeExpiration) {
        const authService = new AuthService();
        const data = await authService.renew(token);
        if (data && data?.token) {
          const renewToken = data?.token;
          // Replace expired token by a new token
          localStorage.removeItem("accessToken");
          localStorage.setItem("accessToken", renewToken);
        } else {
          setIsJwtValid(false);
        }
      }
    } else {
      setIsJwtValid(false);
    }
  }

  useEffect(() => {
    checkJwtValidity();
  }, []);

  return isJwtValid ? component : <Navigate to="/signin" />;
}
