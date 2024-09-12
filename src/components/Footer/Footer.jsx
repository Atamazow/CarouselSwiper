import React from "react";
import Circle from "../../assets/image/circleFooter.svg";
import FooterAixLogo from "../../assets/image/footerAixLogo.png";
import "./Footer.css";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = ["About us", "Benefits", "Features", "Projects", "Partners"];
  return (
    <div className="footer--wrapper">
      <div className="footer">
        <div className="footer--content">
          <div className="footer--wrapper-content">
            <div className="footer--circle">
              <img src={Circle} alt="" />
            </div>
            <nav className="footer--content--nav">
              <ul className="footer--nav">
                {navigate.map((item, i) => (
                  <li className="footer--nav--link" key={i}>
                    {item}
                  </li>
                ))}
              </ul>
            </nav>
            <div className="footer--circle">
              <img src={Circle} alt="" />
            </div>
          </div>
          <div className="footer--contacts">
            <div className="footer--email">aixland@gmail.com</div>
            <div className="footer--phone">+30 398 12 12 43 28</div>
          </div>
        </div>
        <div className="wrapper--footerAxi--logo">
          <img src={FooterAixLogo} alt="" />
        </div>

        <div className="footer--bottom--content">
          <div className="footer--bottom--oneTitle">All rights reserved</div>
          <a className="footer--bottom--link" href="#">
            Privacy police
          </a>
          <div className="footer--bottom--three">2024 AIXLAND</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
