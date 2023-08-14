import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { resetPassword } from "../../redux/reducers/User/userAction";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { token } = useParams();
  const newToken = token.replace(".", "");
  const [info, setInfo] = useState({});
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const changePass = () => {
    dispatch(resetPassword(newToken, info.password)).then(() => {
      toast.success("Password changed Successfully", {
        autoClose: 3000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
    });
  };
  return (
    <>
      <div className="w-full text-white p-5 text-2xl bg-blue-500">
        <h1>Flipkart </h1>
      </div>
      <div className="flex items-center justify-center ">
        <div className="w-full max-w-2xl top-36 relative rounded-md  border border-gray-300 shadow bg-white">
          <div className="w-full">
            <div className="bg-blue-500 p-5 rounded-md text-white text-lg font-normal">
              <h1>Reset password</h1>
            </div>
            <div className="p-8 flex gap-5 flex-col">
              <div className="relative w-full ">
                <input
                  type="password"
                  name=""
                  onChange={handleChange}
                  value={info.password}
                  id="password"
                  required
                  className="peer outline-none border border-gray-200 focus:border-blue-500   w-2/4 h-12 px-3 pt-1 bg-gray-50"
                />
                <label
                  for="password"
                  className={` absolute duration-300 transform px-3 text-gray-500 text-md scale-100 left-0 mt-3 z-10 
                          peer-focus:left-0 peer-focus:-translate-y-9  peer-focus:scale-90
                           ${
                             info.password
                               ? "-translate-y-9 lg:-translate-x-0 text-md font-medium md:-left-0 left-0  absolute scale-100 "
                               : ""
                           }
                          `}
                >
                  Password
                </label>
              </div>
              <div className="px-5 flex items-center justify-center text-white cursor-pointer  py-2 w-1/4  bg-blue-500">
                <button onClick={changePass}>Confirm</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
