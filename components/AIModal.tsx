import React, { useState, useEffect } from 'react';
import { X, Sparkles, MessageSquare, BookOpen, Send } from 'lucide-react';
import { Episode } from '../types';
import { getBookSummary, askBookQuestion } from '../services/geminiService';

interface AIModalProps {
  episode: Episode;
  isOpen: boolean;
  onClose: () => void;
}

const AIModal: React.FC<AIModalProps> = ({ episode, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'chat'>('summary');
  const [summary, setSummary] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'ai', text: string}[]>([]);

  useEffect(() => {
    if (isOpen && activeTab === 'summary' && !summary) {
      fetchSummary();
    }
  }, [isOpen, activeTab]);

  const fetchSummary = async () => {
    setIsLoading(true);
    const result = await getBookSummary(episode.title, episode.author);
    setSummary(result);
    setIsLoading(false);
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setChatInput('');
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    
    setIsLoading(true);
    const answer = await askBookQuestion(episode.title, episode.author, userMsg);
    setIsLoading(false);
    
    setChatHistory(prev => [...prev, { role: 'ai', text: answer }]);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[1100] flex justify-center p-4 pt-8 md:pt-12 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="fixed inset-0 bg-[#36454f]/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true"></div>
      
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl relative flex flex-col h-fit max-h-none mb-12 animate-fade-in-up">
        {/* Header */}
        <div className="bg-[#1695a0] p-6 text-white flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
                <Sparkles size={18} className="text-yellow-300" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-wider text-white/80">AI Companion</span>
            </div>
            <h2 id="modal-title" className="text-2xl font-serif font-bold">{episode.title}</h2>
            <p className="text-white/80 text-sm">{episode.author}</p>
          </div>
          <button 
            onClick={onClose} 
            className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
            aria-label="Close modal"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100" role="tablist">
          <button 
            role="tab"
            aria-selected={activeTab === 'summary'}
            onClick={() => setActiveTab('summary')}
            className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${activeTab === 'summary' ? 'text-[#1695a0] border-b-2 border-[#1695a0] bg-teal-50/30' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <BookOpen size={18} aria-hidden="true" />
            Quick Summary
          </button>
          <button 
            role="tab"
            aria-selected={activeTab === 'chat'}
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${activeTab === 'chat' ? 'text-[#1695a0] border-b-2 border-[#1695a0] bg-teal-50/30' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <MessageSquare size={18} aria-hidden="true" />
            Ask Question
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-grow bg-gray-50">
          {activeTab === 'summary' && (
            <div className="space-y-4" role="tabpanel">
              {isLoading && !summary ? (
                <div className="flex flex-col items-center justify-center py-10 space-y-4 text-gray-400">
                    <div className="w-8 h-8 border-4 border-[#1695a0] border-t-transparent rounded-full animate-spin"></div>
                    <p>Analyzing book content...</p>
                </div>
              ) : (
                <div className="prose prose-teal max-w-none text-[#36454f]">
                   <h3 className="text-lg font-bold text-[#1695a0] mb-4">Key Takeaways</h3>
                   <div className="whitespace-pre-wrap leading-relaxed bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                      {summary}
                   </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'chat' && (
            <div className="flex flex-col h-full" role="tabpanel">
              <div className="flex-grow space-y-4 mb-4 min-h-[200px]">
                {chatHistory.length === 0 && (
                    <div className="text-center py-10 text-gray-400 text-sm">
                        <p>Ask anything about "{episode.title}"!</p>
                        <p className="mt-2">e.g. "What is the main argument?" or "How can I apply this?"</p>
                    </div>
                )}
                {chatHistory.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${msg.role === 'user' ? 'bg-[#1695a0] text-white' : 'bg-white border border-gray-200 text-[#36454f]'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                            <div className="flex gap-1">
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                            </div>
                        </div>
                    </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Input for Chat */}
        {activeTab === 'chat' && (
            <div className="p-4 bg-white border-t border-gray-100">
                <form onSubmit={handleChatSubmit} className="flex gap-2">
                    <label htmlFor="ai-chat-input" className="sr-only">Type your question</label>
                    <input 
                        id="ai-chat-input"
                        type="text" 
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Type your question..."
                        className="flex-grow px-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:border-[#1695a0] focus:ring-1 focus:ring-[#1695a0]"
                    />
                    <button 
                        type="submit"
                        disabled={isLoading || !chatInput.trim()}
                        className="bg-[#1695a0] text-white p-2.5 rounded-full hover:bg-[#127a82] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        aria-label="Send message"
                    >
                        <Send size={18} aria-hidden="true" />
                    </button>
                </form>
            </div>
        )}
      </div>
    </div>
  );
};

export default AIModal;