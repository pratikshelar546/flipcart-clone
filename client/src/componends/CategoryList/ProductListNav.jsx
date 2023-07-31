import React from 'react'
import { Product } from '../../utlis/constrants'


const ProductListNav = () => {
  return (
    <>
      <main className='relative mr-10  bg-white w-full '>
        <section className=' lg:w-full lg:overflow-auto  text-black h-28 border-b flex justify-center space-x-0 align-middle items-center shadow-md overflow-x-scroll pr-1 w-screen'>
          <div className='flex  items-center justify-center' >
            {Product.map((data,i) => {
              return (
                <>
                  <div className='pl-5 py-3 pr-4 text-center flex flex-col justify-center align-middle' key={i}>
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