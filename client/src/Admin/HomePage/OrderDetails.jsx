import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import {
  getOrderDetails,
  getProductDetails,
  updateStatus,
} from "../../redux/reducers/Admin/Orders/OrderAction";
import NotFound from "../../componends/NotFound";

const OrderDetails = () => {
  console.log("here");
  const dispatch = useDispatch();
  const [OrderDetails, setOrderDetails] = useState([]);
  const admin = JSON.parse(localStorage.getItem("AdminDetail"));
  useEffect(() => {
    async function getDetails() {
      await dispatch(getOrderDetails(admin?._id)).then((data) =>
        setOrderDetails(data?.payload)
      );
    }
    getDetails();
  }, [admin?._id, dispatch]);
  let newDetails = [];
  if (OrderDetails.length > 0) {
    newDetails = OrderDetails?.map((item) => item?.orderItems);
  }
  // console.log(newDetails);
  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.2,
      renderCell: (params) => {
        return (
          <>
            {params.row.status === "Delivered" ? (
              <span className="text-sm bg-green-100 p-1 px-2 font-medium rounded-full text-green-800">
                {params.row.status}
              </span>
            ) : params.row.status === "Shipped" ? (
              <span className="text-sm bg-yellow-100 p-1 px-2 font-medium rounded-full text-yellow-800">
                {params.row.status}
              </span>
            ) : (
              <span className="text-sm bg-purple-100 p-1 px-2 font-medium rounded-full text-purple-800">
                {params.row.status}
              </span>
            )}
          </>
        );
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
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
      field: "orderOn",
      headerName: "Order On",
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
      const orderDate = new Date(OrderDetails.orderdAt);
      const formattedOrderDate = orderDate.toUTCString().substring(0, 16);

      rows.unshift({
        id: OrderDetails._id,
        itemsQty: OrderDetails.quantity,
        amount: OrderDetails.offerPrice,
        orderOn: formattedOrderDate,
        status: OrderDetails.orderStatus,
      });
    });
  const [isClicked, setIsClicked] = useState(false);
  const [isData, setIsData] = useState();
  const clicked = (params) => {
    // console.log(params);
    setIsClicked(true);
    setIsData(params);
  };
  const clearpage = () => {
    setIsClicked(false);
    setIsData();
  };
  // console.log(isData);
  useEffect(() => {
    if (isClicked) {
      // console.log(isClicked);
      dispatch(getProductDetails(isData?.id));
    }
  }, [dispatch, isClicked, isData]);
  const { responseProduct } = useSelector(
    (State) => State?.AdminOrder?.orderDetails
  );
  // console.log(responseProduct);
  const newProduct =
    responseProduct?.orderItems.length === 1
      ? responseProduct.orderItems[0]
      : {};
  // console.log(newProduct);
  const orderDate = new Date(newProduct.orderdAt);
  const formattedOrderDate = orderDate.toUTCString().substring(0, 16);

  const [status, setStatus] = useState("");
  const updateOrderSubmitHandler = (e) => {
    dispatch(updateStatus(isData?.id, status)).then((data) =>
      console.log(data)
    );
    //  console.log(status);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center ">
        <div className="flex items-center">
          <AiOutlineArrowLeft size={"1.5rem"} onClick={clearpage} />
          <h1 className="text-xl font-medium uppercase p-4">Order Details</h1>
        </div>
        {OrderDetails?.length > 0 ? (
          <>
            {!isClicked ? (
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
            ) : (
              <div>
                {responseProduct && (
                  <>
                    <h1 className=" text-center">
                      Order Id:- {responseProduct._id}
                    </h1>
                    <div className="w-full max-w-5xl p-5 shadow bg-white">
                      <div className="flex flex-row ">
                        <div className="w-1/2 flex flex-col p-2 gap-2 text-base ">
                          <h1 className="text-lg font-medium">
                            PRODUCT DETAILS
                          </h1>
                          <img
                            src={newProduct.image}
                            alt="images"
                            className="w-48 "
                          />
                          <h1 className="max-w-2xl">
                            {newProduct.name.split(" ", 25).join(" ")}...
                          </h1>
                          <h1 className="text-lg font-medium ">
                            Price:- ₹{newProduct.offerPrice.toLocaleString()}
                          </h1>
                          <p>{responseProduct.paymentInfo.status}</p>
                        </div>
                        <div className="flex flex-col">
                          <h1 className="text-lg font-medium">
                            SHIPPING DETAILS
                          </h1>
                          <h1>{responseProduct?.user.fullName}</h1>
                          <h1>{responseProduct.user.email}</h1>
                          <p>{responseProduct.shippingInfo.address},</p>
                          <p>
                            {responseProduct.shippingInfo.city},
                            {responseProduct.shippingInfo.pincode},
                          </p>
                          <p>{responseProduct.shippingInfo.state}</p>
                          <p>
                            Phone Number :-
                            {responseProduct.shippingInfo.phoneNo}
                          </p>
                          <div className="pt-3">
                            <h1 className="text-lg font-medium uppercase">
                              Order Status
                            </h1>
                            <form
                              onSubmit={updateOrderSubmitHandler}
                              className="flex flex-col gap-3 p-2"
                            >
                              <h3 className="font-medium text-lg">
                                Update Status
                              </h3>
                              <div className="flex gap-2">
                                <p className="text-sm font-medium">
                                  Current Status:
                                </p>
                                <p className="text-sm text-black">
                                  {newProduct.orderStatus === "Shipped" &&
                                    `Shipped on ${formattedOrderDate}`}
                                  {newProduct.orderStatus === "Processing" &&
                                    `Ordered on ${formattedOrderDate}`}
                                  {newProduct.orderStatus === "Delivered" &&
                                    `Delivered on ${formattedOrderDate}`}
                                </p>
                              </div>
                              <FormControl fullWidth sx={{ marginTop: 1 }}>
                                <InputLabel id="order-status-select-label">
                                  Status
                                </InputLabel>
                                <Select
                                  labelId="order-status-select-label"
                                  id="order-status-select"
                                  value={status}
                                  label="Status"
                                  onChange={(e) => setStatus(e.target.value)}
                                >
                                  {newProduct.orderStatus === "Shipped" && (
                                    <MenuItem value={"Delivered"}>
                                      Delivered
                                    </MenuItem>
                                  )}
                                  {newProduct.orderStatus === "Processing" && (
                                    <MenuItem value={"Shipped"}>
                                      Shipped
                                    </MenuItem>
                                  )}
                                  {newProduct.orderStatus === "Delivered" && (
                                    <MenuItem value={"Delivered"}>
                                      Delivered
                                    </MenuItem>
                                  )}
                                </Select>
                              </FormControl>
                              <button
                                type="submit"
                                className="bg-orange-500 p-2.5 text-white font-medium rounded shadow hover:shadow-lg"
                              >
                                Update
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </>
        ) : (
          <>
            <NotFound title={"product is not orderd by anyone"} />
          </>
        )}
      </div>
    </>
  );
};

export default OrderDetails;
