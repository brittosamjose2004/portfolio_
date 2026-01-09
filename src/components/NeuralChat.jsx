import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Sparkles, Terminal } from 'lucide-react';
import './NeuralChat.css';

const TypewriterText = ({ text }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let index = 0;
        const intervalId = setInterval(() => {
            setDisplayedText((prev) => prev + text.charAt(index));
            index++;
            if (index === text.length) clearInterval(intervalId);
        }, 30); // Speed of typing

        return () => clearInterval(intervalId);
    }, [text]);

    return <span>{displayedText}</span>;
};

const QuickChips = ({ onSelect }) => {
    const chips = ["Projects", "Skills", "Contact", "Experience"];
    return (
        <div className="quick-chips">
            {chips.map(chip => (
                <button key={chip} onClick={() => onSelect(chip)} className="chip-btn">
                    {chip}
                </button>
            ))}
        </div>
    );
};

const NeuralChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "System Online. Neural Link Established. How may I assist you?", sender: 'bot' }
    ]);
    const [inputText, setInputText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages, isTyping]);

    const generateResponse = (text) => {
        // Fallback Logic (Default)
        const lower = text.toLowerCase();
        if (lower.includes('project') || lower.includes('work')) return "Accessing Project Database... Found: 'Architexture' (GenAI), 'Resume Ranker AI', and predictive models. Would you like details on a specific stack?";
        if (lower.includes('skill') || lower.includes('stack')) return "Scanning Capabilities... Confirmed expertise in: Generative AI, LLMs, Computer Vision (OpenCV), and Full-Stack Engineering (React/Flask).";
        if (lower.includes('contact') || lower.includes('email') || lower.includes('hire')) return "Commencing Outreach Protocol... Email: brittosamjosej@gmail.com. LinkedIn connection ready.";
        if (lower.includes('experience')) return "Retrieving History... Current Status: AI Intern at Impactree.ai. Previous logs: Hexalith Solutions, Plant Green Inertia.";
        return "Command not recognized in local database. Please refine query or select a Quick Chip.";
    };

    const [status, setStatus] = useState("initializing");

    const fetchAIResponse = async (userText) => {
        const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

        if (!apiKey) {
            setStatus("offline");
            return generateResponse(userText);
        }

        setStatus("online");
        try {
            // dynamic import to avoid build errors if file missing initially
            const { resumeText } = await import('../data/resumeData.js');

            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: `You are Britto's AI Portfolio Assistant. You have full access to his resume. \n\nResume Context: ${resumeText}\n\nGUIDELINES:\n1. Answer any question using the resume context.\n2. Be helpful and detailed if asked for specifics.\n3. Maintain a sci-fi/AI persona (like JARVIS or Neural Link).\n4. If the answer is not in the resume, suggest contacting Britto directly.` },
                        { role: "user", content: userText }
                    ],
                    max_tokens: 300
                })
            });

            if (!response.ok) throw new Error('OpenAI API Error');

            const data = await response.json();
            const aiText = data.choices[0].message.content;
            return aiText;
        } catch (error) {
            console.error("AI Mode Failed, switching to fallback:", error);
            return generateResponse(userText);
        }
    };

    const handleSend = async (text) => {
        if (!text.trim()) return;

        const userMsg = { id: Date.now(), text: text, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInputText("");
        setIsTyping(true);

        // Simulate AI processing time then fetch
        setTimeout(async () => {
            const botResponse = await fetchAIResponse(text);
            setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: 'bot' }]);
            setIsTyping(false);
        }, 1500);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSend(inputText);
    };

    return (
        <div className="neural-chat-wrapper">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="chat-window sci-fi-border"
                        initial={{ opacity: 0, y: 50, scale: 0.9, height: 0 }}
                        animate={{ opacity: 1, y: 0, scale: 1, height: '500px' }}
                        exit={{ opacity: 0, y: 50, scale: 0.9, height: 0 }}
                    >
                        {/* HUD Elements */}
                        <div className="scanline"></div>
                        <div className="hud-corner top-left"></div>
                        <div className="hud-corner top-right"></div>
                        <div className="hud-corner bottom-left"></div>
                        <div className="hud-corner bottom-right"></div>

                        <div className="chat-header">
                            <div className="chat-title">
                                <Bot size={18} className="pulse-icon" />
                                <span className="glitch-text-sm">NEURAL LINK v2.0</span>
                            </div>
                            <div className="header-controls">
                                <div className={`status-indicator ${status === 'online' ? 'online' : 'offline'}`}>
                                    <span className="status-dot"></span>
                                    <span className="status-text">{status === 'online' ? 'NET_ONLINE' : 'NET_OFFLINE'}</span>
                                </div>
                                <button onClick={() => setIsOpen(false)} className="close-btn"><X size={16} /></button>
                            </div>
                        </div>

                        <div className="chat-body custom-scrollbar">
                            {messages.map(msg => (
                                <div key={msg.id} className={`chat-msg ${msg.sender}`}>
                                    {msg.sender === 'bot' ? <TypewriterText text={msg.text} /> : msg.text}
                                </div>
                            ))}
                            {isTyping && (
                                <div className="chat-msg bot typing-indicator">
                                    <Terminal size={14} className="typing-icon" />
                                    <span>Processing...</span>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="input-zone">
                            <QuickChips onSelect={handleSend} />
                            <form onSubmit={handleSubmit} className="chat-input-area">
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    placeholder="Execute command..."
                                />
                                <button type="submit" className="send-btn"><Send size={16} /></button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                className="chat-toggle-btn holographic-btn"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                {isOpen ? <X size={24} /> : <Sparkles size={24} />}
            </motion.button>
        </div>
    );
};

export default NeuralChat;
