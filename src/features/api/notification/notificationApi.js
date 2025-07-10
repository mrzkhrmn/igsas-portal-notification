import { igsasApi } from "../baseApi";

export const notificationApi = igsasApi.injectEndpoints({
  endpoints: (build) => ({
    getNotificationCustomerGroup: build.query({
      query: () => ({
        url: "/GetNotificationCustomerGroup",
        method: "GET",
      }),
    }),
    getNotificationCustomerInfo: build.query({
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
} = notificationApi;
