import React from 'react'
import HomeNav from '../componends/NavBar/HomeNav'
import ProductListNav from '../componends/CategoryList/ProductListNav'
import Slider from '../componends/Home/PosterSlider/Sliders'
import BestElec from '../componends/Home/Recomandations/BestElec'
import BestFashion from '../componends/Home/Recomandations/BestFashion'

const homePage = () => {

  return (
    <>
      <main >
        <HomeNav />
        <ProductListNav />
        <Slider />
        <BestElec categorys={"electronis"} />
        <BestFashion />
      </main>
    </>

  )
}

export default homePage