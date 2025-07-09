export const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID,
    authority: import.meta.env.VITE_AZURE_AUTHORITY,
    redirectUri:
      import.meta.env.VITE_AZURE_REDIRECT_URI || window.location.origin,
    postLogoutRedirectUri:
      import.meta.env.VITE_AZURE_POST_LOGOUT_REDIRECT_URI ||
      window.location.origin,
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case "Error":
            console.error(message);
            return;
          case "Info":
            console.info(message);
            return;
          case "Verbose":
            console.debug(message);
            return;
          case "Warning":
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
};

export const loginRequest = {
  scopes: ["user.read"],
  prompt: "select_account",
};
