import HeroBanner from "@/components/HeroBanner"
import Wrapper from "@/components/Wrapper"
import ProductCard from "@/components/ProductCard"
import { fetchDataFromApi } from "@/utils/api"
import { useState , useEffect } from "react"

export default function Home({products}) {
  // const [data, setData] = useState(null)

  // useEffect(() => {
  //     fetchProducts()
  // }, [])


  // const fetchProducts = async () =>{
  //   const {data} = await fetchDataFromApi('/api/products')
  //   setData(data)
  // }

  console.log( "this is -> data " , products)

  return (
    <main>
         <HeroBanner/>
          <Wrapper>
            <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
              <h1 className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
                 cushioning for your miles
              </h1>
              <p className="text-md md:text-xl">
                 A lightweight nike zoomX midsole is compined with increased stacj heights to help provide cushioning during extended stretches of running
              </p>
            </div>

            <div className="grid grid-cols-2 md-grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-20 my-14 px-5 md:px-0">               
            {products?.data?.map((product)=>(
              <>
                <ProductCard key={product.id} data={product}/>
              </>
            ))}
      
            </div>
          </Wrapper>
    </main>
  )
}

export async function getStaticProps() {

  const products = await fetchDataFromApi('/api/products?populate=*')

  return {
    props: {  products  }, // will be passed to the page component as props
  }
}
