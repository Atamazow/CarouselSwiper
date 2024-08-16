import { useState, useEffect, useRef } from "react";
import image1 from '../../assets/image/1-Photoroom.png';
import image2 from '../../assets/image/Rectangle 12224.png';
import image3 from '../../assets/image/01-Photoroom.png';
import image4 from '../../assets/image/regentstreet_wip8.0001-Photoroom.png';
import image5 from '../../assets/image/png-transparent-high-rise-building-architecture-skyscraper-building-building-condominium-elevation.png';
import image6 from '../../assets/image/isometric3-Photoroom.png';
import "./Carousel.css";  // Подключаем CSS файл
import "./Border.css";
import {logDOM} from "@testing-library/react";

const slides = [
    { id: 1, src: image1, alt: 'Carousel' },
    { id: 2, src: image2, alt: 'Carousel' },
    { id: 3, src: image3, alt: 'Carousel' },
    { id: 4, src: image4, alt: 'Carousel' },
    { id: 5, src: image5, alt: 'Carousel' },
    { id: 6, src: image6, alt: 'Carousel' },
    { id: 7, src: image1, alt: 'Carousel' },
    { id: 8, src: image2, alt: 'Carousel' },
    { id: 9, src: image3, alt: 'Carousel' },
    { id: 10, src: image4, alt: 'Carousel' },
    { id: 11, src: image5, alt: 'Carousel' },
    { id: 12, src: image6, alt: 'Carousel' },
    { id: 13, src: image1, alt: 'Carousel' },
    { id: 14, src: image2, alt: 'Carousel' },
    { id: 15, src: image3, alt: 'Carousel' },
    // другие изображения...
];

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(() => Math.round(slides.length / 2));
    const [angle, setAngle] = useState(0);
    const [velocity, setVelocity] = useState(0);
    const [dragStartX, setDragStartX] = useState(null);
    const [isDisabledStap, setIsDisabledStap] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const radius = 840; // радиус окружности
    const itemAngle = 360 / slides.length; // угол, охватывающий один элемент
    const Dragging = useRef(false)
    const lastMoveTime = useRef(0);
    const dragStartXRef = useRef(0);
    const topAngle = 270

    useEffect(() => {
        const initialAngle = itemAngle * 1.25;
        setAngle(initialAngle);
    }, [itemAngle]);

    useEffect(() => {
        if (velocity !== 0) {
            const interval = setInterval(() => {
                setAngle(prevAngle => {
                    let newAngle = prevAngle + velocity;

                    // Определяем ближайший индекс к 270 градусам
                    const topIndex = getTopIndex();
                    const targetAngle = 270 - (topIndex * itemAngle); // Целевой угол

                    // Нормализуем угол
                    const normalizedAngle = newAngle % 360;

                    // Если угол близок к целевому, начинаем плавное торможение и выравнивание
                    if (Math.abs(normalizedAngle - targetAngle) < 10) {
                        const diff = targetAngle - normalizedAngle;
                        newAngle += diff * 0.1; // Плавно подгоняем угол к целевому
                        setVelocity(prevVelocity => prevVelocity * 0.95); // Плавное замедление
                    }

                    return newAngle;
                });

                setVelocity(prevVelocity => {
                    const newVelocity = prevVelocity * 0.8; // Замедляем вращение постепенно
                    if (Math.abs(newVelocity) < 0.001) {
                        clearInterval(interval);
                        return 0;
                    }
                    return newVelocity;
                });
            }, 16);
            return () => clearInterval(interval);
        }
    }, [velocity]);
    console.log(isDisabledStap)
    const handleMouseDown = (event) => {
        Dragging.current = true;
        lastMoveTime.current = event.timeStamp;
        event.preventDefault();
        const startX = event.clientX;

        const handleMouseMove = (moveEvent) => {
            if (Dragging.current) {
                const dx = moveEvent.clientX - startX;
                const dt = moveEvent.timeStamp - lastMoveTime.current;
                const speed = dx / dt;

                // Уменьшение коэффициента для медленного вращения
                setAngle(prevAngle => prevAngle + dx * 0.009); // Здесь коэффициент dx * 0.01 для медленного вращения
                setVelocity(speed * 0.5); // Также уменьшаем скорость, чтобы спиннер вращался медленно
                lastMoveTime.current = moveEvent.timeStamp;
            }
        };

        const handleMouseUp = () => {
            Dragging.current = false;
            dragStartXRef.current = event.clientX;
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };
    const animateRotation = (startAngle, endAngle, duration, onAnimationEnd) => {
         const startTime = performance.now();
         const animate = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const currentAngle = startAngle + (endAngle - startAngle) * progress;
            setAngle(currentAngle);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                onAnimationEnd()
                // Вызов функции по завершению анимации
            }
             setIsDisabledStap(false)

        };

        requestAnimationFrame(animate);

    };


    const spinCarousel = (direction) => {
        setIsDisabledStap(true)

        const targetIndex = (currentIndex + direction + slides.length) % slides.length; // Рассчитываем новый индекс
        setIsDragging(false);
        Dragging.current = false;
        const startAngle = angle;
        const endAngle = startAngle + direction * itemAngle;
        animateRotation(startAngle, endAngle, 250, () => {
            setCurrentIndex(targetIndex); // Обновляем индекс после завершения анимации
        });

    };

    const handlePrevClick = () => {
        spinCarousel(-1);
    };

    const handleNextClick = () => {
        spinCarousel(1);
    };

    const getTopIndex = () => {
        const normalizedAngle = angle % 360;
        const nearestIndex = slides.map((_, i) => ((i * itemAngle + normalizedAngle + 360) % 360))
            .map(a => Math.abs(a - 270))
            .reduce((minIndex, diff, i, diffs) => diff < diffs[minIndex] ? i : minIndex, 0);
        return nearestIndex;
    };

    const getClassNames = (index) => {
        const topIndex = getTopIndex();

        if (index === topIndex) return 'carousel-item center'; // Центральный элемент на вершине
        const relativeIndex = (index - currentIndex + slides.length) % slides.length;
        if (relativeIndex === 1) return 'carousel-item right-1'; // Первый справа
        if (relativeIndex === 2) return 'carousel-item right-2'; // Второй справа
        if (relativeIndex === slides.length - 1) return 'carousel-item left-1'; // Первый слева
        if (relativeIndex === slides.length - 2) return 'carousel-item left-2'; // Второй слева
        return 'carousel-item hidden'; // Остальные элементы скрыты
    };

    return (
        <>
            <div className="carousel-wrapper">
                 <div
                    className="carousel-viewport"
                    onMouseDown={handleMouseDown}
                    onMouseLeave={() => setDragStartX(null)}
                >
                    <div
                        className="carousel-container"
                        style={{ width: `${radius * 2}px`, height: `${radius * 2}px`, position: 'relative' }}
                    >
                        {slides.map((item, index) => {
                            const theta = (index * itemAngle) + angle;
                            const x = radius * Math.cos(theta * (Math.PI / 180));
                            const y = radius * Math.sin(theta * (Math.PI / 180));

                            const classNames = getClassNames(index);

                            return (
                                <div
                                    key={index}
                                    className={classNames}
                                    style={{
                                        position: 'absolute',
                                        width: '100px',
                                        height: '100px',
                                        left: `${x + radius - 50}px`,
                                        top: `${y + radius - 50}px`,
                                        transformOrigin: 'center center',
                                    }}
                                >
                                    <img src={item.src} alt={item.alt} className={`image ${index === currentIndex ? 'large' : 'small'}`} />
                                    <div className="item-alt-text">{item.alt}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
             </div>
            <div className="container">
                <div onMouseDown={handleMouseDown} className="border--carousel">
                    <div className="text-navigation-container">
                        <div className="border--carousel-text">
                            <div className="carousel-container">
                                {/* Внутренний контент */}
                            </div>
                        </div>
                        <div className="navigation">
                            <button disabled={isDisabledStap} onClick={handleNextClick} className="forward">←</button>
                            [01]
                            <button disabled={isDisabledStap} onClick={handlePrevClick} className="back">→</button>
                        </div>
                    </div>
                </div>
                <div className='carousel--subtitle'>EXAMPLE OF HOW <br /> <span>DIGITIZATION WORKS</span></div>
                <div className='carousel--text'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa
                </div>
                <div className='carousel--btn'>
                    <div className='carousel--btn-title'>
                        READ MORE
                    </div>
                </div>
            </div>
        </>
    );
};

export default Carousel;
