import Link from "next/link";
import Image from "next/image";
import Wrapper from "@/components/Wrapper";
import { useMemo } from "react";
import CartItem from "@/components/CartItem"
import { useSelector } from "react-redux"
import { makePayementRequest } from "@/utils/api";
import {loadStripe} from "@stripe/stripe-js"
import { useState } from "react";
const stripePromise = loadStripe('pk_test_51N2B2vBOvztxMQu2DaEQESQ3cDJciLbgh9rjIG2NjtOm1OwOiZss2M3eTqWl7e4Ds9eKcw5Gz7srhqSTEloXuZZM002ux8rvvc')
const Cart = () => {
     const [loading , setLoading] = useState(false)
     const {cartItems} = useSelector((state => state.cart))
    
     const subTotal = useMemo(()=> {
          return cartItems.reduce((total , val) => total + val.attributes.price , 0)
     } , [cartItems])

     const handlePayment = async () =>{
       try {
           setLoading(true)
           const stripe = await stripePromise;
           const res = await makePayementRequest('/api/orders' , {
                 products : cartItems
           })
           await stripe.redirectToCheckout({
                sessionId : res.stripeSession.id
            })
       } catch (error) {
        setLoading(false)
        console.log(error)
       }
     }

  return (
    <div className="w-full md:py-20">
         <Wrapper>
          {cartItems.length > 0 && (
               <>
                {/* heading and paragraph start */}
             <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
                  <div className="text-[28px] py-5 md:text-[34px] mb-5 font-semibold leading-tight">
                        shopping cart
                  </div>
            </div>
           {/* heading and paragraph end */}
                  {/* CART CONTENT START */}
            <div className="flex flex-col lg:flex-row gap-12 py-10">
                  {/* cart items start */}
                 <div className="flex-[2]">
                      <div className="text-lg font-bold">
                         {cartItems.map((item)=>(
                           <CartItem
                             key={item.id}
                             data={item}
                           />
                         ))}
                      
                      </div>
                 </div>
                {/* cart items end */}
                {/* summary strat */}
                <div className="flex-[1]">
                     <div className="text-lg font-bold">
                          Summary
                     </div>
                     <div className="p-5 my-5 bg-black/[0.05] rounded-xl">
                        <div className="flex justify-between">
                            <div className="uppercase text-md md:text-lg font-medium text-black">
                                SubTotal
                            </div>
                            <div className="text-md md:text-lg font-medium text-black">
                            {subTotal}
                             </div>
                        </div>
                        <div className="text-sm md:text-md py-5 border-t mt-5">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus explicabo ratione veniam esse, voluptate dicta. Maxime eos laudantium ea ipsam facilis ipsa id, nisi sint suscipit nam, architecto repellendus repudiandae
                            </div>
                     </div>
                     {/* START BUTTON */}
                      <button className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center justify-center gap-2"
                              onClick={handlePayment}

                      >
                        Checkout
                        {loading && <img src='/spinner.svg'/>}
                      </button>
                     {/* END BUTTON */}
                     </div>
                {/* summary end */} 
            </div>
            {/* CART CONTENT END */}
          </>
          )}

           {cartItems.length < 1 && (
               <div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
                   <Image
                    src='/empty-cart.jpg'
                    width={300}
                    height={300}
                    className='w-[300px] md:w-[400px]'
                   />
                   <span className="text-xl font-bold">
                    your cart is empty
                   </span>
                   <span className="text-xl font-bold">
                        looks like you have no added anythinh in your cart
                          <br />
                          go ahead and explore top categories
                   </span>
                   <Link
                     href='/'
                     className="py-4 px-8 mt-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
                   >
                    Continue shopping
                   </Link>
             </div>
           ) }
             
         </Wrapper>
    </div>
  )
}

export default Cart;
