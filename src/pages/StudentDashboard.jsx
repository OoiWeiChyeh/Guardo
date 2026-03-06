import { useState } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import '../styles/StudentDashboard.css';

import { SCENARIOS, getAiReply } from '../data/studentData';
import StudentSidebar from '../components/Student/StudentSidebar';
import StudentChat from '../components/Student/StudentChat';
import StudentQuiz from '../components/Student/StudentQuiz';

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

    return (
        <div className="sd-root">
            <Navbar />
            <div className="sd-body">
                <StudentSidebar user={user} xpPct={xpPct} />

                <main className="sd-main">
                    <StudentChat
                        user={user}
                        messages={messages}
                        typing={typing}
                        input={input}
                        setInput={setInput}
                        sendMessage={sendMessage}
                    />

                    <StudentQuiz
                        scenario={scenario}
                        answered={answered}
                        score={score}
                        quizDone={quizDone}
                        handleAnswer={handleAnswer}
                        resetQuiz={resetQuiz}
                    />
                </main>
            </div>
        </div>
    );
}
