// import React from 'react'

import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/otherPage/Home";
import Blog from "../pages/otherPage/Blog";
import Contact from "../pages/otherPage/Contact";
import Login from "../pages/SignInSignUp/Login";
import Register from "../pages/SignInSignUp/Register";
import DashbaordHome from './../pages/dashbaord/DashbaordHome';
import AddProduct from "../pages/dashbaord/AddProduct";
import DashbaordMyProduct from "../pages/dashbaord/DashbaordMyProduct";
import EditProduct from "../pages/dashbaord/EditProduct";
import Profile from './../components/user/Profile';
import ProfileEdit from './../components/user/ProfileEdit';
import DashbaordLayouts from "../layouts/DashbaordLayouts";
import PrivateRouter from "./PrivateRouter";


const router=createBrowserRouter([

  {
    path:'/',
    element:<MainLayouts/>,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
      {
        index:true,
        element:<Home></Home>
      },
      {
        path:"blog",
        element:<Blog></Blog>
      },
      {
        path:"contact",
        element:<Contact></Contact>
      },
      {
        path:"login",
        element:<Login></Login>
      },
      {
        path:"register",
        element:<Register></Register>
      },
    ]
  },


  {
    path:"dashboard",
    element:(
      <PrivateRouter>
        <DashbaordLayouts></DashbaordLayouts>
      </PrivateRouter>
    ),
    errorElement:<ErrorPage></ErrorPage>,
    children:[
      {
        index:true,
        element:<DashbaordHome></DashbaordHome>,

      },
      {
        path:"addproduct",
        element:<AddProduct></AddProduct>

      },
      {
        path:"dashboardMyProduct",
        element:<DashbaordMyProduct></DashbaordMyProduct>
      },
      {
        path:"editproduct",
        element:<EditProduct></EditProduct>
      },
      {
        path:"profile",
        element:<Profile></Profile>
      },
      {
        path:"profileedit",
        element:<ProfileEdit></ProfileEdit>
      },



    ]
    


  },



])


export default router;