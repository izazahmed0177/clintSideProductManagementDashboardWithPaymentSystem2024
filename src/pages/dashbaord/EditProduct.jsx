// import React from 'react'

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function EditProduct() {


  const { id } = useParams();

 
  const [productDetails, setProductDetails] = useState();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state?.from?.pathname || "/dashboard/dashboardMyProduct";

  useEffect(() => {
    async function loadProduct() {

      const productData = await axios.get(`http://localhost:5000/product/get/${id}`);
     
      if (productData?.status === 200) {
        setProductDetails(productData?.data);
      }

    }

    loadProduct();
  }, []);



  const handleEditProduct =(e)=>{
    const token=localStorage.getItem('token')
      e.preventDefault();
  
      const form = e.target;
  
      
      
      // const id = form.id.value;
      const productName=form.productName.value;
      const title = form.title.value;
      const stock = form.stock.value;

      const price = form.price.value;


     
      const productDetails = form.productDetails.value;
      const image=form.image.value;

      const productData = {
        productName,
        title,
        stock,
        price,
       
        productDetails,
        image,
       
      };
    
      // console.log(cosmeticsData);



      Swal.fire({
        title: "Do you want to save the Product?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save Product",
        denyButtonText: `Don't save Product`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          productAdd();
          Swal.fire("Saved Product!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Product are not saved", "", "info");
        }
      });


      const productAdd=async()=>{

          const headers = {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }

        const postProduct=await axios.patch(`http://localhost:5000/product/edit/${id}`, productData,{
          headers:headers,
        });

        console.log(postProduct);

      if (postProduct?.status === 200) {
      
        // alert("Are you Add this item")
        toast.success('Successfully Edit Product Item')
        navigate(from);
      //   form.reset();
      }else{
        toast.error("Something wrong")
      }
      }

  }






  return (
    <div className="bg-white border border-4 rounded-lg shadow relative m-10">

    <div className="flex items-start justify-between p-5 border-b rounded-t">
        <h3 className="text-xl font-semibold">
           Edit Product
        </h3>
        {/* <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="product-modal">
           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" ></path></svg>
        </button> */}
    </div>

    <div className="p-6 space-y-6">
        <form onSubmit={handleEditProduct}>
        {/* <form > */}
            <div className="grid grid-cols-6 gap-6">

                <div className="col-span-6 sm:col-span-3">
                    <label  className="text-sm font-medium text-gray-900 block mb-2">Product Name</label>
                    <input type="text" name="productName" 
                    defaultValue={productDetails?.productName}
                    id="product-name" className="shadow-sm bg-gray-50 border
                     border-gray-300 text-gray-900 sm:text-sm rounded-lg
                      focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" 
                      placeholder="Product Name" />
                </div>




                <div className="col-span-6 sm:col-span-3">
                    <label  className="text-sm font-medium text-gray-900 block mb-2">Stock</label>
                  <input type="number"
                  defaultValue={productDetails?.stock}
                   name="stock" id="stock" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="stock" required=""/>
                </div>

                <div className="col-span-6 sm:col-span-3">
                    <label  className="text-sm font-medium text-gray-900 block mb-2">Price</label>
                    <input type="number" 
                    defaultValue={productDetails?.price}
                    name="price"  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="$2300" required=""/>
                </div>

                <div className="col-span-12 sm:col-span-12">
                    <label  className="text-sm font-medium text-gray-900 block mb-2">Product Title</label>
                    <input type="text"
                    defaultValue={productDetails?.title} 
                     name="title"  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="title" required=""/>
                </div>
                <div className="col-span-12 sm:col-span-12">
                    <label  className="text-sm font-medium text-gray-900 block mb-2">Product Image</label>
                    <input type="text" 
                    defaultValue={productDetails?.image}
                     name="image" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="image" required=""/>
                </div>

                <div className="col-span-12 sm:col-span-12">
                    <label  className="text-sm font-medium text-gray-900 block mb-2">Product Details</label>
                    <textarea id="productDetails"
                    defaultValue={productDetails?.productDetails}
                     name="productDetails"  rows="6" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4" placeholder="Details"></textarea>
                </div>
            </div>
            <div className="p-6 border-t border-gray-200 rounded-b">
        <button className="  btn text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit">Save all</button>
    </div>
        </form>
    </div>

 

</div>
  )
}
