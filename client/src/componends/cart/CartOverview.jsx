import React, { useState } from "react";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import HomeNav from "../NavBar/HomeNav";

import CartProduct from "./CartProduct";

import { getProductById } from "../../redux/reducers/Products/productAction";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";

const CartOverview = () => {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("newUser"));

  const [newCart, setNewCart] = useState([]);
  const cart = useSelector((state) => state.cart?.cart);

  const priceWalaCart = useSelector((state) => state.cart?.newCart?.data?.cart);
  useEffect(() => {
    // Fetch the product details for each item in the cart
    const fetchProductDetails = async () => {
      if (!priceWalaCart?.productDetails) return;
      const updatedCart = await Promise.all(
        priceWalaCart.productDetails.map(async (product) => {
          const response = await dispatch(getProductById(product.details));
          const data = await response.payload;
          return {
            ...product,
            prices: data.price,
            offerPrices: data.offerPrice,
          };
        })
      );
      setNewCart(updatedCart);
    };

    fetchProductDetails();
  }, [priceWalaCart?.productDetails, cart, dispatch]);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalOfferPrice, setTotalOfferPrice] = useState(0);

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
  }, [newCart, totalCartPrice, discount, cart]);
  // console.log(loading);

  // console.log(cart?.productDetails);
  return (
    <>
      <HomeNav />
      {user?.fullName && cart?.productDetails?.length > 0 ? (
        <div className="lg:w-full w-screen relative flex justify-center items-center">
          <div className=" flex justify-center items-center w-full  lg:max-w-6xl  ">
            <div className=" relative w-full  flex lg:flex-row flex-col top-4 gap-3">
              <section className=" lg:w-[70%] lg:p-0 p-3 w-full  h-full border ">
                <div className="flex flex-col gap-3">
                  <div className="bg-white flex  justify-center w-full">
                    <h1 className="w-52 text-blue-500 text-center text-lg border-b-4 border-blue-500 p-3">
                      ShopKart ({cart?.productDetails?.length})
                    </h1>
                  </div>

                  <div className="w-full bg-white p-4 flex justify-between">
                    <h1>{user ? user.email : <h1>Login</h1>}</h1>
                    {/* <button className="text-blue-500" onClick={openModel}>clck pincode</button> */}
                  </div>
                  <div className="bg-white flex flex-col gap-6 ">
                    {cart
                      ? cart?.productDetails?.map((product) => (
                          <CartProduct product={product} key={product._id} />
                        ))
                      : "Cart is empty"}
                    <div className="lg:flex hidden justify-end px-8 pb-5 pt-3 top-11  bg-white bottom-0 overflow-hidden sticky  shadow-[0_-2px_10px_0_rgba(0,0,0,.1)]">
                      <Link
                        to="/shipping"
                        className="bg-orange-500 font-medium cursor-pointer  px-14 py-4 text-white text-lg"
                      >
                        Place order
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
              <section className="bg-white h-full lg:p-0 p-5 lg:sticky top-16 relative  lg:w-[30%] w-full">
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
              <div className="lg:hidden flex justify-between px-8 pb-5 pt-3 top-11 z-20 bg-white bottom-0 overflow-hidden sticky  shadow-[0_-2px_10px_0_rgba(0,0,0,.1)]">
                <div className="flex flex-col text-md">
                  <NumericFormat
                    className=" line-through text-gray-600"
                    value={totalCartPrice}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₹"}
                  />
                  <NumericFormat
                    className="text-xl text-gray-600"
                    value={totalOfferPrice}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₹"}
                  />
                </div>
                <Link  to="/shipping" className="bg-orange-500 font-medium cursor-pointer  lg:px-14 lg:py-4 md:px-10 md:py-3 px-7 py-2  text-white text-lg">
                  Place order
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="w-full relative flex justify-center items-center">
            <div className=" flex justify-center items-center w-full max-w-6xl">
              <div className=" relative w-full  flex flex-row top-4 gap-3">
                <section className=" w-full  h-full border ">
                  <div className="flex flex-col  gap-3">
                    <div className="bg-white flex  justify-center w-full">
                      <h1 className="w-52 text-blue-500 text-center text-lg border-b-4 border-blue-500 p-3">
                        ShopKart
                      </h1>
                    </div>
                    <div className="bg-white flex flex-col justify-center items-center">
                      <div className=" w-full flex justify-center items-center h-full">
                        <img
                          src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
                          className="w-72 h-72 object-contain"
                          alt=""
                        />
                      </div>
                      <h1 className=" font-semibold ">Your cart is empty!</h1>
                      <p className=" text-sm font-normal">
                        Add items to it now.
                      </p>
                      <Link
                        className="bg-blue-600 px-9 text-white py-1 mb-7 mt-2"
                        to="/"
                      >
                        Shop now
                      </Link>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CartOverview;
// {
//   user?.fullName?<>
//      </> :<h1>NotFound</h1>
//        }
