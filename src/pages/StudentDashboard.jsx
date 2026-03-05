import { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import './StudentDashboard.css';

const AI_RESPONSES = {
    default: [
        "That's a great question! Remember, if someone is being mean to you online, it's never your fault. 💛",
        "You're doing amazing! Talking about online safety is really brave. 🦁",
        "If someone sends you something that makes you feel uncomfortable, tell a trusted adult right away! 🛡️",
        "Blocking and reporting is a superpower! You don't have to talk to anyone who makes you feel bad. ⚡",
        "Did you know? You should never share your password with anyone, not even your best friend! 🔐",
        "It's okay to take a break from the internet if you feel stressed. Your wellbeing comes first! 🌟",
    ],
    bully: [
        "Cyberbullying is never okay, and it's never your fault. You're not alone — tell a teacher or parent! 💪",
        "If someone is bullying you online, save the messages as evidence and block them. Then tell an adult. 🛡️",
        "Remember: people who bully online are usually going through something hard too. But that doesn't make it okay! 💛",
    ],
    share: [
        "Never share personal info online — that includes your full name, school, address, or phone number! 🔐",
        "Photos you share online can stay there forever. Always ask a parent before posting anything! 📸",
        "Think before you share: would you be okay if everyone in the world saw this? If not, don't post it! 🤔",
    ],
    help: [
        "You can always talk to a teacher, parent, or school counsellor if something online worries you! 🤗",
        "The Childline helpline is always available if you need to talk to someone. You're never alone! 📞",
        "Asking for help is one of the bravest things you can do. I'm proud of you! 🌟",
    ],
};

const SCENARIOS = [
    {
        id: 1, emoji: '😢', title: 'Hurtful Messages',
        question: 'Your classmate sends you a mean message. What should you do?',
        options: [
            { text: 'Send a mean message back', correct: false, feedback: 'Fighting back can make things worse and get you in trouble too.' },
            { text: 'Block them and tell a trusted adult', correct: true, feedback: '✅ Exactly right! Blocking stops the messages, and adults can help stop it for good.' },
            { text: 'Ignore it completely', correct: false, feedback: 'Ignoring might help short-term, but telling an adult helps make it stop properly.' },
        ]
    },
    {
        id: 2, emoji: '🔐', title: 'Password Safety',
        question: 'Your best friend asks for your password to help with your game account. What do you do?',
        options: [
            { text: 'Share it — they\'re my best friend!', correct: false, feedback: 'Even trusted friends might accidentally share your password. Keep it private always!' },
            { text: 'Refuse and explain why you can\'t share passwords', correct: true, feedback: '✅ Smart! Good friends will understand that passwords are private.' },
            { text: 'Give a fake password', correct: false, feedback: 'Being honest is better — just explain that passwords must stay private.' },
        ]
    },
    {
        id: 3, emoji: '📸', title: 'Sharing Photos',
        question: 'Someone you met online asks you to send them a photo of yourself. What do you do?',
        options: [
            { text: 'Send it — they seem friendly', correct: false, feedback: 'People online can pretend to be someone else. Never send photos to online strangers!' },
            { text: 'Ask a parent or adult first', correct: true, feedback: '✅ Always ask a trusted adult before sharing any photos online!' },
            { text: 'Send a photo of your pet instead', correct: false, feedback: 'You should tell a trusted adult about this situation straight away.' },
        ]
    },
];

const BADGES = [
    { id: 1, emoji: '🛡️', name: 'Safety Star', earned: true, desc: 'Learned the basics of online safety' },
    { id: 2, emoji: '🗣️', name: 'Speak Up Hero', earned: true, desc: 'Completed the reporting scenarios' },
    { id: 3, emoji: '🔐', name: 'Password Pro', earned: true, desc: 'Mastered password safety tips' },
    { id: 4, emoji: '🧠', name: 'Cyber Thinker', earned: false, desc: 'Complete 5 AI chats to unlock' },
    { id: 5, emoji: '⚡', name: 'Quick Responder', earned: false, desc: 'Finish a quiz in under 60 seconds' },
    { id: 6, emoji: '🌟', name: 'Guardo Champion', earned: false, desc: 'Complete all modules to unlock' },
];

function getAiReply(message) {
    const lower = message.toLowerCase();
    if (lower.includes('bully') || lower.includes('mean') || lower.includes('hurt')) {
        return AI_RESPONSES.bully[Math.floor(Math.random() * AI_RESPONSES.bully.length)];
    }
    if (lower.includes('share') || lower.includes('photo') || lower.includes('personal')) {
        return AI_RESPONSES.share[Math.floor(Math.random() * AI_RESPONSES.share.length)];
    }
    if (lower.includes('help') || lower.includes('scared') || lower.includes('worried')) {
        return AI_RESPONSES.help[Math.floor(Math.random() * AI_RESPONSES.help.length)];
    }
    return AI_RESPONSES.default[Math.floor(Math.random() * AI_RESPONSES.default.length)];
}

export default function StudentDashboard() {
    const { user } = useAuth();
    const [messages, setMessages] = useState([
        { id: 1, from: 'ai', text: `Hi ${user?.name?.split(' ')[0] || 'there'}! I'm Guardo Bot, your online safety companion! 🦁 Ask me anything about staying safe online, or try the scenario quiz below!` }
    ]);
    const [input, setInput] = useState('');
    const [typing, setTyping] = useState(false);
    const [scenario, setScenario] = useState(0);
    const [answered, setAnswered] = useState(null);
    const [score, setScore] = useState(0);
    const [quizDone, setQuizDone] = useState(false);
    const messagesEnd = useRef(null);

    useEffect(() => {
        messagesEnd.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, typing]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        const userMsg = { id: Date.now(), from: 'user', text: input };
        setMessages(m => [...m, userMsg]);
        setInput('');
        setTyping(true);
        await new Promise(r => setTimeout(r, 900 + Math.random() * 600));
        setTyping(false);
        const reply = getAiReply(userMsg.text);
        setMessages(m => [...m, { id: Date.now() + 1, from: 'ai', text: reply }]);
    };

    const handleAnswer = (option, idx) => {
        if (answered !== null) return;
        setAnswered(idx);
        if (option.correct) setScore(s => s + 1);
        setTimeout(() => {
            if (scenario + 1 < SCENARIOS.length) {
                setScenario(s => s + 1);
                setAnswered(null);
            } else {
                setQuizDone(true);
            }
        }, 2000);
    };

    const resetQuiz = () => { setScenario(0); setAnswered(null); setScore(0); setQuizDone(false); };

    const xpPct = Math.min(100, Math.round((user?.xp % 200) / 200 * 100));
    const cur = SCENARIOS[scenario];

    return (
        <div className="sd-root">
            <Navbar />
            <div className="sd-body">

                {/* Sidebar */}
                <aside className="sd-sidebar">
                    {/* Profile */}
                    <div className="card sd-profile">
                        <div className="sd-avatar">{user?.avatar || '🦁'}</div>
                        <h2 className="sd-name">{user?.name}</h2>
                        <span className="badge badge-orange">{user?.grade || 'Year 4'}</span>
                        <div className="sd-level-row">
                            <span className="text-muted" style={{ fontSize: 12 }}>Level {user?.level || 5}</span>
                            <span className="text-yellow" style={{ fontSize: 12, fontWeight: 700 }}>{user?.xp || 340} XP</span>
                        </div>
                        <div className="xp-bar-wrap" style={{ margin: '6px 0 0' }}><div className="xp-bar-fill" style={{ width: `${xpPct}%` }} /></div>
                        <span className="text-muted" style={{ fontSize: 11 }}>{200 - (user?.xp % 200)} XP to Level {(user?.level || 5) + 1}</span>
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
                    <div key={t} className="tip-row"><span>{e}</span><span>{t}</span></div>
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

        {/* Main */ }
    <main className="sd-main">
        {/* Chat */}
        <div className="card sd-chat-card">
            <div className="chat-header">
                <div className="chat-bot-avatar">🤖</div>
                <div>
                    <h3 className="chat-bot-name">Guardo Bot</h3>
                    <span className="badge badge-green" style={{ fontSize: 11 }}>● Online</span>
                </div>
            </div>
            <div className="chat-messages">
                {messages.map(m => (
                    <div key={m.id} className={`chat-msg ${m.from === 'ai' ? 'msg-ai' : 'msg-user'}`}>
                        {m.from === 'ai' && <span className="msg-avatar">🤖</span>}
                        <div className="msg-bubble">{m.text}</div>
                        {m.from === 'user' && <span className="msg-avatar">{user?.avatar || '🦁'}</span>}
                    </div>
                ))}
                {typing && (
                    <div className="chat-msg msg-ai">
                        <span className="msg-avatar">🤖</span>
                        <div className="msg-bubble typing-indicator">
                            <span /><span /><span />
                        </div>
                    </div>
                )}
                <div ref={messagesEnd} />
            </div>
            <form className="chat-input-row" onSubmit={sendMessage}>
                <input
                    className="input chat-input"
                    placeholder="Ask Guardo Bot anything about online safety…"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                />
                <button type="submit" className="btn btn-primary chat-send" disabled={!input.trim()}>
                    Send ➤
                </button>
            </form>
        </div>

        {/* Scenario Quiz */}
        <div className="card sd-quiz-card">
            <div className="quiz-header-row">
                <h3 className="card-title">🎭 Safety Scenario Quiz</h3>
                <span className="badge badge-gold">
                    {score}/{SCENARIOS.length} correct
                </span>
            </div>

            {quizDone ? (
                <div className="quiz-done">
                    <div className="quiz-done-emoji">{score === SCENARIOS.length ? '🏆' : score >= 2 ? '🌟' : '💪'}</div>
                    <h3>{score === SCENARIOS.length ? 'Perfect Score!' : score >= 2 ? 'Great Job!' : 'Keep Practising!'}</h3>
                    <p>You got <strong>{score}</strong> out of <strong>{SCENARIOS.length}</strong> correct!</p>
                    {score === SCENARIOS.length && <p className="quiz-bonus">+50 XP Bonus earned! 🎉</p>}
                    <button className="btn btn-primary" onClick={resetQuiz} style={{ marginTop: 16 }}>
                        🔁 Try Again
                    </button>
                </div>
            ) : (
                <>
                    <div className="quiz-progress">
                        <div className="quiz-prog-fill" style={{ width: `${((scenario) / SCENARIOS.length) * 100}%` }} />
                    </div>
                    <div className="scenario-card">
                        <div className="scenario-emoji">{cur.emoji}</div>
                        <div className="badge badge-orange" style={{ marginBottom: 12 }}>{cur.title}</div>
                        <p className="scenario-question">{cur.question}</p>
                        <div className="scenario-options">
                            {cur.options.map((opt, idx) => (
                                <button
                                    key={idx}
                                    className={`scenario-opt ${answered !== null
                                            ? opt.correct ? 'opt-correct' : answered === idx ? 'opt-wrong' : 'opt-dim'
                                            : ''
                                        }`}
                                    onClick={() => handleAnswer(opt, idx)}
                                    disabled={answered !== null}
                                >
                                    {opt.text}
                                </button>
                            ))}
                        </div>
                        {answered !== null && (
                            <div className={`opt-feedback ${cur.options[answered].correct ? 'fb-correct' : 'fb-wrong'}`}>
                                {cur.options[answered].feedback}
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    </main>
      </div >
    </div >
  );
}
