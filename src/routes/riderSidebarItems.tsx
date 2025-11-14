import UpdateProfile from "@/pages/ProfileUpdate";
import type { ISidebarItems } from "@/types";
import { lazy } from "react";

const AddRide = lazy(() => import("@/pages/rider/AddRide"));
const RideHistory = lazy(() => import("@/pages/rider/RideHistory"));

export const riderSidebarItems: ISidebarItems[] = [
  {
    title: "Actionable Dashboard",
    items: [
      {
        title: "Book Ride",
        url: "/rider/add-ride",
        component: AddRide,
      },
      {
        title: "Ride History",
        url: "/rider/ride-history",
        component: RideHistory,
      },
    ],
  },
  {
    title: "Profile",
    items: [
      {
        title: "Profile Update",
        url: "/rider/profile",
        component: UpdateProfile,
      },
       
    ],
  },
];
