import React from 'react'
import { Product } from '../../utlis/constrants'

// const Product = [
//   {
//     title: "Grocery",
//     image: "https://rukminim1.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png?q=100",
//     DropDowun: false,
//   },
//   {
//     title: "Mobiles",
//     image: "https://rukminim1.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png?q=100",
//     DropDowun: false,
//   },
//   {
//     title: "Fashion",
//     image: "https://rukminim1.flixcart.com/fk-p-flap/128/128/image/0d75b34f7d8fbcb3.png?q=100",
//     DropDowun: true,
//   },
//   {
//     title: "Electronics",
//     image: "https://rukminim1.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100",
//     DropDowun: true,
//   },
//   {
//     title: "Home & Furniture",
//     image: "https://rukminim1.flixcart.com/flap/128/128/image/ab7e2b022a4587dd.jpg?q=100",
//     DropDowun: true,
//   },
//   {
//     title: "Appliances",
//     image: "https://rukminim1.flixcart.com/flap/128/128/image/0ff199d1bd27eb98.png?q=100",
//     DropDowun: false,
//   },
//   {
//     title: "Travel",
//     image: "https://rukminim1.flixcart.com/flap/128/128/image/71050627a56b4693.png?q=100",
//     DropDowun: false,
//   }, {
//     title: "Top Offers",
//     image: "https://rukminim1.flixcart.com/flap/128/128/image/f15c02bfeb02d15d.png?q=100",
//     DropDowun: false
//   },
//   {
//     title: "Beauty, Toys & More",
//     image: "https://rukminim1.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png?q=100",
//     DropDowun: true,
//   }, {
//     title: "Two Wheelers",
//     image: "https://rukminim1.flixcart.com/fk-p-flap/128/128/image/05d708653beff580.png?q=100",
//     DropDowun: true
//   }

// ]
const ProductListNav = () => {
  return (
    <>
      <main className='relative mr-10   w-full '>
        <section className=' lg:w-full lg:overflow-auto  text-black h-28 border-b flex justify-center space-x-0 align-middle items-center shadow-md overflow-x-scroll pr-1 w-screen'>
          <div className='flex  items-center justify-center' >
            {Product.map((data, key) => {
              return (
                <>
                  <div className='pl-5 py-3 pr-4 text-center flex flex-col justify-center align-middle' key={key}>
                    <div className='w-16 h-16 '>

                      <img src={data.image} alt={data.title} className='' />
                      
                    </div>
                    <h1  className='text-xs'>{data.title}</h1>
                  </div>
                </>
              )
            })}
          </div>
        </section>

      </main>
    </>
  )
}

export default ProductListNav