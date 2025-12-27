import React, { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [form, setForm] = useState({
    longitude: '',
    latitude: '',
    housing_median_age: '',
    total_rooms: '',
    total_bedrooms: '',
    population: '',
    households: '',
    median_income: '',
    ocean_proximity: '',
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      longitude: parseFloat(form.longitude),
      latitude: parseFloat(form.latitude),
      housing_median_age: parseFloat(form.housing_median_age),
      total_rooms: parseFloat(form.total_rooms),
      total_bedrooms: parseFloat(form.total_bedrooms),
      population: parseFloat(form.population),
      households: parseFloat(form.households),
      median_income: parseFloat(form.median_income),
      ocean_proximity: form.ocean_proximity,
    };

    try {
      const res = await axios.post('http://localhost:8000/predict', data, {
        headers: { 'Content-Type': 'application/json' },
      });
      setPrediction(res.data.predicted_price);
    } catch (err) {
      console.error("Prediction failed:", err.response?.data || err.message);
    }
  };

  const styles = {
    container: {
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px 20px',
    },
    card: {
      backgroundColor: '#ffffff',
      padding: '40px',
      borderRadius: '24px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '650px',
    },
    header: {
      textAlign: 'center',
      marginBottom: '32px',
      color: '#1a202c',
      fontSize: '28px',
      fontWeight: '700',
      letterSpacing: '-0.5px',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '20px',
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
    },
    label: {
      fontSize: '12px',
      fontWeight: '600',
      color: '#4a5568',
      textTransform: 'uppercase',
      marginLeft: '4px',
    },
    input: {
      padding: '14px 16px',
      borderRadius: '12px',
      border: '2px solid #edf2f7',
      fontSize: '16px',
      color: '#2d3748', // Darker text for visibility
      backgroundColor: '#f8fafc',
      outline: 'none',
      transition: 'all 0.2s ease',
    },
    // Adding active/focus state logic via JS object is limited, 
    // but we can set a base style that looks "filled"
    button: {
      gridColumn: '1 / -1',
      marginTop: '24px',
      padding: '16px',
      backgroundColor: '#1a202c',
      color: '#ffffff',
      border: 'none',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'transform 0.1s ease, background-color 0.2s ease',
    },
    resultBox: {
      marginTop: '32px',
      padding: '24px',
      borderRadius: '16px',
      background: '#f0fff4',
      border: '1px solid #c6f6d5',
      textAlign: 'center',
      animation: 'fadeIn 0.5s ease-out',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.header}>🏠 Real Estate Predictor</h1>
        
        <form onSubmit={handleSubmit} style={styles.grid}>
          {Object.keys(form).map((key) => (
            <div key={key} style={styles.inputGroup}>
              <label style={styles.label}>{key.replace(/_/g, ' ')}</label>
              
              {key === "ocean_proximity" ? (
                <select 
                  name={key} 
                  value={form[key]} 
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="">Select Proximity</option>
                  <option value="<1H OCEAN">&lt;1H OCEAN</option>
                  <option value="INLAND">INLAND</option>
                  <option value="ISLAND">ISLAND</option>
                  <option value="NEAR BAY">NEAR BAY</option>
                  <option value="NEAR OCEAN">NEAR OCEAN</option>
                </select>
              ) : (
                <input
                  name={key}
                  type="text" // Changed to number for better mobile UX
                  step="any"
                  placeholder="0.00"
                  value={form[key]}
                  onChange={handleChange}
                  style={styles.input}
                  // Visual feedback when focused
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3182ce';
                    e.target.style.backgroundColor = '#fff';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#edf2f7';
                    e.target.style.backgroundColor = '#f8fafc';
                  }}
                />
              )}
            </div>
          ))}

          <button 
            type="submit" 
            style={styles.button}
            onMouseOver={(e) => e.target.style.backgroundColor = '#2d3748'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#1a202c'}
          >
            Estimate Property Value
          </button>
        </form>

        {prediction !== null && (
          <div style={styles.resultBox}>
            <span style={{ fontSize: '14px', color: '#38a169', fontWeight: '600', textTransform: 'uppercase' }}>
              Estimated Market Value
            </span>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#22543d', marginTop: '8px' }}>
              ₹ {Number(prediction).toLocaleString('en-IN')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}