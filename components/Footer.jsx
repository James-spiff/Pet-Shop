import React from 'react'

const Footer = () => {
  return (
        <div className='w-full flex md:justify-center justify-between items-center flex-col p-4 bg-gray-100'>
        <div className='w-full flex sm:flex-row flex-col justify-between items-center my-4'>
            <div className='flex flex-[0.5] justify-center items-center'>
                {/* <img src={logo} alt='logo' className='w-32' /> */}
                <p className='text-4xl font-bold'>Pet Shop</p>
            </div>
            <div className='flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full'>
                <p className='text-gray-700 text-base text-center mx-2 cursor-pointer'>Sign Up</p>
                <p className='text-gray-700 text-base text-center mx-2 cursor-pointer'>Breeds</p>
                <p className='text-gray-700 text-base text-center mx-2 cursor-pointer'>Adopt</p>
                <p className='text-gray-700 text-base text-center mx-2 cursor-pointer'>Cart</p>
            </div>
        </div>

        <div className='flex justify-center items-center flex-col mt-5'>
            <p className='text-gray-700 text-sm text-center'>Leave a message</p>
            <p className='text-gray-700 text-sm text-center'>info@Petshop.com</p>
        </div>
        <div className='sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5' /> {/*creates a line */}
            <div className='sm:w-[90%] w-full flex justify-between items-center mt-3'>
                <p className='text-gray-700 text-sm text-center'>@petshop 2022</p>
                <p className='text-gray-700 text-sm text-center'>All rights reserved</p>
            </div>
        </div>
  )
}

export default Footer