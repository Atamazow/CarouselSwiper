import React, { useEffect, useState } from "react";
import "./Carousel.css";
import borderDuga from "../../assets/carouselImage/duga.svg";
import CarouselHeaderDuga from "../../assets/carouselImage/CarouselHeaderDuga.svg";
import "./Border.css";
import image1 from "../../assets/spinnerImage/image1.png";
import image2 from "../../assets/spinnerImage/image2.png";
import image3 from "../../assets/spinnerImage/image3.png";
import image4 from "../../assets/spinnerImage/image4.png";
import image5 from "../../assets/spinnerImage/image5.png";
import image6 from "../../assets/spinnerImage/image6.png";
import image7 from "../../assets/spinnerImage/image7.png";
import image8 from "../../assets/spinnerImage/image8.png";
import image9 from "../../assets/spinnerImage/image9.png";
import image10 from "../../assets/spinnerImage/image10.png";
import image11 from "../../assets/spinnerImage/image11.png";
const images = [
  { id: 1, src: image1, alt: "Carousel" },
  { id: 2, src: image2, alt: "Carousel" },
  { id: 3, src: image3, alt: "Carousel" },
  { id: 4, src: image4, alt: "Carousel" },
  { id: 5, src: image5, alt: "Carousel" },
  { id: 6, src: image6, alt: "Carousel" },
  { id: 7, src: image7, alt: "Carousel" },
  { id: 8, src: image8, alt: "Carousel" },
  { id: 9, src: image9, alt: "Carousel" },
  { id: 10, src: image10, alt: "Carousel" },
  { id: 11, src: image11, alt: "Carousel" },
  { id: 12, src: image2, alt: "Carousel" },
  { id: 13, src: image4, alt: "Carousel" },
  { id: 14, src: image2, alt: "Carousel" },
  { id: 15, src: image3, alt: "Carousel" },
  // другие изображения...
];
export const Spinner = ({ autoRotateTime = 0 }) => {
  const [carousel, setCarousel] = useState({
    carouselOrietation: 0,
    elementOrientation: 0,
    focusElement: 0, // Добавляем `focusElement` для отслеживания центрального элемента
  });
  const [isDisabledStap] = useState(false);
  let carouselRadius = 1200;
  let number = 300;
  let navigationButtonRadius = 32.5;
  const noOfImages = images.length;
  const theta = 360 / noOfImages;

  const rotateRight = () => {
    setCarousel((prev) => ({
      ...prev,
      carouselOrietation: prev.carouselOrietation + theta,
      elementOrientation: prev.elementOrientation - theta,
      focusElement: (prev.focusElement + 1) % noOfImages,
    }));
  };

  const rotateLeft = () => {
    setCarousel((prev) => ({
      ...prev,
      carouselOrietation: prev.carouselOrietation - theta,
      elementOrientation: prev.elementOrientation + theta,
      focusElement: (prev.focusElement - 1 + noOfImages) % noOfImages,
    }));
  };

  const newCoordinates = images.map((item, index) => [
    carouselRadius -
      number +
      carouselRadius * Math.cos((2 * Math.PI * index) / noOfImages),
    carouselRadius -
      number +
      carouselRadius * Math.sin((2 * Math.PI * index) / noOfImages),
  ]);

  const totalDeviation = Math.PI / 2;
  const centerCoordinate = carouselRadius - number;

  const rotatedCoordinates = newCoordinates.map((item) => [
    centerCoordinate +
      (item[0] - centerCoordinate) * Math.cos(totalDeviation) -
      (item[1] - centerCoordinate) * Math.sin(totalDeviation),
    centerCoordinate +
      (item[0] - centerCoordinate) * Math.sin(totalDeviation) +
      (item[1] - centerCoordinate) * Math.cos(totalDeviation),
  ]);

  const getClassNames = (index) => {
    const topIndex = carousel.focusElement;
    const relativeIndex = (index - topIndex + images.length) % images.length;

    if (index === topIndex) return "center";
    if (relativeIndex === 1) return "right-1";
    if (relativeIndex === 2) return "right-2";
    if (relativeIndex === images.length - 1) return "left-1";
    if (relativeIndex === images.length - 2) return "left-2"; // Второй слева от центра

    return "hidden";
  };
  useEffect(() => {
    let startTouchX = 0;
    let endTouchX = 0;

    const spinnerElement = document.querySelector(
      ".fancy-carousel-wrapper-element",
    );

    const touchStartHandler = (event) => {
      startTouchX = event.changedTouches[0].pageX;
    };

    const touchEndHandler = (event) => {
      endTouchX = event.changedTouches[0].pageX;
      if (endTouchX > startTouchX) {
        rotateRight();
      }
      if (endTouchX < startTouchX) {
        rotateLeft();
      }
    };

    if (spinnerElement) {
      spinnerElement.addEventListener("touchstart", touchStartHandler);
      spinnerElement.addEventListener("touchend", touchEndHandler);
    }

    return () => {
      if (spinnerElement) {
        spinnerElement.removeEventListener("touchstart", touchStartHandler);
        spinnerElement.removeEventListener("touchend", touchEndHandler);
      }
    };
  }, []);

  return (
    <div>
      <div className="wrapper--header--duga">
        <img src={CarouselHeaderDuga} alt="" />
      </div>
      <div className="fancy-carousel-wrapper-element">
        <div
          className={`fancy-carousel-navigators ${
            autoRotateTime ? "invisible" : ""
          }`}
          style={{
            gap: `${carouselRadius * 2}px`,
          }}
        ></div>
        <div className="fancy-carousel-border">
          <div
            className="fancy-carousel"
            style={{
              transform: `rotate(${carousel.carouselOrietation}deg)`,
              height: `${carouselRadius * 2}px`,
              width: `${carouselRadius * 2}px`,
            }}
          >
            {images.map(({ src }, index) => {
              const className = getClassNames(index);
              let additionalRotation = 0;
              if (className === "left-1") {
                additionalRotation = 24; // Угол для левого
              } else if (className === "right-1") {
                additionalRotation = -24; // Угол для правого
              }

              return (
                <div
                  className={`fancy-carousel-element ${className}`}
                  key={index}
                  style={{
                    left: `${rotatedCoordinates[index][0]}px`,
                    bottom: `${rotatedCoordinates[index][1]}px`,

                    // Применяем дополнительный rotate для left-1 и right-1
                    transform: `rotate(${-carousel.carouselOrietation}deg) rotate(${additionalRotation}deg)`,
                  }}
                >
                  <img
                    className="fancy-carousel-image"
                    src={src}
                    style={{
                      transform: "none",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="container">
        <div>
          <img className="imageDuga" src={borderDuga} alt="" />
        </div>
        <div className="text-navigation-container">
          <div className="navigation">
            <button disabled={isDisabledStap} onClick={rotateLeft}>
              ←
            </button>
            Houses
            <button disabled={isDisabledStap} onClick={rotateRight}>
              →
            </button>
          </div>
        </div>
        <div className="wrapper--carousel--textBtn">
          <div className="carousel--subtitle">
            Multi-story houses <span>houses</span>
          </div>
          <div className="carousel--text">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa
          </div>
          <div className="carousel--btn">
            <div className="carousel--btn-title">READ MORE</div>
          </div>
        </div>
      </div>
    </div>
  );
};
