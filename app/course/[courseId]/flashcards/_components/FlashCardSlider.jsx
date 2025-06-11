import React, { useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import FlashCardItem from "./FlashcardItem";

const StyledSwiper = styled.div`
  .swiper {
    width: 100%;
    height: 50vh;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #ededed;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .swiper {
    margin-left: auto;
    margin-right: auto;
  }
`;

export default function App() {
  const [isFlipped, setIsFlipped] = useState(false);
  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };
  return (
    <StyledSwiper>
      <div className="relative">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={false}
          pagination={{ clickable: true }}
          navigation={{
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
          }}
          data-suppress-hydration-warning
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <FlashCardItem isFlipped={isFlipped} handleClick={handleClick} />
        </SwiperSlide>
        <SwiperSlide>
          <FlashCardItem 
            isFlipped={isFlipped} 
            handleClick={handleClick}
            flashCard={{front: "Example Question 2", back: "Example Answer 2"}} 
          />
        </SwiperSlide>
        <SwiperSlide>
          <FlashCardItem 
            isFlipped={isFlipped} 
            handleClick={handleClick}
            flashCard={{front: "Example Question 3", back: "Example Answer 3"}} 
          />
        </SwiperSlide>
        <SwiperSlide>
          <FlashCardItem 
            isFlipped={isFlipped} 
            handleClick={handleClick}
            flashCard={{front: "Example Question 4", back: "Example Answer 4"}} 
          />
        </SwiperSlide>
      </Swiper>
      
      {/* Custom navigation buttons */}
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
    </div>
    </StyledSwiper>
  );
}