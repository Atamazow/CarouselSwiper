import React from "react";
import Logotip from "../../assets/image/Logotip.svg";
import "./World.css";
const World = () => {
  return (
    <div className="world--logo--wrapper">
      <div className="world--logoAix">
        <img className="world--Aix" src={Logotip} alt="" />
      </div>
      <div className="wrapper--logo--world">
        <div className="world">
          <div className="world--btn">Watch demo</div>
        </div>
      </div>
    </div>
  );
};

export default World;
