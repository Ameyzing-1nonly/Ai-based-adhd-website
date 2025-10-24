import React, { useState, useRef, useEffect } from 'react';
import { Send, Plus, Trash2, Brain, Sparkles, Loader } from 'lucide-react';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export default function AIChat() {
  const [messages, setMessages] = useState([{
    id: 1,
    role: 'assistant',
    content: "Hi! I'm your AI Memory Assistant powered by Gemini 2.5 Flash.\n\nI can help you:\n✅ Remember tasks and appointments\n📝 Extract action items from thoughts\n💊 Track medication reminders\n🧠 Provide ADHD strategies\n\nHow can I help you today?",
    timestamp: new Date()
  }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (userMessage) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ 
          text: `You are an AI Memory Assistant for people with ADHD. Be concise, supportive, and use helpful emojis.\n\nUser: ${userMessage}\n\nAssistant:` 
        }] }]
      })
    });

    const data = await response.json();
    if (data.candidates && data.candidates[0]) {
      return data.candidates[0].content.parts[0].text;
    }
    throw new Error('Invalid response');
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = { id: Date.now(), role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    const userInput = input;
    setInput('');
    setIsTyping(true);

    try {
      const aiText = await sendMessage(userInput);
      const aiMsg = { id: Date.now() + 1, role: 'assistant', content: aiText, timestamp: new Date() };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      const errMsg = { id: Date.now() + 1, role: 'assistant', content: `❌ Error: ${error.message}`, timestamp: new Date() };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const suggestions = [
    "Help me organize my tasks",
    "I keep forgetting medication",
    "Give me an ADHD productivity tip",
    "Extract: Call mom, buy groceries, finish report"
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r flex flex-col">
        <div className="p-4 border-b">
          <button onClick={() => setMessages([messages[0]])} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-3 rounded-lg hover:opacity-90 font-medium flex items-center justify-center gap-2">
            <Plus size={20} />
            New Chat
          </button>
        </div>
        <div className="flex-1 p-4">
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="text-purple-600" size={20} />
              <span className="font-bold text-purple-900">Gemini 2.5</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Connected
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <Brain className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-lg font-bold">AI Memory Assistant</h1>
              <p className="text-xs text-green-600">● Online</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-3 max-w-3xl ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'assistant' ? 'bg-gradient-to-br from-purple-500 to-blue-500' : 'bg-gray-700'}`}>
                  {msg.role === 'assistant' ? <Sparkles className="text-white" size={16} /> : <span className="text-white text-xs font-bold">U</span>}
                </div>
                <div className={`flex-1 ${msg.role === 'user' ? 'text-right' : ''}`}>
                  <div className={`inline-block p-4 rounded-2xl ${msg.role === 'assistant' ? 'bg-white border' : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'}`}>
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <Loader className="text-white animate-spin" size={16} />
              </div>
              <div className="bg-white border p-4 rounded-2xl">
                <p className="text-sm text-gray-600">Thinking...</p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {messages.length === 1 && (
          <div className="px-6 pb-4">
            <p className="text-xs text-gray-500 mb-2">Try these:</p>
            <div className="grid grid-cols-2 gap-2">
              {suggestions.map((s, i) => (
                <button key={i} onClick={() => { setInput(s); inputRef.current?.focus(); }} className="text-left p-3 bg-white border rounded-lg hover:border-purple-300 hover:bg-purple-50 text-sm">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="bg-white border-t p-6">
          <div className="max-w-4xl mx-auto flex items-end gap-3">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              rows="1"
              disabled={isTyping}
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
            <button onClick={handleSend} disabled={!input.trim() || isTyping} className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:opacity-90 disabled:opacity-50">
              {isTyping ? <Loader className="animate-spin" size={20} /> : <Send size={20} />}
            </button>
          </div>
          <p className="text-center text-xs text-gray-500 mt-2">Powered by Gemini 2.5 Flash</p>
        </div>
      </div>
    </div>
  );
}