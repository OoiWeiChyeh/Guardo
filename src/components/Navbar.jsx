import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo" onClick={() => navigate(user?.role === 'teacher' ? '/teacher' : '/student')}>
                <div className="nav-shield">
                    <svg viewBox="0 0 40 46" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
                        <path d="M20 2L36 9V22C36 31.5 29 39.5 20 43C11 39.5 4 31.5 4 22V9L20 2Z"
                            fill="url(#ngrd)" stroke="url(#nbord)" strokeWidth="1.5" />
                        <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle"
                            fill="url(#ntxt)" fontSize="16" fontFamily="Orbitron,sans-serif" fontWeight="900">G</text>
                        <defs>
                            <linearGradient id="ngrd" x1="20" y1="2" x2="20" y2="43" gradientUnits="userSpaceOnUse">
                                <stop offset="0%" stopColor="#E85D04" />
                                <stop offset="100%" stopColor="#7B2D00" />
                            </linearGradient>
                            <linearGradient id="nbord" x1="0" y1="0" x2="40" y2="46" gradientUnits="userSpaceOnUse">
                                <stop offset="0%" stopColor="#FFD166" />
                                <stop offset="100%" stopColor="#D4A017" />
                            </linearGradient>
                            <linearGradient id="ntxt" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
                                <stop offset="0%" stopColor="#FFD166" />
                                <stop offset="100%" stopColor="#D4A017" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <span className="nav-brand">Guardo</span>
            </div>

            <div className="navbar-center">
                <span className="nav-tagline">Guardian AI</span>
            </div>

            <div className="navbar-right">
                <div className="nav-user">
                    <span className="nav-avatar">{user?.avatar}</span>
                    <div className="nav-user-info">
                        <span className="nav-name">{user?.name}</span>
                        <span className="nav-role">{user?.role === 'teacher' ? '👩‍🏫 Teacher' : '🎓 Student'}</span>
                    </div>
                </div>
                <button className="btn btn-ghost nav-logout" onClick={handleLogout}>
                    ⏻ Logout
                </button>
            </div>
        </nav>
    );
}
