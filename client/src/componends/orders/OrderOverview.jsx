import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import HomeNav from "../NavBar/HomeNav";
import { NumericFormat } from "react-number-format";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import MiniProductList from "../CategoryList/MiniProductList";
import { AiFillFilePdf, AiOutlineCamera, AiFillStar } from "react-icons/ai";
import { GiTwoCoins } from "react-icons/gi";
import { MdLiveHelp } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa";
import { CiDeliveryTruck } from "react-icons/ci";
import ReactStars from "react-stars";

// import {IoIosArrowForward} from "react-icons/io"
import { IoArrowBack, IoChevronForward } from "react-icons/io5";
// import CartProduct from '../cart/CartProduct';
// import { getProductById } from '../../redux/reducers/Products/productAction';

const OrderOverview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location.state.product);
  // const params = useParams();
  // console.log("Data");
  const [product, setProduct] = useState();
  useEffect(() => {
    const newProduct = JSON.parse(localStorage.getItem("newProduct"));
    localStorage.setItem(
      "newProduct",
      JSON.stringify(location?.state?.product)
    );
    setProduct(newProduct);
  }, [setProduct, location?.state?.product]);

  const details = useSelector((state) => state.Order.detailsById);
  console.log(product);
  const [acSteps, setAcSteps] = useState(0);
  useEffect(() => {

    if(product){
      console.log("yess");
      if (product.orderStatus === "Delivered") {
        console.log(product.orderStatus);
        setAcSteps(2);
      } else if (product.orderStatus === "Processing") {
        setAcSteps(0);
      } else {
        setAcSteps(1);
      }
    }
  }, [product]);
  const steps = ["Processing", "Shipped", "  Delivered"];

  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      {product ? (
        <main className=" hidden tablet:block">
          <HomeNav />
          <MiniProductList />
          <section className=" flex justify-center">
            <div className="p-5 flex lg:max-w-7xl flex-col rounded gap-3 justify-center items-center w-full">
              <div className="bg-white w-full px-3">
                <div className="flex md:flex-row justify-between h-full w-full">
                  <div className="flex flex-col p-4 gap-2 w-2/5 border-r">
                    <h1 className="text-lg font-medium">Delivery address</h1>
                    <h1 className="text-md font-medium">
                      {details?.shippingInfo.name}
                    </h1>
                    <div className="flex">
                      <h1 className="text-md font-normal">
                        {details.shippingInfo.address},{" "}
                        {details.shippingInfo.city},
                        {details.shippingInfo.pincode},
                        {details.shippingInfo.state}
                      </h1>
                    </div>
                    <div>
                      <h1 h1 className="text-md font-medium">
                        Phone Number
                      </h1>
                      <p className="text-md font-normal">
                        {details.shippingInfo.phoneNo}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col p-4 w-2/5 gap-3 top-5 relative border-r">
                    <h1 className="text-lg font-medium">Your rewards</h1>
                    <div className="flex flex-row gap-3 items-center">
                      <GiTwoCoins color="blue" size={"1.2em"} />
                      <div>
                        <p className="text-md flex items-center gap-1">
                          10 SuperCoins Cashback
                        </p>
                        <p className="text-sm ">
                          Use it to save on your next order
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col p-3 top-5 relative gap-3 w-3/5">
                    <h1 className="text-lg font-medium">More actions</h1>
                    <div className="flex flex-row  justify-between">
                      <h1 className="flex gap-2 items-center">
                        <AiFillFilePdf color="blue" size={"1.2em"} /> Download
                        Invoice
                      </h1>
                      <button className="px-6 py-1 border outline-none text-blue-500 border-gray-300">
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white w-full p-4">
                <div className="flex flex-row ">
                  <div className=" w-1/4 h-full flex gap-4 py-4">
                    <img
                      src={product?.image}
                      alt={product?.name}
                      className="w-20 h-20"
                    />
                    <div className="flex flex-col gap-3 ">
                      <h1 className=" text-sm">
                        {product?.name.split(" ").slice(0, 10).join(" ")}...
                      </h1>
                      <p className=" text-xs text-gray-600">Seller:Tera bhai</p>
                      <NumericFormat
                        className="text-md font-medium"
                        value={product?.offerPrice}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₹"}
                      />
                      <p className=" text-green-500 font-semibold text-sm">
                        4 Offers & 1 Coupon Applied
                      </p>
                    </div>
                  </div>
                  <div className="w-2/4 h full flex items-center">
                    <Box sx={{ width: "100%" }}>
                      <Stepper activeStep={acSteps} alternativeLabel>
                        {steps.map((label) => (
                          <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                    </Box>
                  </div>
                  <div className="w-1/4 flex flex-col py-4">
                    <h1 className="text-blue-500 flex gap-2 font-semibold">
                      <AiFillStar color="blue" size={"1.2em"} />
                      Rate & Review Product
                    </h1>
                    <h1 className="text-blue-500 flex gap-2 font-semibold">
                      <MdLiveHelp color="blue" size={"1.2em"} />
                      Need help?
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="p-5 flex lg:max-w-7xl  justify-center items-center w-full"></div> */}
          </section>
        </main>
      ) : (
        <h1>Loading....</h1>
      )}
      {product ? (
        <main className="block tablet:hidden  ">
          <div className="w-full">
            <div className="fixed w-full z-30 overflow-auto shadow">
              <div className="bg-blue-500 p-3  flex justify-between">
                <div className="flex items-center gap-1 ">
                  <IoArrowBack size={"1.5em"} color="white" onClick={goBack} />
                  <h1 className="text-white  text-lg">Order Details</h1>
                </div>
                <div>
                  <FaUserCheck color="white" size={"1.5rem"} />
                </div>
              </div>
              <div className="bg-white p-3 shadow flex w-full">
                <div className="items-center  flex rounded px-2 w-[70%] ">
                  <p className="text-xs text-gray-600">
                    Order ID - {product?._id}
                  </p>
                </div>
              </div>
            </div>
            <div className="relative flex flex-col  bg-white shadow h-full border-b-2 p-3 w-full">
              <div className="flex flex-row gap-2 mt-24">
                <h1 className=" w-3/4 font-normal">
                  {product?.name.split(" ").slice(0, 12).join(" ")}...
                </h1>
                <img src={product?.image} alt="" className=" w-1/4 h-20" />
              </div>
              <div className=" -mt-4">
                <NumericFormat
                  className="text-xl "
                  value={product.offerPrice}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₹"}
                />
              </div>
            </div>
            <div className="w-full p-3  bg-white ">
              <Stepper activeStep={1} orientation="vertical">
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
            <div className="relative p-3 border-b bg-white py-5">
              <p className=" text-gray-700 text-sm">
                Product has no-return policy
                <span className="text-blue-500"> Know more</span>
              </p>
            </div>
            <div className="flex w-full items-center bg-white border-b p-2 gap-4">
              <ReactStars
                className=" justify-between w-[60%] flex"
                count={5}
                // onChange={ratingChanged}
                size={30}
                color2={"blue"}
              />
              <button className="w-[40%] flex items-center justify-center gap-2 border py-1 border-gray-300 outline-none text-blue-500">
                <AiOutlineCamera size={"1.2em"} /> Add Review
              </button>
            </div>
            <div className="flex justify-center p-3 border-b bg-white shadow">
              <h1 className="text-md text-gray-600">Need Help?</h1>
            </div>
            <div className="flex flex-col bg-white p-3 pb-0">
              <h1 className="text-sm text-gray-500 ">Rate your experience</h1>
              <div className="flex justify-between shadow p-3">
                <div className="flex items-center gap-2">
                  <CiDeliveryTruck size={"1.2rem"} />
                  <p className="text-gray-500">
                    How was your delivery experience
                  </p>
                </div>
                <div>
                  <IoChevronForward size={"1.2rem"} />
                </div>
              </div>
              <div className="flex justify-between shadow p-3">
                <div className="flex items-center gap-2">
                  <AiFillFilePdf color="blue" size={"1.2rem"} />
                  <p className="text-gray-500">Invoice download</p>
                </div>
                <div>
                  <IoChevronForward size={"1.2rem"} />
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col shadow bg-white mt-2">
              <div className="border-b">
                <h1 className="p-2 text-sm text-gray-500 shadow-sm">
                  Shipping Details
                </h1>
                <div className="p-2 text-md text-gray-500">
                  <h1>{details.shippingInfo.name}</h1>
                  <h1>{details.shippingInfo.address}</h1>
                  <h1>
                    {details.shippingInfo.city} - {details.shippingInfo.pincode}
                  </h1>
                  <h1>{details.shippingInfo.state}</h1>
                  <h1>Phone number: {details.shippingInfo.phoneNo}</h1>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col bg-white mt-2 shadow">
              <h1 className="p-2 text-sm text-gray-500 shadow-sm">
                Price Details
              </h1>
              <div className="p-2 flex flex-col gap-2">
                <div className="flex justify-between">
                  <h1>Seliing Price</h1>
                  <NumericFormat
                    className="text-md "
                    value={product?.price}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₹"}
                  />
                </div>
                <div className="flex justify-between">
                  <h1>Extra Discount</h1>
                  <NumericFormat
                    className="text-md "
                    value={product?.price - product.offerPrice}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"- ₹"}
                  />
                </div>
                <div className="flex justify-between">
                  <h1>Special Price</h1>
                  <NumericFormat
                    className="text-md "
                    value={product?.offerPrice}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₹"}
                  />
                </div>
                <div className="flex justify-between">
                  <h1>Total Amount</h1>
                  <NumericFormat
                    className="text-md "
                    value={product?.offerPrice}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₹"}
                  />
                </div>
              </div>
            </div>
            <div className="p-3">
              <h1 className="">
                Payment Mode:{" "}
                <span className="text-sm">{details.paymentInfo.status}</span>
              </h1>
            </div>
          </div>{" "}
        </main>
      ) : (
        <h1 className=" text-2xl">Loading...</h1>
      )}
    </>
  );
};

export default OrderOverview;
