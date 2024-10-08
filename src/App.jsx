import React, { lazy, Suspense, useState } from "react";
import "react-fancy-circular-carousel/FancyCarousel.css";

import LazyLoadComponent from "./components/LazyPlaceholder/LazyLoadComponent";
import Footer from "./components/Footer/Footer";

import { Carousel } from "./components/Carousel/Carousel";
const BlueBlock = lazy(() => import("./components/BlueBlock/BlueBlock"));

const Rombik = lazy(() => import("./components/Rombik/Rombik"));
const ContactAixLand = lazy(
  () => import("./components/ContactAixLand/ContactAixLand"),
);
const TitleAixLand = lazy(
  () => import("./components/TitleAixLand/TitleAixLand"),
);
const Header = lazy(() => import("./components/Header/Header"));
const World = lazy(() => import("./components/World/World"));
const PageFirst = lazy(() => import("./components/Page/Page1/PageFirst"));
const Page4 = lazy(() => import("./components/Page/Page4/Page4"));
const Video = lazy(() => import("./components/Video/Video"));
const SecondPage = lazy(() => import("./components/Page/Page2/SecondPage"));

function App(props) {
  return (
    <>
      <Header />

      <div className="App-wrapper">
        <div className="main-App">
          <LazyLoadComponent component={World} />
          <LazyLoadComponent component={PageFirst} />
          <LazyLoadComponent component={Video} />
          <LazyLoadComponent component={BlueBlock} />
          <LazyLoadComponent component={SecondPage} />
          <LazyLoadComponent component={Rombik} />
          <LazyLoadComponent component={Page4} />
          <Carousel carouselRadius={1200} />
          <LazyLoadComponent component={TitleAixLand} />
          <LazyLoadComponent component={ContactAixLand} />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
