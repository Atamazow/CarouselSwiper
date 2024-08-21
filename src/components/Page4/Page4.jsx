import React from 'react';
import pageImg from '../../assets/carouselImage/page4.svg'
import './Page4.css'
const Page4 = () => {
    return (
        <div>
            <div className="wrapper-page">
                <img className='imagePage' src={pageImg} alt=""/>
            </div>
            <div className="page4Title">WEB3 driven projects on<span> Aixland</span>
            </div>
        </div>
    );
};

export default Page4;