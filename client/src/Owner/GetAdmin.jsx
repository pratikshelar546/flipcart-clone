import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAdmin } from "../redux/reducers/Admin/Auth/AuthAction";
import { DataGrid } from "@mui/x-data-grid";

const GetAdmin = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAdmin());
  }, []);
  const admins = useSelector((state) => state.admin.allAdmins);
  const columns = [
    {
      field: "id",
      headerName: "ADMIN ID",
      minWidth: 10,
      maxWidth: 220,
      flex: 1,
    },
    {
      field: "fullName",
      headerName: "FULL NAME",
      minWidth: 50,
      maxWidth: 130,
      flex: 0.2,
    },
    {
      field: "email",
      headerName: "EMAIL ID",
      type: "string",
      minWidth: 100,
      maxWidth: 250,
      flex: 0.1,
    },
    {
      field: "phoneNo",
      headerName: "Phone Number",
      type: "number",
      maxWidth:150,
      minWidth: 50,
      flex: 0.2,
    },
    // {
    //   field: "orderOn",
    //   headerName: "Order On",
    //   type: "string",
    //   minWidth: 200,
    //   flex: 0.5,
    // },
  ];

  const rows = [];
  admins &&
    admins.forEach((admin) => {
      rows.unshift({
        id: admin._id,
        fullName: admin.fullName,
        email: admin.email,
        phoneNo: admin.phoneNumber,
      });
    });
  return (
    <>
      <div className="h-full w-full items-center justify-center flex p-4">
        <div className="text-black p-5 w-full max-w-3xl bg-gray-300 rounded-lg">
          <div>
            <h1 className="text-2xl">All Admins</h1>
          </div>
          <div className="w-full">
            <DataGrid
              className=" cursor-pointer "
              rows={rows}
              columns={columns}
              pageSize={10}
              //   onCellClick={clicked}
              disableSelectIconOnClick
              sx={{
                boxShadow: 0,
                border: 0,
              }}
            />
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default GetAdmin;
