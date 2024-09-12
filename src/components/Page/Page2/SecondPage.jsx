import React from "react";
import pageImg from "../../../assets/image/Page2.svg";
import "./SecondPage.css";

const SecondPage = () => {
  return (
    <div className="secondPage--main">
      <div className="wrapper--page--second">
        <img className="imagePageSecond" src={pageImg} alt="" />
      </div>
      <div className="pageSecondTitle">
        What problems are <br /> <span> we solving? </span>
      </div>
    </div>
  );
};

export default SecondPage;
