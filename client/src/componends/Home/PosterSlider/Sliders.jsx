import React from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextArrow, PrevArrow } from "./arrows";
const Sliders = () => {

  const images = [
    {
      link: "https://rukminim1.flixcart.com/fk-p-flap/844/140/image/7825fed65d6ce993.jpg?q=50"
    },
    {
      link: "https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/af9b2852656c2388.jpg?q=20"
    },
    {
      link: "https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/6d46d5b2c72f64ef.png?q=20"
    },
    {
      link: "https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/ce2a9f11068a9e65.jpg?q=20"
    }
  ]
  const settingsLG = {
    arrows: true,
    slidesToShow: 1,
    infinite: true,
    // speed:500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    speed: 1000,
    // autoplaySpeed: false,
    cssEase: "linear",
  };
  // const settings = {
  //     arrows: true,
  //     slidesToShow: 1,
  //     infinite: true,
  //     // speed:500,
  //     nextArrow: <NextArrow />,
  //     prevArrow: <PrevArrow />,
  //     autoplay: true,
  //     speed: 2000,
  //     autoplaySpeed: 2000,
  //     cssEase: "linear",
  // };
  return (
    <>

      <div className=" block overflow-hidden">
        <Slider {...settingsLG}>
          {images.map((images, index) => (
            <div className="w-full lg:h-80 h-full px-2 py-3 outline-none" key={index}>
              <img
                src={images.link}
                alt="Hero banner"
                className="w-full h-full lg:object-cover object-contain  outline-none"
              />
            </div>
          ))}
        </Slider>
      </div>
    </>
  )
}

export default Sliders