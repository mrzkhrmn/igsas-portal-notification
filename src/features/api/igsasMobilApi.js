import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../services/apiService";

export const igsasMobilApi = createApi({
  reducerPath: "igsasMobilApi",
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    getNotificationCustomerGroup: builder.query({
      query: () => ({
        url: "/GetNotificationCustomerGroup",
        method: "GET",
      }),
    }),
    getNotificationCustomerInfo: builder.query({
      query: (musGrupId) => ({
        url: `/GetNotificationCustomerInfo?musGrup=${musGrupId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetNotificationCustomerGroupQuery,
  useGetNotificationCustomerInfoQuery,
} = igsasMobilApi;
