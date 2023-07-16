import React from "react";
import {Link} from "react-router-dom"
import Slider from "react-slick";
import { offerProducts } from "../../../utlis/constrants";
// import { useDispatch } from "react-redux";
import { NextArrow, PrevArrow } from "../PosterSlider/arrows";
// import { categories } from "../../../utlis/constrants";
const BestElec = () => {


  const settings = {
    infinite: false,
    speed: 1000,
    slidesToShow: 5,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  const newList = offerProducts.sort(() => 0.5 - Math.random()).slice(0, 10);

  return (
    <>
      <main className=" m-3 relative shadow-md bg-white drop-shadow-sm rounded mb-3 h-full lg:h-80">
        <div className="flex flex-row ">
          <section className=" relative h-72 w-56  bg-[url(https://rukminim1.flixcart.com/fk-p-flap/278/278/image/7593e7b6640822c1.jpg?q=90)] lg:flex hidden bg-no-repeat  hover:shadow-xl cursor-pointer bg-bottom justify-center text-center items-center">
            <div className="pb-16 gap-5 flex flex-col justify-center items-center ">
              <h1 className="text-3xl h-fit  break-words">
                Best of Electronics
              </h1>
              <button className="outline-none bg-blue-500 py-1 text-white px-4 w-28">
                View all
              </button>
            </div>
          </section>
          <section className=" overflow-auto relative w-full ">
            <div className="relative w-auto">
              <Slider {...settings} className="  flex w-full">
                {newList.map((data,i) => {

                  return (
                    <>
                    <div key={i}>                   
                      <Link className="w-full p-2 "  to="/product" state={{categorys:"electronics" , key:data.key }} >
                        <div className="bg-white w-full cursor-pointer p-2 lg:h-72 md:h-56 h-48 overflow-hidden rounded-xl transition duration-500 ease-in-out sm:shadow-md md:shadow-none hover:shadow-lg hover:scale-100 scale-95">
                          <div className="w-full h-full flex ">
                            <div className="flex flex-col gap-1 items-start w-72">
                              <div className="relative  bottom-2 w-full h-48">
                                <div className="relative overflow-hidden">
                                  <img
                                    src={data.image}
                                    alt={data.name}
                                    className="w-full lg:h-48 md:h-32 h-32 rounded-2xl object-contain"
                                  />
                                </div>
                              </div>
                              <div className="my-2 flex flex-col gap-2 w-full">
                                <div className="lg:text-md md:text-sm text-xs flex flex-col items-center justify-center">
                                  <h4 className=" font-medium">
                                    {data.name}
                                  </h4>
                                  <h4>{data.offer}</h4>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                      </div>
                    </>
                  );
                })}
              </Slider>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default BestElec;
