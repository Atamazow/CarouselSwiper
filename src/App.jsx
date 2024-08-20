import React from 'react';
import Carousel from "./components/Carousel/Carousel";
import AdaptivCarousel from "./adaptivCarousel/adaptivCarousel";



function App(props) {
    return (
        <div className="App-wrapper" >
             <AdaptivCarousel/>
         </div>
    );
}

export default App;