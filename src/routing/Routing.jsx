import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
  import PrivateRoute from "./PrivateRoute";
  import Home from "../pages/home/Home";
//   import Signup from "../pages/signup/Signup";
  import Login from "../pages/login/Login";
  import PublicRoute from "./PublicRoute";
import Register from "../pages/register/Register";
  
  
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PrivateRoute><Home/></PrivateRoute>,
    },
    {
      path:"/signup",
      element: <PublicRoute><Register/></PublicRoute> 
    },
    {
      path:"/login",
      element: <PublicRoute><Login/></PublicRoute> 
    }
     
  ]);
  
  export default function Routing(params) {
    return (
      <RouterProvider router={router} />
    )
  }