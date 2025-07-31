import { baseApi } from "../baseApi";

export const sendNotificationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    sendManuelNotification: build.mutation({
      query: (data) => ({
        url: "/Notification/SendSimple",
        method: "POST",
        body: data,
      }),
    }),
    sendManuelNotificationWithExcel: build.mutation({
      query: (data) => ({
        url: "/Notification/send-by-excel",
        method: "POST",
        body: data,
      }),
    }),
    getManuelNotifications: build.mutation({
      query: (data) => ({
        url: "/Notification/Logs",
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
  useSendManuelNotificationMutation,
  useGetCityListMutation,
  useGetManuelNotificationsMutation,
  useSendManuelNotificationWithExcelMutation,
} = sendNotificationApi;
