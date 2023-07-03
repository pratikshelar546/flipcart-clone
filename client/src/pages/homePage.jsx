import React from 'react'
import HomeNav from '../componends/NavBar/HomeNav'
import ProductListNav from '../componends/ProductList/ProductListNav'
import Slider from '../componends/Home/PosterSlider/Sliders'

const homePage = () => {
  return (
    <>
    
    <HomeNav/>
    <ProductListNav/>
    <Slider/>
    
    <div>am from home page</div>
    </>
    
  )
}

export default homePage