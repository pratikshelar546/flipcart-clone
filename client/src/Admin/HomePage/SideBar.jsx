import React from "react";
import { FiPackage } from "react-icons/fi";
import {
  BiBuilding,
  BiAddToQueue,
  BiLogOut,
  BiUserCircle,
} from "react-icons/bi";
import { VscPreview } from "react-icons/vsc";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const SideBar = ({ activeTab, toggleSidebar }) => {
  // console.log(toggleSidebar);
  const admin = JSON.parse(localStorage.getItem("AdminDetail"));
  const sideLables = [
    {
      ref: "/admin/Orders",
      lable: "Orders",
      icon: <BiBuilding />,
    },
    {
      ref: "/admin/Products",
      lable: "Products",
      icon: <FiPackage />,
    },
    {
      ref: "/admin/AddProduct",
      lable: "Add Product",
      icon: <BiAddToQueue />,
    },
    {
      ref: "/admin/AddProduct",
      lable: "Users",
      icon: <BiAddToQueue />,
    },
    {
      ref: "/admin/Reviews",
      lable: "Reviews",
      icon: <VscPreview />,
    },
    {
      ref: "/admin/Profile",
      lable: "My Profile",
      icon: <BiUserCircle />,
    },
    {
      ref: "/admin/AddProduct",
      lable: "Logout",
      icon: <BiLogOut />,
    },
  ];
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("AdminDetail");
    localStorage.removeItem("admin");
    toast.success("Logout successfully", {
      position: toast.POSITION.TOP_RIGHT,
    });
  navigate("/")
  };
  return (
    <>
      <main className="relative lg:w-72 ">
        <section className="w-full h-full text-white bg-gray-700 p-2">
          <Link
            className="font-medium w-full flex flex-row gap-3 bg-gray-500 px-2 py-1 rounded-sm"
            to="/admin/Profile"
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD5iROb1TgJ_rcl-6r-68v1yjtID052zxSkw&usqp=CAU"
              alt="avtar"
              className="w-12 h-12 rounded-full"
            />
            <div className="flex flex-col">
              <h1 className=" font-semibold ">{admin?.fullName}</h1>
              <h1 className=" text-sm">{admin?.email}</h1>
            </div>
          </Link>
          <div className="p- flex flex-col gap-0 my-4">
            {sideLables.map((items, index) => {
              const { lable, icon, ref } = items;
              return (
                <>
                  {lable === "Logout" ? (
                    <button
                      className=" hover:bg-gray-500 flex gap-2 my-2 font-medium p-3 items-center"
                      onClick={logOut}
                    >
                      <spam>{icon}</spam>
                      <spam>{lable}</spam>
                    </button>
                  ) : (
                    <Link
                      to={ref}
                      className={` flex gap-2 my-2 font-medium p-3 items-center ${
                        activeTab === index
                          ? "bg-gray-500"
                          : "hover:bg-gray-500"
                      }`}
                    >
                      <spam>{icon}</spam>
                      <spam>{lable}</spam>
                    </Link>
                  )}
                </>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
};

export default SideBar;
