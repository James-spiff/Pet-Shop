import { useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import pups from '../pups';

//console.log(pups);

//Object.values(pups.slice(0,4)).map((pup, i) => (console.log(pup.name)));
function shortenWords(sentence, amount, tail) {
  const words = sentence.split(' ');

  if (amount >= words.length) {
    return sentence;
  }

  const truncated = words.slice(0, amount);
  return `${truncated.join(' ')}${tail}`;
}

const Main = () => {

  return (
    <>
      {/* Featured Pets Carousel */}

      {/* Breeds */}
      <div className='bg-gray-100'>
        <h1 className="text-3xl font-bold text-center mt-5">Breeds</h1>
        <div className="flex flex-1 justify-evenly items-center">
          {
            //map over and display only a 5 or 4 breeds. Use slicing
            Object.values(pups.slice(0,5)).map((pup, i) => (
              <Link href='/'>
                <div key={i} className='max-w-sm rounded-full mt-5 mb-8 overflow-hidden shadow-lg'>
                  <Image src={pup.image} className='w-full' width={310} height={235} alt="breeds" />
                  <div className='font-bold text-xl mb-2 text-center'>{pup.breed}</div>
                </div>
              </Link>
            ))
          }
        </div>
      </div>

      {/* Latest Pets (might turn to component) */}
      <h1 className="text-3xl font-bold text-center mt-5">Latest Pets</h1>
      
      <div className="flex flex-wrap justify-evenly items-center">
          {Object.values(pups).map((pup, i) => (
                <Link href='/'>
                  <div key={i} className='max-w-sm rounded mt-5 mb-8 overflow-hidden shadow-lg'>
                      <Image src={pup.image} className='w-full' width={500} height={350} alt="puppies" />
                      <div className='px-6 py-4'>
                        <div className='font-bold text-xl mb-2'>{pup.name}</div>
                          <p className='text-gray-700 text-base'>{shortenWords(pup.description, 10, '....')}</p>
                      </div>
                      <div className='px-6 pt-4 pb-2'>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${pup.price}</span>
                      </div>
                  </div>
                </Link>
              )
          )}
      </div>
    </>
  );
}

export default Main;