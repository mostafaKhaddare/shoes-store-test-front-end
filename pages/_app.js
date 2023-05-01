import '@/styles/globals.css'
import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Provider } from 'react-redux'
import store from '@/store/store'
export default function App({ Component, pageProps }) {
  return (
   <>
   <Head>
     <title></title>
     <meta
      name="description"
      content='gerated by mostafa'
     />
     <meta
      name="viewport"
      content='gerated by mostafa'
     />
     <link rel='icon' href='/favicon.io'/>
     <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
       rel="preconnect"
       href="https://fonts.gstatic.com"
       crossOrigin="true"
    />
   <link
      href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&family=Urbanist:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
      rel="stylesheet"
   />
   </Head>
     <Provider store={store}>
       <Header/>
            <Component {...pageProps} />
       <Footer/>
     </Provider>
  </> 
  )
  
}

// 88fd8b908762dab69e5f7b9d04baba7031b45e33227206cae58677759a021be79a5f59d397418421928771d4eec8cba4c38e0520c8a09bfd146f208e1447151072cce57d16d72da4e9f7e3c94e874fc6d9caf01a45e40b7a07b299a944a9b31c5f5ee7cf5fd676c41bf76401f86b261e16746bd332b840d23848f14f01e1d7bc
