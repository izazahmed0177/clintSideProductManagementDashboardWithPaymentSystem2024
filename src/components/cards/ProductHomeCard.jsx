/* eslint-disable react/prop-types */
// import React from 'react'

import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink, useNavigate } from "react-router-dom";
import auth from "../../firebase/firebase.config";
import Swal from "sweetalert2";

export default function ProductHomeCard({ product }) {

  const navigate=useNavigate()

  const [user] = useAuthState(auth);

  const handalAddtoCart=(char)=>{
    // console.log(char,user.email);

    if (user && user.email) {
      
    } else {

      Swal.fire({
        title: "You are not login",
        text: "Please login to add to the card",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, login!"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login')
        }
      });
      
    }



  }




  return (
    <div className="w-80 bg-white shadow rounded">


      {product?.image ? (
        <>
          <div
            className="h-48 w-full object-cover  bg-gray-200 flex flex-col justify-between p-4 bg-cover bg-center image-full"
            style={{
              backgroundImage: `url(${product?.image})`,
               backgroundSize: "cover",
               backgroundPosition: 'center',
               objectFit: 'cover',
            }}
          >
            <div>
              <span className="uppercase text-xs bg-green-50 p-0.5 border-green-500 border rounded text-green-700 font-medium select-none">
                available
              </span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className="h-48 w-full bg-gray-200 flex flex-col justify-between p-4 bg-cover bg-center"
            // style="background-image: url('https://images.pexels.com/photos/7989741/pexels-photo-7989741.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')">
            style={{
              backgroundImage: `url('https://images.pexels.com/photos/7989741/pexels-photo-7989741.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')`,
            }}
          >
            <div>
              <span className="uppercase text-xs bg-green-50 p-0.5 border-green-500 border rounded text-green-700 font-medium select-none">
                available
              </span>
            </div>
          </div>
        </>
      )}

      <div className="p-4 flex flex-col items-center">
        <p className="text-gray-900 font-light text-xl text-center">
          Title: {product?.title}
        </p>
        <h1 className="text-gray-800 text-center mt-1">
          Name:{product?.productName}
        </h1>
        <p className="text-center text-gray-800 mt-1">Price:$ {product?.price} </p>

      



        <p className="text-center text-gray-800 mt-1">In Stock:{product?.stock} pis </p>

        <NavLink to={`/details/${product?._id}`} className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50 mt-4 w-full flex items-center justify-center">
          Details
          
        </NavLink>


        <button onClick={()=>handalAddtoCart(product)} className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50 mt-4 w-full flex items-center justify-center">
          Add to card
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </button>


      </div>
    </div>
  );
}
