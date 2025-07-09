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
  }),
});

export const { useLoginWithAzureMutation } = authApi;
