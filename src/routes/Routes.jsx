import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Registar/Registar";
import PrivateRoute from "./PrivateRoute";
import AddAToy from "../Pages/AddAToy/AddAToy";
import MyToy from "../Pages/MyToy/MyToy";
import AllToy from "../Pages/AllToy/AllToy";
import SingleToy from "../Pages/AllToy/SingleToy";
import DashboardLayout from "../Layouts/DashboardLayout";
import Dashboard from "../Pages/Dashboard/Dashboard";
import ToyEdit from "../Pages/ToyEdit/ToyEdit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "all_toy",
        element: <AllToy></AllToy>,
        loader: () => fetch('http://localhost:5000/alltoys')
      },
      {
        path: "singletoy/:id",
        element: <PrivateRoute><SingleToy></SingleToy></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/alltoys/${params.id}`)
      },
    ]
  },
  {
    path: "dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      {
        index: true,
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
      },
      {
        path: "add_toy",
        element: <PrivateRoute><AddAToy/></PrivateRoute>,
      },
      {
        path: "my_toy",
        element: <PrivateRoute><MyToy/></PrivateRoute>,
      },
      {
        path: "toy_edit/:id",
        element: <PrivateRoute><ToyEdit/></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/alltoys/${params.id}`)
      },
    ]
  }
]);

export default router;
