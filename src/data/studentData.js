export const AI_RESPONSES = {
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

export const SCENARIOS = [
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

export const BADGES = [
    { id: 1, emoji: '🛡️', name: 'Safety Star', earned: true, desc: 'Learned the basics of online safety' },
    { id: 2, emoji: '🗣️', name: 'Speak Up Hero', earned: true, desc: 'Completed the reporting scenarios' },
    { id: 3, emoji: '🔐', name: 'Password Pro', earned: true, desc: 'Mastered password safety tips' },
    { id: 4, emoji: '🧠', name: 'Cyber Thinker', earned: false, desc: 'Complete 5 AI chats to unlock' },
    { id: 5, emoji: '⚡', name: 'Quick Responder', earned: false, desc: 'Finish a quiz in under 60 seconds' },
    { id: 6, emoji: '🌟', name: 'Guardo Champion', earned: false, desc: 'Complete all modules to unlock' },
];

export function getAiReply(message) {
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
