import Wrapper from "@/components/Wrapper"
import ProductDetailsCarousel from "@/components/ProductDetailsCarousel"
import RelatedProducts from "@/components/RelatedProducts"
import { getDiscountedPricePercentage } from "@/utils/helpers"
import { IoMdHeartEmpty } from "react-icons/io"
import { fetchDataFromApi } from '@/utils/api'
import { useState } from "react"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import { useSelector, useDispatch } from 'react-redux'
import {addToCart} from "@/store/cartSlice"
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const ProductDetails = ({product , products}) => {
      const [selectedSize, setSlectedSize] = useState()
      const [showError , setShowError] = useState(false)
      const p = product?.data?.[0]?.attributes;
      const dispatch = useDispatch()
      const notify = () =>toast.success('Success check your cart', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });;

  return (
    <div className="w-full md:py-40">
        <ToastContainer/>
        <Wrapper>
            <div className="flex flex-col md:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
                {/* left column start */}
                <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
                    <ProductDetailsCarousel images={p.image.data}/>
                </div>
                {/* left column end */}

                {/* right column start */}
                <div className="flex-[1] py-3">
                    {/* product title */}
                    <h1 className="text-[34px] font-semibold mb-2 leading-tight">
                         {p.name}
                    </h1>
                    {/* product subtitle */}
                    <h2 className="text-lg font-semibold mb-2">
                        {p.subtitle}
                    </h2>
                     {/* price */}
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
                     <div className="text-md font-medium text-black/[0.5]">
                        incl. of taxes
                     </div>
                     <div className="text-md font-medium text-black/[0.5]">
                        {`(also includes all applicable duties)`}
                     </div>

                     {/* product size range start */}
                      <div className="my-10">
                            {/* start heading */}
                           <div className="flex justify-between mb-2">
                                 <div className="text-md font-semibold">
                                      selecte size
                                 </div>
                                 <div className="text-md font-medium text-black/[0.5] cursor-pointer">
                                      selecte Guide
                                 </div>
                           </div>
                          {/* end heading */}

                          {/* start size */}
                          <div id="sizesGrid" className="grid grid-cols-3 gap-2">
                              {p.size.data.map((item,i)=>(
                                   <div 
                                   className={`border rounded-md text-center py-3 font-medium ${
                                       item.enabled ?
                                        "hover:border-black cursor-pointer" 
                                        : "cursor-not-allowed bg-black/[0.1] opacity-50"
                                    } ${
                                        selectedSize === item.size 
                                        ? 'border-black'
                                        : null
                                    }
                                    
                                    `}
                                    onClick={()=>{
                                          setSlectedSize(item.size)
                                          setShowError(false)
                                    }}
                                    
                                    >
                                     {item.size}
                                   </div> 
                              ))}
                          </div>
                          {/* size end */}
                          {/* show error start */}
                          {showError && (
                              <div className="text-red-600 mt-1">
                                 Size selection is required
                          </div>
                          )}
                          {/* show error end */}
                      </div>
                      {/* product size range end */}

                      {/* add to cart buttonl start */}
                        <button 
                        className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
                        onClick={()=> {
                              if(!selectedSize){
                                    setShowError(true)
                                    document.getElementById("sizesGrid")
                                            .scrollIntoView({
                                                block : "center",
                                                behavior : "smooth"
                                             })
                                 }
                                dispatch(addToCart({
                                  ...product?.data?.[0],
                                  selectedSize,
                                  oneQuantityPrice : p.price
                                }))
                                notify()
                        }}
                          >
                          Add To cart
                        </button>
                      {/* add to cart button end */}

                      {/* wishlist button start */}
                      <button className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10">
                          wishlist 
                          <IoMdHeartEmpty size={20}/>
                        </button>
                      {/* wishlist buttonl end */}

                      {/* start description */}
                         <div>
                            <div className="text-lg font-bold mb-5">
                                  product details
                            </div>
                            <div className="markdown text-md mb-5">
                                 <ReactMarkdown>
                                    {p.description}
                                 </ReactMarkdown>
                            </div>
                           
                         </div>
                      {/* end description */}
                      </div>
                {/* right column end */}
           </div>
           {/* related products   */}
           <RelatedProducts products={products}/>
        </Wrapper>
    </div>
  )
}

export default ProductDetails

export async function getStaticPaths(){

      const products = await fetchDataFromApi('/api/products?populate=*')
    
      const paths  = products.data.map((p)=>({
        params : {
          slug : p.attributes.slug
        }
      }))
      return {
        paths,
        fallback : false
      }
}

export async function getStaticProps({params : {slug}}) {
      const product = await fetchDataFromApi(`/api/products?populate=*&[filters][slug][$eq]=${slug}`)
      const products = await fetchDataFromApi(`/api/products?populate=*&[filters][slug][$ne]=${slug}`)
      return{
        props : {
          product,
          products,
        }
      }
      
}