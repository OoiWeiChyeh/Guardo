import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import Settings from './pages/Settings';
import About from './pages/About';

function RootRedirect() {
  const { user } = useAuth();
  if (user?.role === 'student') return <Navigate to="/student" replace />;
  if (user?.role === 'teacher') return <Navigate to="/teacher" replace />;
  if (user?.role === 'admin') return <Navigate to="/admin" replace />;
  return <Login />;
}

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/student" element={
            <ProtectedRoute requiredRole="student"><StudentDashboard /></ProtectedRoute>
          } />
          <Route path="/teacher" element={
            <ProtectedRoute requiredRole="teacher"><TeacherDashboard /></ProtectedRoute>
          } />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}
