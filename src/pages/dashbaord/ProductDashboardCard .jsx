/* eslint-disable react/prop-types */
// import React from 'react'

import { NavLink } from "react-router-dom";

export default function ProductDashboardCard ({product}) {
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
                Add:{product?.userName}
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

        {/* <div className="inline-flex items-center mt-2">
          <button className="bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M20 12H4" />
            </svg>
          </button>
          <div className="bg-gray-100 border-t border-b border-gray-100 text-gray-600 hover:bg-gray-100 inline-flex items-center px-4 py-1 select-none">
            2
          </div>
          <button className="bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div> */}



        <p className="text-center text-gray-800 mt-1">In Stock:{product?.stock} pis </p>

        <NavLink to={`dashbordDetailProduct/${product?._id}`} className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50 mt-4 w-full flex items-center justify-center">
        Details Product
        
        </NavLink>
      </div>
    </div>
  )
}
