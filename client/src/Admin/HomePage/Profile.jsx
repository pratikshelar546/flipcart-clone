import React, { useEffect, Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
// import { } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {
  getAdmin,
  updateAdmin,
} from "../../redux/reducers/Admin/Auth/AuthAction";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import CustomizedSteppers from "./Stepper";
const Profile = () => {
  const admin = JSON.parse(localStorage.getItem("AdminDetail"));
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [address, setAddress] = useState("");
  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };
  // if (!admin.address) {
  //   console.log("galf1");
  // }

  const updateAddress = (e) => {
    e.preventDefault();
    // console.log(address);
    dispatch(updateAdmin(admin._id, address));
    setIsOpen(false);
    toast.success("upadted successfully", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  useEffect(() => {
    // dispatch(getAdmin()).then((data) => console.log(data.payload));
  });
  // useSelector((state)=>console.log(state?.admin))
  const [steps, setSteps] = useState(0);
  useEffect(()=>{

    if(admin.address){
      setSteps(1);
    }
  },[admin.address])
  return (
    <>
      <main className=" w-full flex justify-center items-center ">
        <div className="w-full max-w-3xl gap-3 flex flex-col rounded bg-white p-5">
          <div>
            <CustomizedSteppers activeStep={steps} />
          </div>
          <div className="flex">
            <div className="w-1/5 h-36">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD5iROb1TgJ_rcl-6r-68v1yjtID052zxSkw&usqp=CAU"
                alt="profile"
                className="w-full h-full rounded-full"
              />
            </div>
            <div className="w-4/5 p-5 text-lg flex flex-col gap-2 text-gray-500">
              <h1>Name: {admin.fullName}</h1>
              <h1>Email: {admin.email}</h1>
              <h1>Phone Number: {admin.phoneNumber}</h1>
              {!admin.address ? (
                <button
                  type="button"
                  onClick={openModal}
                  className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium w-44 text-white hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
                  UPDATE
                </button>
              ) : (
                <h1 className=" text-base">Address:  {admin.address}</h1>
              )}

              <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                        <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                          <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900"
                          >
                            Add your persional details
                          </Dialog.Title>
                          <div className="mt-2 w-full">
                            <form
                              onSubmit={updateAddress}
                              encType="multipart/form-data"
                              className="flex flex-col gap-6 sm:flex-col bg-white rounded-lg shadow p-4"
                              id="mainform"
                            >
                              <div className="w-full flex gap-5">
                                <TextField
                                  label="Full Name"
                                  variant="outlined"
                                  size="small"
                                  required
                                  className="w-full"
                                  value={admin.fullName}
                                />
                                <TextField
                                  label="Email"
                                  variant="outlined"
                                  size="small"
                                  required
                                  className="w-full"
                                  value={admin.email}
                                />
                                <TextField
                                  label="Phonr Number"
                                  variant="outlined"
                                  size="small"
                                  required
                                  className="w-full"
                                  value={admin.phoneNumber}
                                />
                              </div>

                              <div className="w-full">
                                <TextField
                                  label="Address"
                                  variant="outlined"
                                  size="small"
                                  required
                                  className="w-full"
                                  onChange={(e) => setAddress(e.target.value)}
                                />
                              </div>
                            </form>
                          </div>

                          <div className="mt-4">
                            <input
                              form="mainform"
                              type="submit"
                              className="bg-orange-500 uppercase w-1/3 p-3 text-white font-medium rounded shadow hover:shadow-lg cursor-pointer"
                              value="Update"
                            />
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
