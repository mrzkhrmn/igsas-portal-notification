import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().global.idToken;
      headers.set("Content-Type", "application/json");
      headers.set("Authorization", token);
      return headers;
    },
  }),
  endpoints: () => ({}),
});

export const igsasApi = createApi({
  reducerPath: "igsasApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/Igmo",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set(
        "Authorization",
        `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IklHTU9fMjgwMl9Vc2VyIiwicm9sZSI6IklHTU9fMjgwMl9Vc2VyIiwibmJmIjoxNzUyNjc0MTYyLCJleHAiOjE3NTI2Nzc3NjIsImlhdCI6MTc1MjY3NDE2Mn0.K_jYfdpAJlwlpfvU_WWcdAgYHIw9gwg8ESzGBrG3dYE`
      );
      return headers;
    },
  }),
  endpoints: () => ({}),
});
