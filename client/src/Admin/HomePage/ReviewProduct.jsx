import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProductById } from "../../redux/reducers/Products/productAction";
import { useNavigate, useParams } from "react-router";
import ImageSlider from "../../componends/ImageSlider";
import { NumericFormat } from "react-number-format";
import {  AiOutlineArrowLeft, AiOutlineDelete, AiTwotoneStar } from "react-icons/ai";
import { deleteReviewById, getReviews } from "../../redux/reducers/Admin/Review/ReviewAction";
import { CgProfile } from "react-icons/cg";

const ReviewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [allReview, setAllReview] = useState();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(getProductById(id)).then(
      (data) => (setProduct(data?.payload), setLoading(false))
    );
    dispatch(getReviews(id)).then((data) => setAllReview(data?.payload));

  }, [dispatch, id]);

  const deleteReview = (data)=>{
    console.log(data);
    dispatch(deleteReviewById(data._id))
  }
  const percentage = (
    ((product?.price - product?.offerPrice) / product?.price) *
    100
  ).toFixed(0);
  const newPercentage = Math.min(percentage, 100);
  //   console.log(product.image[0]);
  const clearpage = () => {
    // setIsClicked(false);
    // setIsData();
    navigate(-1);
  };  
  return (
    <>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <>
          <main className="w-full flex flex-col items-center justify-center">
          <div className="flex items-center">
          <AiOutlineArrowLeft size={"1.5rem"} onClick={clearpage} />
          <h1 className="text-xl font-medium uppercase p-4">Review of all products</h1>
        </div>
            <section className="w-full max-w-5xl flex gap-3 relative">

              <section className=" w-3/5 h-full bg-white p-3 shadow">
              
                <div className="w-full h-full">
                  <div className=" w-full lg:h-44 h-28 ">
                    {/* <img src={product.image[0].url} alt="notFound" className="w-full h-full object-contain" /> */}
                    <ImageSlider image={product.image} />
                  </div>
                  <div className="w-full h-full py-3">
                    <h1 className="text-lg ">{product.title}</h1>
                    {product?.offerPrice ? (
                      <>
                        <NumericFormat
                          className="text-xl font-semibold"
                          value={product.offerPrice}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₹"}
                        />
                        <NumericFormat
                          className=" top-1 pl-1 relative line-through text-gray-500"
                          value={product.price}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₹"}
                        />
                        <h1 className="top-2 relative text-blue-600">
                          {newPercentage}% off
                        </h1>
                      </>
                    ) : (
                      <>
                        <NumericFormat
                          className="text-2xl font-semibold"
                          value={product.price}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₹"}
                        />
                      </>
                    )}
                    <div className="flex flex-row gap-6 pt-4">
                      <h1 className="text-sm">Description</h1>
                      <p className="text-sm pr-4">{product?.description}</p>
                    </div>
                    <div className="flex mt-5 items-center gap-5 pt-4 ">
                      <img
                        src={product.brand.logo.url}
                        alt={product.brand.Name}
                        className="w-24 h-11 p-2 border object-contain"
                      />
                      <div>
                        {product &&
                          product.service.map((data, i) => (
                            <h1 key={i}>{data}</h1>
                          ))}
                      </div>
                    </div>
                    {/* Highlights */}
                    <div className="flex flex-row pt-6 ">
                      <h1 className="text-gray-500 w-28">Highlights</h1>
                      <div>
                        <ul className=" text-gray-500 p-2 list-disc">
                          {product.Highlights.map((data, i) => (
                            <>
                              <li key={i} className="text-gray-800 p-1">
                                {data}
                              </li>
                            </>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="border-2">
                      <h1 className="text-2xl font-medium border-b  p-5">
                        Specifications
                      </h1>
                      <h1 className="p-5 text-xl">General</h1>
                      <div>
                        {product.specification &&
                          product.specification.map((data, i) => (
                            // console.log(data)
                            <>
                              <div
                                className=" flex flex-row w-full py-2 px-5"
                                key={i}
                              >
                                <h1 className="w-1/4">{data.title}</h1>
                                <h1 className="w-3/5 ">{data.description}</h1>
                              </div>
                            </>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className="w-2/5 bg-white shadow p-3 h-full">
                <div>
                  <h1 className="text-xl">Review</h1>
                  <div className="flex flex-col ">
                    <h1>Rating and reviews</h1>
                    <span className=" text-2xl text-black flex items-center gap-1 border-b-2 py-2">
                      4
                      <AiTwotoneStar color="black" size={"1em"} />
                    </span>
                   
                    <div>
                      {product &&
                        allReview?.map((data, i) => (
                          <>
                            <div className="py-4 flex justify-between items-center" key={i}>
                              <span className="w-10  bg-green-700 text-white flex gap-1 items-center">
                                <AiTwotoneStar color="white" className="ml-1" />
                                {data.rating}
                              </span>
                              <h1>{data.review}</h1>
                              <h1 className="flex gap-2 items-center">
                                <CgProfile />
                                {data.user.fullName}
                              </h1>
                              <AiOutlineDelete size={"1.2rem"} color="red" className=" cursor-pointer" onClick={()=>deleteReview(data)}/>
                            </div>
                          </>
                        ))}
                    </div>
                  </div>
                </div>
              </section>
            </section>
          </main>
        </>
      )}
    </>
  );
};

export default ReviewProduct;
