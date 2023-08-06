import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Registar/Registar";
import ViewSingleToy from "../Pages/Home/ReactTabs/ViewSingleToy";





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
        element:<ViewSingleToy></ViewSingleToy>,
        loader: ({params}) => fetch(`http://localhost:5000/categories/${params.id}`)
      },
    ]
  },
]);

export default router;
