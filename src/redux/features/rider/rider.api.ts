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

    
  }),
});

export const {
  useAddRideMutation
} = riderApi;
