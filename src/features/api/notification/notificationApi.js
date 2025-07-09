import { igsasApi } from "../baseApi";

export const notificationApi = igsasApi.injectEndpoints({
  endpoints: (build) => ({
    getNotificationCustomerGroup: build.query({
      query: () => ({
        url: "/GetNotificationCustomerGroup",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetNotificationCustomerGroupQuery } = notificationApi;
