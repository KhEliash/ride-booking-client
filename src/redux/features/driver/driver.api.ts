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
    acceptRide: builder.mutation({
      query: (id: string) => ({
        url: `ride/accept-ride/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["DRIVER"],
    }),
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
    useAcceptRideMutation 
} = driverApi;
