// import React from 'react'

import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase/firebase.config";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import axios from "axios";

export default function ProfileEdit() {

  const [user] = useAuthState(auth);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/user/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setUserInfo(data));
  }, [user]);
  console.log(userInfo);

  const handleProfile = (e) => {
    const token=localStorage.getItem('token')
    e.preventDefault();
    const form = e.target;
    const fullName = form.fullName.value;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const dob = form.dob.value;
    const phoneNumber = form.phoneNumber.value;
    const address = form.address.value;
    const image = form.image.value;
    // const email=form.email.value;
    const gender = form.gender.value;
    const aboutyou = form.aboutyou.value;

    const userData = {
      firstName,
      lastName,
      fullName,
      phoneNumber,
      address,
      image,
      email: userInfo?.email,
      aboutyou,
      dob,
      gender,
    };

    // console.log(userData);

    Swal.fire({
      title: "Do you want to Edit the Profile?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save Edit Profile",
      denyButtonText: `Don't save Edit Profile`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        profileEdit();
        Swal.fire("Saved Edit Profile!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Profile are not Edit", "", "info");
      }
    });

    const profileEdit = async () => {

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }


      const editData = await axios
        .patch(`http://localhost:5000/user/${userInfo?.email}`, userData, {
          headers:headers
        })
        .then(
          (response) => {
            console.log(response);
            toast.success("üser Update dan");
            console.log(response.status === 200, "🚀 User Updated");
          },
          (error) => {
            console.log(error);
          }
        )
        .catch((err) => console.log(err));

      console.log(editData);
    };

    // console.log(editData);
  };



  return (
    <section className="py-10 my-auto dark:bg-gray-900">
    {/* <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4"> */}
    <div className=" md:w-[100%] xs:w-[96%] mx-auto flex gap-4">
      <div className=" md:w-[90%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
        {/* <!--  --> */}
        <div className="">
          <h1 className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-white">
            Profile
          </h1>
          <h2 className="text-grey text-sm mb-4 dark:text-gray-400">
            Create Profile
          </h2>

          <form onSubmit={handleProfile}>
            {/* <!-- Cover Image --> */}
            <div
              // className="w-full rounded-sm bg-[url('https://images.unsplash.com/photo-1449844908441-8829872d2607?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw2fHxob21lfGVufDB8MHx8fDE3MTA0MDE1NDZ8MA&ixlib=rb-4.0.3&q=80&w=1080')] bg-cover bg-center bg-no-repeat items-center">
              className="w-full rounded-sm 
              bg-[url('https://images.unsplash.com/photo-1449844908441-8829872d2607?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw2fHxob21lfGVufDB8MHx8fDE3MTA0MDE1NDZ8MA&ixlib=rb-4.0.3&q=80&w=1080')] bg-cover bg-center bg-no-repeat items-center"
            >
              {/* <!-- Profile Image --> */}
             

              {
                userInfo.image ? 
                <>
                <div
                className="mx-auto flex 
              justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-cover bg-center bg-no-repeat
             
              
              "
              style={{backgroundImage:`url(${userInfo?.image})`}}
              >
              {/* style={{backgroundImage:`url(${userInfo?.image})`}} */}
                <div className="bg-white/90 rounded-full w-6 h-6 text-center ml-28 mt-4" >
                  <input
                    type="file"
                    name="profile"
                    defaultValue={userInfo?.image}
                    id="upload_profile"
                    hidden
                  />

                  <label>
                    <svg
                      data-slot="icon"
                      className="w-6 h-5 text-blue-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"></path>
                      <path d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"></path>
                    </svg>
                  </label>
                </div>
              </div>

                </>
                :
                <>
                <div
                className="mx-auto flex 
              justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full 
              {}
              bg-[url('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxwcm9maWxlfGVufDB8MHx8fDE3MTEwMDM0MjN8MA&ixlib=rb-4.0.3&q=80&w=1080')] bg-cover bg-center bg-no-repeat"
              >
                <div className="bg-white/90 rounded-full w-6 h-6 text-center ml-28 mt-4">
                  <input
                    type="file"
                    name="profile"
                    defaultValue={userInfo?.image}
                    id="upload_profile"
                    hidden
                  />

                  <label>
                    <svg
                      data-slot="icon"
                      className="w-6 h-5 text-blue-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"></path>
                      <path d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"></path>
                    </svg>
                  </label>
                </div>
              </div>

                </>


              }










              <div className="flex justify-end">
                {/* <!--  --> */}
                <input type="file" name="profile" id="upload_cover" hidden />

                <div className="bg-white flex items-center gap-1 rounded-tl-md px-2 text-center font-semibold">
                  <label className="inline-flex items-center gap-1 cursor-pointer">
                    Cover
                    <svg
                      data-slot="icon"
                      className="w-6 h-5 text-blue-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"></path>
                      <path d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"></path>
                    </svg>
                  </label>
                </div>
              </div>
            </div>
            <h2 className="text-center mt-1 font-semibold dark:text-gray-300">
              Upload Profile and Cover Image
            </h2>

            <div className="w-full  mb-4 mt-6">
              <label className="mb-2 dark:text-gray-300">Full Name</label>
              <input
                type="text"
                name="fullName"
                defaultValue={userInfo?.fullName}
                className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                placeholder="Full Name"
              />
            </div>

            <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
              <div className="w-full  mb-4 mt-6">
                <label className="mb-2 dark:text-gray-300">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  defaultValue={userInfo?.firstName}
                  className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                  placeholder="First Name"
                />
              </div>

              <div className="w-full  mb-4 lg:mt-6">
                <label className=" dark:text-gray-300">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  defaultValue={userInfo?.lastName}
                  className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div className="w-full  mb-4 mt-6">
              <label className="mb-2 dark:text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                defaultValue={userInfo?.email}
                disabled
                className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                placeholder="Email Address"
              />
            </div>

            <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
              <div className="w-full">
                <h3 className="dark:text-gray-300 mb-2">Gender</h3>
                <select
                  name="gender"
                  defaultValue={userInfo?.gender}
                  className="w-full text-grey border-2 rounded-lg p-4 pl-2 pr-2
                 dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                >
                  <option disabled value="">
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="w-full">
                <h3 className="dark:text-gray-300 mb-2">Date Of Birth</h3>
                <input
                  type="date"
                  name="dob"
                  defaultValue={userInfo?.dob}
                  className="text-grey p-4 w-full border-2 rounded-lg dark:text-gray-200
                   dark:border-gray-600 dark:bg-gray-800"
                />
              </div>
            </div>

            <div className="w-full  mb-4 mt-6">
              <label className="mb-2 dark:text-gray-300">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                defaultValue={userInfo?.phoneNumber}
                className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                placeholder="Phone Number"
              />
            </div>

            <div className="w-full  mb-4 mt-6">
              <label className="mb-2 dark:text-gray-300">Address</label>
              <input
                type="text"
                name="address"
                defaultValue={userInfo?.address}
                className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                placeholder="Address"
              />
            </div>

            <div className="w-full  mb-4 mt-6">
              <label className="mb-2 dark:text-gray-300">Image Url</label>
              <input
                type="text"
                name="image"
                defaultValue={userInfo?.image}
                className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                placeholder="Image Url"
              />
            </div>

            <div className="w-full  mb-4 mt-6">
              <label className="mb-2 dark:text-gray-300">About You</label>
              <textarea
                type="text"
                name="aboutyou"
                defaultValue={userInfo?.aboutyou}
                className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                placeholder="About You"
              />
            </div>

            <div className="w-full rounded-lg bg-blue-500 mt-4 text-white text-lg font-semibold">
              <button type="submit" className="w-full p-4">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
  )
}
