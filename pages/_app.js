import '../styles/globals.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import SearchBar from '../components/SearchBar';
import Footer from "../components/Footer";
//import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '../context/AuthProvider';


//bg-sky-700 bg-gray-100

export default function MyApp({ 
  Component, 
  pageProps
}) {
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === 'undefined') {
    return <></>;
  } else {
    return (
      <>
        <AuthProvider>
          <nav className='w-full flex md: justify-center justify-between items-center border-b p-5 bg-gray-100'>
            <Link href="/">
              <a className='mr-6'>
                <p className='text-4xl font-bold'>Pet Shop</p>
              </a>
            </Link>
            {/* search bar */}
            <SearchBar />
            
            <div className='flex justify-end font-bold text-xl'>
              <Link href="/admin">
                <a className='mr-6'>
                  Admin
                </a>
              </Link>
              <Link href="/breed">
                <a className='mr-6'>
                  Breed
                </a>
              </Link>
              <Link href="/cart">
                <a className='mr-6'>
                  Cart
                </a>
              </Link>
              <Link href="/login">
                <a className='mr-6'>
                  Sign In
                </a>
              </Link>
            </div>

          </nav>

          <Component {...pageProps}  />      
          <Footer />
        </AuthProvider>
      </>
    );
  }
}

//export default MyApp
