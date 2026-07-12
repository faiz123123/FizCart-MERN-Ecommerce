import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
  footer: {
    background: '#0f172a',
    borderTop: '1px solid rgba(255,255,255,0.08)',
    padding: '45px 20px',
    marginTop: 'auto'
  },

  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '30px'
  },

  brand: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },

  title: {
    color: '#2563eb',
    fontSize: '1.8rem',
    fontWeight: '700',
    margin: 0
  },

  subtitle: {
    color: '#94a3b8',
    fontSize: '0.95rem',
    margin: 0
  },

  links: {
    display: 'flex',
    gap: '25px',
    flexWrap: 'wrap'
  },

  link: {
    color: '#cbd5e1',
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: '500',
    transition: '0.3s'
  },

  copyright: {
    color: '#94a3b8',
    fontSize: '0.9rem'
  }
};

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.brand}>
          <h2 style={styles.title}>FizCart</h2>
          <p style={styles.subtitle}>
            Premium E-Commerce Platform.
          </p>
        </div>

        <div style={styles.links}>
          <Link
            to="/about"
            style={styles.link}
            onMouseEnter={(e) => (e.target.style.color = '#2563eb')}
            onMouseLeave={(e) => (e.target.style.color = '#cbd5e1')}
          >
            About Us
          </Link>

          <Link
            to="/return"
            style={styles.link}
            onMouseEnter={(e) => (e.target.style.color = '#2563eb')}
            onMouseLeave={(e) => (e.target.style.color = '#cbd5e1')}
          >
            Return Policy
          </Link>

          <Link
            to="/disclaimer"
            style={styles.link}
            onMouseEnter={(e) => (e.target.style.color = '#2563eb')}
            onMouseLeave={(e) => (e.target.style.color = '#cbd5e1')}
          >
            Disclaimer
          </Link>
        </div>

        <div style={styles.copyright}>
          © {new Date().getFullYear()} FizCart. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;