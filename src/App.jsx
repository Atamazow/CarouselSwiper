import React from 'react';
import Rombik from "./components/Rombik/Rombik";
import Carousel from "./components/Carousel/Carousel";
import Page4 from "./components/Page4/Page4";



function App(props) {
    return (
        <div className="App-wrapper" >
             <Rombik/>
            <Page4/>
             <Carousel/>
         </div>
    );
}

export default App;