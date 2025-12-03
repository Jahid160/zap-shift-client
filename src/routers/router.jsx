import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import PrivetRoute from "./PrivetRoute";
import Rider from "../Pages/Rider/Rider";
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashBoardLayout from "../Layout/DashBoardLayout";
import MyParcels from "../Pages/DashBoard/MyParcels/MyParcels";
import Payment from "../Pages/DashBoard/Payment/Payment";
import PaymentSuccess from "../Pages/DashBoard/Payment/PaymentSuccess";
import PaymentCanceled from "../Pages/DashBoard/Payment/PaymentCanceled";
import PaymentHistory from "../Pages/DashBoard/PaymentHistory/PaymentHistory";
import ApproveRiders from "../Pages/DashBoard/ApproveRiders/ApproveRiders";
import UsersManagement from "../Pages/DashBoard/UsersMangemet/UsersManagement";
import AdminRoute from "./AdminRoute";
import AssignRiders from "../Pages/DashBoard/AssignRiders/AssignRiders";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/rider",
        loader: () => fetch("/serviceCenter.json").then((res) => res.json()),
        element: (
          <PrivetRoute>
            <Rider></Rider>
          </PrivetRoute>
        ),
      },
      {
        path: "/coverage",
        loader: () => fetch("/serviceCenter.json").then((res) => res.json()),
        element: <Coverage></Coverage>,
      },
      {
        path: "/send-parcel",
        loader: () => fetch("/serviceCenter.json").then((res) => res.json()),
        element: (
          <PrivetRoute>
            <SendParcel></SendParcel>
          </PrivetRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivetRoute>
        <DashBoardLayout></DashBoardLayout>
      </PrivetRoute>
    ),
    children: [
      {
        path: "my-parcels",
        element: <MyParcels></MyParcels>,
      },
      {
        path: "payment/:parcelId",
        element: <Payment></Payment>,
      },
      {
        path: "payment-success",
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path: "payment-canceled",
        element: <PaymentCanceled></PaymentCanceled>,
      },
      {
        path: "payment-history",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "approve-riders",

        element: (
          <AdminRoute>
            <ApproveRiders></ApproveRiders>
          </AdminRoute>
        ),
      },
      {
        path: "assign-riders",

        element: (
          <AdminRoute>
            <AssignRiders></AssignRiders>
          </AdminRoute>
        ),
      },
      {
        path: "users-management",
        // Component: UsersManagement
        element: (
          <AdminRoute>
            <UsersManagement></UsersManagement>
          </AdminRoute>
        ),
      },
    ],
  },
]);
