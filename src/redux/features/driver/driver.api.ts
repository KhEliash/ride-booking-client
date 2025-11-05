import { baseApi } from "@/redux/baseApi";

export const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    availableRides: builder.query({
      query: () => ({
        url: "/ride/available-rides",
        method: "GET",
      }),
      providesTags: ["DRIVER"],
    }),
    driverProfile: builder.query({
      query: () => ({
        url: "/driver/profile",
        method: "GET",
      }),
      providesTags: ["DRIVER"],
    }),
    acceptRide: builder.mutation({
      query: (id: string) => ({
        url: `ride/accept-ride/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["DRIVER"],
    }),

    updateRideStatus: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/ride/update-ride-status/${id}`,
        method: "PATCH",
        data: payload,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["DRIVER"],
    }),

    availability: builder.mutation({
      query: (payload) => ({
        url: "/driver/availability",
        method: "PATCH",
        data: payload,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["DRIVER"],
    }),

    currentRide: builder.query({
      query: () => ({
        url: "/ride/current-ride",
        method: "GET",
      }),
      providesTags: ["DRIVER"],
    }),

    getRideById: builder.query({
      query: (id) => ({
        url: `/ride/${id}`,
        method: "GET",
      }),
      providesTags: ["RIDER"],
    }),
    rideHistory: builder.query({
      query: ( ) => ({
        url: "/ride/driver-history",
        method: "GET",
      }),
      providesTags: ["RIDER"],
    }),



  }),
});

export const {
  useAvailableRidesQuery,
  useAcceptRideMutation,
  useDriverProfileQuery,
  useAvailabilityMutation,
  useCurrentRideQuery,
  useUpdateRideStatusMutation,
  useRideHistoryQuery
} = driverApi;
