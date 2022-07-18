import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getPost } from '../../utils/requests';
import { useRouter } from 'next/router';
import { useAuthContext } from '../../context/AuthProvider';


//when add to cart button is clicked store details in storage
const Detail = () => {

    const { move } = useAuthContext();

    const router = useRouter();
    const { id } = router.query;

    let shipp_price = 30;

    const [pup, setPup] = useState([]);

    const getPuppy = async () => {
        const result = await getPost(id);
        setPup(result);
    }

    console.log(pup)

    // useEffect(() => {
    //     getPuppy();
    // }, [pup]);

    if(pup.length === 0) {
        getPuppy()

        return <h1>Loading...</h1>
    }

  return (
    <>
        <Link href='/' className=''>
                <button className='bg-gray-500 text-white rounded-lg m-2 ml-3 p-2 px-6'>Back</button>
        </Link>

        <div className='mx-auto w-[90%]'>
            <div className='flex bg-gray-100 justify-evenly mb-10'>
                {/* <div className='flex'> */}
                
                    <div className='max-w-sm mt-3 mb-5 mr-1 h-full overflow-hidden shadow-lg rounded-lg'>
                        <Image src={pup.pup_image} className='w-full' width={600} height={500} alt="breeds" />
                    </div>
                    
                    <div className='w-[300px] mr-5 rounded-lg py-10 px-5'>
                        {/* <h1 className='font-bold text-2xl mb-2'>Breed: {pup.breed}</h1>
                        <h3 className='text-xl'>Name: {pup.name}</h3> */}
                        {/* <div className='flex justify-between mb-7'>
                            <h1 className='font-bold text-2xl'>Breed:</h1>
                            <h1 className='font-bold text-2xl'>{pup.breed}</h1>
                        </div> */}
                
                        <h1 className='text-2xl mb-2'>Name: {pup.name}</h1>
                        <p className='text-xl mb-2'>Breed: {pup.breed}</p>
                        <p className='text-l mb-2'>Age: {pup.age}</p>
                        <p className='text-l mb-3'>Sex: {pup.sex ? 'Male' : 'Female'}</p>
                        <hr className='border-black border-t-[2px] my-3' />
                        <p className='font-bold text-xl mb-3'>Price: ${pup.price}</p>

                        <p>Description: {pup.description}</p>
                    </div>
                    
                    <div className='flex-col bg-gray-200 mt-5 w-[300px] h-[370px] mr-3 rounded-lg p-6'>
                        <strong>Details</strong>
                        <hr className='border-black border-t-[2px] my-2' />

                        <div className='flex justify-between mb-5'>
                            <strong>Status:</strong>
                            <strong>{pup.pup_status ? 'Available' : 'Unavailable'}</strong>
                        </div>
                        <div className='flex justify-between mb-5'>
                            <strong>Weight:</strong>
                            <strong>20-35 lbs</strong>
                        </div>
                        <div className='flex justify-between mb-5'>
                            <strong>Price:</strong>
                            <strong>${pup.price}</strong>
                        </div>
                        <div className='flex justify-between mb-5'>
                            <strong>Shipping:</strong>
                            <strong>${shipp_price}</strong>
                        </div>
                        <div className='flex justify-between text-2xl mb-5'>
                            <strong>Total:</strong>
                            <strong className='text-2xl'>${Number(shipp_price) + Number(pup.price)}</strong>
                        </div>

                        <Link href='/'>
                            <button className='bg-sky-500 text-white rounded-lg mt-5 p-2 px-6'>Add to Cart</button>
                        </Link>
                    </div>
                {/* </div> */}
            </div>
        </div>

        {/* Add extra info below like vaccination and more physical properties */}

        {/* Related puppies i.e show at most 4 puppies of the same breed or show all and make it a slide */}
        <div className='m-auto w-[62%]'>
            <div className='flex bg-gray-100 mt-5 w-[500px] mr-5 rounded-lg py-10 px-5 mb-10'>
                <h1 className='mr-20 font-bold text-2xl text-center mb-5'>Reviews</h1>
                <ul>
                    <li className='mb-2'>
                        <strong>Finn White</strong>
                        <p>5 stars</p>
                    </li>
                    <li className='mb-2'>
                        <strong>Frank Black</strong>
                        <p>4 stars</p>
                    </li>
                </ul>
            </div>
        </div>
    </>
  )
}

export default Detail