import React, { useEffect, useState } from "react";
import HomeNav from "./NavBar/HomeNav";

import SideBar from "./HomePage/SideBar";
import { AiOutlineMenu } from "react-icons/ai";
const Admin = ({ activeTab, children }) => {
  const [onMobile, setOnMobile] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  useEffect(() => {
    if (window.innerWidth < 600) {
      setOnMobile(true);
    }
  }, []);
  // console.log(toggleSidebar);
  return (
    <>
      <HomeNav />
      <main className="flex min-h-screen sm:min-w-full">
        {!onMobile && <SideBar activeTab={activeTab} />}
        {toggleSidebar && (
          <SideBar activeTab={activeTab} toggleSidebar={toggleSidebar} />
        )}

        <div className="w-full sm:w-4/5 min-h-screen">
          <div className="flex flex-col gap-6 p-5 pb-6 overflow-hidden">
            <button
              onClick={() => setToggleSidebar(!toggleSidebar)}
              className=" sm:hidden bg w-10 h-10 rounded-full tex flex items-center justify-center"
            >
              <AiOutlineMenu />
            </button>
            {children}
          </div>
        </div>
      </main>
    </>
  );
};

export default Admin;
