import React, { Fragment, useEffect, useState } from "react";
// import { Transition, Dialog } from "@headlessui/react";

import "react-toastify/dist/ReactToastify.css";
import { TiTick } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import HomeNav from "../NavBar/HomeNav";
import { getProductById } from "../../redux/reducers/Products/productAction";
import { addDetails } from "../../redux/reducers/order/orderActions";
import { NumericFormat } from "react-number-format";

import { useNavigate } from "react-router-dom";
import { deleteCart } from "../../redux/reducers/cart/cartAction";
import CartProduct from "../cart/CartProduct";

// import nodemailer from 'nodemailer';
const Shipping = ({ isOpen, setIsOpen }) => {
  // console.log("hello");
  const Navigate = useNavigate();
  const [newCart, setNewCart] = useState([]);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("newUser"));
  const priceWalaCart = useSelector((state) => state.cart?.newCart?.data?.cart);
  console.log(priceWalaCart);
  useEffect(() => {
    // Fetch the product details for each item in the cart
    const fetchProductDetails = async () => {
      // console.log("fetch");
      // console.log(cart);
      if (!priceWalaCart?.productDetails) return;
      const updatedCart = await Promise.all(
        priceWalaCart.productDetails.map(async (product) => {
          const response = await dispatch(getProductById(product.details));
          const data = await response.payload;
          // console.log(data);
          return {
            ...product,
            prices: data.price,
            offerPrices: data.offerPrice,
            title: data.title,
            image: data.image[0].url,
          };
        })
      );
      setNewCart(updatedCart);
    };

    fetchProductDetails();
  }, [priceWalaCart?.productDetails, dispatch]);

  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalOfferPrice, setTotalOfferPrice] = useState(0);
  // console.log(newCart);
  useEffect(() => {
    const totalPrice = newCart?.reduce(
      (total, product) => total + product.prices * product.quantity,
      0
    );
    // console.log(totalPrice);
    const discountPrice = newCart?.reduce(
      (total, product) =>
        product?.offerPrices !== undefined
          ? (total + product.prices - product.offerPrices) * product.quantity
          : total,
      0
    );
    setTotalCartPrice(totalPrice);
    setDiscount(discountPrice);
    setTotalOfferPrice(totalCartPrice - discount);
  }, [newCart, totalCartPrice, discount]);
  // console.log(totalOfferPrice);
  const [shippingInfo, setShippingInfo] = useState({});
  const [orderItems, setOrderItems] = useState([]);

  const orderHandle = () => {
    setShowSummary(false);
    setShowPayment(true);
    const extractData = newCart?.map((newProduct) => {
      console.log(newProduct);
      // console.log(newProduct._id);

      return {
        product: newProduct.details,
        name: newProduct.title,
        price: totalCartPrice,
        offerPrice: totalOfferPrice,
        quantity: newProduct.quantity,
        image: newProduct.image,
      };
    });
    // console.log(extractData);
    setOrderItems(extractData);
    // console.log(extractData);
  };

  const [showform, setShowForm] = useState(true);
  const [showSummary, setShowSummary] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState();

  const handleChange = (e) => {
    setShippingInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  // console.log(shippingInfo?.mobileNo);
  const handleSubmit = (e) => {
    e.preventDefault();

    setShowForm(false);
    setShowSummary(true);
  };
  // const user = JSON.parse(localStorage.getItem("newUser"));
  const handlePayment = (e) => {
    // console.log(e.target.value);
    setPaymentInfo({ [e.target.id]: e.target.value });
  };
  // console.log(paymentInfo);
  const [showConfirm, setShowConfirm] = useState(false);
  const cartId = priceWalaCart?._id;
  const confirmOrder = () => {
    // console.log({ shippingInfo, orderItems, paymentInfo });

    dispatch(
      addDetails({
        shippingInfo,
        orderItems,
        paymentInfo,
        totalCartPrice,
        totalOfferPrice,
        user,
      })
    );
    setShowConfirm(true);

    setTimeout(() => {
      Navigate("/");
      dispatch(deleteCart(cartId));
    }, 5500);
  };
  return (
    <>
      <HomeNav />
      <main className=" ">
        <div className="lg:w-full w-screen relative  flex justify-center items-center">
          <div className=" flex justify-center items-center w-full  lg:max-w-6xl  ">
            <div
              className={`relative w-full lg:flex-row flex-col  top-4 md:gap-3  ${
                showConfirm ? "hidden" : "flex h-full"
              }`}
            >
              <section className=" lg:w-[70%] lg:p-0 p-3 w-full flex-col flex gap-4  h-full border ">
                <div className="w-full bg-white p-4 justify-between">
                  <div className="flex flex-col">
                    <h1 className="text-gray-500 font-semibold flex text-lg">
                      LOGIN <TiTick size={"1.5em"} />
                    </h1>
                    <h1 className="text-sm text-black font-normal">
                      ShopKart Customer {user?.email}
                    </h1>
                  </div>
                </div>
                <div className=" w-full bg-white ">
                  <div className="bg-blue-600 flex justify-between p-4 font-semibold text-lg text-white">
                    <h1>Add a new address</h1>
                    {!showform ? (
                      <button onClick={() => setShowForm(true)}>Edit</button>
                    ) : null}
                  </div>
                  <form className={`mb-10 ${showform ? "" : "hidden"} `}>
                    <div className="grid grid-cols-2 gap-6  p-4">
                      <div className="relative">
                        <input
                          type="text"
                          name=""
                          onChange={handleChange}
                          value={shippingInfo.name}
                          id="name"
                          required
                          className="peer outline-none border border-gray-200 focus:border-blue-500  lg:w-80 w-full h-12 px-3 pt-1 bg-gray-50"
                        />
                        <label
                          for="Name"
                          className={`absolute duration-300 transform text-gray-500 text-sm scale-100 left-4 mt-3 z-10 peer-focus:left-0 peer-focus:-translate-y-4  peer-focus:scale-75 ${
                            shippingInfo.name
                              ? " -translate-y-4 left-1  absolute scale-75 "
                              : ""
                          }`}
                        >
                          Name
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          name=""
                          onChange={handleChange}
                          value={shippingInfo.phoneNo}
                          id="phoneNo"
                          required
                          className="peer outline-none border border-gray-200 focus:border-blue-500  lg:w-80 w-full h-12 px-3 pt-1 bg-gray-50"
                        />
                        <label
                          for="phoneNo"
                          className={` absolute duration-300 transform text-gray-500 text-xs scale-100 left-4 mt-3 z-10 peer-focus:left-0 peer-focus:-translate-y-4 peer-focus:-translate-x-4  peer-focus:scale-75 ${
                            shippingInfo.phoneNo
                              ? "-translate-y-4 lg:-translate-x-0 -translate-x-3 md:-left-4 left-0  absolute scale-75 "
                              : ""
                          }`}
                        >
                          10-digits mobile Number
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          name=""
                          id="pincode"
                          onChange={handleChange}
                          value={shippingInfo.pincode}
                          required
                          className="peer outline-none border border-gray-200 focus:border-blue-500 lg:w-80 w-full h-12 px-3 pt-1 bg-gray-50"
                        />
                        <label
                          for="pincode"
                          className={` absolute duration-300 transform text-gray-500 text-sm scale-100 left-4 mt-3 z-10 peer-focus:left-0 peer-focus:-translate-y-4  peer-focus:scale-75 ${
                            shippingInfo.pincode
                              ? " -translate-y-4  lg:-translate-x-0  md:-left-4 left-0  absolute scale-75 "
                              : ""
                          }`}
                        >
                          Pincode
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          name=""
                          onChange={handleChange}
                          value={shippingInfo.locality}
                          id="locality"
                          required
                          className="peer outline-none border border-gray-200 focus:border-blue-500 lg:w-80 w-full h-12 px-3 pt-1 bg-gray-50"
                        />
                        <label
                          for="locality"
                          className={`absolute duration-300 transform text-gray-500 text-sm scale-100 left-4 mt-3 z-10 peer-focus:left-0 peer-focus:-translate-y-4  peer-focus:scale-75 ${
                            shippingInfo.locality
                              ? " -translate-y-4 lg:-translate-x-0 -translate-x-1 md:-left-4 left-0  absolute scale-75 "
                              : ""
                          }`}
                        >
                          Locality
                        </label>
                      </div>
                    </div>
                    <div className="relative lg:pr-16 pr-4 pl-4">
                      <textarea
                        type="text"
                        name=""
                        onChange={handleChange}
                        value={shippingInfo.address}
                        id="address"
                        required
                        className="peer outline-none border h-24 !resize-none border-gray-200 focus:border-blue-500  w-full  px-3 pt-5  bg-gray-50"
                      />
                      <label
                        for="address"
                        className={` absolute duration-300 transform text-gray-500 text-lg scale-100 left-6 mt-3 z-10 peer-focus:left-4 peer-focus:mb-3 mb-5 peer-focus:-translate-y-4  peer-focus:scale-90 ${
                          shippingInfo.address
                            ? " -translate-y-4 lg:-translate-x-0 -translate-x-1 md:-left-4 left-0  absolute scale-75 "
                            : ""
                        }`}
                      >
                        Address (Area and Street)
                      </label>
                    </div>
                    <div className="grid grid-cols-2 gap-6  p-4">
                      <div className="relative">
                        <input
                          type="text"
                          name=""
                          id="city"
                          onChange={handleChange}
                          value={shippingInfo.city}
                          className="peer outline-none border border-gray-200 focus:border-blue-500 lg:w-80 w-full h-12 px-3 pt-1 bg-gray-50"
                          required
                        />
                        <label
                          for="city"
                          className={`absolute duration-300 transform text-gray-500 text-sm scale-100 left-4 mt-3 z-10 peer-focus:left-0 peer-focus:-translate-y-4  peer-focus:scale-75 ${
                            shippingInfo.city
                              ? " -translate-y-4 lg:-translate-x-0 -translate-x-2 md:-left-4 left-0  absolute scale-75 "
                              : ""
                          }`}
                        >
                          City/District/Town
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          name=""
                          id="state"
                          onChange={handleChange}
                          value={shippingInfo.state}
                          className="peer outline-none border border-gray-200 focus:border-blue-500 lg:w-80 w-full h-12 px-3 pt-1 bg-gray-50"
                          required
                        />
                        <label
                          for="state"
                          className={` absolute duration-300 transform text-gray-500 text-sm scale-100 left-4 mt-3 z-10 peer-focus:left-0 peer-focus:-translate-y-4  peer-focus:scale-75 ${
                            shippingInfo.state
                              ? " -translate-y-4 lg:-translate-x-0 -translate-x-0 md:-left-4 left-0  absolute scale-75 "
                              : ""
                          }`}
                        >
                          State
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          name=""
                          id="landmark"
                          onChange={handleChange}
                          value={shippingInfo.landMark}
                          className="peer outline-none border border-gray-200 focus:border-blue-500 lg:w-80 w-full h-12 px-3 pt-1 bg-gray-50"
                        />
                        <label
                          for="landmark"
                          className={` absolute duration-300 transform text-gray-500 md:text-sm text-xs scale-100 left-4 mt-3 z-10 peer-focus:left-0 peer-focus:-translate-y-4  peer-focus:scale-75 ${
                            shippingInfo.landMark
                              ? " -translate-y-4 left-1  absolute scale-75 "
                              : ""
                          }`}
                        >
                          Landmark (optional)
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          name=""
                          id="phoneNo"
                          onChange={handleChange}
                          value={shippingInfo.phoneNo2}
                          className="peer outline-none border border-gray-200 focus:border-blue-500 lg:w-80 w-full h-12 px-3 pt-1 bg-gray-50"
                        />
                        <label
                          for="phoneNo"
                          className={` absolute duration-300 transform text-gray-500 md:text-sm text-xs scale-100 left-4 mt-3 z-30 peer-focus:left-0 peer-focus:-translate-y-4  peer-focus:scale-75 ${
                            shippingInfo.phoneNo2
                              ? " -translate-y-4 left-1  absolute scale-75 "
                              : ""
                          }`}
                        >
                          Alternate
                        </label>
                      </div>
                    </div>
                    <div className="p-4">
                      <h1 className="text-md text-gray-500">Address type</h1>
                      <div className="flex md:flex-row flex-col  gap-2 md:gap-6">
                        <label for="home">
                          <input
                            type="radio"
                            name="address"
                            id="home"
                            value="Home (all day Delivery)"
                            onChange={handleChange}
                          />
                          Home (all day Delivery)
                        </label>
                        <label for="work">
                          <input
                            type="radio"
                            onChange={handleChange}
                            name="address"
                            id="work"
                            value="Work (Delivery between 10AM - 5PM)"
                          />
                          Work (Delivery between 10AM - 5PM)
                        </label>
                      </div>
                    </div>
                    <div className="p-4 flex gap-6 peer">
                      <button
                        className="bg-orange-600 text-white px-7 py-3 text-md font-semibold"
                        onClick={handleSubmit}
                      >
                        SAVE AND DELIVERY HERE
                      </button>
                      <button className="text-blue-500 font-semibold text-md">
                        CANCEL
                      </button>
                    </div>
                  </form>
                </div>
                <div className="w-full bg-white">
                  <div className="bg-blue-600 flex justify-between p-4 font-semibold text-lg text-white">
                    <h1>ORDER SUMMARY</h1>
                    {!showform ? (
                      <button onClick={() => setShowForm(true)}>Edit</button>
                    ) : null}
                  </div>
                  <div className={`p-4 ${showSummary ? "" : "hidden"}`}>
                    {newCart &&
                      newCart.map((product) => (
                        <CartProduct product={product} key={product._id} />
                      ))}
                  </div>
                </div>
                <div
                  className={`w-full bg-white flex md:flex-row flex-col md:justify-between p-5 md:items-center mb-10 ${
                    showSummary ? "" : "hidden"
                  }`}
                >
                  <h1>
                    Order confirmation email will be sent to {user?.email}
                  </h1>
                  <button
                    className="md:px-6 px-4 py-2 bg-orange-600 mr-3 text-white"
                    onClick={orderHandle}
                  >
                    CONTINUE
                  </button>
                </div>
                <div className="w-full bg-white mb-5">
                  <div className="bg-blue-600 flex justify-between p-4 font-semibold text-lg text-white">
                    <h1>PAYMENT OPTIONS</h1>
                  </div>
                  <div
                    className={`p-4 flex flex-col gap-4 ${
                      showPayment ? "" : "hidden"
                    }`}
                  >
                    <label for="status">
                      <input
                        type="radio"
                        name="payment"
                        id="status"
                        className="mr-3"
                        value="CASH ON DELIVERY"
                        onChange={handlePayment}
                      />
                      CASH ON DELIVERY
                    </label>
                    <label for="upi">
                      <input
                        type="radio"
                        name="payment"
                        disabled
                        id="upi"
                        className="mr-3"
                        value="upi"
                        // onChange={handleChange}
                      />
                      UPI
                    </label>
                    <div>
                      <button
                        className="bg-orange-500 px-9 py-3 rounded outline-none text-white"
                        onClick={confirmOrder}
                      >
                        CONFIRM ORDER
                      </button>
                    </div>
                  </div>
                </div>
              </section>
              <section className="bg-white h-full overflow-auto lg:p-0 p-4 lg:sticky lg:top-16 relative  lg:w-[30%] w-full">
                <div className="border-b-2">
                  <div className="p-3 text-lg font-medium text-gray-500">
                    <h1>PRICE DETAILS</h1>
                  </div>
                </div>
                <div className="p-4">
                  <div className=" border-b-2 ">
                    <div className="flex justify-between py-3 text-md ">
                      <h1>Price ({newCart.length} items)</h1>
                      <NumericFormat
                        className=""
                        value={totalCartPrice}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₹"}
                      />
                    </div>
                    <div className="flex justify-between py-3 text-md ">
                      <h1>Discount </h1>
                      <NumericFormat
                        className="text-green-700"
                        value={discount}
                        displayType={"text"}
                        allowNegative={false}
                        thousandSeparator={true}
                        prefix={"- ₹"}
                      />
                    </div>
                    <div className="flex justify-between py-3 text-md ">
                      <h1>Delivery Charges </h1>
                      <h1 className="text-green-700">Free</h1>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between p-3 py-2 text-md">
                  <h1>Total amount</h1>
                  <NumericFormat
                    className=""
                    value={totalOfferPrice}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₹"}
                  />
                </div>
              </section>
              {/* this is place order button for the mobile screen */}
            </div>
            <div
              className={` '' ${
                showConfirm
                  ? "flex w-full top-5 justify-center items-center h-full "
                  : "hidden"
              }`}
            >
              <iframe
                title="data"
                src="https://lottie.host/?file=7e73c3d8-3481-4a5b-997a-f87d52ff8868/uV3gqqowCA.json"
                className="w-96 h-96"
              ></iframe>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Shipping;
// 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
