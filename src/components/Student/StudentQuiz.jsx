import React from 'react';
import { SCENARIOS } from '../../data/studentData';

export default function StudentQuiz({ scenario, answered, score, quizDone, handleAnswer, resetQuiz }) {
    const cur = SCENARIOS[scenario];

    return (
        <div className="card sd-quiz-card animate-fade-up-3">
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
    );
}
