import React, { useState, useEffect, useRef } from 'react';
import './PhoneInput.css';

const countries = [
    { code: 'IN', name: 'India', dialCode: '+91', flag: '🇮🇳' },
    { code: 'AE', name: 'United Arab Emirates', dialCode: '+971', flag: '🇦🇪' },
    { code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸' },
    { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧' },
    { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦' },
    { code: 'SA', name: 'Saudi Arabia', dialCode: '+966', flag: '🇸🇦' },
    { code: 'OM', name: 'Oman', dialCode: '+968', flag: '🇴🇲' },
    { code: 'BH', name: 'Bahrain', dialCode: '+973', flag: '🇧🇭' },
    { code: 'QA', name: 'Qatar', dialCode: '+974', flag: '🇶🇦' },
    { code: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺' },
    { code: 'SG', name: 'Singapore', dialCode: '+65', flag: '🇸🇬' },
    { code: 'DE', name: 'Germany', dialCode: '+49', flag: '🇩🇪' },
    { code: 'FR', name: 'France', dialCode: '+33', flag: '🇫🇷' },
    { code: 'NZ', name: 'New Zealand', dialCode: '+64', flag: '🇳🇿' },
    { code: 'ZA', name: 'South Africa', dialCode: '+27', flag: '🇿🇦' },
    { code: 'IE', name: 'Ireland', dialCode: '+353', flag: '🇮🇪' },
    { code: 'NL', name: 'Netherlands', dialCode: '+31', flag: '🇳🇱' },
    { code: 'CH', name: 'Switzerland', dialCode: '+41', flag: '🇨🇭' },
    { code: 'IT', name: 'Italy', dialCode: '+39', flag: '🇮🇹' },
    { code: 'ES', name: 'Spain', dialCode: '+34', flag: '🇪🇸' },
    { code: 'MY', name: 'Malaysia', dialCode: '+60', flag: '🇲🇾' },
    { code: 'HK', name: 'Hong Kong', dialCode: '+852', flag: '🇭🇰' },
    { code: 'JP', name: 'Japan', dialCode: '+81', flag: '🇯🇵' },
    { code: 'LK', name: 'Sri Lanka', dialCode: '+94', flag: '🇱🇰' },
    { code: 'NP', name: 'Nepal', dialCode: '+977', flag: '🇳🇵' },
    { code: 'BD', name: 'Bangladesh', dialCode: '+880', flag: '🇧🇩' },
    { code: 'PK', name: 'Pakistan', dialCode: '+92', flag: '🇵🇰' }
];

const PhoneInput = ({
    phoneName = 'phone',
    countryCodeName = 'country_code',
    phoneValue,
    countryCodeValue,
    onChange,
    placeholder = 'Phone Number *',
    required = false,
    className = ''
}) => {
    const [localPhone, setLocalPhone] = useState('');
    const [localCountry, setLocalCountry] = useState('+91');
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const isControlled = phoneValue !== undefined && countryCodeValue !== undefined;
    const activePhone = isControlled ? phoneValue : localPhone;
    const activeCountryCode = isControlled ? countryCodeValue : localCountry;

    // Handle clicks outside dropdown to close it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Find current active country object
    const selectedCountry = countries.find(c => {
        const dialBase = activeCountryCode.split('-')[0];
        if (activeCountryCode.includes('-')) {
            const countrySuffix = activeCountryCode.split('-')[1];
            return c.code === countrySuffix && c.dialCode === dialBase;
        }
        return c.dialCode === dialBase;
    }) || countries[0];

    const handlePhoneChange = (e) => {
        const val = e.target.value;
        if (!isControlled) setLocalPhone(val);
        if (onChange) {
            onChange({ target: { name: phoneName, value: val } });
        }
    };

    const handleCountryChange = (dialCode) => {
        if (!isControlled) setLocalCountry(dialCode);
        if (onChange) {
            onChange({ target: { name: countryCodeName, value: dialCode } });
        }
    };

    return (
        <div className={`custom-phone-input-container ${className}`} ref={dropdownRef}>
            <div className="flag-select-button" onClick={() => setIsOpen(!isOpen)}>
                <span className="flag-emoji">{selectedCountry.flag}</span>
                <span className="dial-code">{selectedCountry.dialCode}</span>
                <span className="arrow-down">▼</span>
            </div>

            {isOpen && (
                <ul 
                    className="country-dropdown-list"
                    data-lenis-prevent
                    onWheel={(e) => e.stopPropagation()}
                    onTouchMove={(e) => e.stopPropagation()}
                >
                    {countries.map((c) => (
                        <li
                            key={`${c.code}-${c.dialCode}`}
                            className={`country-dropdown-item ${selectedCountry.code === c.code ? 'active' : ''}`}
                            onClick={() => {
                                // For controlled selects, Canada uses "+1-CA" and US uses "+1-US" to keep option states unique
                                const valueToSet = (c.code === 'US' || c.code === 'CA') ? `${c.dialCode}-${c.code}` : c.dialCode;
                                handleCountryChange(valueToSet);
                                setIsOpen(false);
                            }}
                        >
                            <span className="dropdown-flag">{c.flag}</span>
                            <span className="dropdown-country-name">{c.name}</span>
                            <span className="dropdown-dial-code">{c.dialCode}</span>
                        </li>
                    ))}
                </ul>
            )}

            <input
                type="hidden"
                name={countryCodeName}
                value={activeCountryCode}
            />

            <input
                type="tel"
                name={phoneName}
                className="phone-input-field"
                placeholder={placeholder}
                value={activePhone}
                onChange={handlePhoneChange}
                required={required}
            />
        </div>
    );
};

export default PhoneInput;
