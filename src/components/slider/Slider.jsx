import React, { useState, useEffect, useRef } from 'react';
import './Slider.css';  // Подключаем CSS файл

// Подключаем ваши изображения
import image1 from '../../assets/image/1-Photoroom.png';
import image2 from '../../assets/image/regentstreet_wip8.0001-Photoroom.png';
import image3 from '../../assets/image/isometric3-Photoroom.png';
import image from "../../assets/image/1-Photoroom.png";
// Добавьте остальные изображения

const slides = [
    { id: 1, src: image, alt: 'Carousel' },
    { id: 2, src: image2, alt: 'Carousel' },
    { id: 3, src: image, alt: 'Carousel' },
    { id: 4, src: image, alt: 'Carousel' },
    { id: 5, src: image, alt: 'Carousel' },
    { id: 6, src: image, alt: 'Carousel' },
    { id: 7, src: image, alt: 'Carousel' },
    { id: 8, src: image, alt: 'Carousel' },
    { id: 9, src: image, alt: 'Carousel' },
    { id: 10, src: image, alt: 'Carousel' },
    { id: 11, src: image, alt: 'Carousel' },
    { id: 12, src: image, alt: 'Carousel' },
    { id: 13, src: image, alt: 'Carousel' },
    { id: 14, src: image, alt: 'Carousel' },
    { id: 15, src: image, alt: 'Carousel' },
];

const Carousel = () => {
    const [angle, setAngle] = useState(0);
    const radius = 500; // Радиус окружности
    const itemAngle = 360 / slides.length; // Угол между элементами
    const [isDragging, setIsDragging] = useState(false);
    const startX = useRef(0);
    const lastMoveTime = useRef(0);
    const velocity = useRef(0); // Скорость вращения
    const animationFrameId = useRef(null);

    useEffect(() => {
        const handleMouseUp = () => {
            setIsDragging(false);
            if (Math.abs(velocity.current) > 0.2) { // Начинаем инерцию только при высокой скорости
                animateSpin();
            } else {
                velocity.current = 0; // Если скорость маленькая, останавливаем вращение плавно
            }
        };
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mouseup', handleMouseUp);
            cancelAnimationFrame(animationFrameId.current);
        };
    }, []);

    const handleMouseDown = (event) => {
        setIsDragging(true);
        startX.current = event.clientX;
        lastMoveTime.current = event.timeStamp;
        velocity.current = 0; // Сбрасываем скорость при начале перетаскивания
        cancelAnimationFrame(animationFrameId.current); // Останавливаем инерцию
    };

    const handleMouseMove = (event) => {
        if (isDragging) {
            const dx = event.clientX - startX.current;
            const dt = event.timeStamp - lastMoveTime.current;

            // Рассчитываем скорость движения мыши
            if (dt > 0) {
                velocity.current = dx / dt;
            }

            const newAngle = angle + dx / 4; // Управляем скоростью вращения (сохранение текущей скорости)
            setAngle(newAngle);

            lastMoveTime.current = event.timeStamp;
            startX.current = event.clientX; // Обновляем стартовую позицию для следующего движения
        }
    };

    const animateSpin = () => {
        setAngle((prev) => {
            const newAngle = prev + velocity.current;
            velocity.current *= 0.1; // Плавное замедление скорости
            if (Math.abs(velocity.current) < 0.25) { // Останавливаем вращение, если скорость очень низкая
                velocity.current = 0;
                cancelAnimationFrame(animationFrameId.current);
            } else {
                animationFrameId.current = requestAnimationFrame(animateSpin);
            }
            return newAngle;
        });
    };
    const handlePrevClick = () => {
        setAngle((prev) => prev - itemAngle); // Вращение на один элемент назад
    };

    const handleNextClick = () => {
        setAngle((prev) => prev + itemAngle); // Вращение на один элемент вперед
    };
    return (
        <div className="carousel-container">
            <button onClick={handlePrevClick}>Назад</button>
            <div
                className="fancy-carousel-wrapper-element"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
            >
                <div className="fancy-carousel-border" style={{height: `${radius * 2}px`, width: `${radius * 2}px`}}>
                    <div
                        className="fancy-carousel"
                        style={{height: `${radius * 2}px`, width: `${radius * 2}px`, transform: `rotate(${angle}deg)`}}
                    >
                        {slides.map((item, index) => {
                            const theta = index * itemAngle;
                            const x = radius + radius * Math.cos(theta * (Math.PI / 180)) - 50; // 50 - половина ширины изображения
                            const y = radius + radius * Math.sin(theta * (Math.PI / 180)) - 50; // 50 - половина высоты изображения

                            return (
                                <div
                                    key={item.id}
                                    className="fancy-carousel-element"
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        left: `${x}px`,
                                        top: `${y}px`,
                                        transform: `rotate(${-angle}deg)` // Фиксация ориентации изображений
                                    }}
                                >
                                    <img src={item.src} alt={item.alt} className="fancy-carousel-image"/>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <button onClick={handleNextClick}>Вперед</button>
        </div>
    );
};

export default Carousel;
