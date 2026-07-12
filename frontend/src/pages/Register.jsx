import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/auth.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!acceptedTerms) {
      alert('Please accept the Terms & Disclaimer before registering.');
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(
          'Registration Successful! Please check your email for the Welcome OTP.'
        );

        localStorage.setItem(
          'pendingVerificationEmail',
          data.email || email
        );

        navigate('/otp', {
          state: { email: data.email || email },
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <div className="auth-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Register</h2>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Terms */}
          <div className="terms-container">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={acceptedTerms}
                readOnly
                onClick={(e) => {
                  if (!acceptedTerms) {
                    e.preventDefault();
                    setShowTerms(true);
                  } else {
                    setAcceptedTerms(false);
                  }
                }}
              />

              <span className="custom-checkmark"></span>

              <span className="checkbox-text">
                I agree to the{" "}
                <button
                  type="button"
                  className="terms-link"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowTerms(true);
                  }}
                >
                  Terms & Disclaimer
                </button>
              </span>
            </label>
          </div>

          <button type="submit" className="btn">
            Register
          </button>

          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>

      {/* Terms Modal */}
      {showTerms && (
        <div
          className="modal-overlay"
          onClick={() => setShowTerms(false)}
        >
          <div
            className="terms-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Terms & Disclaimer</h2>

            <p>
              Welcome to <strong>FizCart</strong>. This website has been
              developed as a learning and portfolio project to demonstrate
              modern full-stack web development using the MERN Stack.
            </p>

            <h4>1. Educational Purpose</h4>

            <p>
              FizCart is intended for educational and demonstration purposes.
              Product information, images, prices, and descriptions may be
              used as sample content and should not always be considered real
              or commercially available.
            </p>

            <h4>2. Product Information</h4>

            <p>
              While we strive to display accurate information, we do not
              guarantee that all product descriptions, images, pricing,
              availability, or specifications are free from errors.
              Information may change without prior notice.
            </p>

            <h4>3. Payments</h4>

            <p>
              If this project is running in a testing environment, payment
              processing is performed using sandbox or test payment gateways.
              No real financial transactions are processed unless explicitly
              stated.
            </p>

            <h4>4. External Links</h4>

            <p>
              FizCart may contain links to third-party websites for
              additional information or services. We are not responsible
              for the content, security, or privacy practices of those
              external websites.
            </p>

            <h4>5. Limitation of Liability</h4>

            <p>
              FizCart and its developer shall not be held responsible for
              any direct or indirect damages arising from the use of this
              website or reliance on the information provided.
            </p>

            <p className="note">
              <strong>Note:</strong> By accessing and using FizCart, you
              acknowledge that you have read, understood, and agreed to
              these Terms & Disclaimer.
            </p>

            <button
              type="button"
              className="btn"
              onClick={() => {
                setAcceptedTerms(true);
                setShowTerms(false);
              }}
            >
              I Understand
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;