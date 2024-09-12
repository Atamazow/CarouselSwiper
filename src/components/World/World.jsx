import React from "react";
import Logotip from "../../assets/image/Logotip.svg";
import "./World.css";
import videoImg from "../../assets/video/sotaready.webm";
import videoIos from "../../assets/video/sotaready-1.mov";
const World = () => {
  const isIOS = () => {
    return (
      /iPhone|iPad|iPod/i.test(navigator.platform) ||
      (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    );
  };
  return (
    <div className="world--logo--wrapper">
      <div className="world--logoAix">
        <img className="world--Aix" src={Logotip} alt="" />
      </div>
      <div className="wrapper--world">
        <video className="world" playsInline muted autoPlay loop>
          {isIOS() ? (
            <source src={videoIos} type="video/quicktime" /> // Для iOS устройств
          ) : (
            <source src={videoImg} type="video/webm" /> // Для остальных устройств
          )}
          Ваш браузер не поддерживает видео.
        </video>
        <div className="world--btn">
          <div>Watch demo</div>
        </div>
      </div>
    </div>
  );
};

export default World;
<div className="video-container"></div>;
