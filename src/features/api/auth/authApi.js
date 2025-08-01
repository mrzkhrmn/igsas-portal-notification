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
  }),
});

export const authLogin = loginApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/Auth/Login",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = loginApi;
export const { useAppLoginMutation } = authApi;
