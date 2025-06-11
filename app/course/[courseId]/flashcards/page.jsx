"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import FlashcardItem from "./_components/FlashcardItem";

const StyledSwiper = styled.div`
  .swiper {
    width: 100%;
    height: 50vh;
    position: relative;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #ededed;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  @media (prefers-color-scheme: dark) {
    .swiper-slide {
      background: #1e2a3b;
    }
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
  
  .swiper-button-prev,
  .swiper-button-next {
    color: #3B82F6;
    background: rgba(255, 255, 255, 0.8);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
  }
  
  .swiper-button-prev:after,
  .swiper-button-next:after {
    font-size: 18px;
    font-weight: bold;
  }
  
  .swiper-button-prev:hover,
  .swiper-button-next:hover {
    background: #ffffff;
    transform: scale(1.1);
  }
  
  @media (prefers-color-scheme: dark) {
    .swiper-button-prev,
    .swiper-button-next {
      background: rgba(30, 41, 59, 0.8);
      color: #60a5fa;
    }
    
    .swiper-button-prev:hover,
    .swiper-button-next:hover {
      background: rgba(30, 41, 59, 1);
    }
  }
`;

function Flashcards() {
  const { courseId } = useParams();
  const [flashCards, setFlashCards] = useState([]);
  const [flippedStates, setFlippedStates] = useState({});

  useEffect(() => {
    GetFlashCards();
  }, []);

  const GetFlashCards = async () => {
    const result = await axios.post("/api/study-type", {
      courseId: courseId,
      studyType: "Flashcard",
    });
    setFlashCards(result.data);
    console.log("Flashcard", result.data);
  };

  const handleClick = (index) => {
    setFlippedStates((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div className="min-h-screen p-3 sm:p-5 overflow-y-auto pb-20">
      <h2 className="font-bold text-2xl text-gray-800 dark:text-gray-100">Flashcards</h2>
      <p className="text-gray-700 dark:text-gray-300">Help you to remember your concepts</p>
      <div className="mt-14 sm:mt-28">
        <StyledSwiper>
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={false}
            pagination={{ clickable: true }}
            navigation={{
              prevEl: '.swiper-button-prev',
              nextEl: '.swiper-button-next',
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {flashCards.content?.map((flashCard, index) => (
              <SwiperSlide key={index}>
                <FlashcardItem
                  isFlipped={flippedStates[index] || false}
                  handleClick={() => handleClick(index)}
                  flashCard={flashCard}
                />
              </SwiperSlide>
            ))}
            {(!flashCards.content || flashCards.content?.length === 0) && (
              <SwiperSlide>
                <div className="p-7 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 flex shadow-lg items-center justify-center rounded-lg h-[250px] w-[250px] md:h-[400px] md:w-[350px] font-medium">
                  Loading flashcards...
                </div>
              </SwiperSlide>
            )}
          </Swiper>
          <div className="swiper-button-prev" style={{color: '#3B82F6'}}></div>
          <div className="swiper-button-next" style={{color: '#3B82F6'}}></div>
        </StyledSwiper>
      </div>
    </div>
  );
}

export default Flashcards;
