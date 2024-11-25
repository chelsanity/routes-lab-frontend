import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Details.module.css';

export default function Details() {
  const { state } = useLocation();
  const country = state?.data;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (country) {
      setLoading(true);
      fetch(`https://restcountries.com/v3.1/alpha/${country.cca2}`)
        .then((response) => response.json())
        .then(() => setLoading(false))
        .catch((error) => {
          setLoading(false);
          setError(error);
        });
    } else {
      setLoading(false);
      setError(null);
    }
  }, [country]);

  return (
    <div className={styles.detailsWrapper}>
      {loading ? (
        <div className={styles.loader}>Loading country details...</div>
      ) : error ? (
        <div className={styles.alert}>Error fetching data: {error.message}</div>
      ) : !country ? (
        <div className={styles.infoPlaceholder}>
          Please select a country from the dropdown above to view details.
        </div>
      ) : (
        <>
          <h2 className={styles.heading}>
            Kingdom of {country.name.common}
          </h2>
          <img
            src={country.flags.png}
            alt={`Flag of ${country.name.common}`}
            className={styles.image}
          />
          <p className={styles.text}>
            <strong>Capital:</strong> {country?.capital?.[0] || 'N/A'}
          </p>
          <p className={styles.text}>
            <strong>Located in:</strong> {country?.region || 'Unknown'}
          </p>
        </>
      )}
    </div>
  );
}
