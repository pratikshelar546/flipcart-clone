import React, { useEffect, useState } from "react";
import { AiTwotoneThunderbolt, AiTwotoneStar } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { NumericFormat } from "react-number-format";
import { getProductById } from "../../redux/reducers/Products/productAction";
import HomeNav from "../NavBar/HomeNav";
import MiniProductList from "../CategoryList/MiniProductList";
import { addCart } from "../../redux/reducers/cart/cartAction";
import { toast } from "react-toastify";
const ProductOverview = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  // console.log(id);
  const [loading, setLoading] = useState(true);

  const [productData, setProductData] = useState();
  // setLoading(true);
  useEffect(() => {
    dispatch(getProductById(id)).then((data) => {
      setProductData(data?.payload);
      setLoading(false);
      // console.log(data.payload);
    });
  }, [dispatch, id]);

  // console.log(userId);
  //   useEffect(()=>{
  //     setTimeout(() => {

  //     }, 2000);
  //   })
  // })

  const AddToCart = () => {
    const details = id;
    const quantity = Number(1);
    try {
      dispatch(addCart(details,quantity)).then((data) =>
        toast.success("Product added succesfully", {
          position: toast.POSITION.BOTTOM_CENTER,
        })
      );
    } catch (error) {}
  };
  // console.log(productData?.reviews);
  const percentage = (
    ((productData?.price - productData?.offerPrice) / productData?.price) *
    100
  ).toFixed(0);
  const newPercentage = Math.min(percentage, 100);

  // const [isReadMore, setIsReadMore] = useState(true);
  // const readMore = () => {
  //     setIsReadMore(!isReadMore)
  // }
  return (
    <>
      <HomeNav />
      <MiniProductList />
      {loading ? (
        <h1>loading</h1>
      ) : (
        <>
          <main className="w-full h-full p-4 flex place-content-center">
            <div className=" max-w-7xl w-full flex flex-row bg-white p-4">
              <section className=" w-2/5 p-2 h-max sticky top-14">
                <div className="flex flex-row w-full">
                  <div className="flex flex-col border-l-2 border-y-2 w-20">
                    {productData.image.map((images, i) => (
                      <img
                        key={i}
                        src={images}
                        alt={productData.title}
                        className=" border-y-2 "
                      />
                    ))}
                  </div>
                  <div className=" border-2 w-full">
                    <img
                      src={productData.image[0]}
                      alt={productData.title}
                      className="w-full bg-blend-lighten"
                    />
                  </div>
                </div>
                <div className="flex flex-row w-full mt-3 ml-16 gap-3 text-white ">
                  <button
                    className=" w-2/5 py-3 bg-orange-400 flex items-center justify-center gap-2"
                    onClick={AddToCart}
                  >
                    {" "}
                    <FaShoppingCart size={"1em"} /> ADD TO CART
                  </button>
                  <button className=" w-2/5 py-3 bg-orange-600 flex items-center justify-center gap-2">
                    <AiTwotoneThunderbolt size={"1em"} />
                    BUY NOW
                  </button>
                </div>
              </section>
              <section className="w-3/5 p-2 ml-4">
                <div className="gap-2 flex flex-col">
                  <h1 className="text-lg">{productData.title}</h1>

                  {/* ratings */}
                  <div className="flex flex-row gap-3">
                    <span className="w-10 gap-1 bg-green-700 text-white flex items-center">
                      <AiTwotoneStar color="white" className="ml-1" />4
                    </span>
                    <span className="text-gray-600">
                      {productData.reviews.length}Reviews
                    </span>
                  </div>
                  {/* price */}
                  <div className="flex flex-row gap-3  align-bottom">
                    {productData?.offerPrice ? (
                      <>
                        <NumericFormat
                          className="text-2xl font-semibold"
                          value={productData.offerPrice}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₹"}
                        />
                        <NumericFormat
                          className=" top-2 relative line-through text-gray-500"
                          value={productData.price}
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
                          value={productData.price}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₹"}
                        />
                      </>
                    )}
                  </div>
                  {/* offers */}
                  <h1>Available offers</h1>
                  {Array(3)
                    .fill("")
                    .map((el, i) => (
                      <div className="flex gap-1 mb-1" key={i}>
                        <MdLocalOffer color="green" className="mt-1" />
                        <p className="text-sm ">
                          <span className="text-primary-lightGreen"> </span>
                          <span className="font-medium ml-2">
                            Bank Offer
                          </span>{" "}
                          15% Instant discount on first Flipkart Pay Later order
                          of 500 and above{" "}
                          <span className="text-primary-blue font-medium">
                            T&C
                          </span>
                        </p>
                      </div>
                    ))}
                  {/* description*/}
                  <div className="flex flex-row gap-6">
                    <h1 className="text-sm">Description</h1>
                    <p className="text-sm pr-4">{productData?.description}</p>
                    {/* <div>
                    {
                      isReadMore? <p> {productData?.description.slice(0,150)}</p> :<p>{productData?.description}</p>
                    
                    }
                      <p onClick={readMore}>...Read more</p>
                   </div> */}
                  </div>
                  {/* services */}
                  <div className="flex mt-5 items-center gap-5 ">
                    <img
                      src={productData.brand.logo}
                      alt={productData.brand.Name}
                      className="w-24 h-11 p-2 border object-cover"
                    />
                    <div>
                      {productData &&
                        productData.service.map((data, i) => (
                          <h1 key={i}>{data}</h1>
                        ))}
                    </div>
                    {/* <h1>Brand Warranty for 1 Year</h1>
                    <span className="text-blue-700 -ml-3">Know more</span> */}
                  </div>
                  {/* Highlights */}
                  <div className="flex flex-row pt-6 ">
                    <h1 className="text-gray-500 w-28">Highlights</h1>
                    <div>
                      {loading ? (
                        <h1>loading...</h1>
                      ) : (
                        <>
                          <ul className=" text-gray-500 list-disc">
                            {productData.Highlights.map((data, i) => (
                              <>
                                <li key={i} className="text-gray-800 p-1">
                                  {data}
                                </li>
                              </>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  </div>
                  {/* Specifications */}
                  <div className="border-2">
                    <h1 className="text-2xl font-medium border-b  p-5">
                      Specifications
                    </h1>
                    <h1 className="p-5 text-xl">General</h1>
                    <div>
                      {productData.specification &&
                        productData.specification.map((data, i) => (
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

                  {/* reivews */}
                  <div className="flex flex-col ">
                    <h1>Rating and reviews</h1>
                    <span className=" text-2xl text-black flex items-center gap-1 border-b-2 py-2">
                      4
                      <AiTwotoneStar color="black" size={"1em"} />
                    </span>
                    <div>
                      {productData &&
                        productData.reviews.map((data, i) => (
                          <>
                            <div className="py-4" key={i}>
                              <span className="w-10  bg-green-700 text-white flex gap-1 items-center">
                                <AiTwotoneStar color="white" className="ml-1" />
                                {data.rating}
                              </span>
                              <h1>{data.comment}</h1>
                              <h1>{data.name}</h1>
                            </div>
                          </>
                        ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default ProductOverview;
