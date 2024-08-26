import React from "react";
import Rombik from "./components/Rombik/Rombik";
import Carousel from "./components/Carousel/Carousel";
import Page4 from "./components/Page/Page4/Page4";
import ContactAixLand from "./components/ContactAixLand/ContactAixLand";
import TitleAixLand from "./components/TitleAixLand/TitleAixLand";
import Header from "./components/Header/Header";
import World from "./components/World/World";
import PageFirst from "./components/Page/Page1/PageFirst";

function App(props) {
  return (
    <div className="App-wrapper">
      <Header />
      <World />
      <PageFirst />
      <Rombik />
      <Page4 />
      <Carousel />
      <TitleAixLand />
      <ContactAixLand />
    </div>
  );
}

export default App;
