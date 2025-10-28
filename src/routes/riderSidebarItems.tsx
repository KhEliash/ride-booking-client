import AddRide from "@/pages/rider/AddRide";
import RideHistory from "@/pages/rider/RideHistory";
import type { ISidebarItems } from "@/types";

export const riderSidebarItems: ISidebarItems[] = [
  {
    title: "Rider",
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
];
