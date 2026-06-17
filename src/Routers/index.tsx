import { createBrowserRouter } from "react-router-dom";
import { PageRoutes } from "./PageRoutes";
import Layout from "../Layout";

export const Router = createBrowserRouter([
  {
    element: <Layout />,
    children: PageRoutes,
  },
  
]);
