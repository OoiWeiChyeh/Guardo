import { useState } from 'react';
import Navbar from '../components/Navbar';
import './TeacherDashboard.css';

const STUDENTS = [
    { id: 1, name: 'Alex Johnson', avatar: '🦁', grade: 'Yr4', xp: 340, level: 5, modules: 3, quizScore: 80, status: 'on-track', lastSeen: '2h ago' },
    { id: 2, name: 'Maya Patel', avatar: '🐯', grade: 'Yr4', xp: 510, level: 7, modules: 5, quizScore: 95, status: 'excellent', lastSeen: '1h ago' },
    { id: 3, name: 'Sam Chen', avatar: '🦊', grade: 'Yr4', xp: 120, level: 2, modules: 1, quizScore: 45, status: 'needs-help', lastSeen: '3d ago' },
    { id: 4, name: 'Priya Sharma', avatar: '🐺', grade: 'Yr4', xp: 270, level: 4, modules: 2, quizScore: 72, status: 'on-track', lastSeen: '5h ago' },
    { id: 5, name: 'Jack Williams', avatar: '🦅', grade: 'Yr4', xp: 180, level: 3, modules: 2, quizScore: 60, status: 'on-track', lastSeen: '1d ago' },
    { id: 6, name: 'Chloe Martin', avatar: '🦋', grade: 'Yr4', xp: 420, level: 6, modules: 4, quizScore: 88, status: 'excellent', lastSeen: '30m ago' },
];

const ALERTS = [
    { id: 1, icon: '⚠️', student: 'Sam Chen', msg: 'Sam answered incorrectly on 3 consecutive bullying scenarios.', time: '3 days ago', severity: 'high' },
    { id: 2, icon: '📋', student: 'Jack Williams', msg: 'Jack has not completed this week\'s module.', time: '1 day ago', severity: 'medium' },
    { id: 3, icon: '🎉', student: 'Maya Patel', msg: 'Maya reached Level 7 and earned the Cyber Thinker badge!', time: '1 hour ago', severity: 'info' },
];

const MODULES = [
    { id: 1, title: 'Intro to Online Safety', desc: 'Basics of safe browsing and identity protection', icon: '🔐', assigned: true },
    { id: 2, title: 'Recognising Cyberbullying', desc: 'Identifying and responding to online bullying', icon: '🛡️', assigned: true },
    { id: 3, title: 'Sharing & Privacy', desc: 'What to share and what to keep private', icon: '📸', assigned: false },
    { id: 4, title: 'Seeking Help', desc: 'When and how to ask for adult support', icon: '🤝', assigned: false },
];

