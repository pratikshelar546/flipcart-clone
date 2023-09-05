import React, { useEffect, useState } from "react";
import HomeNav from "../NavBar/HomeNav";
import MiniProductList from "../CategoryList/MiniProductList";
import { useDispatch } from "react-redux";
import { getDetailsByUserId } from "../../redux/reducers/order/orderActions";
import { Link, useNavigate } from "react-router-dom";
import ReactStars from "react-stars";
import { FaUserCheck } from "react-icons/fa";
import {IoIosArrowForward} from "react-icons/io"
import { IoArrowBack, IoSearchOutline, IoFilter } from "react-icons/io5";
const MyOrder = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("newUser"));
  const id = user._id;
  const [orderDetails, setOrderDetails] = useState();
  useEffect(() => {
    dispatch(getDetailsByUserId(id)).then((data) => {
      setOrderDetails(data?.payload);
      // console.log(data);
    });
  }, [dispatch, id]);
  // console.log(orderDetails);
  const goBack=()=>{
    navigate(-1)
    }
    // console.log(product);
  // console.log(orderDetails);
  return (
    <>
      <main className="hidden tablet:block ">
        <HomeNav />
        <MiniProductList />
        <section className="w-full relative p-4 flex flex-row gap-3">
          <section className=" w-1/6 h-full bg-white shadow rounded p-2">
            <div className="flex flex-col w-full px-2">
              <h1 className="text-xl font-medium border-b pb-2">Filters</h1>
              <div className=" border-b pb-2">
                <h1 className="text-md mb-2 font-medium ">Order status</h1>
                <div className="flex gap-2 flex-col">
                  <lable className="flex gap-3 ">
                    <input type="checkbox" name="ontheway" id="ontheway" />
                    On the way
                  </lable>
                  <lable className="flex gap-3 ">
                    <input type="checkbox" name="ontheway" id="ontheway" />
                    Delivered
                  </lable>
                  <lable className="flex gap-3 ">
                    <input type="checkbox" name="ontheway" id="ontheway" />
                    Cancelled
                  </lable>
                  <lable className="flex gap-3">
                    <input type="checkbox" name="ontheway" id="ontheway" />
                    Returned
                  </lable>
                </div>
              </div>
              <div className="">
                <h1 className="text-md mb-2 font-medium">ORDER TIME</h1>
                <div className="flex gap-2 flex-col">
                  <lable className="flex gap-3 ">
                    <input type="checkbox" name="ontheway" id="ontheway" />
                    Last 30 days
                  </lable>
                  <lable className="flex gap-3 ">
                    <input type="checkbox" name="ontheway" id="ontheway" />
                    2022
                  </lable>
                  <lable className="flex gap-3 ">
                    <input type="checkbox" name="ontheway" id="ontheway" />
                    2021
                  </lable>
                  <lable className="flex gap-3">
                    <input type="checkbox" name="ontheway" id="ontheway" />
                    2020
                  </lable>
                  <lable className="flex gap-3">
                    <input type="checkbox" name="ontheway" id="ontheway" />
                    2019
                  </lable>
                  <lable className="flex gap-3">
                    <input type="checkbox" name="ontheway" id="ontheway" />
                    older
                  </lable>
                </div>
              </div>
            </div>
          </section>
          <section className="w-5/6 h-full rounded p-2">
            <div className="flex flex-col gap-4">
              <div className="w-full flex flex-row">
                <input
                  type="text"
                  name="Search order"
                  id="searchorder"
                  placeholder="Search your order here"
                  className=" w-5/6 h-10 outline-none border shadow px-2 rounded"
                />
                <button className="px-5 py-2 outline-none rounded bg-blue-500 text-white">
                  Search Orders
                </button>
              </div>

              {orderDetails &&
                orderDetails?.orderItems?.map((product) => (
                  <>
                    <div key={product._id}>
                      <Link
                        to={`/Myorders/${product.product}`}
                        className="p-3 bg-white flex shadow flex-row items-center gap-6 w-full h-32"
                        state={{ product: product }}
                      >
                        <div className="w-24">
                          <img
                            src={product.image}
                            className="w-20 h-20"
                            alt="perfume"
                          />
                        </div>
                        <div className="w-2/4">
                          <p>
                            {product.name.split(" ").slice(0, 10).join(" ")}
                          </p>
                        </div>
                        <div className="w-1/4">
                          <p>{product.offerPrice}</p>
                        </div>
                        <div className="w-1/4">
                          <p>{product.orderStatus}</p>
                        </div>
                      </Link>
                    </div>
                  </>
                ))}
            </div>
          </section>
        </section>
      </main>
      <main className="tablet:hidden block">
        <section className="w-full">
          <div className="sticky overflow-hidden shadow">
            <div className="bg-blue-500 p-3  flex justify-between">
              <div className="flex items-center gap-1 ">
                <IoArrowBack size={"1.5em"} color="white" onClick={goBack} />
                <h1 className="text-white  text-lg">My Orders</h1>
              </div>
              <div>
                <FaUserCheck color="white" size={"1.5rem"} />
              </div>
            </div>
            <div className="bg-white p-3 flex w-full">
              <div className="items-center border flex border-gray-300 rounded px-2 w-[70%] ">
                <IoSearchOutline size={"1.2rem"} />
                <input
                  type="text"
                  placeholder="Search your order here"
                  className="p-2 font-medium outline-none"
                />
              </div>
              <div className="flex items-center justify-center gap-2 w-[30%]">
                <IoFilter size={"1.5rem"} />
                <h1>Filters</h1>
              </div>
            </div>
          </div>
          <div className="w-full relative">
            {orderDetails &&
              orderDetails?.orderItems?.map((product) => (
                // console.log(product),
                <Link to={`/Myorders/${product?.product}`}  state={{ product: product }}
                  className="w-full h-full overflow-auto flex flex-row border-b-2 border-gray-200 gap-3 p-4 bg-white"
                  key={product._id}
                >
                  <div className="w-1/4 h-14">
                    <img
                      src={product.image}
                      alt="not found"
                      className="  w-full h-full"
                    />
                  </div>
                  <div className="flex flex-col w-3/4">
                    <h1>{orderDetails?.orderStatus}</h1>
                    <h2 className="overflow-hidden whitespace-nowrap overflow-ellipsis w-full">
                      {product.name}
                    </h2>
                    <ReactStars
                      count={5}
                      // onChange={ratingChanged}
                      size={30}
                      color2={"lightgreen"}
                    />
                    <h1 className="text-md text-gray-500">
                      Rate this product now
                    </h1>
                  </div>
                  <IoIosArrowForward size={"1.5rem"} color="gray"  />
                </Link>
              ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default MyOrder;
