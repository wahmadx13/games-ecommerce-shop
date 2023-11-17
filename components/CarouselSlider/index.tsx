"use client";

import { FC, useState, useEffect } from "react";
import Image from "next/image";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { CarouselSliderProps } from "@/types/carouselSlider";
import carouselClassNames from "./carouselClassNames";

const CarouselSlider: FC<CarouselSliderProps> = (props) => {
  const { images, interval = 3000 } = props;
  const { container, previousButton, nextButton } = carouselClassNames;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => {
      if (prevIndex === images.length - 1) {
        return 0;
      } else {
        return prevIndex + 1;
      }
    });
  };

  const goToPrevImage = () => {
    setCurrentImageIndex((prevIndex) => {
      if (prevIndex === 0) {
        return images.length - 1;
      } else {
        return prevIndex - 1;
      }
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      goToNextImage();
    }, interval);
    return () => clearInterval(timer);
  }, [interval, currentImageIndex]);

  return (
    <div className={container}>
      {images.map((image, index) => (
        <Image
          key={image._key}
          src={image.url}
          width={700}
          height={700}
          alt={`Slide ${index + 1}`}
          //   className={`w-full h-full object-cover ${
          //     index !== currentImageIndex && "hidden"
          //   }`}
        />
      ))}

      <button className={previousButton} onClick={goToPrevImage}>
        <AiOutlineArrowLeft className="text-4xl" />
      </button>
      <button className={nextButton} onClick={goToNextImage}>
        <AiOutlineArrowRight className="text-4xl" />
      </button>
    </div>
  );
};

export default CarouselSlider;
