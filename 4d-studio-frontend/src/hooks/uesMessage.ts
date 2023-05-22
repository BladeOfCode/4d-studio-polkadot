import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../contexts/authContext";

type MessageType = {
  message: string;
  error: string;
  isLoading: boolean;
};

export function useMessage(): MessageType {
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { token } = useAuth();

  useEffect(() => {
    setMessage("");
    setError("");
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_ENDPOINT}/secret`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setMessage(response?.data?.data?.secret);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error?.response?.data);
        setIsLoading(false);
      });
  }, [token]);

  const value = useMemo<MessageType>(
    () => ({
      message,
      error,
      isLoading,
    }),
    [error, isLoading, message]
  );

  return value;
}
