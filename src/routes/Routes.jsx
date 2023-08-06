import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Registar/Registar";
import ViewSingleToy from "../Pages/Home/ReactTabs/ViewSingleToy";
import PrivateRoute from "./PrivateRoute";
import Blogs from "../Pages/Blogs/Blogs";
import AddAToy from "../Pages/AddAToy/AddAToy";
import MyToy from "../Pages/MyToy/MyToy";
import AllToy from "../Pages/AllToy/AllToy";





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
        path:'login',
        element:<Login></Login>,
      },
      {
        path:'register',
        element:<Register></Register>,
      },
      {
        path:'viewsingletoy/:id',
        element:<PrivateRoute><ViewSingleToy></ViewSingleToy></PrivateRoute>,
        loader: ({params}) => fetch(`http://localhost:5000/categories/${params.id}`)
      },
      {
        path:'blogs',
        element:<Blogs></Blogs>,
      },
      {
        path:'addatoy',
        element:<AddAToy></AddAToy>,
      },
      {
        path:'mytoy',
        element:<MyToy></MyToy>,
      },
      {
        path:'alltoy',
        element:<AllToy></AllToy>,
      },
    ]
  },
]);

export default router;
