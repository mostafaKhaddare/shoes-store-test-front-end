import { useState , useEffect } from "react"
import Wrapper from "./Wrapper"
import Menu from "./Menu"
import MenuMobile from "./MenuMobile"
import CartAndWishlist from "./CartAndWishlist"
import Link from "next/link"
import { fetchDataFromApi } from "@/utils/api"

const Header = () => {

  const [mobileMenu, setMobileMenu] = useState(false)
  const [showCategoryMenu, setShowCategoryMenu] = useState(false)
  const [show, setShow] = useState("translate-y-0")
  const [lastScrollY, setLastScrollY] = useState(0)
  const [categories, setCategories] = useState(null)
  const controlNavbar = () => {
    if (window.scrollY > 200) {
        if(window.scrollY > lastScrollY && !mobileMenu) {
          setShow("-translate-y-[80px]");
        } else {
          setShow("shadow-sm")
        }
    } else {
          setShow('translate-y-0');
    }
    setLastScrollY(window.scrollY)
  }

  useEffect(()=>{
    window.addEventListener('scroll' , controlNavbar);
    return () =>{
      window.removeEventListener("scroll" , controlNavbar)
    }
  } , [lastScrollY]);

  useEffect(() => {
      fetchCategories()
  }, [])

  const fetchCategories = async () =>{
    const {data} = await fetchDataFromApi('/api/categories?populate=*')
    setCategories(data)
  }
  
  console.log('categories :' , categories)
  return (
    <header className={`w-full h-[50px] md:h-[80px] bg-slate-100 flex items-center justify-between z-20 fixed transition-transform duration-300 ${show}`}>
       <Wrapper className="h-[60px] flex justify-between items-center">
             <Link href="/">
                   <img 
                       className="w-[40px] md:w-[60px]" 
                       src="/logo.svg" 
                       alt="nike shoes logo"
                    />
             </Link>
             <Menu 
                   showCategoryMenu={showCategoryMenu} 
                   setShowCategoryMenu={setShowCategoryMenu}
                   categories={categories}
             />
            {mobileMenu && 
            <MenuMobile 
                   showCategoryMenu={showCategoryMenu} 
                   setShowCategoryMenu={setShowCategoryMenu} 
                   setMobileMene={setMobileMenu}
                   categories={categories}

             />
                   
            }
           <CartAndWishlist 
                   mobileMenu={mobileMenu} 
                   setMobileMenu={setMobileMenu}/>
       </Wrapper>
    </header>
  )
}

export default Header;