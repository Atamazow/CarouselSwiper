import React from 'react';
import subCart from '../../assets/carouselImage/Subtract.svg';
import headerRombDuga from '../../assets/carouselImage/headerDugaRomb.svg'
import './Rombik.css';

const cardRombik = [
    {id:1,title: 'Real Estate Mismanagement', text: 'Aixland\'s Solution: Aixland integrates physical assets with the digital twins, enabling real-time management and seamless coordination, thereby improving operational efficiency.\n'},
    {id:2,title: 'Real Estate Mismanagement', text: 'Aixland\'s Solution: Aixland integrates physical assets with the digital twins, enabling real-time management and seamless coordination, thereby improving operational efficiency.\n'},
    {id:3,title: 'Real Estate Mismanagement', completed: true, text: 'Aixland\'s Solution: Aixland integrates physical assets with the digital twins, enabling real-time management and seamless coordination, thereby improving operational efficiency.\n'},
    {id:4,title: 'Real Estate Mismanagement', text: 'Aixland\'s Solution: Aixland integrates physical assets with the digital twins, enabling real-time management and seamless coordination, thereby improving operational efficiency.\n'},
    {id:5,title: 'Real Estate Mismanagement', text: 'Aixland\'s Solution: Aixland integrates physical assets with the digital twins, enabling real-time management and seamless coordination, thereby improving operational efficiency.\n'},
];

const Rombik = () => {
    return (

            <div className="wrapper--romb">
                <img className='headerDugaRomb' src={headerRombDuga} alt=""/>
                <div className="hexStepCard--wrapper">
                    {cardRombik.map((card, index) => (
                        <div className='card-block' key={index}>
                            <div>
                                <img className='subCartImage' src={subCart} alt=""/>
                            </div>
                            <div className='cardRomb--textTitle'>
                                <div className="title--cardRombik">
                                    {card.title}
                                </div>
                                <div className="text--cardRombik">
                                    {card.text}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
     );
};

export default Rombik;
