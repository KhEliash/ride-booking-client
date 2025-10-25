 import AcceptRide from "@/pages/driver/AcceptRide";
 import type { ISidebarItems } from "@/types";

export const driverSidebarItems: ISidebarItems[] = [
  {
    title: "driver",
    items: [
      {
        title: "Accept Ride",
        url: "/driver/accept-ride",
        component: AcceptRide,
      },
    ],
  },
  
];
