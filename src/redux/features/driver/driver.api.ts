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
    // availability: builder.mutation({
    //   query: (info) => ({
    //     url:  "/driver/availability",
    //     method: "PATCH",
    //     info
    //   }),
    //   invalidatesTags: ["DRIVER"],
    // }),
    // getRideById: builder.query({
    //   query: (id) => ({
    //     url: `/ride/${id}`,
    //     method: "GET",
    //   }),
    //   providesTags: ["RIDER"],
    // }),
  }),
});

export const { 
    useAvailableRidesQuery,
    useAcceptRideMutation,
    useDriverProfileQuery,
    // useAvailabilityMutation
} = driverApi;
