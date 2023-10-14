import React, { useEffect, useState } from "react";
import { AiTwotoneThunderbolt, AiTwotoneStar } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaShoppingCart } from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { NumericFormat } from "react-number-format";
import { getProductById } from "../../redux/reducers/Products/productAction";
import HomeNav from "../NavBar/HomeNav";
import MiniProductList from "../CategoryList/MiniProductList";
import { addCart } from "../../redux/reducers/cart/cartAction";
import { toast } from "react-toastify";
import AddReview from "./AddReview";
import { getReviews } from "../../redux/reducers/Admin/Review/ReviewAction";
import Login from "../Auth/Login";
const ProductOverview = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  // console.log(id);

  const [loading, setLoading] = useState(true);
  const [allReview, setAllReview] = useState();
  const [productData, setProductData] = useState();
  // setLoading(true);
  useEffect(() => {
    dispatch(getProductById(id)).then((data) => {
      setProductData(data?.payload);
      setLoading(false);
    });
    dispatch(getReviews(id)).then((data) => setAllReview(data?.payload));
  }, [dispatch, id]);
  // console.log(allReview);
const user = JSON.parse(localStorage.getItem('newUser'))
const [openLogin, setOpenLogin] = useState(false);

const AddToCart = () => {
    if(user){
      const details = id;
      const quantity = Number(1);
      console.log("Added")
      try {
        dispatch(addCart(details, quantity)).then(() =>
          toast.success("Product added succesfully", {
            position: toast.POSITION.BOTTOM_CENTER,
          })
        );
      } catch (error) {
        toast.error("Something went wrong", {
          position: toast.POSITION.BOTTOM_CENTER,
        })
      }
    }else{
      setOpenLogin(true);  
      toast.error("Login first", {
        position: toast.POSITION.BOTTOM_CENTER,
      })
    }
    
  };
   
  const [openReview, setOpenReview] = useState(false);
  const openModel = () => {
    setOpenReview(true);
  };
  // console.log(productData?.reviews);
  const percentage = (
    ((productData?.price - productData?.offerPrice) / productData?.price) *
    100
  ).toFixed(0);
  const newPercentage = Math.min(percentage, 100);
const [empty,setEmpty] = useState(false);
useEffect(()=>{
  if(productData?.quantity ===0){
    setEmpty(true)  
  }
},[productData?.quantity])
console.log(empty);
  return (
    <>
      <HomeNav />
      <MiniProductList />
      <AddReview isOpen={openReview} setIsOpen={setOpenReview} />
      
      {openLogin && <Login isOpen={openLogin} setIsOpen={setOpenLogin} /> }
      {loading ? (
        <h1>loading</h1>
      ) : (
        <>
          <main className="lg:w-full w-screen  h-full p-4 flex place-content-center">
            <div className="lg:max-w-7xl w-full flex lg:flex-row flex-col  bg-white p-4">
              <section className=" lg:w-2/5 w-full p-2 h-max lg:sticky relative lg:top-14 top-0">
                <div className="flex flex-row w-full">
                  <div className="lg:flex hidden flex-col border-l-2 border-y-2 w-20">
                    {productData.image.map((images, i) => (
                      <img
                        key={i}
                        src={images.url}
                        alt={productData.title}
                        className=" border-y-2 "
                      />
                    ))}
                  </div>
                  <div className=" border-2 w-full ">
                    <img
                      src={productData.image[0].url}
                      alt={productData.title}
                      className="w-full bg-blend-lighten"
                    />
                  </div>
                </div>
                <div className="hidden lg:flex  flex-row  w-full mt-3 ml-16 gap-3 text-white ">
                 {empty?<h1 className="text-black text-2xl font-medium pl-3">Product not availbale</h1>:<> <button
                    className=' w-2/5 py-3 bg-orange-400 flex items-center justify-center gap-2' disabled={empty}
                    onClick={AddToCart}
                  >
                    <FaShoppingCart size={"1em"} /> ADD TO CART
                  </button>
                  
                <Link className=" w-2/5 py-3 bg-orange-600 flex items-center justify-center gap-2" to="/shipping" onClick={AddToCart}>
                    <AiTwotoneThunderbolt size={"1em"} />
                    BUY NOW
                  </Link>
                  </>
                  }
                </div>
              </section>
              <section className="lg:w-3/5 w-full p-2 ml-4">
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
                  <div>
                    {productData.quantity <= 6 ? (
                      <>
                       {productData.quantity ===0?  <h1 className=" text-red-500 text-base">
                          Not availbale
                        </h1>: <h1 className=" text-red-500 text-base">
                          Only {productData.quantity} left! Hurry up
                        </h1>}
                      
                      </>
                    ) : (
                      <h1> Qauntity: {productData.quantity}</h1>
                    )}
                  </div>
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
                          <span className="font-medium ml-2">Bank Offer</span>
                          15% Instant discount on first Flipkart Pay Later order
                          of 500 and above
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
                      src={productData.brand.logo.url}
                      alt={productData.brand.Name}
                      className="w-24 h-11 p-2 border object-contan"
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
                    <div className="w-full p-5">
                      <button
                        className=" bg-blue-500 px-5 py-2 rounded text-white float-right"
                        onClick={openModel}
                      >
                        Add Review
                      </button>
                    </div>
                    <div>
                      {productData &&
                        allReview?.map((data, i) => (
                          <>
                            <div className="py-4" key={i}>
                              <span className="w-10  bg-green-700 text-white flex gap-1 items-center">
                                <AiTwotoneStar color="white" className="ml-1" />
                                {data.rating}
                              </span>
                              <h1>{data.review}</h1>
                              <h1 className="flex gap-2 items-center">
                                <CgProfile />
                                {data.user.fullName}
                              </h1>
                            </div>
                          </>
                        ))}
                    </div>
                  </div>
                </div>
              </section>
              <div className="flex flex-row overflow-auto lg:hidden sticky bottom-2 w-full mt-3 bg-white justify-center gap-3 text-white ">
                <button
                  className=" w-1/2 py-3 bg-orange-400 flex items-center justify-center gap-2" 
                  onClick={AddToCart}
                >
                  <FaShoppingCart size={"1em"} /> ADD TO CART
                </button>
                <button className=" w-1/2 py-3 bg-orange-600 flex items-center justify-center gap-2">
                  <AiTwotoneThunderbolt size={"1em"} />
                  BUY NOW
                </button>
              </div>
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default ProductOverview;
