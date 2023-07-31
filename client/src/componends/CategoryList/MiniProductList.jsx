import { Product } from '../../utlis/constrants'
import React from 'react'

const MiniProductList = () => {
  return (
    <>
     <main className='relative mr-10 bg-white lg:flex hidden w-full top-1'>
        <section className=' lg:w-full lg:overflow-auto  text-black h-gull border-b flex justify-center space-x-0 align-middle items-center shadow-md overflow-x-scroll pr-1 w-screen'>
          <div className='flex  items-center justify-center' >
            {Product.map((data,i) => {
              return (
                <>
                  <div className='pl-5 py-3 pr-4 text-center flex flex-col justify-center align-middle' key={i}>
                    
                    <h1  className=' text-sm font-semibold'>{data.title}</h1>
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

export default MiniProductList