import { useState } from "react";

export const useToken = () => {
  const [token, setInternalToken] = useState(() => {
    return localStorage.getItem("jwtToken");
  });

  const setToken = (newToken) => {
    localStorage.setItem("jwtToken", newToken);
    setInternalToken(newToken);
  };

  return [token, setToken];
};
