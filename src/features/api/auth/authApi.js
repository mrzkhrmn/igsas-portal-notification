import { baseApi } from "../baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginWithAzure: builder.mutation({
      query: (token) => ({
        url: "/AuthLogin",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: {},
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/Access/Login",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginWithAzureMutation, useLoginMutation } = authApi;
