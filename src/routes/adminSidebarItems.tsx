 import UserManagements from "@/pages/admin/UserManagements";
import type { ISidebarItems } from "@/types";
import { lazy } from "react";

 const Analytics = lazy(()=>import ("@/pages/admin/Analytics"))

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
        url: "/admin/analytics",
        component: Analytics,
      },
    ],
  },
  
];
