import React, { useRef, useEffect } from 'react';

export default function StudentChat({ user, messages, typing, input, setInput, sendMessage }) {
    const messagesEnd = useRef(null);

    useEffect(() => {
        messagesEnd.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, typing]);

    return (
        <div className="card sd-chat-card animate-fade-up-2">
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
    );
}