export default function TeacherDashboard() {
    const [assigned, setAssigned] = useState(MODULES.map(m => m.assigned));
    const [activeTab, setActiveTab] = useState('overview');

    const avgScore = Math.round(STUDENTS.reduce((a, s) => a + s.quizScore, 0) / STUDENTS.length);
    const avgXP = Math.round(STUDENTS.reduce((a, s) => a + s.xp, 0) / STUDENTS.length);
    const excellent = STUDENTS.filter(s => s.status === 'excellent').length;
    const needsHelp = STUDENTS.filter(s => s.status === 'needs-help').length;

    const statusBadge = (s) => {
        if (s === 'excellent') return <span className="badge badge-green">Excellent</span>;
        if (s === 'needs-help') return <span className="badge badge-orange" style={{ color: '#ff6b6b', borderColor: 'rgba(255,68,68,0.3)', background: 'rgba(255,68,68,0.1)' }}>Needs Help</span>;
        return <span className="badge badge-gold">On Track</span>;
    };

    return (
        <div className="td-root">
            <Navbar />
            <div className="td-body">

                {/* Header banner */}
                <div className="td-banner">
                    <div>
                        <h1 className="td-heading">Class 4B Overview</h1>
                        <p className="td-sub">Monitor student safety awareness progress and AI interaction data</p>
                    </div>
                    <div className="td-stats-row">
                        <div className="td-stat"><span className="td-stat-val">{STUDENTS.length}</span><span className="td-stat-lbl">Students</span></div>
                        <div className="td-stat"><span className="td-stat-val text-gold">{avgScore}%</span><span className="td-stat-lbl">Avg Quiz</span></div>
                        <div className="td-stat"><span className="td-stat-val text-yellow">{excellent}</span><span className="td-stat-lbl">Excellent</span></div>
                        <div className="td-stat"><span className="td-stat-val" style={{ color: '#ff6b6b' }}>{needsHelp}</span><span className="td-stat-lbl">Need Help</span></div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="td-tabs">
                    {['overview', 'alerts', 'modules'].map(t => (
                        <button key={t} className={`td-tab ${activeTab === t ? 'td-tab-active' : ''}`} onClick={() => setActiveTab(t)}>
                            {t === 'overview' ? '📊 Class Overview' : t === 'alerts' ? '🔔 Alerts' : '📚 Modules'}
                            {t === 'alerts' && <span className="tab-dot">{ALERTS.filter(a => a.severity === 'high').length}</span>}
                        </button>
                    ))}
                </div>

                {/* Overview */}
                {activeTab === 'overview' && (
                    <div className="card td-table-card">
                        <div className="td-table-header">
                            <h3 className="card-title" style={{ margin: 0 }}>Student Progress</h3>
                            <span className="text-muted" style={{ fontSize: 13 }}>Updated in real-time</span>
                        </div>
                        <div className="td-table-wrap">
                            <table className="td-table">
                                <thead>
                                    <tr>
                                        <th>Student</th><th>Level</th><th>XP</th><th>Quiz Score</th><th>Modules</th><th>Last Active</th><th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {STUDENTS.map(s => (
                                        <tr key={s.id}>
                                            <td>
                                                <div className="td-student-cell">
                                                    <span className="td-stu-avatar">{s.avatar}</span>
                                                    <div>
                                                        <div className="td-stu-name">{s.name}</div>
                                                        <div className="td-stu-grade">{s.grade}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td><span className="badge badge-orange">Lv.{s.level}</span></td>
                                            <td><span className="text-yellow" style={{ fontWeight: 700 }}>{s.xp}</span></td>
                                            <td>
                                                <div className="td-score-cell">
                                                    <div className="td-score-bar-wrap"><div className="td-score-bar" style={{ width: `${s.quizScore}%` }} /></div>
                                                    <span style={{ fontSize: 13, fontWeight: 600 }}>{s.quizScore}%</span>
                                                </div>
                                            </td>
                                            <td><span className="text-gold">{s.modules}/5</span></td>
                                            <td><span className="text-muted" style={{ fontSize: 13 }}>{s.lastSeen}</span></td>
                                            <td>{statusBadge(s.status)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* Class XP average bar */}
                        <div className="td-class-avg">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                <span style={{ fontSize: 13, color: ' var(--muted)' }}>Class Average XP</span>
                                <span className="text-yellow" style={{ fontWeight: 700 }}>{avgXP} XP</span>
                            </div>
                            <div className="xp-bar-wrap"><div className="xp-bar-fill" style={{ width: `${Math.min(100, (avgXP / 700) * 100)}%` }} /></div>
                        </div>
                    </div>
                )}

                {/* Alerts */}
                {activeTab === 'alerts' && (
                    <div className="td-alerts">
                        {ALERTS.map(a => (
                            <div key={a.id} className={`card td-alert-card sev-${a.severity}`}>
                                <div className="alert-icon">{a.icon}</div>
                                <div className="alert-body">
                                    <div className="alert-student">{a.student}</div>
                                    <p className="alert-msg">{a.msg}</p>
                                </div>
                                <div className="alert-meta">
                                    <span className="text-muted" style={{ fontSize: 12 }}>{a.time}</span>
                                    <span className={`badge ${a.severity === 'high' ? '' : a.severity === 'info' ? 'badge-green' : 'badge-gold'}`}
                                        style={a.severity === 'high' ? { background: 'rgba(255,68,68,0.1)', color: '#ff6b6b', borderColor: 'rgba(255,68,68,0.3)', padding: '3px 10px', borderRadius: 99, fontSize: 12, fontWeight: 600, border: '1px solid' } : {}}>
                                        {a.severity === 'high' ? 'High' : a.severity === 'info' ? 'Info' : 'Medium'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Modules */}
                {activeTab === 'modules' && (
                    <div className="td-modules">
                        {MODULES.map((m, i) => (
                            <div key={m.id} className="card td-module-card">
                                <div className="module-icon">{m.icon}</div>
                                <div className="module-info">
                                    <h4 className="module-title">{m.title}</h4>
                                    <p className="module-desc">{m.desc}</p>
                                </div>
                                <button
                                    className={`btn ${assigned[i] ? 'btn-ghost' : 'btn-primary'} module-btn`}
                                    onClick={() => setAssigned(a => a.map((v, j) => j === i ? !v : v))}>
                                    {assigned[i] ? '✓ Assigned' : '+ Assign'}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
