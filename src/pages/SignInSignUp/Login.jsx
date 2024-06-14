// import React from 'react'

import { useAuthState, useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import GoogleLogin from "../../components/Auth/GoogleLogin";
import auth from "../../firebase/firebase.config";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function Login() {


  const userInfo = useAuthState(auth);
  
  const navigate = useNavigate();
    const location = useLocation();

    const from = location?.state?.from?.pathname || "/";
  
    const [signInWithEmailAndPassword, user, loading, error] =
      useSignInWithEmailAndPassword(auth);


      
    const handleSignIn = (e) => {
      const token=localStorage.getItem('token')
      e.preventDefault();
  
      const form = e.target;
      const email = form.email.value;
      const password = form.password.value;
  
      signInWithEmailAndPassword(email, password).then(result=>{
        const user=result.user;
        console.log(user);


        const curentUser={
          email:user.email
        }

        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      axios.post("http://localhost:5000/user",curentUser,{
          headers:headers
      }).then((data)=>{
          localStorage.setItem('token',data?.data?.token)
      
    })



      })



    };


  
    useEffect(() => {
      if (userInfo[0]) {
        navigate(from);
        toast.success("Login Successfully")
      }
    }, [from, navigate, userInfo]);
  
    console.log(user, loading, error);
    if (error) {
      toast.error("user Email & password do not match")
    }





  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">



          <form onSubmit={handleSignIn}>
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">Login</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Email address"
                    />
                    <label className="absolute px-2 left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                      Email Address
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Password"
                    />
                    <label className="absolute px-2 left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <button className="bg-cyan-500 text-white rounded-md px-2 py-1">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>

          <div className="w-full flex justify-center">
           <GoogleLogin></GoogleLogin>
          </div>
        </div>
      </div>
    </div>
  );
}
