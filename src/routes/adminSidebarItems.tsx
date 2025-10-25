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
    ],
  },
  
];
