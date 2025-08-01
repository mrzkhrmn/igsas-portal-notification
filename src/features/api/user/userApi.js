import { baseApi } from "../baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.mutation({
      query: (data) => ({
        url: "/User/List",
        method: "POST",
        body: data,
      }),
    }),
    assignRole: builder.mutation({
      query: (data) => ({
        url: "/User/AssingRole",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetUsersMutation, useAssignRoleMutation } = userApi;
