import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { GetCart } from "../../redux/reducers/cart/cartAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import HomeNav from "../NavBar/HomeNav";
// import { getProductById } from '../../redux/reducers/Products/productAction';
import CartProduct from "./CartProduct";
// import ProductPrice from "./ProductPrice";
import { getProductById } from "../../redux/reducers/Products/productAction";
import { NumericFormat } from "react-number-format";

const CartOverview = () => {
  const [carts, setCarts] = useState([]);
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  // console.log(id);
  useEffect(() => {
      try {
        dispatch(GetCart(id)).then((data) => {
          setCarts(data.payload);
          console.log(data?.payload);
          // console.log("getting");
        });
      } catch (error) {
        toast.error("Something went wrong", error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      
    }, [dispatch, id]);
    const [newCart, setNewCart] = useState([]);
    const cart  = useSelector((state)=>state.cart?.newCart?.data?.cart)
    
    useEffect(() => {
      // Fetch the product details for each item in the cart
      const fetchProductDetails = async () => {
        // console.log("fetch");
        console.log(cart);
        if (!cart?.productDetails) return; // Check if carts.productDetails is not undefined or null
        const updatedCart = await Promise.all(
          cart.productDetails.map(async (product) => {
            console.log(product);
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
        // console.log(newCart[0].offerPrices);
        fetchProductDetails();
      }, [cart?.productDetails, dispatch]);
      const [totalCartPrice, setTotalCartPrice] = useState(0);
      const [totalOfferPrice, setTotalOfferPrice] = useState(0);
// console.log(cart);
  useEffect(() => {
    const totalPrice = newCart?.reduce(
      (total, product) => total + product.prices * product.quantity,
      0
    );
    console.log(totalPrice);
    const offerPrice = newCart?.reduce(
      (total, product) =>
        product?.offerPrices !== undefined
          ? product.prices - product.offerPrices
          : total,
      0
    );
    setTotalCartPrice(totalPrice);
    setTotalOfferPrice(offerPrice);
  }, [newCart,cart]);
  // console.log(newCart[0].offerPrices ?? 1);
  // console.log(newCart);
  // console.log(totalOfferPrice);
  // Calculate the total cart price whenever the cart details change

  // console.log(totalCartPrice);
  return (
    <>
      <HomeNav />
      <div className="w-full relative flex justify-center items-center">
        <div className=" flex justify-center items-center w-full max-w-6xl">
          <div className=" relative w-full  flex flex-row top-4 gap-3">
            <section className=" w-[70%]  h-full border ">
              <div className="flex flex-col gap-3">
                <div className="bg-white flex  justify-center w-full">
                  <h1 className="w-52 text-blue-500 text-center text-lg border-b-4 border-blue-500 p-3">
                    ShopKart ({carts?.productDetails?.length})
                  </h1>
                </div>
                <div className="w-full bg-white p-4 flex justify-between">
                  <h1>Add your adderss</h1>
                  <button className="text-blue-500">Check pincode</button>
                </div>
                <div className="bg-white flex flex-col gap-6 ">
                  {carts
                    ? carts?.productDetails?.map((product) => (
                        <CartProduct product={product} key={product._id} />
                      ))
                    : "Cart is empty"}
                  <div className="flex justify-end px-8 pb-5 pt-3 top-11 z-20 bg-white bottom-0 overflow-hidden sticky shadow-[0_-2px_10px_0_rgba(0,0,0,.1)]">
                    <h1 className="bg-orange-500 font-medium cursor-pointer  px-14 py-4 text-white text-lg">
                      Place order
                    </h1>
                  </div>
                </div>
              </div>
            </section>
            <section className="bg-white h-full  w-[30%]">
              <div className="border-b-2">
                <div className="p-3 text-lg font-medium text-gray-500">
                  <h1>PRICE DETAILS</h1>
                </div>
              </div>
              <div className=" border-b-2 ">
                <div className="flex justify-between p-3 text-md ">
                  <h1>Price ({newCart.length} items)</h1>
                  <NumericFormat
                    className=""
                    value={totalCartPrice}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₹"}
                  />
                </div>
                <div className="flex justify-between p-3 text-md ">
                  <h1>Discount </h1>
                  <NumericFormat
                    className=""
                    value={totalOfferPrice}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₹"}
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartOverview;
