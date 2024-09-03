import React, { useEffect, useState, useRef } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Link from 'next/link';

function CarouselComponent() {
  const [fadeIn, setFadeIn] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFadeIn(true);
        } else {
          setFadeIn(false);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative">
      <Carousel 
        autoPlay
        infiniteLoop
        interval={8000} 
        showStatus={false} 
        showThumbs={false}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className="absolute left-0 z-20 p-2 bg-black/50 hover:bg-black/70 text-white top-1/2 transform -translate-y-1/2"
            >
              &#10094; {/* Left arrow icon */}
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className="absolute right-0 z-20 p-2 bg-black/50 hover:bg-black/70 text-white top-1/2 transform -translate-y-1/2"
            >
              &#10095; {/* Right arrow icon */}
            </button>
          )
        }
      >
        <div className='relative w-full h-[36rem] md:h-[48rem] lg:h-[60rem]'>
          <img 
            src="./header1.jpg" 
            alt="tax" 
            className='w-full h-full object-cover'
          />
          <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark overlay */}
        </div>
        <div className='relative w-full h-[36rem] md:h-[48rem] lg:h-[60rem]'>
          <img 
            src="./header2.jpg" 
            alt="tax" 
            className='w-full h-full object-cover'
          />
          <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark overlay */}
        </div>
        <div className='relative w-full h-[36rem] md:h-[48rem] lg:h-[60rem]'>
          <img 
            src="./header3.jpg" 
            alt="tax" 
            className='w-full h-full object-cover'
          />
          <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark overlay */}
        </div>
      </Carousel>
      <div className={`absolute inset-0 flex items-center justify-center text-[#ecefed] z-10 transition-opacity duration-1000 ease-in-out transform ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Expert Guidance for Your Business Growth</h1>
          <Link href="/BookAppointment">
            <button className="px-4 py-2 bg-[#64AE33] text-white text-lg font-semibold rounded hover:bg-green-800">Book My Appointment</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CarouselComponent;
