import { baseApi } from "@/redux/baseApi";

export const riderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    

    addRide: builder.mutation({
      query: (rideInfo) => ({
        url: "/ride/ride-request",
        method: "POST",
        data: rideInfo,
      }),
    }),
    rideHistory: builder.query({
      query: (params ) => ({
        url: "/ride/rider-history",
        method: "GET",
        params
        // data: rideInfo,
      }),
    }),

    
  }),
});

export const {
  useAddRideMutation,
  useRideHistoryQuery
} = riderApi;
