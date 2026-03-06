import React from 'react';

export default function TeacherApprovals({ pendingStudents, approveUser, rejectUser }) {
    return (
        <div className="card td-approvals-card">
            <div className="td-table-header">
                <h3 className="card-title" style={{ margin: 0 }}>Pending student registrations</h3>
                <span className="text-muted" style={{ fontSize: 13 }}>
                    {pendingStudents.length === 0
                        ? 'No students waiting for approval.'
                        : `${pendingStudents.length} student(s) awaiting your review`}
                </span>
            </div>
            {pendingStudents.length === 0 ? (
                <p className="td-approvals-empty">
                    🎉 All caught up! New student sign‑ups will appear here for your approval.
                </p>
            ) : (
                <div className="td-table-wrap">
                    <table className="td-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Class</th>
                                <th style={{ textAlign: 'right' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingStudents.map(student => (
                                <tr key={student.email}>
                                    <td style={{ fontWeight: 600 }}>{student.name}</td>
                                    <td className="text-muted">{student.email}</td>
                                    <td><span className="badge badge-orange">{student.grade || 'N/A'}</span></td>
                                    <td style={{ textAlign: 'right' }}>
                                        <button className="btn btn-sm btn-ghost" style={{ marginRight: 8, color: '#ff6b6b' }} onClick={() => rejectUser(student.email)}>
                                            Reject
                                        </button>
                                        <button className="btn btn-sm btn-gold" onClick={() => approveUser(student.email)}>
                                            Approve
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
