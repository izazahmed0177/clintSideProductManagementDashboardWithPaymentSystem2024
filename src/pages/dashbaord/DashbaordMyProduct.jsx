// import React from 'react'

import axios from "axios";
import { useEffect, useState } from "react";
import ProductDashboardCard from "./ProductDashboardCard ";
import auth from './../../firebase/firebase.config';
import { useAuthState } from 'react-firebase-hooks/auth';


export default function DashbaordMyProduct() {


  const [user] = useAuthState(auth);
  // const [userInfo, setUserInfo] = useState({});




  const [products,setProducts]=useState()

 

  useEffect(()=>{

    // fetch(`http://localhost:5000/user/${user?.email}`)
    //   .then((res) => res.json())
    //   .then((data) => setUserInfo(data));




    async function getProduct() {

    //  const userEmail= await axios.get(`http://localhost:5000/user/${user?.email}`);
    //   if (userEmail?.status===200) {
    //     setUserInfo(userEmail?.data)
        
    //   }
      




      const productData = await axios.get(`http://localhost:5000/products/getemail/${user.email}`);
      if (productData?.status === 200) {
        setProducts(productData?.data);
      }
    }
    getProduct();


  },[])


  // if ( products.length == 0) {
  //   console.log("you have no product");
  // } else {
  //   console.log("you have many product")
  // }





  // console.log(userInfo);

  console.log(products);


  return (
    <div className="mx-16">
        <h1 className="text-4xl my-20 text-center">My Products</h1>

        {
          
        }


        <div className="grid  md:grid-cols-2 grid-cols-1 gap-3">
          {products
            ?.reverse()
            ?.map((product) => (
              <ProductDashboardCard key={product?._id} product={product} />
            ))}

        </div>



      </div>
  )
}
