import React from "react";
import "./PageFirst.css";
import pageImg from "../../../assets/image/PageFirst.svg";
const PageFirst = () => {
  return (
    <>
      <div className="wrapper-page">
        <img className="imagePage" src={pageImg} alt="" />
      </div>
      <div className="pageFirstTitle">
        Who we <span> are? </span>
      </div>
    </>
  );
};

export default PageFirst;
