import React from 'react'
import HomeNav from '../componends/NavBar/HomeNav'
import ProductListNav from '../componends/ProductList/ProductListNav'
import Slider from '../componends/Home/PosterSlider/Sliders'
import BestElec from '../componends/Home/Recomandations/BestElec'
import BestFashion from '../componends/Home/Recomandations/BestFashion'

const homePage = () => {
  return (
    <>
    <main className=' '>
    <HomeNav/>
    <ProductListNav/>
    <Slider/>
    <BestElec/>
    <BestFashion/>
    </main>
    
    
    <div>am from home page</div>
    </>
    
  )
}

export default homePage