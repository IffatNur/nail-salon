import { Auth0Provider } from "@auth0/auth0-react";
import { createContext } from "react";


export const AuthContext = createContext({});


const Auth0ProviderWithNavigate = ({ children }) => {
  // const navigate = useNavigate();
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientID = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;

  // const onRedirectCallback = (appState) => {
  //   navigate(appState?.returnTo || window.location.pathname);
  // };

  if (!(domain && clientID && redirectUri)) {
    return null;
  }
  return (
      <Auth0Provider
        domain={domain}
        clientId={clientID}
        authorizationParams={{ redirect_uri: redirectUri }}
      >
        {children}
      </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;
