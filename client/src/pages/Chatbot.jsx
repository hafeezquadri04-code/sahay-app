import { useEffect, useRef, useState } from 'react';
import { sendChatMessage, getChatbotStatus } from '../services/chatbotService';

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [botStatus, setBotStatus] = useState('connecting...');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    async function checkStatus() {
      try {
        const data = await getChatbotStatus();
        setBotStatus(data.status || 'online');
        setMessages([
          {
            role: 'bot',
            text: 'Hello! I\'m the Sahay Bot. Ask me about government schemes, eligibility, or benefits. For example, try "health", "scholarship", or "skills".',
          },
        ]);
      } catch {
        setBotStatus('offline');
        setMessages([
          { role: 'bot', text: 'I\'m having trouble connecting. Please try again later.' },
        ]);
      }
    }
    checkStatus();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function handleSend(e) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    setMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
    setInput('');
    setIsSending(true);

    try {
      const data = await sendChatMessage(trimmed);
      setMessages((prev) => [...prev, { role: 'bot', text: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: 'Sorry, something went wrong. Try again.' },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="page-shell py-10 md:py-16">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-xl text-white shadow-lg">
            🤖
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Sahay Bot</h1>
            <p className="text-sm text-slate-500">
              Status:{' '}
              <span
                className={
                  botStatus === 'online' ? 'text-emerald-600 font-semibold' : 'text-amber-600'
                }
              >
                {botStatus}
              </span>
            </p>
          </div>
        </div>

        <div className="glass-card mt-6 flex flex-col" style={{ height: '28rem' }}>
          {/* Message area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-slate-900 text-white'
                      : 'border border-slate-200 bg-white text-slate-800'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isSending && (
              <div className="flex justify-start">
                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500">
                  <span className="animate-pulse">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <form
            onSubmit={handleSend}
            className="flex gap-3 border-t border-slate-200 p-4"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="input-field flex-1"
              placeholder="Ask about schemes, eligibility..."
              disabled={isSending}
            />
            <button
              type="submit"
              className="primary-button"
              disabled={isSending || !input.trim()}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}