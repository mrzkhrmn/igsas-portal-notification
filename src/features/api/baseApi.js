import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }) => {
      const loginToken = getState().global.loginToken;
      console.log("loginToken", loginToken);
      headers.set("Authorization", `Bearer ${loginToken}`);
      return headers;
    },
  }),
  endpoints: () => ({}),
});

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }) => {
      const appLoginToken = getState().global.appLoginToken;
      console.log("appLoginToken", appLoginToken);
      headers.set("Authorization", `Bearer ${appLoginToken}`);
      return headers;
    },
  }),
  endpoints: () => ({}),
});
