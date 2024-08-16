import { useState } from "react";
import image from '../../assets/image/1-Photoroom.png'
import image2 from '../../assets/image/regentstreet_wip8.0001-Photoroom.png'
import image3 from '../../assets/image/isometric3-Photoroom.png'
import "./Carousel.css"
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
];

const Carousel = () => {
    const [angle, setAngle] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const radius = 540; // радиус окружности
    const itemAngle = 360 / slides.length; // угол, охватывающий один элемент

    const handleMouseDown = (event) => {
        event.preventDefault();
        const startX = event.clientX;

        const handleMouseMove = (moveEvent) => {
            const dx = moveEvent.clientX - startX;
            setIsAnimating(false); // отключаем анимацию во время перетаскивания
            setAngle(prevAngle => prevAngle + dx * 0.01);
        };

        const handleMouseUp = () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    const spinCarousel = (direction) => {
        setIsAnimating(true); // включаем анимацию при клике на кнопку
        setAngle(prevAngle => prevAngle + direction * itemAngle);
    };

    return (
        <div className="carousel-wrapper">
            <div className="carousel-viewport">
                <div
                    className="carousel-container"
                    onMouseDown={handleMouseDown}
                    style={{width: `${radius * 2}px`, height: `${radius * 2}px`, position: 'relative'}}
                >
                    {slides.map((item, index) => {
                        const theta = (index * itemAngle) + angle;
                        const x = radius * Math.cos(theta * (Math.PI / 180));
                        const y = radius * Math.sin(theta * (Math.PI / 180));

                        return (
                            <div
                                key={index}
                                className="carousel-item"
                                style={{
                                    position: 'absolute',
                                    width: '100px',
                                    height: '100px',
                                    left: `${x + radius - 50}px`, // Центрирование по оси X
                                    top: `${y + radius - 50}px`, // Центрирование по оси Y
                                    transformOrigin: 'center center',
                                    transition: isAnimating ? 'transform 0.5s ease' : 'none',
                                }}
                            >
                                <img src={item.src} alt={item.alt} className='image--carousel' />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Carousel;