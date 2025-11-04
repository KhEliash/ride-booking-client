 import Earnings from "@/pages/driver/Earnings";
import ManageRides from "@/pages/driver/ManageRides";
  import type { ISidebarItems } from "@/types";

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
    ],
  },
  
];
