import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changePassword } from "../../redux/reducers/User/userAction";

const ChangePassword = () => {
  const [info, setInfo] = useState({});
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  console.log(info);
  const { email } = JSON.parse(localStorage.getItem("newUser"));
  const changePass = () => {
    dispatch(
      changePassword(
        info.oldpassword,
        info.newpassword,
        info.confirmPass,
        email
      )
    ).then((data) => console.log(data));
  };
  return (
    <>
      <main>
        <section>
          <div className="bg-blue-500 text-lg font-medium text-white p-5">
            <h1>FlipKart</h1>
          </div>
          <div className="flex justify-center pt-10 items-center">
            <div className="w-full max-w-3xl h-full bg-white">
              <div className="bg-blue-500 text-lg font-medium text-white p-5">
                <h1>Chnage Password</h1>
              </div>
              <div className="p-8 flex gap-8 flex-col">
                <div className="relative w-full ">
                  <input
                    type="password"
                    name=""
                    onChange={handleChange}
                    value={info.oldpassword}
                    id="oldpassword"
                    required
                    className="peer outline-none border border-gray-200 focus:border-blue-500   w-2/4 h-12 px-3 pt-1 bg-gray-50"
                  />
                  <label
                    for="oldpassword"
                    className={` absolute duration-300 transform px-3 text-gray-500 text-md scale-100 left-0 mt-3 z-10 
                          peer-focus:left-0 peer-focus:-translate-y-9  peer-focus:scale-90
                           ${
                             info.oldpassword
                               ? "-translate-y-9 lg:-translate-x-0 text-md font-medium md:-left-0 left-0  absolute scale-100 "
                               : ""
                           }
                          `}
                  >
                    Old Password
                  </label>
                </div>
                <div className="relative w-full ">
                  <input
                    type="password"
                    name=""
                    onChange={handleChange}
                    value={info.newpassword}
                    id="newpassword"
                    required
                    className="peer outline-none border border-gray-200 focus:border-blue-500   w-2/4 h-12 px-3 pt-1 bg-gray-50"
                  />
                  <label
                    for="newpassword"
                    className={` absolute duration-300 transform px-3 text-gray-500 text-md scale-100 left-0 mt-3 z-10 
                          peer-focus:left-0 peer-focus:-translate-y-9  peer-focus:scale-90
                           ${
                             info.newpassword
                               ? "-translate-y-9 lg:-translate-x-0 text-md font-medium md:-left-0 left-0  absolute scale-100 "
                               : ""
                           }
                          `}
                  >
                    New Password
                  </label>
                </div>
                <div className="relative w-full ">
                  <input
                    type="password"
                    name=""
                    onChange={handleChange}
                    value={info.confirmPass}
                    id="confirmPass"
                    required
                    className="peer outline-none border border-gray-200 focus:border-blue-500   w-2/4 h-12 px-3 pt-1 bg-gray-50"
                  />
                  <label
                    for="confirmPass"
                    className={` absolute duration-300 transform px-3 text-gray-500 text-md scale-100 left-0 mt-3 z-10 
                          peer-focus:left-0 peer-focus:-translate-y-9  peer-focus:scale-90
                           ${
                             info.confirmPass
                               ? "-translate-y-9 lg:-translate-x-0 text-md font-medium md:-left-0 left-0  absolute scale-100 "
                               : ""
                           }
                          `}
                  >
                    Confirm Password
                  </label>
                </div>
                <div className="px-5 flex items-center justify-center text-white cursor-pointer  py-2 w-1/4  bg-blue-500">
                  <button onClick={changePass}>Confirm</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ChangePassword;
