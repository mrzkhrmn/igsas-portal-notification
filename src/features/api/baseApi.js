import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || "/api",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
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
        `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IklHTU9fMjgwMl9Vc2VyIiwicm9sZSI6IklHTU9fMjgwMl9Vc2VyIiwibmJmIjoxNzUyMTA1MzEyLCJleHAiOjE3NTIxMDg5MTIsImlhdCI6MTc1MjEwNTMxMn0.pFjS8P2BKahrF3DS5xNyTHNtQlWJLYdVErEaZ_EuwSM`
      );
      return headers;
    },
  }),
  endpoints: () => ({}),
});
