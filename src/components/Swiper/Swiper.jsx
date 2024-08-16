import { useState, useEffect, useRef } from "react";
import image from '../../assets/image/1-Photoroom.png';
import image2 from '../../assets/image/regentstreet_wip8.0001-Photoroom.png';
import image3 from '../../assets/image/isometric3-Photoroom.png';
import "./Swiper.css";  // Подключаем CSS файл

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
    const [velocity, setVelocity] = useState(0);
    const radius = 650; // радиус окружности
    const itemAngle = 360 / slides.length; // угол, охватывающий один элемент
    const isDragging = useRef(false);
    const lastMoveTime = useRef(0);

    useEffect(() => {
        const initialAngle = itemAngle * 1.25;
        setAngle(initialAngle);
    }, [itemAngle]);

    useEffect(() => {
        if (velocity !== 0) {
            const interval = setInterval(() => {
                setAngle(prevAngle => prevAngle + velocity);
                setVelocity(prevVelocity => {
                    const newVelocity = prevVelocity * 0.8; // Замедляем до 90% от предыдущего значения
                    if (Math.abs(newVelocity) < 0.002) { // Порог остановки очень низкий
                        clearInterval(interval);
                        return 0;
                    }
                    return newVelocity;
                });
            }, 16);
            return () => clearInterval(interval);
        }
    }, [velocity]);

    const handleMouseDown = (event) => {
        isDragging.current = true;
        lastMoveTime.current = event.timeStamp;
        event.preventDefault();
        const startX = event.clientX;

        const handleMouseMove = (moveEvent) => {
            if (isDragging.current) {
                const dx = moveEvent.clientX - startX;
                const dt = moveEvent.timeStamp - lastMoveTime.current;
                const speed = dx / dt;
                setAngle(prevAngle => prevAngle + dx * 0.001); // Очень маленький коэффициент для уменьшения скорости вращения
                setVelocity(speed * 5); // Очень маленький коэффициент для скорости
                lastMoveTime.current = moveEvent.timeStamp;
            }
        };

        const handleMouseUp = () => {
            isDragging.current = false;
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    const spinCarousel = (direction) => {
        setVelocity(direction * itemAngle / 50); // Очень медленное вращение при нажатии на кнопку
    };

    return (
        <div className="carousel-wrapper">
            <button onClick={() => spinCarousel(-1)}>Prev</button>
            <div className="carousel-viewport">
                <div
                    className="carousel-container"
                    onMouseDown={handleMouseDown}
                    style={{ width: `${radius * 2}px`, height: `${radius * 2}px`, position: 'relative' }}
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
                                    left: `${x + radius - 50}px`,
                                    top: `${y + radius - 50}px`,
                                    transformOrigin: 'center center',
                                }}
                            >
                                <img src={item.src} alt={item.alt} className='image--carousel'/>
                            </div>
                        );
                    })}
                </div>
            </div>
            <button onClick={() => spinCarousel(1)}>Next</button>
        </div>
    );
};

export default Carousel;
