import React from "react";
import Slider from "react-slick";
import { NextArrow, PrevArrow } from "./Arrows";

const ImageSlider = (image) => {
  // console.log(image);
  const images = image.image;
  // console.log(images);
  const settings = {
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    autoplay: true,
    speed: 2500,
    autoplaySpeed: false,
    // cssEase: "linear",
    fade: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <div className=" h-full relative">
        {/* <h2>Fade</h2> */}
        <Slider {...settings}>
          {images.map((image, i) => (
            <>
              <div
                key={i}
                className="w-full lg:h-44 h-28 px-2  flex  justify-center outline-none"
              >
                <img
                  src={image.url}
                  alt="Not Found"
                  className="w-full h-full object-contain"
                />
              </div>
            </>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default ImageSlider;
