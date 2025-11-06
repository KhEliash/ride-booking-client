import type { ISidebarItems } from "@/types";
import { lazy } from "react";

const Analytics = lazy(() => import("@/pages/admin/Analytics"));
const UserManagements = lazy(() => import("@/pages/admin/UserManagements"));
const RideOversight = lazy(() => import("@/pages/admin/RideOversight"));

export const adminSidebarItems: ISidebarItems[] = [
  {
    title: "Getting Started",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
      {
        title: "User Management",
        url: "/admin/user-managements",
        component: UserManagements,
      },
      {
        title: "Ride Oversight",
        url: "/admin/ride-oversight",
        component: RideOversight,
      },
    ],
  },
];
