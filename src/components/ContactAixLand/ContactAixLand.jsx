import React from 'react';
import ContactAixLandInput from "./ContactAixLandInput/ContactAixLandInput";
import './ContactAixLand.css'
function ContactAixLand(props) {
    return (
        <section className="contact-form-section">

            <form className="contact-form">
                <div className="form-group">
                    <input
                        className="contactInput"
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder='name'
                    />
                </div>
                <div className="form-group">
                    <ContactAixLandInput/>
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
                <div className="form-group ">
                    <input
                        className="contactInput message"
                        type="message"
                        id="message"
                        name="message"
                        placeholder="message"
                    />
                </div>
            </form>
        </section>
    );
}

export default ContactAixLand;