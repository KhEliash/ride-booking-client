import { baseApi } from "@/redux/baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allUsers: builder.query({
      query: () => ({
        url: "/user/all-users",
        method: "GET",
      }),
      providesTags: ["ADMIN"],
    }),

    // acceptRide: builder.mutation({
    //   query: (id: string) => ({
    //     url: `ride/accept-ride/${id}`,
    //     method: "POST",
    //   }),
    //   invalidatesTags: ["ADMIN"],
    // }),
  }),
});

export const { useAllUsersQuery } = adminApi;
