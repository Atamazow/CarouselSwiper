import React from 'react';
import Rombik from "./components/Rombik/Rombik";
import Carousel from "./components/Carousel/Carousel";
import Page4 from "./components/Page4/Page4";
import ContactAixLand from "./components/ContactAixLand/ContactAixLand";
import TitleAixLand from "./components/TitleAixLand/TitleAixLand";



function App(props) {
    return (
        <div className="App-wrapper" >
             <Rombik/>
             <Page4/>
             <Carousel/>
            <TitleAixLand/>
            <ContactAixLand/>
         </div>
    );
}

export default App;