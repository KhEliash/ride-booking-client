import type { ISidebarItems } from "@/types";
import { lazy } from "react";

const DriverRideHistory = lazy(
  () => import("@/pages/driver/DriverRideHistory")
);
const Earnings = lazy(() => import("@/pages/driver/Earnings"));
const ManageRides = lazy(() => import("@/pages/driver/ManageRides"));
const UpdateProfile = lazy(() => import("@/pages/ProfileUpdate"));

export const driverSidebarItems: ISidebarItems[] = [
  {
    title: "Action Dashboard",
    items: [
      {
        title: "Manage Ride",
        url: "/driver/manage-rides",
        component: ManageRides,
      },
      {
        title: "Earnings",
        url: "/driver/earnings",
        component: Earnings,
      },
      {
        title: "Ride history",
        url: "/driver/history",
        component: DriverRideHistory,
      },
    ],
  },
  {
    title: "Profile",
    items: [
      {
        title: "Profile Update",
        url: "/driver/profile",
        component: UpdateProfile,
      },
    ],
  },
];
