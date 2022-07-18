// import React,  { useState, useEffect, useRef } from 'react';
// import { getAllPost } from '../utils/requests';

// const Carousel = () => {

//     const [pups, setPups] = useState([]);

//     const getPups = async () => {
//         const result = await getAllPost();
//         setPups(result);
//     }

//     const movePrev = () => {

//     }

//     const moveNext = () => {

//     }

//     useEffect(() => {
//         getPups();
//     }, []);

//     //const [disabled, isDisabled] = useState('next');

//   return (
//     <div className="carousel my-12 mx-auto">
//         <h2 className="text-4xl leading-8 font-semibold mb-12 text-slate-700">
//         Our epic carousel
//         </h2>
//         <div className="relative overflow-hidden">
//         <div className="flex justify-between absolute top left w-full h-full">
//             <button
//             onClick={movePrev}
//             className="hover:bg-blue-900/75 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
//             // disabled={isDisabled('prev')}
//             >
//             <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-12 w-20 -ml-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth={2}
//             >
//                 <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M15 19l-7-7 7-7"
//                 />
//             </svg>
//             <span className="sr-only">Prev</span>
//             </button>
//             <button
//             onClick={moveNext}
//             className="hover:bg-blue-900/75 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
//             // disabled={isDisabled('next')}
//             >
//             <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-12 w-20 -ml-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth={2}
//             >
//                 <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M9 5l7 7-7 7"
//                 />
//             </svg>
//             <span className="sr-only">Next</span>
//             </button>
//         </div>
//         <div
//             ref={Carousel}
//             className="carousel-container relative flex gap-1 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
//         >
//             {Object.values(pups).map((pup, index) => {
//             return (
//                 <div
//                 key={index}
//                 className="carousel-item text-center relative w-64 h-64 snap-start"
//                 >
//                 <a
//                     href='/'
//                     className="h-full w-full aspect-square block bg-origin-padding bg-left-top bg-cover bg-no-repeat z-0"
//                     style={{ backgroundImage: `url(${pup.pup_image || ''})` }}
//                 >
//                     <img
//                     src={pup.pup_image || ''}
//                     alt={pup.breed}
//                     className="w-full aspect-square hidden"
//                     />
//                 </a>
//                 <a
//                     href='/'
//                     className="h-full w-full aspect-square block absolute top-0 left-0 transition-opacity duration-300 opacity-0 hover:opacity-100 bg-blue-800/75 z-10"
//                 >
//                     <h3 className="text-white py-6 px-3 mx-auto text-xl">
//                     {pup.breed}
//                     </h3>
//                 </a>
//                 </div>
//             );
//             })}
//         </div>
//         </div>
//     </div>
//   )
// }

// export default Carousel

import React, { Component } from "react";
import Slider from "react-slick";
import { baseUrl } from "./config";

export default class Fade extends Component {
  render() {
    const settings = {
      dots: true,
      fade: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div>
        <h2>Fade</h2>
        <Slider {...settings}>
          <div>
            <img src={baseUrl + "/abstract01.jpg"} />
          </div>
          <div>
            <img src={baseUrl + "/abstract02.jpg"} />
          </div>
          <div>
            <img src={baseUrl + "/abstract03.jpg"} />
          </div>
          <div>
            <img src={baseUrl + "/abstract04.jpg"} />
          </div>
        </Slider>
      </div>
    );
  }
}