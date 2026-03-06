import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';

export default function Login() {
    const [tab, setTab] = useState('student');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await new Promise(r => setTimeout(r, 700)); // simulate network
            const user = login(email, password);
            if (user.role !== tab) {
                setError(`This account belongs to a ${user.role}. Please use the correct tab.`);
                setLoading(false);
                return;
            }
            navigate(user.role === 'teacher' ? '/teacher' : '/student');
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const fillDemo = () => {
        setEmail(tab === 'student' ? 'student@guardo.ai' : 'teacher@guardo.ai');
        setPassword(tab === 'student' ? 'student123' : 'teacher123');
    };

    return (
        <div className="login-bg">
            {/* Particle orbs */}
            <div className="orb orb-1" />
            <div className="orb orb-2" />
            <div className="orb orb-3" />
            <div className="orb orb-4" />

            <div className="login-container animate-fade-up">
                {/* Logo */}
                <div className="login-logo">
                    <div className="shield-wrap animate-float">
                        <svg viewBox="0 0 100 115" fill="none" xmlns="http://www.w3.org/2000/svg" width="90" height="90">
                            <path d="M50 5L90 22V55C90 79 73 99 50 108C27 99 10 79 10 55V22L50 5Z"
                                fill="url(#shGrad)" stroke="url(#shBord)" strokeWidth="2.5" />
                            <path d="M50 18L80 31V55C80 73 67 88 50 96C33 88 20 73 20 55V31L50 18Z"
                                fill="url(#shInner)" />
                            <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle"
                                fill="url(#gTxt)" fontSize="40" fontFamily="Orbitron,sans-serif" fontWeight="900">G</text>
                            <circle cx="75" cy="18" r="4" fill="#FFD166" opacity="0.9" />
                            <circle cx="28" cy="84" r="3" fill="#FFD166" opacity="0.6" />
                            <defs>
                                <linearGradient id="shGrad" x1="50" y1="5" x2="50" y2="108" gradientUnits="userSpaceOnUse">
                                    <stop offset="0%" stopColor="#E85D04" />
                                    <stop offset="100%" stopColor="#5C1A00" />
                                </linearGradient>
                                <linearGradient id="shBord" x1="0" y1="0" x2="100" y2="115" gradientUnits="userSpaceOnUse">
                                    <stop offset="0%" stopColor="#FFD166" />
                                    <stop offset="100%" stopColor="#D4A017" />
                                </linearGradient>
                                <linearGradient id="shInner" x1="50" y1="18" x2="50" y2="96" gradientUnits="userSpaceOnUse">
                                    <stop offset="0%" stopColor="#9C2F00" stopOpacity="0.8" />
                                    <stop offset="100%" stopColor="#3D0F00" stopOpacity="0.9" />
                                </linearGradient>
                                <linearGradient id="gTxt" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
                                    <stop offset="0%" stopColor="#FFD166" />
                                    <stop offset="100%" stopColor="#D4A017" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <div>
                        <h1 className="login-brand">Guardo</h1>
                        <p className="login-subtitle">GUARDIAN AI</p>
                    </div>
                </div>

                <p className="login-tagline">
                    Your AI companion for safe and smart online learning
                </p>

                {/* Role Tabs */}
                <div className="login-tabs">
                    <button
                        className={`tab-btn ${tab === 'student' ? 'tab-active' : ''}`}
                        onClick={() => { setTab('student'); setError(''); setEmail(''); setPassword(''); }}>
                        🎓 Student
                    </button>
                    <button
                        className={`tab-btn ${tab === 'teacher' ? 'tab-active' : ''}`}
                        onClick={() => { setTab('teacher'); setError(''); setEmail(''); setPassword(''); }}>
                        👩‍🏫 Teacher
                    </button>
                </div>

                {/* Form */}
                <form className="login-form" onSubmit={handleLogin}>
                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                            className="input"
                            type="email"
                            placeholder={tab === 'student' ? 'student@guardo.ai' : 'teacher@guardo.ai'}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <div className="pass-wrap">
                            <input
                                className="input"
                                type={showPass ? 'text' : 'password'}
                                placeholder="Enter your password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                            />
                            <button type="button" className="pass-toggle" onClick={() => setShowPass(!showPass)}>
                                {showPass ? '🙈' : '👁️'}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="login-error">
                            <span>⚠️</span> {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className={`btn btn-primary login-btn ${loading ? 'loading' : ''}`}
                        disabled={loading}>
                        {loading ? <span className="spinner" /> : null}
                        {loading ? 'Signing in…' : `Sign In as ${tab === 'student' ? 'Student' : 'Teacher'}`}
                    </button>
                </form>

                {/* Demo credentials helper */}
                <div className="demo-hint">
                    <p>Demo account:</p>
                    <button className="demo-fill" onClick={fillDemo}>
                        ✨ Fill demo credentials for {tab}
                    </button>
                </div>
            </div>

            {/* Footer */}
            <p className="login-footer">
                © 2025 Guardo — AI-powered Cyberbullying Awareness for Primary Schools
                <br />GDPR & PDPA Compliant · Parental Consent Required
            </p>
        </div>
    );
}
