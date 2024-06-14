// import React from 'react'

import { useLoaderData } from "react-router-dom"

export default function DetailProductHomeCard() {
    const product=useLoaderData()

  return (

    <div className="flex justify-center ">

 




    <div className="flex-col md:flex-row justify-between flex gap-4 items-start mx-4 py-12">
    <div className="flex bg-white rounded-lg shadow dark:bg-gray-800 flex-col md:flex-row">
        <div className="relative w-full md:w-48 flex justify-center items-center">

        {
        product?.image ?  
        <>
        <img className="object-cover w-full h-48 md:h-full rounded-t-lg md:rounded-l-lg md:rounded-t-none" src={product?.image} alt="Product Image"/>

        </>
        :
        <>
        <img src="https://cdn.pixabay.com/photo/2013/07/13/14/07/apparel-162180_960_720.png" alt="shopping image"
                className="object-cover w-full h-48 md:h-full rounded-t-lg md:rounded-l-lg md:rounded-t-none"/>

        </>
    }






            {/* <img src="https://cdn.pixabay.com/photo/2013/07/13/14/07/apparel-162180_960_720.png" alt="shopping image"
                className="object-cover w-full h-48 md:h-full rounded-t-lg md:rounded-l-lg md:rounded-t-none"/> */}
        </div>

        <form className="flex-auto p-6">
        <h1 className="flex-auto text-xl font-semibold dark:text-gray-50">Title:{product?.title}</h1>
            <div className="flex flex-wrap">
                <h1 className="flex-auto text-xl font-semibold dark:text-gray-50">Name:{product?.productName}</h1>
                <div className="text-xl font-semibold text-gray-500 dark:text-gray-300">Price: ${product?.price}</div>
                <div className="flex-none w-full mt-2 text-sm font-medium text-gray-500 dark:text-gray-300">In stock:{product?.stock}</div>
            </div>
            <div className="flex items-baseline mt-4 mb-6 text-gray-700 dark:text-gray-300">
{/*                
                <a href="#"
                    className="hidden ml-auto text-sm text-gray-500 underline md:block dark:text-gray-300">Size
                    Guide
                </a> */}
            </div>
            <div className="flex mb-4 text-sm font-medium">
                <button type="button"
                    className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ">Buy
                    now</button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-300">Details:{product?.productDetails}</p>
        </form>
    </div>
</div>


</div>
  )
}
