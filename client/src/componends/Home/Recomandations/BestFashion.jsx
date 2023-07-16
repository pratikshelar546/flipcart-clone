import React from "react";
// import fasionProducts from "../../../utlis/constrants"
import Slider from "react-slick";
import {Link} from "react-router-dom"
import { NextArrow, PrevArrow } from "../PosterSlider/arrows";
import { FasionProducts } from "../../../utlis/constrants";
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
// const fasionProducts = [
//     {
//       image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/m/o/t/l-st1-vebnor-original-imagmsyxhvkrfjgz.jpeg?q=70",
//       name: "Men's Top Wear",
//       key:"mens",
//       offer: "Buy Now!"
//   },
//   {
//     image: "https://rukminim2.flixcart.com/image/612/612/l2tcfbk0/jean/8/z/a/34-hljn002240-highlander-original-image2jmgcggpd4e.jpeg?q=70",
//     name: "Men's Bottom Wear",
//     key:"mens bottom",
//     offer: "Buy Now!",
// },
// {
//   image: "https://rukminim2.flixcart.com/image/612/612/xif0q/kurta/m/m/q/xxl-jf-109-pink-jaishreefab-original-imagh37647uug7xp.jpeg?q=70",
//   name: "women Kurtas $ kurtis",
//   offer: "In Focus Now",
//   key: "women kurta",
// },
// {
//   image: "https://rukminim2.flixcart.com/image/612/612/xif0q/jean/k/o/q/34-r-m3051-r-m-lifestyle-original-imagq57ghadpzwas.jpeg?q=70",
//   name: "women bottom wear",
//   offer: "min 40% off",
//   key: "women bottom",
// },
// {
//   image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/n/5/j/9-5-390052-puma-intense-lavender-black-original-imaghkpbnbr9ztye.jpeg?q=70",
//   name: "sneakers",
//   offer: "min 70% off",
//   key: "mens shoes",
// },
// {
//   image: "https://rukminim2.flixcart.com/image/612/612/xif0q/sandal/1/q/a/5-gd602-38-picktoes-pink-original-imag4j7zjhf6yztw-bb.jpeg?q=70",
//   name: "women Heels",
//   offer: "min 50% off",
//   key: "women heels",
// },
// {
//   image: "https://rukminim2.flixcart.com/image/612/612/kqgyhe80/kids-apparel-combo/8/t/f/-6-months-mgc321-1-mahir-garments-original-imag4hcr3zjuqzga.jpeg?q=70",
//   name: "Kids",
//   offer: "min 40% off",
//   key: "Kids",
// },
// {
//   image: "https://rukminim2.flixcart.com/image/612/612/xif0q/watch/w/s/d/-original-imagnqcjgxcxmfjb.jpeg?q=70",
//   name: "Accessories",
//   offer: "min 80% off",
//   key: "watch",
// },
//   ];
const newList = FasionProducts.sort(() => 0.5 - Math.random()).slice(0, 10);
const bestFasion = () => {
  return (
    <>
      <main className=" m-3 relative mt-3 h-80 shadow-inner bg-white">
        <div className="flex flex-col">
          {/* <section className=" relative h-72 w-56  bg-[url(https://rukminim1.flixcart.com/fk-p-flap/278/278/image/7593e7b6640822c1.jpg?q=90)] lg:flex hidden bg-no-repeat  hover:shadow-xl cursor-pointer bg-bottom justify-center text-center items-center">
            <div className="pb-16 gap-5 flex flex-col justify-center items-center ">
              <h1 className="text-3xl h-fit  break-words">Fasions</h1>
              <button className="outline-none bg-blue-500 py-1 text-white px-4 w-28">
                View all
              </button>
            </div>
          </section> */}
          <section className="flex justify-between md:p-6  p-3">
            <h1 className="lg:text-2xl md:text-lg text-sm font-medium"> Men's, women's and Kids</h1>
            <button className="bg-blue-500 text-white lg:px-4 lg:py-2 px-2 py-1">
              VIEW ALL
            </button>
          </section>
          <section className=" overflow-auto relative w-full bg-white">
            <div className="relative w-auto">
              <Slider {...settings} className="  flex w-full">
                {newList.map((data, index) => {
                  return (
                    <>
                      <Link className="w-full p-2 " to="/product" state={{categorys:"Fashion" , key:data.key }}   key={index}>
                        <div className=" w-full cursor-pointer  lg:h-72 md:h-56 h-48 overflow-hidden rounded-md   transition duration-500 ease-in-out sm:shadow-md md:shadow-none hover:shadow-xl">
                          <div className="w-full h-full flex ">
                            <div className="flex flex-col gap-1 items-start w-72">
                              <div className="relative  bottom-2 w-full h-48">
                                <div className="relative overflow-hidden">
                                  <img
                                    src={data.image}
                                    alt={data.name}
                                    className="w-full lg:h-48 md:h-32 h-32 rounded-md object-cover"
                                  />
                                </div>
                              </div>
                              <div className="my-2 flex flex-col gap-2 w-full">
                                <div className="lg:text-md md:text-sm text-xs flex flex-col items-center justify-center">
                                  <h4 className=" font-medium">{data.name}</h4>
                                  <h4>{data.offer}</h4>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
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

export default bestFasion;
