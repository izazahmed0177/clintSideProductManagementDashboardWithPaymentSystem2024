// import React from 'react';

import { useLocation, useNavigate } from "react-router-dom";
import GoogleLogin from "../../components/Auth/GoogleLogin";
import auth from "../../firebase/firebase.config";
import { useAuthState, useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

function Register() {



  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state?.from?.pathname || "/login";
  // const [user] = useAuthState(auth);
  const userInfo = useAuthState(auth);

  //===================

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const [passMatch, setPassMatch] = useState(true);



  const [userInfoDb,setUserInfo]=useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const token=localStorage.getItem('token')

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

 
    const fullName=form.fullName.value;

    console.log(email, password, confirmPassword,fullName);


    function getUserDb(email) {
       fetch(`http://localhost:5000/user/${email}`)
      .then((res)=>res.json())
      .then((data)=>setUserInfo(data))
      
    }
    getUserDb(email)


    
      
  



    if (email===userInfoDb.email) {
      console.log("Älrady user");
      toast.error(" Alrady exjist user")
    }




    if (password !== confirmPassword) {
      setPassMatch(false);
    }

    console.log(email, password, confirmPassword);

    if (password === confirmPassword && email!==userInfoDb.email) {


      createUserWithEmailAndPassword(email, password).then((data)=>{
        if (data?.user?.email) {


          const userInfo = {
            email: data?.user?.email,
            fullName:fullName,
           
          };

          const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }

          axios.post("http://localhost:5000/user",userInfo,{
            headers: headers

          }).then(()=>{
            
          })
          navigate(from);


          toast.success("user create")
          
        }
        if (user) {
          navigate(from);
        }



      });




    }
  };

  useEffect(() => {
    if (userInfo[0]) {
      navigate("/");
    }

    if (error) {
      console.log(error?.message);
      toast.error(" Alrady exjist user")
    }
  }, [navigate, userInfo, error]);

  console.log(user, loading);







    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">



          <form  onSubmit={handleSubmit} >
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">Registration</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      id="name"
                      name="fullName"
                      type="text"
                      className="px-2 peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Full Name"
                    />
                    <label className=" px-2 absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                     Full Name
                    </label>
                  </div>

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
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Confirm Password"
                    />
                    <label className="absolute px-2 left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                    Confirm Password
                    </label>
                  </div>

                  {!passMatch && (
                  <div className="my-2">
                    <p className="text-red-800">Password do not match</p>
                  </div>
                )}

                {error && <p className="text-red-800">{error?.message}</p>}

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

export default Register;