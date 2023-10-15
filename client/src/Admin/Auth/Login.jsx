import React, { Fragment, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";

import "react-toastify/dist/ReactToastify.css";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {
  adminLogin,
  getAdmin,
} from "../../redux/reducers/Admin/Auth/AuthAction";
import { FiEye } from "react-icons/fi";

const Login = ({ isOpen, setIsOpen }) => {
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();
  const [text, setText] = useState("password");
  const toggelInput = () => {
    setText((prev) => (prev === "password" ? "text" : "password"));
  };
  console.log("login")
  const closeModal = () => {
    setIsOpen(false);
    navigate("/");
  };
  // console.log(isOpen);
  const dispatch = useDispatch();
  const submit = async () => {
    await dispatch(adminLogin(userData));
    await dispatch(getAdmin());
    navigate("/admin/Orders");
  };

  const handleChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    // console.log(userData);
  };

  // console.log(newId);
  // if(!id){
  //   isOpen(true)
  // }
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 bg-[rgba(0,0,0,.6)]"
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md  transform h-96 overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  ></Dialog.Title>
                  <RxCross2
                    className="float-right  relative flex cursor-pointer mr-1 mt-1"
                    color="gray"
                    onClick={closeModal}
                    size={"1.5rem"}
                  />
                  <main className="relative flex h-full flex-row">
                    <section className="relative bg-blue-500 text-white p-5 w-2/3 ">
                      <h1>Login</h1>
                      <h1>To get access to your products and orders.</h1>

                      <img
                        src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png"
                        alt="shopKArt"
                        className="flex mt-9 relative -bottom-16"
                      />
                    </section>

                    <section className="mt-2 flex flex-col gap-3 p-5 w-full">
                      <form className="flex flex-col gap-2">
                        <div className="w-full flex flex-col gap-2">
                          <label htmlFor="email">Email</label>
                          <input
                            type="text"
                            id="email"
                            required
                            value={userData.email}
                            onChange={handleChange}
                            placeholder="user@email.com"
                            className="w-full border border-gray-400 px-3 py-2 rounded-lg outline-1 outline-blue-500 focus:border-zomato-400"
                          />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                          <label htmlFor="password">Password</label>
                          <div className="flex items-center w-full border border-gray-400 outline-1 outline-blue-500 px-3 py-2 rounded-lg focus:border-zomato-400">
                            <input
                              type={text}
                              id="password"
                              required
                              value={userData.password}
                              onChange={handleChange}
                              placeholder="*********"
                              className=" outline-none"
                            />
                            <FiEye
                              size={"1rem"}
                              className=" cursor-pointer"
                              onClick={toggelInput}
                            />
                          </div>
                        </div>
                        <div
                          className="w-full text-center bg-blue-500 text-white px-2 rounded-lg py-2 cursor-pointer"
                          onClick={submit}
                        >
                          Login
                        </div>
                      </form>
                      <Link
                        className="relative text-blue-700 text-xs font-normal -bottom-16 align-bottom text-center"
                        to="/admin/Signup"
                      >
                        New to ShopKart? Create an account
                      </Link>
                    </section>
                  </main>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Login;
