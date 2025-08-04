import { baseApi, loginApi } from "../baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    appLogin: builder.mutation({
      query: (data) => ({
        url: "/Auth/AppLogin",
        method: "POST",
        body: data,
      }),
    }),
    refreshToken: builder.mutation({
      query: (data) => ({
        url: "/Auth/RefreshToken",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const authLogin = loginApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, token }) => ({
        url: "/Auth/Login",
        method: "POST",
        body: { email },
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
  }),
});

export const { useLoginMutation } = authLogin;
export const { useAppLoginMutation, useRefreshTokenMutation } = authApi;
