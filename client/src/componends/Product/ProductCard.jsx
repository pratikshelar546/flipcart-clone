import React from "react";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";
import { BsStarFill } from "react-icons/bs";
const ProductCard = (props) => {
  const { refData,path } = props;
 
  // console.log(refData);
  // const Product = props.filter()
  // console.log(props.specification[0]);
  return (
    <>
      {props.category === "electronics" ? (
        <Link
          className="w-full h-64 max-w-5xl  border-b cursor-pointer"
          to={`/${path}/${props._id}/${refData}`}
        >
          <div className="flex w-full flex-row mb-4 h-full">
            <div className="md:w-1/4 w-56 h-full p-3">
              <img
                src={props.image[0].url || props.image[0]}
                alt={props.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className=" w-3/4 flex lg:flex-row flex-col lg:justify-between">
              <div className="flex flex-col  ">
                <h1>{props.title.split(" ", 15).join(" ")}...</h1>
                <div className="bg-blue-500 text-white flex flex-row w-8 ">
                  <BsStarFill color="white" className="mt" />
                  <span className="text-sm ">4.3</span>
                </div>
                <div className="px-3">
                  <ul className="md:block hidden list-disc">
                    {props.Highlights.length === 0
                      ? props.specification[0].title
                      : props.Highlights.map((h1, e) => (
                          <li key={e} className=" text-sm">
                            {h1.split(" ", 15).join(" ")}...
                          </li>
                        ))}
                  </ul>
                </div>
              </div>
              <div className=" lg:w-1/4 w-full lg:px-4 px-0">
                {props.offerPrice ? (
                  <>
                    <NumericFormat
                      className="text-xl font-semibold"
                      value={props.offerPrice}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₹"}
                    />
                    <NumericFormat
                      className="flex text-sm line-through text-gray-600"
                      value={props.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₹"}
                    />
                    <h1 className="text-sm ">
                      {" "}
                      {(
                        ((props.price - props.offerPrice) * 100) /
                        props.offerPrice
                      ).toFixed(2)}
                      % off
                    </h1>
                  </>
                ) : (
                  <NumericFormat
                    className="twxt-xl font-semibold"
                    value={props.price}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₹"}
                  />
                )}
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <Link
          className="h-96 max-w-5xl cursor-pointer mb-3 hover:scale-105 duration-100"
          to={`/product/${props._id}/${refData}`}
        >
          <div className="flex  flex-col ">
            <div className="lg:h-60 md:h-52 h-48">
              <img
                src={props.image[0]}
                alt={props.title}
                className="w-full lg:h-60 md:h-52 h-48 rounded object-fill"
              />
            </div>
            <div className="flex flex-col py-2 gap-2">
              <h1 className="">{props.title}</h1>
              <div className="bg-blue-500 flex flex-row w-10 gap-1 rounded">
                <BsStarFill size={"1em"} className="mt-1" color="white" />
                <span className="text-md text-white">4.3</span>
              </div>
              {props.offerPrice ? (
                <>
                  <NumericFormat
                    className="text-xl font-semibold"
                    value={props.offerPrice}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₹"}
                  />
                  <div className="flex flex-row gap-3">
                    <NumericFormat
                      className="flex text-sm line-through text-gray-600"
                      value={props.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₹"}
                    />
                    <h1 className="text-sm ">
                      {" "}
                      {(
                        ((props.price - props.offerPrice) * 100) /
                        props.offerPrice
                      ).toFixed(2)}
                      % off
                    </h1>
                  </div>
                </>
              ) : (
                <NumericFormat
                  className=""
                  value={props.price}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₹"}
                />
              )}
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default ProductCard;
