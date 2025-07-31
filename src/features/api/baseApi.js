import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }) => {
      const panelOidToken = getState().global.panelOidToken;
      headers.set("Authorization", `Bearer ${panelOidToken}`);
      return headers;
    },
  }),
  endpoints: () => ({}),
});
