import { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';

function RootRedirect() {
  const { user } = useAuth();
  if (user?.role === 'student') return <Navigate to="/student" replace />;
  if (user?.role === 'teacher') return <Navigate to="/teacher" replace />;
  return <Login />;
}

export default function App() {
  useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7497/ingest/441325da-a54d-4149-8145-ea1d5aa2766b', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '2857d3' }, body: JSON.stringify({ sessionId: '2857d3', runId: 'baseline', hypothesisId: 'H_ROUTER', location: 'src/App.jsx:16', message: 'App mounted', data: { hash: window.location.hash }, timestamp: Date.now() }) }).catch(() => { });
    // #endregion
  }, []);

  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route path="/student" element={
            <ProtectedRoute requiredRole="student"><StudentDashboard /></ProtectedRoute>
          } />
          <Route path="/teacher" element={
            <ProtectedRoute requiredRole="teacher"><TeacherDashboard /></ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}
