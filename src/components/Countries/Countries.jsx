import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import styles from './Countries.module.css';

export default function Countries() {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(setCountries)
      .catch(setError);
  }, []);

  const handleCountrySelect = (event) => {
    const selectedCountry = countries.find(
      (country) => country.cca2 === event.target.value
    );
    if (selectedCountry) {
      navigate(`/countries/${selectedCountry.cca2}`, { state: { data: selectedCountry } });
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>World Kingdoms</h1>
      <select
        onChange={handleCountrySelect}
        defaultValue=""
        className={styles.selector}
      >
        <option value="" disabled>
          Select a country
        </option>
        {countries.map((country) => (
          <option key={country.cca2} value={country.cca2}>
            {country.name.common}
          </option>
        ))}
      </select>
      <div className={styles.infoMessage}>
        <Outlet context={{ error }} />
      </div>
    </div>
  );
}
