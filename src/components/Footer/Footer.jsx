import React from "react";
import Circle from "../../assets/image/circleFooter.svg";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="footer--wrapper">
      <div className="footer">
        <div className="footer--content">
          <div className="footer--wrapper-content">
            <div>
              <img src={Circle} alt="" />
            </div>
            <nav className="footer--content--nav">
              <ul className="footer--nav">
                <li>About us</li>
                <li>Benefits</li>
                <li>Features</li>
                <li>Projects</li>
                <li>Partners</li>
              </ul>
            </nav>
            <div>
              <img src={Circle} alt="" />
            </div>
          </div>
          <div className="footer--contacts">
            <div className="footer--email">aixland@gmail.com</div>
            <div className="footer--phone">+30 398 12 12 43 28</div>
          </div>
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
