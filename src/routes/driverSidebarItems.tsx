import type { ISidebarItems } from "@/types";
import { lazy } from "react";

const DriverRideHistory = lazy(
  () => import("@/pages/driver/DriverRideHistory")
);
const Earnings = lazy(() => import("@/pages/driver/Earnings"));
const ManageRides = lazy(() => import("@/pages/driver/ManageRides"));

export const driverSidebarItems: ISidebarItems[] = [
  {
    title: "driver",
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
];
