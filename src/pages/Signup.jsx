import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Signup.css';

export default function Signup() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [grade, setGrade] = useState('');
  const [subject, setSubject] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 600));
      register({
        name,
        email,
        password,
        role,
        grade: role === 'student' ? grade : undefined,
        subject: role === 'teacher' ? subject : undefined,
      });
      setSuccess(
        role === 'student'
          ? 'Registration submitted! Your class teacher will review and approve your account.'
          : 'Registration submitted! The school admin will review and approve your account.',
      );
      setTimeout(() => navigate('/'), 1600);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="su-bg">
      <div className="su-card animate-fade-up">
        <h1 className="su-title">Create your Guardo account</h1>
        <p className="su-sub">
          New accounts stay <strong>pending</strong> until approved by your superior.
        </p>

        <div className="su-role-toggle" aria-label="Choose your role">
          <button
            type="button"
            className={`su-role-btn ${role === 'student' ? 'su-role-active' : ''}`}
            onClick={() => {
              setRole('student');
              setError('');
              setSuccess('');
            }}
          >
            🎓 Student
          </button>
          <button
            type="button"
            className={`su-role-btn ${role === 'teacher' ? 'su-role-active' : ''}`}
            onClick={() => {
              setRole('teacher');
              setError('');
              setSuccess('');
            }}
          >
            👩‍🏫 Teacher
          </button>
        </div>

        <form className="su-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full name</label>
            <input
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={role === 'student' ? 'Alex Johnson' : 'Ms. Sarah Lee'}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email address</label>
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@school.edu"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              placeholder="At least 6 characters"
              required
            />
          </div>

          {role === 'student' && (
            <div className="form-group">
              <label className="form-label">Year / Class</label>
              <input
                className="input"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                placeholder="e.g. Year 4 / 4B"
              />
            </div>
          )}

          {role === 'teacher' && (
            <div className="form-group">
              <label className="form-label">Subject / Class</label>
              <input
                className="input"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Homeroom 4B"
              />
            </div>
          )}

          {error && (
            <div className="su-alert su-alert-error">
              <span>⚠️</span> {error}
            </div>
          )}
          {success && (
            <div className="su-alert su-alert-success">
              <span>✅</span> {success}
            </div>
          )}

          <button
            type="submit"
            className={`btn btn-gold su-submit ${submitting ? 'loading' : ''}`}
            disabled={submitting}
          >
            {submitting ? 'Submitting…' : 'Submit for approval'}
          </button>
        </form>

        <button
          type="button"
          className="su-back"
          onClick={() => navigate('/')}
        >
          ← Back to sign in
        </button>
      </div>
    </div>
  );
}

