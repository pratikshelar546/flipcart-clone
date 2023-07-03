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
            link: "https://rukminim1.flixcart.com/fk-p-flap/844/140/image/7825fed65d6ce993.jpg?q=50"
        },
        {
            link: "https://rukminim1.flixcart.com/fk-p-flap/844/140/image/7825fed65d6ce993.jpg?q=50"
        },
        {
            link: "https://rukminim1.flixcart.com/fk-p-flap/844/140/image/7825fed65d6ce993.jpg?q=50"
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

<div className="hidden lg:block overflow-hidden">
        <Slider {...settingsLG}>
          {images.map((images,index) => (
            <div className="w-full h-80 px-2 py-3 outline-none"  key={index}>
              <img
                src={images.link}
                alt="Hero banner"
                className="w-full h-full object-cover outline-none"
              />
            </div>
          ))}
        </Slider>
      </div>
        </>
    )
}

export default Sliders