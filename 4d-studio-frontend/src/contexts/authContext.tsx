import axios from "axios";
import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  web3Accounts,
  web3Enable,
  web3FromSource,
} from "@polkadot/extension-dapp";
import { stringToHex } from "@polkadot/util";

interface IContextProvider {
  children: ReactNode;
}

type UserType = {
  address: string;
};

type AuthContextType = {
  user: UserType | null;
  token: string;
  error: string;
  isLoading: boolean;
  signin: () => void;
  signout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: "",
  error: "",
  isLoading: false,
  signin: () => {},
  signout: () => {},
});
AuthContext.displayName = "Auth Context";

const AuthProvider: FC<IContextProvider> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [token, setToken] = useState<string>(
    String(
      localStorage.getItem(String(process.env.REACT_APP_LOCALSTORAGE_TOKEN_KEY))
    )
  );
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!token) return;
    setIsLoading(true);
    setError("");
    axios
      .get(`${process.env.REACT_APP_API_ENDPOINT}/auth/me`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setUser(response?.data?.data?.user);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, [token]);

  const signin = useCallback(async () => {
    const extensions = await web3Enable("my cool dapp");
    if (extensions.length === 0) {
      alert("Please install Polkadot extension.");
      return;
    }
    const allAccounts = await web3Accounts();
    const account = allAccounts[0];
    const injector = await web3FromSource(account.meta.source);
    const signRaw = injector?.signer?.signRaw;
    if (!!signRaw) {
      setError("");
      setIsLoading(true);
      const { signature } = await signRaw({
        address: account.address,
        data: stringToHex(process.env.REACT_APP_MESSAGE_TO_SIGN),
        type: "bytes",
      });

      axios
        .post(`${process.env.REACT_APP_API_ENDPOINT}/auth/signin`, {
          address: account.address,
          message: process.env.REACT_APP_MESSAGE_TO_SIGN,
          signature,
        })
        .then((response) => {
          setToken(response?.data?.data?.token);
          localStorage.setItem(
            String(process.env.REACT_APP_LOCALSTORAGE_TOKEN_KEY),
            response?.data?.data?.token
          );
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error?.response?.data);
          setIsLoading(false);
        });
    }
  }, []);

  const signout = useCallback(() => {
    setUser(null);
    setToken("");
    localStorage.removeItem(
      String(process.env.REACT_APP_LOCALSTORAGE_TOKEN_KEY)
    );
  }, []);

  const value = useMemo(
    () => ({ user, token, isLoading, error, signin, signout }),
    [user, token, isLoading, error, signin, signout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth: () => AuthContextType = () => {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used within AuthProvider");
  return value;
};

export { AuthProvider, useAuth };
