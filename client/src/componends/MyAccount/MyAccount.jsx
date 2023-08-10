import React from "react";
import { IoArrowBack } from "react-icons/io5";
import { GiTwoCoins } from "react-icons/gi";
import { TfiPackage, TfiHeadphoneAlt } from "react-icons/tfi";
import { AiOutlineGift, AiOutlineWallet, AiOutlineHeart } from "react-icons/ai";
import { TbCalendarQuestion, TbLanguageHiragana } from "react-icons/tb";
import {
  CiUser,
  CiMinimize2,
  CiLocationOn,
  CiChat1,
  CiBellOn,
} from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { LiaEdit } from "react-icons/lia";
import { toast } from "react-toastify";
const MyAccount = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("newUser");
    localStorage.removeItem("addressDetails");
    localStorage.removeItem("user");
    toast.success("Logout succesfully", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
    navigate("/");
  };
  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      <main className="w-full relative flex flex-col">
        <section className="fixed z-10 overflow-hidden w-full">
          <div className="w-full  flex flex-row bg-white p-4 border-b justify-between">
            <div className="flex items-center gap-2">
              <IoArrowBack size={"1.5em"} onClick={goBack} />
              <div className="">
                <h1 className=" text-xl font-semibold">
                  Hey! FlipKart customer
                </h1>
                <p className="text-gray-500">Explore plus</p>
              </div>
            </div>
            <div>
              <h1 className=" border px-2 flex items-center gap-1 border-black rounded-3xl">
                <GiTwoCoins color="blue" />
                23
              </h1>
            </div>
          </div>
        </section>
        {/* buttons  */}
        <section className="w-full mt-20 relative bg-white p-3">
          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/Myorders"
              className="flex items-center gap-2 border  justify-start p-2"
            >
              <TfiPackage /> Orders
            </Link>
            <button className="flex items-center gap-2 border  justify-start p-2">
              <AiOutlineGift /> Coupons
            </button>
            <button className="flex items-center gap-2 border  justify-start p-2">
              <AiOutlineHeart /> Wishlist
            </button>
            <button className="flex items-center gap-2 border  justify-start p-2">
              <TfiHeadphoneAlt /> help center
            </button>
          </div>
        </section>
        <section className="w- mt-2">
          <div className="p-3 bg-white ">
            <h1 className=" font-semibold text-lg">Credit Options</h1>
            <div className="flex items-center p-2 gap-2">
              <TbCalendarQuestion size={"1.3em"} color="blue" />
              <div>
                <h1 className=" text-gray-800 font-normal text-base">
                  FlipKart Pay Later
                </h1>
                <h1 className="text-gray-500 text-xs">
                  Get ₹10,000 worth Times Prime benefits
                </h1>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full mt-2">
          <div className="bg-white p-2">
            <h1 className=" font-medium text-base">Account Settings</h1>
            <div className="p-2 flex flex-col gap-4 text-gray-700">
              <div className="flex justify-between gap-2">
                <h1 className="flex gap-2">
                  <CiMinimize2 size={"1.5em"} color="blue" />
                  FlipKart Plus
                </h1>
                <IoIosArrowForward className="text-gray-400" />
              </div>
              <div className="flex justify-between gap-2">
                <h1 className="flex gap-2">
                  <CiUser size={"1.5em"} color="blue" />
                  Edit Profile
                </h1>
                <IoIosArrowForward className="text-gray-400" />
              </div>
              <div className="flex justify-between gap-2">
                <h1 className="flex gap-2">
                  <AiOutlineWallet size={"1.5em"} color="blue" /> Saved Cards &
                  Wallet
                </h1>
                <IoIosArrowForward className="text-gray-400" />
              </div>{" "}
              <div className="flex justify-between gap-2">
                <h1 className="flex gap-2">
                  <CiLocationOn size={"1.5em"} color="blue" />
                  Saved addresses
                </h1>
                <IoIosArrowForward className="text-gray-400" />
              </div>{" "}
              <div className="flex justify-between gap-2">
                <h1 className="flex gap-2">
                  <TbLanguageHiragana size={"1.5em"} color="blue" />
                  Select Langusage
                </h1>
                <IoIosArrowForward className="text-gray-400" />
              </div>{" "}
              <div className="flex justify-between gap-2">
                <h1 className="flex gap-2">
                  <CiBellOn size={"1.5em"} color="blue" /> Notification Settings
                </h1>
                <IoIosArrowForward className="text-gray-400" />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full mt-2">
          <div className="bg-white p-2">
            <h1 className=" font-medium text-base">My Activity</h1>
            <div className="p-2 flex flex-col gap-4 text-gray-700">
              <div className="flex justify-between gap-2">
                <h1 className="flex gap-2">
                  <LiaEdit size={"1.5em"} color="blue" />
                  Reivews
                </h1>
                <IoIosArrowForward className="text-gray-400" />
              </div>
              <div className="flex justify-between gap-2">
                <h1 className="flex gap-2">
                  <CiChat1 size={"1.5em"} color="blue" />
                  Questions & Answers
                </h1>
                <IoIosArrowForward className="text-gray-400" />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full p-4">
          <div className="bg-white flex justify-center">
            <button className=" py-1" onClick={logout}>
              Logout
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default MyAccount;
