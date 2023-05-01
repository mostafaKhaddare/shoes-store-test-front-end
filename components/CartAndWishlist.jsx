import {IoMdHeartEmpty} from "react-icons/io"
import {BsCart} from "react-icons/bs"
import {BiMenuAltRight} from "react-icons/bi"
import {VscChromeClose} from "react-icons/vsc"
import { useSelector } from "react-redux"
import Link from "next/link"

const CartAndWishlist = ({mobileMenu , setMobileMenu}) => {

  const {cartItems} = useSelector((state => state.cart))


  return (
    <div className="flex items-center gap-2 text-black">
         <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
              <IoMdHeartEmpty className="text-[19px] md:text-[24px]"/>
              <span className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:lef-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px] ">10</span>
          </div>
          <Link
            href="/cart"
          >
            <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
              <BsCart className="text-[15px] md:text-[20px]"/>
               {cartItems.length >  0 && (
                <span className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:lef-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px] "> {cartItems.length} </span>
               )}
            </div>
          </Link>
           {/* mobile icon start */}
           <div className="md:hidden w-8 m:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative -mr-2">
                {mobileMenu ? (
                    <VscChromeClose 
                     className="text-[16px]"
                     onClick={()=> setMobileMenu(false)}
                     />
                ) : ( 
                   <BiMenuAltRight 
                    className="text-[20px]"
                     onClick={()=> setMobileMenu(true)}
                   />
                )
            }
           </div>
           {/* mobile icon end */}
    </div>
  )
}

export default CartAndWishlist