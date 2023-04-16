import { useEffect, useState } from "react";
import { useToken } from "./useToken";
import { Buffer } from "buffer";

export const useUser = () => {
  const [token] = useToken();

  const getPayLoadFromToken = (token) => {
    const encodedPayload = token.split(".")[1];
    return JSON.parse(Buffer.from(encodedPayload, "base64"));
  };

  const [user, setUser] = useState(() => {
    if (!token) return null;
    return getPayLoadFromToken(token);
  });

  useEffect(() => {
    if (!token) {
      setUser(null);
    } else {
      setUser(getPayLoadFromToken(token));
    }
  }, [token]);

  return [user];
};
