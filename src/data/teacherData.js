export const STUDENTS = [
    { id: 1, name: 'Alex Johnson', avatar: '🦁', grade: 'Yr4', xp: 340, level: 5, modules: 3, quizScore: 80, status: 'on-track', lastSeen: '2h ago' },
    { id: 2, name: 'Maya Patel', avatar: '🐯', grade: 'Yr4', xp: 510, level: 7, modules: 5, quizScore: 95, status: 'excellent', lastSeen: '1h ago' },
    { id: 3, name: 'Sam Chen', avatar: '🦊', grade: 'Yr4', xp: 120, level: 2, modules: 1, quizScore: 45, status: 'needs-help', lastSeen: '3d ago' },
    { id: 4, name: 'Priya Sharma', avatar: '🐺', grade: 'Yr4', xp: 270, level: 4, modules: 2, quizScore: 72, status: 'on-track', lastSeen: '5h ago' },
    { id: 5, name: 'Jack Williams', avatar: '🦅', grade: 'Yr4', xp: 180, level: 3, modules: 2, quizScore: 60, status: 'on-track', lastSeen: '1d ago' },
    { id: 6, name: 'Chloe Martin', avatar: '🦋', grade: 'Yr4', xp: 420, level: 6, modules: 4, quizScore: 88, status: 'excellent', lastSeen: '30m ago' },
];

export const ALERTS = [
    { id: 1, icon: '⚠️', student: 'Sam Chen', msg: 'Sam answered incorrectly on 3 consecutive bullying scenarios.', time: '3 days ago', severity: 'high' },
    { id: 2, icon: '📋', student: 'Jack Williams', msg: 'Jack has not completed this week\'s module.', time: '1 day ago', severity: 'medium' },
    { id: 3, icon: '🎉', student: 'Maya Patel', msg: 'Maya reached Level 7 and earned the Cyber Thinker badge!', time: '1 hour ago', severity: 'info' },
];

export const MODULES = [
    { id: 1, title: 'Intro to Online Safety', desc: 'Basics of safe browsing and identity protection', icon: '🔐', assigned: true },
    { id: 2, title: 'Recognising Cyberbullying', desc: 'Identifying and responding to online bullying', icon: '🛡️', assigned: true },
    { id: 3, title: 'Sharing & Privacy', desc: 'What to share and what to keep private', icon: '📸', assigned: false },
    { id: 4, title: 'Seeking Help', desc: 'When and how to ask for adult support', icon: '🤝', assigned: false },
];
