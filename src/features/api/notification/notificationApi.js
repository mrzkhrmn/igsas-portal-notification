import { baseApi, igsasApi } from "../baseApi";

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

export const sendNotificationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    sendManuelNotification: build.mutation({
      query: (data) => ({
        url: "/Notification/SendSimple",
        method: "POST",
        body: data,
      }),
    }),
    getCityList: build.mutation({
      query: (data) => ({
        url: "/Dropbox/City/List",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetNotificationCustomerGroupQuery,
  useGetNotificationCustomerInfoQuery,
} = notificationApi;

export const { useSendManuelNotificationMutation, useGetCityListMutation } =
  sendNotificationApi;
