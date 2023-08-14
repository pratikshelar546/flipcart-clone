import React from "react";
import SideBar from "./SideBar";
import HomeNav from "../NavBar/HomeNav";
import MiniProductList from "../CategoryList/MiniProductList";
import { useSelector } from "react-redux";

const ProfileInfo = () => {
  const user = JSON.parse(localStorage.getItem("newUser"));
  // const states = useSelector((state)=>(console.log(state)))
  const getLastName = () => {
    const newArr = user.fullName.split(" ");

    return newArr[newArr.length - 1];
  };
  return (
    <>
      <HomeNav />
      <MiniProductList />
      <main className=" flex ">
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
                      <h1 className="text-lg font-semibold ">Email Address</h1>
                      <p className="text-sm font-medium ml-5 mt-1 text-blue-400 ">
                        Edit
                      </p>
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
                          What happens when I update my email address (or mobile
                          number)?
                        </h4>
                        <p className="text-sm font-medium py-3 text-gray-500">
                          Your login email id (or mobile number) changes,
                          likewise. You'll receive all your account related
                          communication on your updated email address (or mobile
                          number).
                        </p>
                        <h4
                          className="text-md font-semibold"
                          id="when-will-my-flipkart-account-be-updated-with-the-new-email-address-or-mobile-number-"
                        >
                          When will my Flipkart account be updated with the new
                          email address (or mobile number)?
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
                          Updating your email address (or mobile number) doesn't
                          invalidate your account. Your account remains fully
                          functional. You'll continue seeing your Order history,
                          saved information and personal details.
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
      </main>
    </>
  );
};

export default ProfileInfo;
