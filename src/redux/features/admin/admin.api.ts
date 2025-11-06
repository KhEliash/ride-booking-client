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

    approveDriver: builder.mutation({
      query: (id) => ({
        url: `/user/approve/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["ADMIN"],
    }),
    suspendDriver: builder.mutation({
      query: (id) => ({
        url: `/user/suspend/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["ADMIN"],
    }),
    blockUser: builder.mutation({
      query: (id) => ({
        url: `/user/block/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["ADMIN"],
    }),
    unblockUser: builder.mutation({
      query: (id) => ({
        url: `/user/unblock/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["ADMIN"],
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

export const {
  useAllUsersQuery,
  useSuspendDriverMutation,
  useApproveDriverMutation,
  useUnblockUserMutation,
  useBlockUserMutation
} = adminApi;
