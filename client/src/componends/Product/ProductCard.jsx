import React from "react";
import { BsStarFill } from "react-icons/bs";
const ProductCard = (props) => {
    // console.log(props.category);
    // const Product = props.filter()
    // console.log(props.specification[0]);
    return (
        <>
            {props.category === "electronics" ? (
                <div className="w-full h-64 max-w-5xl  border-b cursor-pointer scale-100  hover:scale-105 duration-100">
                    <div className="flex w-full flex-row mb-4 h-full">
                        <div className=" w-1/4 h-full p-3">
                            <img
                                src={props.image[0]}
                                alt={props.title}
                                className="w-full h-56 object-fill"
                            />
                        </div>
                        <div className="flex flex-col w-1/2 h-full">
                            <h1>{props.title}</h1>
                            <div className="bg-blue-500 flex flex-row w-8 ">
                                <BsStarFill color="white" />
                                <span className="text-md ">4.3</span>
                            </div>
                            <div className="px-3">
                                <ul className=" list-disc">
                                    {props.Highlights.length === 0
                                        ? props.specification[0].title
                                        : props.Highlights.map((h1, e) => (
                                            <li key={e} className=" ">
                                                {h1}
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                        <div className=" w-1/4 px-4">
                            <h1>₹{props.price}</h1>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-96 max-w-5xl cursor-pointer hover:scale-105 duration-100">
                    <div className="flex  flex-col ">
                        <div className=" h-60 ">
                            <img
                                src={props.image[0]}
                                alt={props.title}
                                className="w-full h-60 rounded object-fill"
                            />
                        </div>
                        <div className="flex flex-col py-2 gap-2">
                            <h1 className="">{props.title}</h1>
                            <div className="bg-blue-500 flex flex-row w-10 gap-1 rounded">
                                <BsStarFill size={"1em"} className="mt-1" color="white" />
                                <span className="text-md text-white">4.3</span>
                            </div>
                            <h1>₹{props.price}</h1>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
};

export default ProductCard;
