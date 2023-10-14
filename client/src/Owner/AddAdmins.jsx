import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { adminSignup, getAdmin } from "../redux/reducers/Admin/Auth/AuthAction";

const AddAdmins = () => {
  const [info, setInfo] = useState("");
  const dispatch = useDispatch();
  const Admin = async (e) => {
    await dispatch(adminSignup(info));
    await dispatch(getAdmin());
  };
  const hadleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  useEffect(() => {}, []);
  return (
    <>
      <main className="bg-gray-700 h-full min-h-screen w-full">
        <section className="w-full h-full">
          <nav className="bg-gray-300 h-14 w-full text-gray-700 flex items-center p-3 justify-between">
            <div>
              <h1 className="text-2xl font-semibold">FlipKart Owner</h1>
            </div>
            <div className="flex text-2xl font-semibold gap-5 items-center ">
              <Link to="/Owner">Admins</Link>
              <Link
                className=" bg-gray-700 text-white p-2 rounded"
                to="/Owner/Addamdin"
              >
                Add Admins
              </Link>
            </div>
          </nav>
        </section>
        <section
          section
          className="flex items-center justify-center top-1/2 pt-4 relative"
        >
          <div className="flex items-center justify-center rounded-lg p-5 shadow bg-gray-200 max-w-7xl">
            <form
              onSubmit={Admin}
              encType="multipart/form-data"
              className="flex flex-col w-full"
              id="mainform"
            >
              <div className="flex flex-col gap-3 m-2 p-3 w-full">
                <TextField
                  label="Name"
                  id="fullName"
                  variant="outlined"
                  size="small"
                  required
                  value={info.fullName}
                  onChange={hadleChange}
                />
                <TextField
                  label="Email"
                  required
                  variant="outlined"
                  size="small"
                  id="email"
                  value={info.email}
                  onChange={hadleChange}
                />
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  id="phoneNumber"
                  size="small"
                  required
                  value={info.phoneNumber}
                  onChange={hadleChange}
                />
                <TextField
                  label="Password"
                  type="password"
                  id="password"
                  variant="outlined"
                  size="small"
                  required
                  value={info.password}
                  onChange={hadleChange}
                />
              </div>
              <div className="flex flex-col  p-3 w-full">
                <input
                  type="submit"
                  className="p-2 bg-gray-700 text-white"
                  value="Add Admin"
                />
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default AddAdmins;
