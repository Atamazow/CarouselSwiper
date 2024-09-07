import React, { useState } from "react";
import "./FancyCarousel.css";
import borderDuga from "../../assets/carouselImage/duga.svg";
import "./Border.css";

export const FancyCarouselSpinner = ({
  images,
  setFocusElement = () => {},
  carouselRadius = 300,
  focusElementStyling = {},
  autoRotateTime = 0,
}) => {
  const [carousel, setCarousel] = useState({
    carouselOrietation: 0,
    elementOrientation: 0,
    focusElement: 0, // Добавляем `focusElement` для отслеживания центрального элемента
  });
  const [isDisabledStap] = useState(false);
  let number = 200;
  let transitionTime = 1.5;
  let navigationButtonRadius = 32.5;
  const noOfImages = images.length;
  const theta = 360 / noOfImages;

  // Обновляем центральный элемент при вращении вправо
  const rotateRight = () => {
    setCarousel((prev) => ({
      ...prev,
      carouselOrietation: prev.carouselOrietation + theta,
      elementOrientation: prev.elementOrientation - theta,
      focusElement: (prev.focusElement + 1) % noOfImages, // Обновляем индекс центрального элемента
    }));
  };

  // Обновляем центральный элемент при вращении влево
  const rotateLeft = () => {
    setCarousel((prev) => ({
      ...prev,
      carouselOrietation: prev.carouselOrietation - theta,
      elementOrientation: prev.elementOrientation + theta,
      focusElement: (prev.focusElement - 1 + noOfImages) % noOfImages, // Обновляем индекс центрального элемента
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

  // Присваиваем классы: `center`, `right-1`, `left-1`
  const getClassNames = (index) => {
    const topIndex = carousel.focusElement; // Центральный элемент определяется по `focusElement`
    const relativeIndex = (index - topIndex + images.length) % images.length;

    if (index === topIndex) return "center"; // Центральный элемент
    if (relativeIndex === 1) return "right-1"; // Первый справа
    if (relativeIndex === images.length - 1) return "left-1"; // Первый слева

    return "hidden"; // Остальные элементы скрыты
  };

  return (
    <div>
      <div className="fancy-carousel-wrapper-element">
        <div
          className={`fancy-carousel-navigators ${
            autoRotateTime ? "invisible" : ""
          }`}
          style={{
            gap: `${carouselRadius * 2}px`,
            marginLeft: `-${navigationButtonRadius * 1.8}px`,
          }}
        ></div>
        <div className="fancy-carousel-border">
          <div
            className="fancy-carousel"
            style={{
              transform: `rotate(${carousel.carouselOrietation}deg)`, // Вращение всего контейнера карусели
              height: `${carouselRadius * 2}px`,
              width: `${carouselRadius * 2}px`,
            }}
          >
            {images.map(({ src }, index) => (
              <div
                className={`fancy-carousel-element ${getClassNames(index)}`} // Присваиваем класс "center"
                key={index}
                style={{
                  width: `${number * 2}px`,
                  height: `${number * 2}px`,
                  left: `${rotatedCoordinates[index][0]}px`,
                  bottom: `${rotatedCoordinates[index][1]}px`,
                  transition: `${transitionTime}`,
                  // Фиксируем блок, чтобы он не вращался
                  transform: `rotate(${-carousel.carouselOrietation}deg)`,
                }}
              >
                <img
                  className="fancy-carousel-image"
                  src={src}
                  style={{
                    width: index === carousel.focusElement ? `500px` : `300px`,
                    height: `${number * 2}px`,
                    transition: `${transitionTime}`,
                    // Убираем любое вращение для самих изображений
                    transform: "none",
                  }}
                />
              </div>
            ))}
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
