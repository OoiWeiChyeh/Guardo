import React from 'react';

export default function TeacherAlerts({ ALERTS }) {
    return (
        <div className="card">
            <h3 className="card-title" style={{ marginTop: 0 }}>Recent Alerts</h3>
            <div className="td-alerts-list">
                {ALERTS.map(a => (
                    <div key={a.id} className="td-alert-item">
                        <div className="td-alert-icon">{a.icon}</div>
                        <div style={{ flex: 1 }}>
                            <div className="td-alert-hdr">
                                <span className="td-alert-name">{a.student}</span>
                                <span className={`badge ${a.severity === 'high' ? 'td-sev-high' : a.severity === 'medium' ? 'td-sev-med' : 'td-sev-low'}`}>
                                    {a.severity}
                                </span>
                            </div>
                            <p className="td-alert-msg">{a.msg}</p>
                            <div className="td-alert-time">{a.time}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
