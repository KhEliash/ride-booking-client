import AddRide from "@/pages/rider/AddRide";
import type { ISidebarItems } from "@/types";

export const riderSidebarItems: ISidebarItems[] = [
  {
    title: "Rider",
    items: [
      {
        title: "Add Ride",
        url: "/rider/add-ride",
        component: AddRide,
      },
    ],
  },
];
