import type { ComponentType } from "react";

export interface ISidebarItems {
  title: string;
  items: {
    title: string;
    url: string;
    component?: ComponentType| null;
  }[];
}

export type TRole = "ADMIN" | "DRIVER" | "RIDER";
