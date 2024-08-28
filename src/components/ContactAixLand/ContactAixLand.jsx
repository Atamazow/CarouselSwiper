import React from "react";
import ContactAixLandInput from "./ContactAixLandInput/ContactAixLandInput";
import "./ContactAixLand.css";
function ContactAixLand(props) {
  return (
    <div>
      <div className="contact-form-section">
        <form className="contact-form">
          <div className="form-group">
            <input
              className="contactInput"
              type="text"
              id="name"
              name="name"
              required
              placeholder="name"
            />
          </div>
          <div className="form-group">
            <ContactAixLandInput />
          </div>
          <div className="form-group">
            <input
              className="contactInput"
              type="email"
              id="email"
              name="email"
              placeholder="E-mail"
            />
          </div>
          <div className="form-group">
            <textarea
              className="contactInput message"
              id="message"
              name="message"
              placeholder="message"
            ></textarea>
          </div>
          <div className="text--contact">
            I agree with the processing of my personal data and the public offer
            agreement
          </div>
        </form>
      </div>
      <div className="contact--btn">
        <div className="content--title--btn">Send message</div>
      </div>
    </div>
  );
}

export default ContactAixLand;
