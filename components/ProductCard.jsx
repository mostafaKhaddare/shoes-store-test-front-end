import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getDiscountedPricePercentage } from "@/utils/helpers"

function ProductCard({data : {attributes : p , id  }}) {
  return (
    <Link href={`/product/${p.slug}`}
          className='transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer'
    >
        {/* <img src="/product-1.webp" className='w-full' alt="product image" /> */}          
        <Image
        width={500}
        height={500}
        src={p.thumbnail.data.attributes.url}
        alt={p.name}
        />
        <div className='p-4 text-black/[0.9]'>
             <h1 className='text-lg font-medium'> {p.name}</h1>
             <div className='flex items-center text-black/[0.5]'>
                 <span className='mr-2 text-lg font-semibold'>
                 MAD {p.price}
                  </span>
                   {p.original_price && (
                    <>
                    <span className='text-base font-medium line-through'> 
                        {p.original_price} MAD
                    </span>
                    <span className= 'ml-auto text-base font-medium text-green-500'> 
                        {getDiscountedPricePercentage(p.original_price , p.price)}
                         % off 
                     </span>
                    </>
                  )}
                 
             </div>
        </div>
    </Link>
  )
}

export default ProductCard