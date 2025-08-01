import { baseApi } from "../baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ name, surname, email, page, pageSize }) => ({
        url: "/User/UserList",
        method: "GET",
        params: { name, surname, email, page, pageSize },
      }),
      providesTags: ["Users"],
    }),
    assignRole: builder.mutation({
      query: (data) => ({
        url: "/User/AssingRole",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useGetUsersQuery, useAssignRoleMutation } = userApi;
