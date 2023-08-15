import React from "react";

import { IoIosArrowForward } from "react-icons/io";
import { TfiPackage } from "react-icons/tfi";
import { FaUser, FaWallet } from "react-icons/fa";
import { RiProfileFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { forgetPassword } from "../../redux/reducers/User/userAction";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
const SideBar = () => {
  const user = JSON.parse(localStorage.getItem("newUser"));
  const dispatch = useDispatch();

  const resetPassword = () => {
    console.log("clicked");
    dispatch(forgetPassword()).then(() => {
      return toast.success(`Email has been sent to ${user.email}`, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    });
  };
  // console.log(params);
  return (
    <>
      <main>
        <div className="w-full] p-4 flex flex-col gap-4">
          <div className="p-5 bg-white gap-2 flex">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD5iROb1TgJ_rcl-6r-68v1yjtID052zxSkw&usqp=CAU"
              alt="avtar"
              className="w-14 h-14 rounded-full"
            />
            <div>
              <h1 className=" text-sm">Hello, </h1>
              <h1 className=" font-medium text-lg"> {user?.fullName}</h1>
            </div>
          </div>
          <div className="bg-white  w-full">
            <div className="flex p-5 border-b">
              <div className=" w-full flex justify-between">
                <div className="flex gap-2 text-gray-500 items-center">
                  <TfiPackage color="blue" size={"1.2rem"} />
                  <Link to="/myOrders">MY ORDERS</Link>
                </div>
                <IoIosArrowForward size={"1.5rem"} color="gray" />
              </div>
            </div>
            <div className="border-b pb-5">
              <div className="flex p-5 ">
                <div className="flex gap-2 items-center">
                  <FaUser size={"1.2rem"} color="blue" />
                  <h1 className="text-gray-500 text-md font-normal">
                    ACCOUNT SETTINGS
                  </h1>
                </div>
              </div>
              <div className="px-11 py-1 flex gap-5 flex-col ">
                <Link className=" text-blue-500" to="/Profile">
                  Profile information
                </Link>
                <h1>Manage Addresses</h1>
                <h1>Pan Card Informations</h1>
              </div>
            </div>
            <div className="border-b pb-5">
              <div className="flex p-5 ">
                <div className="flex gap-2 items-center">
                  <FaWallet size={"1.2rem"} color="blue" />
                  <h1 className="text-gray-500 text-md font-normal">
                    PAYMENTS
                  </h1>
                </div>
              </div>
              <div className="px-11 py-1 flex gap-5 flex-col ">
                <h1>Gift Cards</h1>
                <h1>Saved UPI</h1>
                <h1>Saved Cards</h1>
              </div>
            </div>
            <div className="border-b pb-5">
              <div className="flex p-5 ">
                <div className="flex gap-2 items-center">
                  <RiProfileFill size={"1.2rem"} color="blue" />
                  <h1 className="text-gray-500 text-md font-normal">
                    MY STUFF
                  </h1>
                </div>
              </div>
              <div className="px-11 py-1 flex gap-5 flex-col ">
                <h1>My Coupons</h1>
                <h1>My Reviews & Ratings</h1>
                <h1>All Notifications</h1>
                <h1>My Wishlist</h1>
              </div>
            </div>
          </div>
          <div className="bg-white p-4">
            <p className=" text-sm">Frequently Visited:</p>
            <button
              className=" text-xs text-gray-600 p-2"
              onClick={resetPassword}
            >
              RESET PASSWORD
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default SideBar;
