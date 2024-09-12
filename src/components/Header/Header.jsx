import React from "react";
import LogoHeader from "../../assets/image/Logo.svg";
import MenuIcon from "@mui/icons-material/Menu";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import "./Header.css";
const navLink = ["Home", "Platform", "About Us", "Contacts"];
const Header = () => {
  return (
    <header className="site-header">
      <div className="header--container">
        <div className="menuIcon">
          <MenuIcon />
        </div>
        <div className="logo">
          <a href="/" className="logo-link">
            <img src={LogoHeader} alt="Company Logo" className="logo-img" />
          </a>
        </div>
        <nav className="main-nav">
          <ul className="nav-list">
            <li className="nav-item">
              {navLink.map((item) => (
                <a href="#" className="nav-link">
                  {item}
                </a>
              ))}
            </li>
          </ul>
        </nav>
        <div className="user-actions">
          <a href="#" className="sign-in-btn">
            Sign in
          </a>
        </div>
        <div className="Chatbth">
          <ChatBubbleOutlineIcon />
        </div>
      </div>
      <div className="border--header">
        <div className="header-shape"></div>
        <div className="header-shapeTwo"></div>
      </div>
    </header>
  );
};

export default Header;
