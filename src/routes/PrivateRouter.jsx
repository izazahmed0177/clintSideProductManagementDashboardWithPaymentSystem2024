/* eslint-disable react/prop-types */
// import React from 'react'

import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase/firebase.config";
import Loading from "../components/shareItem/Loading";
import { Navigate } from "react-router-dom";

export default function PrivateRouter({children}) {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <Loading></Loading>
}

if (!user) {
    // return <Navigate to={'/login'} state={{from:location}} replace></Navigate>
    return <Navigate to={'/login'}></Navigate>
}

  return children; 

}
