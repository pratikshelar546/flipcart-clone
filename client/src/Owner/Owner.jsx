import React from "react";
import GetAdmin from "./GetAdmin";
import { Link } from "react-router-dom";

const Owner = () => {
  return (
    <>
      <main className=" h-full min-h-screen overflow-auto bg-gray-900">
        <section className="w-full h-full">
          <nav className="bg-gray-300 h-14 w-full text-gray-700 flex items-center p-3 justify-between">
            <div>
              <h1 className="text-2xl font-semibold">FlipKart Owner</h1>
            </div>
            <div className="flex text-2xl font-semibold gap-5 items-center">
              <Link to="/Owner" className=" bg-gray-700 text-white p-2 rounded">Admins</Link>
              <Link to="/Owner/Addamdin" >Add Admins</Link>
            </div>
          </nav>
        </section>
        <section className="h-full">
          <GetAdmin />
        </section>
      </main>
    </>
  );
};

export default Owner;
