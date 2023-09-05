import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getProductByAdmin } from '../../redux/reducers/Products/productAction';
import NotFound from '../../componends/NotFound';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
const Rivvews = () => {
  const [newDetails , setNewDetails] =useState();
  const { _id } = JSON.parse(localStorage.getItem("AdminDetail"));
const navigate = useNavigate()
const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getProductByAdmin(_id)).then((data)=>setNewDetails(data?.payload))
  })

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "title",
      headerName: "Title",
      minWidth: 250,
      flex: 0.2,
      // renderCell: (params) => {
      //   return (
      //     <>
      //       {params.row.status === "Delivered" ? (
      //         <span className="text-sm bg-green-100 p-1 px-2 font-medium rounded-full text-green-800">
      //           {params.row.status}
      //         </span>
      //       ) : params.row.status === "Shipped" ? (
      //         <span className="text-sm bg-yellow-100 p-1 px-2 font-medium rounded-full text-yellow-800">
      //           {params.row.status}
      //         </span>
      //       ) : (
      //         <span className="text-sm bg-purple-100 p-1 px-2 font-medium rounded-full text-purple-800">
      //           {params.row.status}
      //         </span>
      //       )}
      //     </>
      //   );
      // },
    },
    {
      field: "category",
      headerName: "Category",
      type: "number",
      minWidth: 100,
      flex: 0.1,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 150,
      flex: 0.2,
      renderCell: (params) => {
        return <span>₹{params?.row?.amount?.toLocaleString()}</span>;
      },
    },
    {
      field: "AddedOn",
      headerName: "Added On",
      type: "string",
      minWidth: 200,
      flex: 0.5,
    },
    // {
    //     field: "actions",
    //     headerName: "Actions",
    //     minWidth: 100,
    //     flex: 0.3,
    //     type: "number",
    //     sortable: false,
    //     renderCell: (params) => {
    //         return (
    //             // <Actions editRoute={"order"}  id={params.row.id} />
    //         );
    //     },
    // },
  ];

  const rows = [];
  // console.log(newDetails);
  // console.log("from each",OrderDetails);
  newDetails &&
    newDetails.forEach((OrderDetails) => {
      // console.log(OrderDetails.title);
      const orderDate = new Date(OrderDetails.updatedAt);
      const formattedOrderDate = orderDate.toUTCString().substring(0, 16);

      rows.unshift({
        id: OrderDetails._id,
        title: OrderDetails.title,
        amount: OrderDetails.offerPrice,
        AddedOn: formattedOrderDate,
        category: OrderDetails.category,
      });
    });
    // const [isClicked, setIsClicked] = useState(false);
    const [isData, setIsData] = useState();
    const clicked = (params) => {
      // console.log(params);
      navigate(`/admin/Review/${params.id}`)
      // setIsClicked(true);
      setIsData(params);
    };
   
  return (
    <>
    
    <div className="flex flex-col items-center justify-center ">
        <div className="flex items-center">
      
          <h1 className="text-xl font-medium uppercase p-4">Review of all products</h1>
        </div>
        {newDetails?.length > 0 ? (
          <>
            
              <div
                className="bg-white rounded-xl  shadow-lg w-4/5"
                style={{ height: 400 }}
              >
                <DataGrid
                  className=" cursor-pointer"
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  onCellClick={clicked}
                  disableSelectIconOnClick
                  sx={{
                    boxShadow: 0,
                    border: 0,
                  }}
                />
              </div>
            
          </>
        ) : (
          <>
            <NotFound title={"product is not orderd by anyone"} />
          </>
        )}
      </div>
      </>
  )
}

export default Rivvews