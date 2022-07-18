import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// if (typeof window !== 'undefined') {
//   console.log('You are on the browser')
// } else {
//   console.log('You are on the server')
// }

function shortenWords(sentence, amount, tail) {
  const words = sentence.split(' ');

  if (amount >= words.length) {
    return sentence;
  }

  const truncated = words.slice(0, amount);
  return `${truncated.join(' ')}${tail}`;
}

//function to convert an arrayBuffer image representation stored in the database to a jpg
// const displayImage = (pupImage) => {
//   const arrayBufferView = new Uint8Array(pupImage);
//   const blob = new Blob([arrayBufferView], { type: "image/jpeg" });
//   const urlCreator = window.URL || window.webkitURL;
//   const imageUrl = urlCreator.createObjectURL(blob);
//   //const img = document.querySelector('#photo')
//   console.log(imageUrl);
//   return imageUrl;
// }


const url = 'http://localhost:3000/api/pups';


const Main = () => {

  const [pups, setPups] = useState([]);
  const [pupImage, setPupImage] = useState(null);

  const getPups = async () => {
    try {
      const res = await axios.get(url);
      //const resJson = res.json();

      setPups(res.data);
      console.log(pups);
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    getPups();
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  return (
    <>
      <div className='mx-auto w-[100%] mt-0.5'>
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          //autoPlay={this.props.deviceType !== "mobile" ? true : false}
          autoPlay={true}
          autoPlaySpeed={2000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          //deviceType={this.props.deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {
              Object.values(pups).map((pup, i) => (
                // <div key={i} className='mx-0.5'>
                //   <div>
                //     <img className='w-[800px] h-[500px]' src={pup.pup_image} />
                //   </div>
                // </div>
                <div
                  key={i}
                  className="carousel-item text-center relative snap-start"
                  >
                  <a
                      href='/'
                      className="h-full w-full aspect-square block bg-origin-padding bg-left-top bg-cover bg-no-repeat z-0"
                      style={{ backgroundImage: `url(${pup.pup_image || ''})` }}
                  >
                      <img
                      src={pup.pup_image || ''}
                      alt={pup.breed}
                      className="w-full aspect-square hidden"
                      />
                  </a>
                  <a
                      href='/'
                      className="h-full w-full aspect-square block absolute top-0 left-0 transition-opacity duration-300 opacity-0 hover:opacity-100 bg-blue-800/75 z-10"
                  >
                      <h3 className="text-white py-6 px-3 mx-auto text-xl">
                      {pup.breed}
                      </h3>
                  </a>
                </div>
              ))
            }
        </Carousel>
      </div>
      

      {/* Breeds */}
      <div className='bg-gray-100'>
        <h1 className="text-3xl font-bold text-center">Breeds</h1>
        <div className="flex flex-1 justify-evenly items-center">
          {
            //map over and display only a 5 or 4 breeds. Use slicing
            Object.values(pups.slice(0,5)).map((pup, i) => (
              <Link key={i} href={`/pupDetail/${pup.pup_id}`}>
                <div key={i} className='max-w-sm rounded-full mt-5 mb-8 overflow-hidden shadow-lg'>
                  <Image src={pup.pup_image} className='w-full' width={310} height={235} alt="breeds" />
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
                <Link key={i} href={`/pupDetail/${pup.pup_id}`}>
                  <div key={i} className='max-w-sm rounded mt-5 mb-8 overflow-hidden shadow-lg'>
                    
                    <div>
                      <Image src={pup.pup_image} className='w-full' width={500} height={350} alt="puppies" />
                      </div>
                      <div className='px-6 py-4'>
                        <div className='font-bold text-xl mb-2'>{pup.name}</div>
                          <p className='text-gray-700 text-base'>{pup.description}</p>
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