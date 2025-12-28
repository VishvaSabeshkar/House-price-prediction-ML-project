import React, { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';

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
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  return (
    <>
      <Head>
      <title>Property Price Estimator</title>
      <meta name="description" content="Predict property values with AI precision" />
      <link rel="icon" href="/house.ico" />
      </Head>
    
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>

      {/* Hero Section */}
      <section 
        style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)',
          width: '100%',
          fontSize: '14px',
          paddingBottom: '176px'
        }}
      >
        {/* Navigation */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px',
          paddingLeft: menuOpen ? '16px' : '128px',
          paddingRight: menuOpen ? '16px' : '128px',
          paddingTop: '24px',
          paddingBottom: '24px',
          width: '100%'
        }}>
       

          {/* Desktop Menu */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
            fontWeight: '500'
          }} className="max-md:hidden">
            <a href="#" style={{ color: '#050040' }} onMouseEnter={(e) => e.target.style.color = '#4b5563'} onMouseLeave={(e) => e.target.style.color = '#050040'}>
              Home
            </a>
            <div 
              style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', color: '#1f2937' }}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <span>Products</span>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2" stroke="#1f2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {dropdownOpen && (
                <div style={{
                  position: 'absolute',
                  backgroundColor: 'white',
                  fontWeight: '400',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  width: 'max-content',
                  borderRadius: '8px',
                  padding: '16px',
                  top: '40px',
                  left: '0',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}>
                  <a href="#" style={{ color: '#050040', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.target.style.transform = 'translateX(4px)'; e.target.style.color = '#64748b'; }} onMouseLeave={(e) => { e.target.style.transform = 'translateX(0)'; e.target.style.color = '#050040'; }}>
                    Templates
                  </a>
                  <a href="#" style={{ color: '#050040', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.target.style.transform = 'translateX(4px)'; e.target.style.color = '#64748b'; }} onMouseLeave={(e) => { e.target.style.transform = 'translateX(0)'; e.target.style.color = '#050040'; }}>
                    UI Components
                  </a>
                  <a href="#" style={{ color: '#050040', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.target.style.transform = 'translateX(4px)'; e.target.style.color = '#64748b'; }} onMouseLeave={(e) => { e.target.style.transform = 'translateX(0)'; e.target.style.color = '#050040'; }}>
                    Mobile Apps
                  </a>
                  <a href="#" style={{ color: '#050040', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.target.style.transform = 'translateX(4px)'; e.target.style.color = '#64748b'; }} onMouseLeave={(e) => { e.target.style.transform = 'translateX(0)'; e.target.style.color = '#050040'; }}>
                    Web Apps
                  </a>
                </div>
              )}
            </div>
            <a href="#" style={{ color: '#050040' }} onMouseEnter={(e) => e.target.style.color = '#4b5563'} onMouseLeave={(e) => e.target.style.color = '#050040'}>
              Stories
            </a>
            <a href="#" style={{ color: '#050040' }} onMouseEnter={(e) => e.target.style.color = '#4b5563'} onMouseLeave={(e) => e.target.style.color = '#050040'}>
              Pricing
            </a>
          </div>

          <button className="max-md:hidden" style={{
            backgroundColor: '#1f2937',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '9999px',
            fontWeight: '500',
            transition: 'background-color 0.2s',
            border: 'none',
            cursor: 'pointer'
          }} onMouseEnter={(e) => e.target.style.backgroundColor = '#000000'} onMouseLeave={(e) => e.target.style.backgroundColor = '#1f2937'}>
            Contact Us
          </button>

          <button className="md:hidden" onClick={() => setMenuOpen(true)} style={{
            backgroundColor: '#1f2937',
            color: 'white',
            padding: '8px',
            borderRadius: '6px',
            aspectRatio: '1',
            fontWeight: '500',
            transition: 'background-color 0.2s',
            border: 'none',
            cursor: 'pointer'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12h16"/>
              <path d="M4 18h16"/>
              <path d="M4 6h16"/>
            </svg>
          </button>
        </nav>

        {/* Mobile Menu Overlay */}
        {menuOpen && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '32px',
            fontWeight: '500',
            zIndex: 1000
          }}>
            <a href="#" style={{ color: '#050040' }}>Home</a>
            <a href="#" style={{ color: '#050040' }}>Products</a>
            <a href="#" style={{ color: '#050040' }}>Stories</a>
            <a href="#" style={{ color: '#050040' }}>Pricing</a>
            <button onClick={() => setMenuOpen(false)} style={{
              backgroundColor: '#1f2937',
              color: 'white',
              padding: '8px',
              borderRadius: '6px',
              aspectRatio: '1',
              fontWeight: '500',
              border: 'none',
              cursor: 'pointer'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"/>
                <path d="m6 6 12 12"/>
              </svg>
            </button>
          </div>
        )}

        {/* Hero Content */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          border: '1px solid #cbd5e1',
          borderRadius: '9999px',
          width: 'max-content',
          margin: '0 auto',
          padding: '8px 16px',
          marginTop: '160px',
          cursor: 'pointer',
          color: '#1f2937'
        }} onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(100, 116, 139, 0.7)'} onMouseLeave={(e) => e.currentTarget.style.borderColor = '#cbd5e1'}>
          <span>New announcement on your inbox</span>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontWeight: '500',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#000000'
          }}>
            <span>Read more</span>
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.959 9.5h11.083m0 0L9.501 3.958M15.042 9.5l-5.541 5.54" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <h1 style={{
          fontSize: '56px',
          fontWeight: '500',
          maxWidth: '850px',
          textAlign: 'center',
          margin: '32px auto 0 auto',
          lineHeight: '1.2',
          color: '#050040'
        }} className="max-md:text-4xl max-md:px-4">
          Predict Property Values with AI Precision
        </h1>

        <p style={{
          fontSize: '16px',
          margin: '24px auto 0 auto',
          maxWidth: '672px',
          textAlign: 'center',
          color: '#050040',
          lineHeight: '1.6'
        }} className="max-md:px-2 max-md:text-sm">
          Leverage advanced machine learning algorithms to estimate real estate prices based on location, demographics, and property characteristics.
        </p>

        <div style={{
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          marginTop: '16px'
        }}>
          <button onClick={() => document.getElementById('predictor-form')?.scrollIntoView({ behavior: 'smooth' })} style={{
            backgroundColor: '#1f2937',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '9999px',
            fontWeight: '500',
            transition: 'background-color 0.2s',
            border: 'none',
            cursor: 'pointer'
          }} onMouseEnter={(e) => e.target.style.backgroundColor = '#000000'} onMouseLeave={(e) => e.target.style.backgroundColor = '#1f2937'}>
            Get Started
          </button>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: '1px solid #cbd5e1',
            borderRadius: '9999px',
            padding: '12px 24px',
            background: 'transparent',
            cursor: 'pointer',
            color: '#050040',
            fontWeight: '500',
            transition: 'background-color 0.2s'
          }} onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(226, 232, 240, 0.3)'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
            <span>Learn More</span>
            <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.25.5 4.75 4l-3.5 3.5" stroke="#050040" strokeOpacity=".4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </section>

      {/* Predictor Form Section */}
      <div id="predictor-form" style={{
        fontFamily: "'Poppins', sans-serif",
        background: '#FAFAFA',
        minHeight: '100vh',
        padding: '80px 20px',
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            padding: '48px 40px',
            borderRadius: '16px',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
            border: '1px solid #E8E8E8',
          }}>
            <h2 style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#7F8C8D',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '24px',
              paddingBottom: '12px',
              borderBottom: '2px solid #ECF0F1',
            }}>Property Details</h2>
            
            <form onSubmit={handleSubmit}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '24px',
                marginBottom: '32px',
              }}>
                {Object.keys(form).map((key) => (
                  <div key={key} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}>
                    <label style={{
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#2C3E50',
                      textTransform: 'capitalize',
                      marginLeft: '2px',
                    }}>
                      {key.replace(/_/g, ' ')}
                    </label>
                    
                    {key === "ocean_proximity" ? (
                      <select 
                        name={key} 
                        value={form[key]} 
                        onChange={handleChange}
                        style={{
                          padding: '14px 16px',
                          borderRadius: '10px',
                          border: '2px solid #E8E8E8',
                          fontSize: '15px',
                          color: '#2C3E50',
                          backgroundColor: '#FAFAFA',
                          outline: 'none',
                          transition: 'all 0.2s ease',
                          fontFamily: 'inherit',
                        }}
                        required
                        onFocus={(e) => {
                          e.target.style.borderColor = '#2C3E50';
                          e.target.style.backgroundColor = '#FFFFFF';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#E8E8E8';
                          e.target.style.backgroundColor = '#FAFAFA';
                        }}
                      >
                        <option value="">Select proximity</option>
                        <option value="<1H OCEAN">&lt;1H OCEAN</option>
                        <option value="INLAND">INLAND</option>
                        <option value="ISLAND">ISLAND</option>
                        <option value="NEAR BAY">NEAR BAY</option>
                        <option value="NEAR OCEAN">NEAR OCEAN</option>
                      </select>
                    ) : (
                      <input
                        name={key}
                        type="text"
                        step="any"
                        placeholder={key === 'longitude' || key === 'latitude' ? '-122.23' : '0'}
                        value={form[key]}
                        onChange={handleChange}
                        style={{
                          padding: '14px 16px',
                          borderRadius: '10px',
                          border: '2px solid #E8E8E8',
                          fontSize: '15px',
                          color: '#2C3E50',
                          backgroundColor: '#FAFAFA',
                          outline: 'none',
                          transition: 'all 0.2s ease',
                          fontFamily: 'inherit',
                        }}
                        required
                        onFocus={(e) => {
                          e.target.style.borderColor = '#2C3E50';
                          e.target.style.backgroundColor = '#FFFFFF';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#E8E8E8';
                          e.target.style.backgroundColor = '#FAFAFA';
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>

              <button 
                type="submit" 
                style={{
                  width: '100%',
                  marginTop: '16px',
                  padding: '18px',
                  backgroundColor: '#2C3E50',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  letterSpacing: '0.5px',
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#34495E';
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(44, 62, 80, 0.2)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#2C3E50';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Calculate Estimated Value
              </button>
            </form>

            {/* Result Banner */}
            {prediction !== null && (
              <div style={{
                marginTop: '32px',
                padding: '40px 32px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #27AE60 0%, #2ECC71 100%)',
                textAlign: 'center',
                boxShadow: '0 4px 20px rgba(39, 174, 96, 0.2)',
              }}>
                <div style={{
                  fontSize: '13px',
                  color: '#E8F8F5',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  marginBottom: '8px',
                }}>
                  Estimated Market Value
                </div>
                <div style={{
                  fontSize: '48px',
                  fontWeight: '800',
                  color: '#FFFFFF',
                  marginTop: '8px',
                  letterSpacing: '-1px',
                }}>
                  Rs. {Number(prediction).toLocaleString('en-IN')}.00
                </div>
              </div>
            )}

            {/* Info Banner */}
            <div style={{
              marginTop: '32px',
              padding: '24px',
              borderRadius: '12px',
              background: '#ECF0F1',
              border: '1px solid #D5DBDB',
            }}>
              <p style={{
                fontSize: '13px',
                color: '#7F8C8D',
                margin: 0,
                lineHeight: '1.6',
                textAlign: 'center',
              }}>
                💡 This prediction is generated using advanced machine learning algorithms trained on housing data. Results are estimates and should be used for reference purposes only.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className='bg-black py-12 px-4 sm:px-6 lg:px-8'>
        <div className='w-full max-w-7xl mx-auto'>
          <div className="flex flex-wrap justify-between gap-y-12 lg:gap-x-8">
            <div className="w-full md:w-[45%] lg:w-[35%] flex flex-col items-center md:items-start text-center md:text-left">
             
              <div className='w-full max-w-52 h-px mt-8 bg-gradient-to-r from-black via-white/25 to-black'></div>
              <p className='text-sm text-white/60 mt-6 max-w-sm leading-relaxed'>
                House Prediction is a smart platform that helps users estimate property values using data-driven insights.
              </p>
            </div>

            <div className="w-full md:w-[45%] lg:w-[15%] flex flex-col items-center md:items-start text-center md:text-left">
              <h3 className='text-sm text-white font-medium'>Important Links</h3>
              <div className="flex flex-col gap-2 mt-6">
                <a href="#" className='text-sm text-white/60 hover:text-white transition-colors'>Home</a>
                <a href="#" className='text-sm text-white/60 hover:text-white transition-colors'>About</a>
                <a href="#" className='text-sm text-white/60 hover:text-white transition-colors'>Portfolio</a>
                <a href="#" className='text-sm text-white/60 hover:text-white transition-colors'>Contact</a>
                <a href="#" className='text-sm text-white/60 hover:text-white transition-colors'>FAQ</a>
              </div>
            </div>

            <div className="w-full md:w-[45%] lg:w-[15%] flex flex-col items-center md:items-start text-center md:text-left">
              <h3 className='text-sm text-white font-medium'>Social Links</h3>
              <div className="flex flex-col gap-2 mt-6">
                <a href="#" className='text-sm text-white/60 hover:text-white transition-colors'>Twitter</a>
                <a href="#" className='text-sm text-white/60 hover:text-white transition-colors'>Instagram</a>
                <a href="#" className='text-sm text-white/60 hover:text-white transition-colors'>Youtube</a>
                <a href="#" className='text-sm text-white/60 hover:text-white transition-colors'>Linkedin</a>
              </div>
            </div>

            <div className="w-full md:w-[45%] lg:w-[25%] flex flex-col items-center md:items-start text-center md:text-left">
              <h3 className='text-sm text-white font-medium'>Subscribe for news</h3>
              <div className="flex items-center border gap-2 border-white/20 h-13 max-w-80 w-full rounded-full overflow-hidden mt-4">
                <input type="email" placeholder="Enter your email.." className="w-full h-full pl-6 outline-none text-sm bg-transparent text-white placeholder-white/60 placeholder:text-xs" required />
                <button type="submit" className="bg-gradient-to-b from-[#5623D8] to-[#7B53E2] active:scale-95 transition w-56 h-10 rounded-full text-sm text-white cursor-pointer mr-1.5">Subscribe</button>
              </div>
            </div>
          </div>

          <div className='w-full h-px mt-16 mb-4 bg-gradient-to-r from-black via-white/25 to-black'></div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className='text-xs text-white/60'>© 2025 House Prediction. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href='#' className='text-xs text-white/60 hover:text-white transition-colors'>Terms & Conditions</a>
              <div className='w-px h-4 bg-white/20'></div>
              <a href='#' className='text-xs text-white/60 hover:text-white transition-colors'>Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}