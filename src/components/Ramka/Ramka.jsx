import React, { useState, useRef, useEffect } from 'react';
import './'; // Для стилей

const Spinner = () => {
    const [angle, setAngle] = useState(0);
    const spinnerRef = useRef(null);
    const isDragging = useRef(false);
    const startAngle = useRef(0);

    const handleMouseDown = (e) => {
        isDragging.current = true;
        const rect = spinnerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const startX = e.clientX - centerX;
        const startY = e.clientY - centerY;
        startAngle.current = Math.atan2(startY, startX) * (180 / Math.PI);
    };

    const handleMouseMove = (e) => {
        if (!isDragging.current) return;
        const rect = spinnerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const currentX = e.clientX - centerX;
        const currentY = e.clientY - centerY;
        const currentAngle = Math.atan2(currentY, currentX) * (180 / Math.PI);
        const angleDiff = currentAngle - startAngle.current;
        setAngle((prevAngle) => prevAngle + angleDiff);
        startAngle.current = currentAngle;
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    useEffect(() => {
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div
            ref={spinnerRef}
            className="spinner"
            style={{ transform: `rotate(${angle}deg)` }}
            onMouseDown={handleMouseDown}
        >
            {[...Array(15)].map((_, index) => (
                <div key={index} className="spinner-item">
                    Item {index + 1}
                </div>
            ))}
        </div>
    );
};

export default Spinner;
