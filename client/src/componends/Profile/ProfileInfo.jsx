import React from "react";
import SideBar from "./SideBar";
import HomeNav from "../NavBar/HomeNav";
import MiniProductList from "../CategoryList/MiniProductList";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
const ProfileInfo = () => {
  const user = JSON.parse(localStorage.getItem("newUser"));
  // const states = useSelector((state)=>(console.log(state)))
  const getLastName = () => {
    const newArr = user.fullName.split(" ");

    return newArr[newArr.length - 1];
  };

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      <main className="hidden md:block">
        <HomeNav />
        <MiniProductList />
        <section className=" flex ">
          <section className="flex w-full justify-center">
            <div className="w-full relative  max-w-6xl ">
              <div className="w-full flex gap-4">
                <div className="w-[30%]">
                  <SideBar />
                </div>
                <div className="w-[70%] p-5 ">
                  <div className="w-full relative bg-white p-4 ">
                    <div className="flex">
                      <h1 className="text-lg font-semibold ">
                        Personal Information
                      </h1>
                      <p className="text-sm font-medium ml-5 mt-1 text-blue-400 ">
                        Edit
                      </p>
                    </div>
                    <div className="flex py-3 text-gray-500 gap-3">
                      <input
                        type="text"
                        name="FirstName"
                        id=""
                        disabled
                        value={user.fullName.split(" ", 1)}
                        className="border-2 border-gray-100 rounded p-2"
                      />
                      <input
                        type="text"
                        name="FirstName"
                        id=""
                        disabled
                        value={getLastName()}
                        className="border-2 border-gray-100 rounded p-2"
                      />
                    </div>
                    <div className="flex flex-col py-8 gap-3">
                      <h1 className="text-sm font-medium">Your Gender</h1>

                      <div className="flex md:flex-row flex-col text-gray-500 gap-4 md:gap-6">
                        <label for="male" className="flex gap-2">
                          <input
                            type="radio"
                            name="address"
                            id="male"
                            value="male"
                          />
                          Male
                        </label>
                        <label for="female" className="flex gap-2">
                          <input
                            type="radio"
                            name="address"
                            id="female"
                            value="female"
                          />
                          Female
                        </label>
                      </div>
                    </div>
                    <div className="flex flex-col py-8">
                      <div className="flex">
                        <h1 className="text-lg font-semibold ">
                          Email Address
                        </h1>
                        <p className="text-sm font-medium ml-5 mt-1 text-blue-400 ">
                          Edit
                        </p>

                        <Link
                          className="text-sm font-medium ml-5 mt-1 text-blue-400"
                          to="/changePassword"
                        >
                          Change password
                        </Link>
                      </div>
                      <div className="flex py-6 gap-3">
                        <input
                          type="text"
                          name="FirstName"
                          id=""
                          disabled
                          value={user.email}
                          className="border-2 border-gray-100 rounded p-2 w-64 text-gray-500"
                        />
                      </div>
                      <div>
                        <div className="text-md font-semibold py-6">FAQs</div>
                        <div>
                          <h4
                            className="text-md font-semibold"
                            id="what-happens-when-i-update-my-email-address-or-mobile-number-"
                          >
                            What happens when I update my email address (or
                            mobile number)?
                          </h4>
                          <p className="text-sm font-medium py-3 text-gray-500">
                            Your login email id (or mobile number) changes,
                            likewise. You'll receive all your account related
                            communication on your updated email address (or
                            mobile number).
                          </p>
                          <h4
                            className="text-md font-semibold"
                            id="when-will-my-flipkart-account-be-updated-with-the-new-email-address-or-mobile-number-"
                          >
                            When will my Flipkart account be updated with the
                            new email address (or mobile number)?
                          </h4>
                          <p className="text-sm font-medium py-3 text-gray-500">
                            It happens as soon as you confirm the verification
                            code sent to your email (or mobile) and save the
                            changes.
                          </p>
                          <h4
                            className="text-md font-semibold"
                            id="what-happens-to-my-existing-flipkart-account-when-i-update-my-email-address-or-mobile-number-"
                          >
                            What happens to my existing Flipkart account when I
                            update my email address (or mobile number)?
                          </h4>
                          <p className="text-sm font-medium py-3 text-gray-500">
                            Updating your email address (or mobile number)
                            doesn't invalidate your account. Your account
                            remains fully functional. You'll continue seeing
                            your Order history, saved information and personal
                            details.
                          </p>
                          <h4
                            className="text-md font-semibold"
                            id="does-my-seller-account-get-affected-when-i-update-my-email-address-"
                          >
                            Does my Seller account get affected when I update my
                            email address?
                          </h4>
                          <p className="text-sm font-medium py-3 text-gray-500">
                            Flipkart has a 'single sign-on' policy. Any changes
                            will reflect in your Seller account also.
                          </p>
                        </div>
                        <p className="text-blue-500 text-md font-semibold pt-4">
                          Deactivate Account
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-white ">
                    <img
                      src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/myProfileFooter_4e9fe2.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
      </main>
      <main className="block md:hidden">
        <section className="w-full h-full">
          <div className="bg-blue-500 flex gap-3 items-center text-white p-4">
            <AiOutlineArrowLeft
              color="white"
              size={"1.3rem"}
              onClick={goBack}
            />
            <h1>FlipKart</h1>
          </div>
          <div className="w-full h-full p-8 bg-blue-500 flex items-center justify-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD5iROb1TgJ_rcl-6r-68v1yjtID052zxSkw&usqp=CAU"
              alt="avtar"
              className="w-14 h-14 rounded-full "
            />
          </div>
          <div className="w-full bg-white flex flex-col p-6 gap-8">
            <div className="relative w-full ">
              <input
                type="text"
                name=""
                value={user.fullName.split(" ", 1)}
                id="name"
                disabled
                className="peer outline-none border border-gray-200 focus:border-blue-500   w-full h-12 px-3 pt-1 bg-gray-50"
              />
              <label
                for="name"
                className={` absolute duration-300 transform px-3 text-gray-500 text-md scale-100 left-0 mt-3 z-10 
                          peer-focus:left-0 peer-focus:-translate-y-9  peer-focus:scale-90
                           ${
                             user.fullName
                               ? "-translate-y-9 lg:-translate-x-0 text-md font-medium md:-left-0 left-0  absolute scale-100 "
                               : ""
                           }
                          `}
              >
                First Name
              </label>
            </div>
            <div className="relative w-full ">
              <input
                type="text"
                name=""
                value={getLastName()}
                id="name"
                disabled
                className="peer outline-none border border-gray-200 focus:border-blue-500   w-full h-12 px-3 pt-1 bg-gray-50"
              />
              <label
                for="name"
                className={` absolute duration-300 transform px-3 text-gray-500 text-md scale-100 left-0 mt-3 z-10 
                          peer-focus:left-0 peer-focus:-translate-y-9  peer-focus:scale-90
                           ${
                             user.fullName
                               ? "-translate-y-9 lg:-translate-x-0 text-md font-medium md:-left-0 left-0  absolute scale-100 "
                               : ""
                           }
                          `}
              >
                Last Name
              </label>
            </div>
            <div className="flex justify-center text-blue-500 font-bold items-center ">
              <button>SUBMIT</button>
            </div>
            <div className="relative w-full ">
              <input
                type="text"
                name=""
                value={user.email}
                id="email"
                disabled
                className="peer outline-none border border-gray-200 focus:border-blue-500   w-full h-12 px-3 pt-1 bg-gray-50"
              />
              <label
                for="eamil"
                className={` absolute duration-300 transform px-3 text-gray-500 text-md scale-100 left-0 mt-3 z-10 
                          peer-focus:left-0 peer-focus:-translate-y-9  peer-focus:scale-90
                           ${
                             user.email
                               ? "-translate-y-9 lg:-translate-x-0 text-md font-medium md:-left-0 left-0  absolute scale-100 "
                               : ""
                           }
                          `}
              >
                Email ID
              </label>
            </div>
            <div className="flex justify-center text-blue-500 font-bold items-center ">
              <button>Deactivate Account</button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ProfileInfo;
