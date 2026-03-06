/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

// Demo base users (always approved)
const BASE_USERS = {
  'student@guardo.ai': {
    password: 'student123',
    role: 'student',
    name: 'Alex Johnson',
    avatar: '🦁',
    grade: 'Year 4',
    xp: 340,
    level: 5,
  },
  'teacher@guardo.ai': {
    password: 'teacher123',
    role: 'teacher',
    name: 'Ms. Sarah Lee',
    avatar: '🦉',
    subject: 'Class 4B Homeroom',
  },
  'maya@guardo.ai': {
    password: 'maya123',
    role: 'student',
    name: 'Maya Patel',
    avatar: '🐯',
    grade: 'Year 4',
    xp: 510,
    level: 7,
  },
  'admin@guardo.ai': {
    password: 'admin123',
    role: 'admin',
    name: 'School Admin',
    avatar: '👑',
  },
};

const STORAGE_KEY = 'guardo_users_v1';

function loadCustomUsers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem('guardo_user'));
    } catch {
      return null;
    }
  });

  const [customUsers, setCustomUsers] = useState(() => loadCustomUsers());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customUsers));
    } catch {
      // ignore write errors
    }
  }, [customUsers]);

  const allUsers = useMemo(
    () => ({
      ...BASE_USERS,
      ...customUsers,
    }),
    [customUsers],
  );

  const login = (email, password, expectedRole) => {
    const emailLower = String(email || '').toLowerCase();
    const record = allUsers[emailLower];
    if (!record || record.password !== password) {
      throw new Error('Invalid email or password. Please check your credentials.');
    }

    // Registration approval gate (only for custom users)
    if (record.status && record.status !== 'approved') {
      if (record.status === 'pending') {
        const approver = record.approverRole === 'teacher'
          ? 'class teacher'
          : record.approverRole === 'admin'
            ? 'school admin'
            : 'supervisor';
        throw new Error(`Your ${record.role} account is waiting for approval from your ${approver}.`);
      }
      if (record.status === 'rejected') {
        throw new Error('This account registration was rejected. Please contact your teacher or admin.');
      }
    }

    if (expectedRole && record.role !== expectedRole) {
      throw new Error(`This account belongs to a ${record.role}. Please use the correct tab.`);
    }

    const { password: _, ...safe } = record;
    const u = { email: emailLower, ...safe };
    sessionStorage.setItem('guardo_user', JSON.stringify(u));
    setUser(u);
    return u;
  };

  const logout = () => {
    sessionStorage.removeItem('guardo_user');
    setUser(null);
  };

  const register = (payload) => {
    const emailLower = String(payload.email || '').toLowerCase();
    if (!emailLower || !payload.password || !payload.role) {
      throw new Error('Please fill in all required fields.');
    }

    if (allUsers[emailLower]) {
      throw new Error('An account with this email already exists.');
    }

    const approverRole =
      payload.role === 'student' ? 'teacher' :
      payload.role === 'teacher' ? 'admin' :
      null;

    const avatarFallback =
      payload.role === 'student' ? '🦁' :
      payload.role === 'teacher' ? '🦉' :
      '👤';

    const record = {
      email: emailLower,
      name: payload.name,
      password: payload.password,
      role: payload.role,
      avatar: payload.avatar || avatarFallback,
      grade: payload.grade || undefined,
      subject: payload.subject || undefined,
      xp: payload.role === 'student' ? 0 : undefined,
      level: payload.role === 'student' ? 1 : undefined,
      status: 'pending',
      approverRole,
      createdAt: Date.now(),
    };

    setCustomUsers((prev) => ({
      ...prev,
      [emailLower] = record,
    }));

    return record;
  };

  const approveUser = (emailLower) => {
    setCustomUsers((prev) => {
      const existing = prev[emailLower];
      if (!existing) return prev;
      return {
        ...prev,
        [emailLower]: { ...existing, status: 'approved' },
      };
    });
  };

  const rejectUser = (emailLower) => {
    setCustomUsers((prev) => {
      const existing = prev[emailLower];
      if (!existing) return prev;
      return {
        ...prev,
        [emailLower]: { ...existing, status: 'rejected' },
      };
    });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      register,
      allUsers,
      approveUser,
      rejectUser,
    }),
    [user, allUsers],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
