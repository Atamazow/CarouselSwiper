import React from "react";
import pageImg from "../../../assets/image/Page2.svg";
import "./SecondPage.css";

const SecondPage = () => {
  return (
    <>
      <div className="wrapper--page--second">
        <img className="imagePage" src={pageImg} alt="" />
      </div>
      <div className="pageSecondTitle">
        What problems are <span> we solving? </span>
      </div>
    </>
  );
};

export default SecondPage;
