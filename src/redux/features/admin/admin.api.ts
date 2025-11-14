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
    allDrivers: builder.query({
      query: () => ({
        url: "/driver/allDrivers",
        method: "GET",
      }),
      providesTags: ["ADMIN"],
    }),
    allRides: builder.query({
      query: () => ({
        url: "/ride/all-rides",
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
    updateProfile: builder.mutation({
      query: (payload) => ({
        url: "/user/update-profile",
        method: "PUT",
        data: payload,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["ADMIN"],
    }),
  }),
});

export const {
  useAllUsersQuery,
  useSuspendDriverMutation,
  useApproveDriverMutation,
  useUnblockUserMutation,
  useBlockUserMutation,
  useAllRidesQuery,
  useAllDriversQuery,
  useUpdateProfileMutation,
} = adminApi;
