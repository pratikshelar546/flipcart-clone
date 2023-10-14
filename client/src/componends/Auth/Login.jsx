import React, { Fragment, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";

import "react-toastify/dist/ReactToastify.css";
import { RxCross2 } from "react-icons/rx";
import {FiEye} from "react-icons/fi"
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logIn } from "../../redux/reducers/Auth/authAction";
import { getUser } from "../../redux/reducers/User/userAction";

const Login = ({ isOpen, setIsOpen }) => {
  
  // const openModal = ()=>{
  //     setIsOpen(true);
  // }
  const [userData, setUserData] = useState({});
  const [text, setText] = useState("password");
  const toggelInput =()=>{
    setText((prev)=>prev === 'password'? 'text':'password')
  }
  const closeModal = () => {
    setIsOpen(false);
  };
  const dispatch = useDispatch();
  const submit = async () => {
    await dispatch(logIn(userData));
    await dispatch(getUser());
    // console.log(data.payload);

    closeModal();
    // console.log(localStorage.getItem.User);
  };
  // console.log(process.env.REACT_APP_SERVER_URL);
  //  console.log(userData);
  const handleChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    // console.log(userData);
  };
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
                      <h1>
                        Get access to your Orders, Wishlist and Recommendations
                        account{" "}
                      </h1>

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
                            <FiEye size={"1rem"} className=" cursor-pointer" onClick={toggelInput}/>
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
                        to="/"
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
