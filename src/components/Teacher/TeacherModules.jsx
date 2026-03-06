import React from 'react';

export default function TeacherModules({ MODULES, assigned, setAssigned }) {
    return (
        <div className="card">
            <h3 className="card-title" style={{ marginTop: 0 }}>Module Management</h3>
            <p className="text-muted" style={{ marginBottom: 24 }}>Assign or lock safety modules for your class.</p>
            <div className="td-modules-grid">
                {MODULES.map((m, i) => (
                    <div key={m.id} className="td-module-card">
                        <div className="td-mod-head">
                            <span className="td-mod-icon">{m.icon}</span>
                            <label className="set-switch">
                                <input type="checkbox" checked={assigned[i]} onChange={() => {
                                    const next = [...assigned];
                                    next[i] = !next[i];
                                    setAssigned(next);
                                }} />
                                <span className="set-slider"></span>
                            </label>
                        </div>
                        <div className="td-mod-title">{m.title}</div>
                        <div className="td-mod-desc">{m.desc}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
