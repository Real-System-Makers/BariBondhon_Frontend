import Link from 'next/link';
import React from 'react';

// Next.js-এ 'Image' কম্পোনেন্ট ব্যবহার করা ভালো practice,
// তবে এখানে সাধারণ 'div' এবং টেক্সট আইকন ব্যবহার করা হয়েছে আপনার HTML অনুযায়ী।

const WelcomePage = () => {
  return (
    <div className="phone-container">
      <header className="header">
        <div className="app-logo">BariBondhu</div>
        <div className="auth-buttons">
         <Link href="/login"> <button className="auth-btn btn-login">Log In</button></Link>
          <button className="auth-btn btn-signup">Register</button>
        </div>
      </header>
      <main className="main-content">
        <div className="welcome-banner">
          <div className="welcome-title">Welcome to BariBondhu</div>
          <div className="welcome-subtitle">Your Complete Rental Management Solution!</div>
        </div>

        <section className="stats-section">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">👤</div>
              <div className="stat-value">800+</div>
              <div className="stat-label">Owners</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-value">1M+</div>
              <div className="stat-label">Tenants</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🏙️</div>
              <div className="stat-value">250+</div>
              <div className="stat-label">Cities</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🛠️</div>
              <div className="stat-value">500+</div>
              <div className="stat-label">Services</div>
            </div>
            {/* ইনলাইন স্টাইল অবজেক্ট হিসেবে লিখতে হয় */}
            <div className="stat-card" style={{ gridColumn: '1 / -1' }}>
              <div className="stat-icon">⭐</div>
              <div className="stat-value">1k+</div>
              <div className="stat-label">5-Star Reviews</div>
            </div>
          </div>
        </section>
        
        <section className="cta-section">
          <div className="section-title">Get Started</div>
          {/* React/Next.js এ নেভিগেশনের জন্য <a> এর বদলে <Link> ট্যাগ ব্যবহার করা হয় */}
          <a href="#" className="cta-card cta-owner">
            <div className="cta-icon">🔑</div>
            <div>
              <div className="cta-title">Are you an Owner?</div>
              <div className="cta-description">Manage your properties, tenants, and bills easily.</div>
            </div>
          </a>
          <a href="#" className="cta-card cta-tenant">
            <div className="cta-icon">🏠</div>
            <div>
              <div className="cta-title">Looking for a Home?</div>
              <div className="cta-description">Find your perfect rental property today.</div>
            </div>
          </a>
        </section>
      </main>
    </div>
  );
};

export default WelcomePage;
