import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllPost } from '../../utils/requests';

const breed = () => {

  const [pups, setPups] = useState([]);

  const getPups = async () => {
    const result = await getAllPost();
    setPups(result);
  }

  console.log(pups);

  useEffect(() => {
    getPups();
  }, []);

  const newPups = [];

  // const newBreed = pups.filter((value, index, self) => {(
  //   self.findIndex((pup) => pup.breed === value.breed) === index
  // )});
  
  // console.log(newBreed);
  
  // Object.values(pups).map((pup, i) => {
    
  //   if (newPups.length === 0) {
  //     newPups.push(pup);
  //   } else {
  //     if (pup.breed in newPups[i]) {
  //       return;
  //     } else {
  //       newPups.push(pup)
  //     }
  //   }
  // }); //pups[i-1].breed === pup.breed
  // console.log(newPups);

  //pups.findIndex(getBreed);

  return (
    <>
        <h1 className="text-3xl font-bold text-center mt-5">Breeds</h1>
        <div className="flex flex-wrap justify-evenly items-center">
          {
            //map over and display only a 5 or 4 breeds. Use slicing
            Object.values(pups).map((pup, i) => (
              <Link key={i} href='/'>
                <div key={i} className='max-w-sm rounded-full mt-5 mb-8 overflow-hidden shadow-lg'>
                  <Image src={pup.pup_image} className='w-full' width={310} height={235} alt="breeds" />
                  <div className='font-bold text-xl mb-2 text-center'>{pup.breed}</div>
                </div>
              </Link>
              ))

            // pups.filter((value, index, self) => (
            //   <div key={index} className='max-w-sm rounded-full mt-5 mb-8 overflow-hidden shadow-lg'>
            //     <Image src={} className='w-full' width={310} height={235} alt="breeds" />
            //   </div>
            // ))
          }
        </div>
      </>
  )
}

export default breed;
