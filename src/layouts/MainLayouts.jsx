// import React from 'react'

import { Outlet } from "react-router-dom";
import Navbar from "../components/shareItem/Navbar";
import Footer from "../components/shareItem/Footer";

export default function MainLayouts() {
  return (
    <>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
    </>
  )
}
