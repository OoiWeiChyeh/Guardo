import { useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import '../styles/TeacherDashboard.css';

import { STUDENTS, ALERTS, MODULES } from '../data/teacherData';
import TeacherOverview from '../components/Teacher/TeacherOverview';
import TeacherApprovals from '../components/Teacher/TeacherApprovals';
import TeacherAlerts from '../components/Teacher/TeacherAlerts';
import TeacherModules from '../components/Teacher/TeacherModules';

export default function TeacherDashboard() {
    const [assigned, setAssigned] = useState(MODULES.map(m => m.assigned));
    const [activeTab, setActiveTab] = useState('overview');
    const { allUsers, approveUser, rejectUser } = useAuth();

    const avgScore = Math.round(STUDENTS.reduce((a, s) => a + s.quizScore, 0) / STUDENTS.length);
    const avgXP = Math.round(STUDENTS.reduce((a, s) => a + s.xp, 0) / STUDENTS.length);
    const excellent = STUDENTS.filter(s => s.status === 'excellent').length;
    const needsHelp = STUDENTS.filter(s => s.status === 'needs-help').length;

    const statusBadge = (s) => {
        if (s === 'excellent') return <span className="badge badge-green">Excellent</span>;
        if (s === 'needs-help') return <span className="badge badge-orange" style={{ color: '#ff6b6b', borderColor: 'rgba(255,68,68,0.3)', background: 'rgba(255,68,68,0.1)' }}>Needs Help</span>;
        return <span className="badge badge-gold">On Track</span>;
    };

    const pendingStudents = useMemo(
        () => Object.entries(allUsers || {})
            .filter(([, u]) => u.role === 'student' && u.status === 'pending')
            .map(([email, u]) => ({ email, ...u })),
        [allUsers],
    );

    return (
        <div className="td-root">
            <Navbar />
            <div className="td-body">

                {/* Header banner */}
                <div className="td-banner animate-fade-up-1">
                    <div>
                        <h1 className="td-heading">Class 4B Overview</h1>
                        <p className="td-sub">Monitor student safety awareness progress, approvals and AI interaction data</p>
                    </div>
                    <div className="td-stats-row">
                        <div className="td-stat"><span className="td-stat-val">{STUDENTS.length}</span><span className="td-stat-lbl">Students</span></div>
                        <div className="td-stat"><span className="td-stat-val text-gold">{avgScore}%</span><span className="td-stat-lbl">Avg Quiz</span></div>
                        <div className="td-stat"><span className="td-stat-val text-yellow">{excellent}</span><span className="td-stat-lbl">Excellent</span></div>
                        <div className="td-stat"><span className="td-stat-val" style={{ color: '#ff6b6b' }}>{needsHelp}</span><span className="td-stat-lbl">Need Help</span></div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="td-tabs animate-fade-up-2">
                    {['overview', 'approvals', 'alerts', 'modules'].map(t => (
                        <button key={t} className={`td-tab ${activeTab === t ? 'td-tab-active' : ''}`} onClick={() => setActiveTab(t)}>
                            {t === 'overview'
                                ? '📊 Class Overview'
                                : t === 'approvals'
                                    ? '✅ Approvals'
                                    : t === 'alerts'
                                        ? '🔔 Alerts'
                                        : '📚 Modules'}
                            {t === 'alerts' && <span className="tab-dot">{ALERTS.filter(a => a.severity === 'high').length}</span>}
                        </button>
                    ))}
                </div>

                {activeTab === 'overview' && (
                    <TeacherOverview
                        STUDENTS={STUDENTS}
                        avgScore={avgScore}
                        avgXP={avgXP}
                        excellent={excellent}
                        needsHelp={needsHelp}
                        statusBadge={statusBadge}
                    />
                )}

                {activeTab === 'approvals' && (
                    <TeacherApprovals
                        pendingStudents={pendingStudents}
                        approveUser={approveUser}
                        rejectUser={rejectUser}
                    />
                )}

                {activeTab === 'alerts' && (
                    <TeacherAlerts ALERTS={ALERTS} />
                )}

                {activeTab === 'modules' && (
                    <TeacherModules
                        MODULES={MODULES}
                        assigned={assigned}
                        setAssigned={setAssigned}
                    />
                )}
            </div>
        </div>
    );
}
