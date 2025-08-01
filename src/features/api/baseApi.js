import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setLoginToken } from "../global/globalSlice";

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }) => {
      const loginToken = getState().global.loginToken;
      console.log("loginToken", loginToken);
      if (loginToken) {
        headers.set("Authorization", `Bearer ${loginToken}`);
      }
      return headers;
    },
  });

  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    console.log("401 hatası alındı, token refresh deneniyor...");

    const refreshToken = api.getState().global.refreshToken;

    if (refreshToken) {
      // Refresh token ile yeni token almaya çalış
      const refreshResult = await baseQuery(
        {
          url: "/Auth/RefreshToken",
          method: "POST",
          body: { refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult?.data?.isSuccess) {
        // Yeni token'ı store'a kaydet
        api.dispatch(setLoginToken(refreshResult.data.data.accessToken));

        // Orijinal isteği yeni token ile tekrar yap
        result = await baseQuery(args, api, extraOptions);
      } else {
        // Refresh token geçersiz, kullanıcıyı login sayfasına yönlendir
        console.log("Refresh token geçersiz, çıkış yapılıyor...");
        api.dispatch(logout());
        window.location.href = "/login";
      }
    } else {
      // Refresh token yok, kullanıcıyı login sayfasına yönlendir
      console.log("Refresh token bulunamadı, çıkış yapılıyor...");
      api.dispatch(logout());
      window.location.href = "/login";
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }) => {
      const appLoginToken = getState().global.appLoginToken;
      console.log("appLoginToken", appLoginToken);
      if (appLoginToken) {
        headers.set("Authorization", `Bearer ${appLoginToken}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
