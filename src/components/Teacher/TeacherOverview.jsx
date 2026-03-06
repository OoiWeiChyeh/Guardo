import React from 'react';

export default function TeacherOverview({ STUDENTS, avgScore, avgXP, excellent, needsHelp, statusBadge }) {
    return (
        <div className="card animate-fade-up-3">
            <h3 className="card-title" style={{ marginTop: 0 }}>Student Progress</h3>
            <div className="td-table-wrap">
                <table className="td-table">
                    <thead>
                        <tr>
                            <th>Student</th>
                            <th>Status</th>
                            <th>XP</th>
                            <th>Modules</th>
                            <th>Avg Quiz</th>
                        </tr>
                    </thead>
                    <tbody>
                        {STUDENTS.map(s => (
                            <tr key={s.id}>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <div className="td-avatar">{s.avatar}</div>
                                        <div>
                                            <div style={{ fontWeight: 600, color: '#f8f9fa' }}>{s.name}</div>
                                            <div className="text-muted" style={{ fontSize: 13 }}>{s.grade} • Last seen {s.lastSeen}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{statusBadge(s.status)}</td>
                                <td>
                                    <div style={{ fontWeight: 600 }}>{s.xp}</div>
                                    <div className="text-muted" style={{ fontSize: 13 }}>Level {s.level}</div>
                                </td>
                                <td>
                                    <div className="td-progress-col">
                                        <span style={{ minWidth: 24 }}>{s.modules}/5</span>
                                        <div className="xp-bar-wrap" style={{ flex: 1 }}>
                                            <div className="xp-bar-fill" style={{ width: `${(s.modules / 5) * 100}%` }} />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span style={{ color: s.quizScore >= 80 ? '#4caf50' : s.quizScore < 60 ? '#ff6b6b' : '#f8f9fa' }}>
                                        {s.quizScore}%
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
