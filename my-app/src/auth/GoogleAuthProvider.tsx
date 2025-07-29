import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CLIENT_ID, SCOPES } from "../../backend/infoSheet";

declare global {
  interface Window {
    gapi: any;
    google: any;
  }
}

interface GoogleProfile {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
  hd?: string;
}

interface AuthContextProps {
  token: string | null;
  isSignedIn: boolean;
  login: () => Promise<string>;
  logout: () => Promise<void>;
  profile: GoogleProfile | null;
}

const AuthContext = createContext<AuthContextProps>({
  token: null,
  isSignedIn: false,
  login: () => Promise.reject("Not implemented"),
  logout: () => Promise.reject("Not implemented"),
  profile: null,
});

export const useGoogleAuth = () => useContext(AuthContext);

export const GoogleAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("google_token"));
  const [isSignedIn, setIsSignedIn] = useState(!!token);
  const [profile, setProfile] = useState<GoogleProfile | null>(() => {
    const cached = localStorage.getItem("google_profile");
    return cached ? JSON.parse(cached) : null;
  });
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const savedToken = localStorage.getItem("google_token");
      const expiry = localStorage.getItem("google_token_expiry");

      const isValid = savedToken && expiry && Date.now() < parseInt(expiry);

      if (isValid) {
        setToken(savedToken);
        setIsSignedIn(true);
        window.gapi?.client?.setToken({ access_token: savedToken });

        const cachedProfile = localStorage.getItem("google_profile");
        if (!cachedProfile) {
          await fetchUserProfile(savedToken);
        }
      } else {
        logout();
      }
    };

    checkAuth();
  }, [location.pathname]);

  useEffect(() => {
    const loadScripts = () => {
      if (!document.getElementById("gapiScript")) {
        const script = document.createElement("script");
        script.id = "gapiScript";
        script.src = "https://apis.google.com/js/api.js";
        script.async = true;
        script.onload = () => {
          window.gapi.load("client", () => {
            window.gapi.client.init({
              discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
            });
          });
        };
        document.body.appendChild(script);
      }

      if (!document.getElementById("gsiScript")) {
        const script = document.createElement("script");
        script.id = "gsiScript";
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        document.body.appendChild(script);
      }
    };

    loadScripts();
  }, []);

  const fetchUserProfile = async (token: string) => {
    const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const profile = await response.json();
    setProfile(profile);
    localStorage.setItem("google_profile", JSON.stringify(profile))
    // sub Marc: 116048401846703160036
  };


  const login = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      const tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: async (response: { access_token?: string }) => {
          if (response.access_token) {
            const expiryTime = Date.now() + 3600 * 1000;
            setToken(response.access_token);
            setIsSignedIn(true);
            localStorage.setItem("google_token", response.access_token);
            localStorage.setItem("google_token_expiry", expiryTime.toString());
            window.gapi.client.setToken({ access_token: response.access_token });
            await fetchUserProfile(response.access_token);
            resolve(response.access_token); // <- ✅ importante
          } else {
            reject("No se recibió access_token");
          }
        },
      });

      tokenClient.requestAccessToken();
    });
  };

  const logout = (): Promise<void> => {
    return new Promise((resolve, _) => {
      setToken(null);
      setIsSignedIn(false);
      setProfile(null);
      localStorage.removeItem("google_token");
      localStorage.removeItem("google_token_expiry");
      localStorage.removeItem("google_profile");
      window.gapi?.client?.setToken(null);
      resolve()
    });
  };

  return (
    <AuthContext.Provider value={{ token, isSignedIn, login, logout, profile }}>
      {children}
    </AuthContext.Provider>
  );
};
