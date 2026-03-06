import React from 'react';
import { BADGES } from '../../data/studentData';

export default function StudentSidebar({ user, xpPct }) {
    return (
        <aside className="sd-sidebar animate-fade-up-1">
            {/* Profile */}
            <div className="card sd-profile">
                <div className="sd-avatar">{user?.avatar || '🦁'}</div>
                <h2 className="sd-name">{user?.name}</h2>
                <span className="badge badge-orange">{user?.grade || 'Year 4'}</span>
                <div className="sd-level-row">
                    <span className="text-muted" style={{ fontSize: 12 }}>Level {user?.level || 5}</span>
                    <span className="text-yellow" style={{ fontSize: 12, fontWeight: 700 }}>{user?.xp || 340} XP</span>
                </div>
                <div className="xp-bar-wrap" style={{ margin: '6px 0 0' }}>
                    <div className="xp-bar-fill" style={{ width: `${xpPct}%` }} />
                </div>
                <span className="text-muted" style={{ fontSize: 11 }}>
                    {200 - (user?.xp % 200)} XP to Level {(user?.level || 5) + 1}
                </span>
            </div>

            {/* Quick Tips */}
            <div className="card sd-tips">
                <h3 className="card-title">🌟 Safety Tips</h3>
                {[
                    ['🔐', 'Keep passwords private'],
                    ['🚫', 'Block & report bullies'],
                    ['📢', 'Tell a trusted adult'],
                    ['🤔', 'Think before you post'],
                    ['📵', 'Take screen breaks'],
                ].map(([e, t]) => (
                    <div key={t} className="tip-row">
                        <span>{e}</span>
                        <span>{t}</span>
                    </div>
                ))}
            </div>

            {/* Badges */}
            <div className="card sd-badges">
                <h3 className="card-title">🏅 My Badges</h3>
                <div className="badges-grid">
                    {BADGES.map(b => (
                        <div key={b.id} className={`badge-item ${b.earned ? 'earned' : 'locked'}`} title={b.desc}>
                            <span className="badge-emoji">{b.earned ? b.emoji : '🔒'}</span>
                            <span className="badge-name">{b.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
}
