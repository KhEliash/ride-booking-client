import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { generateRoutes } from "@/utils/generateRoutes";

import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { riderSidebarItems } from "./riderSidebarItems";
import { driverSidebarItems } from "./driverSidebarItems";
import { withAuth } from "@/utils/withAuth";
import Unauthorized from "@/pages/Unauthorized";
import { role } from "@/constants/role";
import type { TRole } from "@/types";
import Home from "@/pages/Home";
import Features from "@/pages/Features";
import Faq from "@/pages/Faq";
import Contact from "@/pages/Contact";
import RideDetails from "@/pages/rider/RideDetails";
import ErrorState from "@/pages/Error";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    errorElement: <ErrorState />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        Component: About,
        path: "about",
      },
      {
        Component: Features,
        path: "features",
      },
      {
        Component: Faq,
        path: "faq",
      },
      {
        Component: Contact,
        path: "contact",
      },
      {
        Component: Login,
        path: "/login",
      },
      {
        Component: Register,
        path: "/register",
      },
      {
        Component: RideDetails,
        path: "/ride-details/:id",
      },
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.admin as TRole),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to={"/admin/analytics"} /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.rider as TRole),
    path: "/rider",
    children: [
      { index: true, element: <Navigate to={"/rider/add-ride"} /> },
      ...generateRoutes(riderSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.driver as TRole),
    path: "/driver",
    children: [
      { index: true, element: <Navigate to={"/driver/manage-rides"} /> },
      ...generateRoutes(driverSidebarItems),
    ],
  },

  {
    Component: Unauthorized,
    path: "/unauthorized",
  },
]);
