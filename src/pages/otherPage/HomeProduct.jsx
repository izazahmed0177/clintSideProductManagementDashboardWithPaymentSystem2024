/* eslint-disable no-undef */
// import React from 'react'

import axios from "axios";
import { useEffect, useState } from "react";
import ProductHomeCard from "../../components/cards/ProductHomeCard";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from "swiper/modules";






export default function HomeProduct() {

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  };




    const [products,setProducts]=useState()

 

    useEffect(()=>{
      async function getProduct() {
  
        const productData = await axios.get('http://localhost:5000/products');
        // console.log(recipesData);
        // setRecipes(recipesData?.data);
        if (productData?.status === 200) {
          setProducts(productData?.data);
        }
     
    
      }
      getProduct();
  
  
    },[])




  return (
    <div className="mx-16">
    <h1 className="text-4xl my-20 text-center">Our Products</h1>
    {/* <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
      {products
        ?.reverse()
        ?.map((product) => (
          <ProductHomeCard key={product?._id} product={product} />
        ))}

    </div> */}


    <Swiper
        pagination={pagination}
        modules={[Pagination]}
        className="mySwiper"
      >
      <SwiperSlide>
         <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
      {products
        ?.reverse()
       
        ?.map((product) => (
          <ProductHomeCard key={product?._id} product={product} />
        ))}

    </div>
    </SwiperSlide>
      </Swiper>




  </div>
  )
}
