import React, {useEffect, useState} from 'react';
import axios from "axios";
import './ContactAixLandInput.css'
const ContactAixLandInput = () => {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => {
                const countryData = response.data.map(country => ({
                    name: country.name.common,
                    flag: country.flags.png,
                    code: country.cca2,
                    phoneCode:
                        country.idd.root +
                        (country.idd.suffixes ? country.idd.suffixes[0] : ''),
                }));
                setCountries(countryData);
                setSelectedCountry(countryData[0]);
            })
            .catch(error => {
                console.error('Error fetching the countries:', error);
            });
    }, []);

    const handleCountrySelect = country => {
        setSelectedCountry(country);
        setIsOpen(false);
    };

    const handleInputChange = event => {
        const input = event.target.value;
        const formattedInput = input.replace(/[^\d\s()-]/g, '');
        setPhoneNumber(formattedInput);
    };
    return (
        <div className="country-selector">
            <div className="selected-country" onClick={() => setIsOpen(!isOpen)}>
                {selectedCountry && (
                    <>
                        <img
                            src={selectedCountry.flag}
                            alt={selectedCountry.name}
                            style={{width: '20px', marginRight: '8px'}}
                        />
                    </>
                )}

                <div className="arrow">{isOpen ? '▲' : '▼'}</div>
                <div className="content-selectedCountry">
                    {selectedCountry && selectedCountry.phoneCode}
                </div>
            </div>
            {isOpen && (
                <div className="dropdown">
                    {countries.map(country => (
                        <div
                            key={country.code}
                            className="dropdown-item"
                            onClick={() => handleCountrySelect(country)}
                        >
                            <img
                                src={country.flag}
                                alt={country.name}
                                style={{width: '20px', marginRight: '8px'}}
                            />
                            <span className="name"> {country.name}</span>
                            <span className="dial-code"> {country.phoneCode}</span>
                        </div>
                    ))}
                </div>
            )}
            <input
                type="tel"
                placeholder="(999) 999-99-99"
                className="phone-input"
                onChange={handleInputChange}
                value={phoneNumber}
            />
        </div>
    );
};

export default ContactAixLandInput;