import React from "react";
import pageImg from "../../../assets/image/Page3.svg";
import "./Page4.css";
const Page4 = () => {
  return (
    <>
      <div className="wrapper--fourth--page">
        <img className="imagePageThree" src={pageImg} alt="" />
      </div>
      <div className="page4Title">
        WEB3 driven projects on <span> Aixland</span>
      </div>
    </>
  );
};

export default Page4;
