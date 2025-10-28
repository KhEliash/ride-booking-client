import { baseApi } from "@/redux/baseApi";

export const riderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addRide: builder.mutation({
      query: (rideInfo) => ({
        url: "/ride/ride-request",
        method: "POST",
        data: rideInfo,
      }),
      invalidatesTags: ["RIDER"],
    }),
    rideHistory: builder.query({
      query: (params) => ({
        url: "/ride/rider-history",
        method: "GET",
        params,
      }),
      providesTags: ["RIDER"],
    }),
    cancelRide: builder.mutation({
      query: (id: string) => ({
        url: `ride/cancel/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["RIDER"],
    }),
    getRideById: builder.query({
      query: (id) => ({
        url: `/ride/${id}`,
        method: "GET",
      }),
      providesTags: ["RIDER"],
    }),
  }),
});

export const {
  useAddRideMutation,
  useRideHistoryQuery,
  useCancelRideMutation,
  useGetRideByIdQuery,
} = riderApi;
