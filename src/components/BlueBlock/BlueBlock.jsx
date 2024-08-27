import React from "react";
import logoWhite from "../../assets/image/logoWhite.svg";
import "./BlueBlock.css";
const BlueBlock = () => {
  return (
    <div className="wrapper--blue--block">
      <div className="btn--white--logo">
        <img className="logoWhite" src={logoWhite} alt="" />
      </div>
      <div className="white--block--text">
        <div className="wrapper--white--block">
          <div className="white--text">
            Introducing the world's first industrial metaverse
          </div>
        </div>
        <div className="white--subTitle">
          <div className="blue--about-title">ABOUT</div>
          <div className="blue--wrapper--text">
            <div className="blue--text">
              The metaverse as a digital interface is designed to combine the
              physical world of real estate andinfrastructure with the
              flexibility and unlimited possibilities of digital space
            </div>

            <div className="blue--text">
              The platform will remove the spatial and temporal barriers
              associated with real estate management and will allow for accurate
              monitoring and analysis of operational processes in real time
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlueBlock;
