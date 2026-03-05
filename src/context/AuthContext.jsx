import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Demo credential store
const USERS = {
    'student@guardo.ai': { password: 'student123', role: 'student', name: 'Alex Johnson', avatar: '🦁', grade: 'Year 4', xp: 340, level: 5 },
    'teacher@guardo.ai': { password: 'teacher123', role: 'teacher', name: 'Ms. Sarah Lee', avatar: '🦉', subject: 'Class 4B Homeroom' },
    'maya@guardo.ai': { password: 'maya123', role: 'student', name: 'Maya Patel', avatar: '🐯', grade: 'Year 4', xp: 510, level: 7 },
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        try { return JSON.parse(sessionStorage.getItem('guardo_user')); }
        catch { return null; }
    });

    const login = (email, password) => {
        const record = USERS[email.toLowerCase()];
        if (!record || record.password !== password) {
            throw new Error('Invalid email or password. Please check your credentials.');
        }
        const { password: _, ...safe } = record;
        const u = { email, ...safe };
        sessionStorage.setItem('guardo_user', JSON.stringify(u));
        setUser(u);
        return u;
    };

    const logout = () => {
        sessionStorage.removeItem('guardo_user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
