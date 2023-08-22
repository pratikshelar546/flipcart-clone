import React from "react";

const NotFound = ({ title }) => {
  return (
    <>
      <div className="flex justify-center w-full max-w-5xl ">
        <div className="">
          <img
            src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/error-no-search-results_2353c5.png"
            className=" object-cover"
            alt="not found"
          />
          <h1 className="text-xl font-semibold text-center">Sorry, {title}</h1>
        </div>
      </div>
    </>
  );
};

export default NotFound;
