import React, { useContext, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/auth.css';

const Otp = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { login } = useContext(AuthContext);

	const initialEmail = useMemo(() => {
		return location.state?.email || localStorage.getItem('pendingVerificationEmail') || '';
	}, [location.state]);

	const [email, setEmail] = useState(initialEmail);
	const [otp, setOtp] = useState('');
	const [loading, setLoading] = useState(false);
	const [resending, setResending] = useState(false);

	const handleVerify = async (e) => {
		e.preventDefault();
		if (!email.trim() || !otp.trim()) {
			alert('Please enter email and OTP.');
			return;
		}

		try {
			setLoading(true);
			const res = await fetch('/api/auth/verify-otp', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, otp })
			});

			const data = await res.json();

			if (!res.ok) {
				alert(data.message || 'OTP verification failed.');
				return;
			}

			login(data);
			localStorage.removeItem('pendingVerificationEmail');
			alert(data.message || 'Account verified successfully.');
			navigate('/');
		} catch (error) {
			console.error(error);
			alert('Something went wrong while verifying OTP.');
		} finally {
			setLoading(false);
		}
	};

	const handleResendOtp = async () => {
		if (!email.trim()) {
			alert('Please enter your email first.');
			return;
		}

		try {
			setResending(true);
			const res = await fetch('/api/auth/resend-otp', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email })
			});

			const data = await res.json();
			if (!res.ok) {
				alert(data.message || 'Unable to resend OTP.');
				return;
			}

			localStorage.setItem('pendingVerificationEmail', email);
			alert(data.message || 'OTP resent successfully.');
		} catch (error) {
			console.error(error);
			alert('Something went wrong while resending OTP.');
		} finally {
			setResending(false);
		}
	};

	return (
		<div className="auth-container">
			<form onSubmit={handleVerify} className="auth-form">
				<h2>Verify OTP</h2>
				<p>Enter the OTP sent to your email to activate your account.</p>

				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>

				<input
					type="text"
					placeholder="6-digit OTP"
					value={otp}
					onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
					maxLength={6}
					required
				/>

				<button type="submit" className="btn" disabled={loading}>
					{loading ? 'Verifying...' : 'Verify Account'}
				</button>

				<button
					type="button"
					className="btn"
					onClick={handleResendOtp}
					disabled={resending}
					style={{ background: '#202020', border: '1px solid rgba(255,255,255,0.1)' }}
				>
					{resending ? 'Sending...' : 'Resend OTP'}
				</button>

				<p>
					Already verified? <Link to="/login">Login</Link>
				</p>
			</form>
		</div>
	);
};

export default Otp;
