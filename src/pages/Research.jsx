import React, { useState, useEffect, useRef } from 'react';
import { Search, BookOpen, Scale, Filter, ChevronRight, Gavel, HelpCircle, MessageSquare, Mic, Send, Share2 } from 'lucide-react';

const Research = () => {
    const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'search' | 'analytics'
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('caselaw');
    const [chatInput, setChatInput] = useState('');
    const [chatHistory, setChatHistory] = useState([
        { role: 'ai', text: "Hello! I am your Legal Intelligence Assistant. Ask me about case law, specific statutes, or draft a legal proposition." }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef(null);

    const allResults = [
        {
            title: 'Kesavananda Bharati v. State of Kerala',
            citation: '(1973) 4 SCC 225',
            summary: 'Established the "Basic Structure Doctrine" of the Constitution of India. Parliament cannot alter the basic features of the Constitution.',
            court: 'Supreme Court of India',
            year: '1973',
            relevance: '98%',
            type: 'Landmark',
            situationMatch: 'Constitutional Amendment Validity'
        },
        {
            title: 'Maneka Gandhi v. Union of India',
            citation: '1978 AIR 597',
            summary: 'Expanded the meaning of "Life and Personal Liberty" under Article 21. Procedure established by law must be just, fair, and reasonable.',
            court: 'Supreme Court of India',
            year: '1978',
            relevance: '95%',
            type: 'Landmark',
            situationMatch: 'Passport Impounding'
        },
        {
            title: 'Driver v. State (Hypothetical)',
            citation: '2023 DHC 445',
            summary: 'Held that sudden brake failure due to rain is a mechanical defect, not negligence, provided maintenance records are clean.',
            court: 'High Court of Delhi',
            year: '2023',
            relevance: '92%',
            type: 'Recent',
            situationMatch: 'Driver Crash Rain'
        }
    ];

    const [results, setResults] = useState(allResults);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatHistory, isTyping]);

    const handleSearch = () => {
        if (!searchTerm) {
            setResults(allResults);
            return;
        }
        const filtered = allResults.filter(r =>
            r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (r.situationMatch && r.situationMatch.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setResults(filtered);
    };

    const handleChatSubmit = () => {
        if (!chatInput.trim()) return;

        const userMsg = { role: 'user', text: chatInput };
        setChatHistory(prev => [...prev, userMsg]);
        setChatInput('');
        setIsTyping(true);

        // Simulate AI "Thinking" and Response
        setTimeout(() => {
            const aiResponseText = `Based on current legal precedents regarding "${userMsg.text}", the courts have generally held that...`;
            const aiMsg = {
                role: 'ai',
                text: aiResponseText,
                sources: [allResults[0], allResults[2]] // Attach mock sources
            };
            setChatHistory(prev => [...prev, aiMsg]);
            setIsTyping(false);
        }, 2000);
    };

    return (
        <div style={{ height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column' }}>

            {/* Header / Tabs */}
            <header style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>Research & Intelligence</h1>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <button onClick={() => setActiveTab('chat')} style={{ background: 'none', border: 'none', padding: '0.5rem 0', cursor: 'pointer', borderBottom: activeTab === 'chat' ? '2px solid var(--color-primary)' : 'none', color: activeTab === 'chat' ? 'var(--color-primary)' : '#64748b', fontWeight: 600 }}>
                            <MessageSquare size={16} style={{ marginBottom: '-2px', marginRight: '6px' }} />
                            AI Assistant
                        </button>
                        <button onClick={() => setActiveTab('search')} style={{ background: 'none', border: 'none', padding: '0.5rem 0', cursor: 'pointer', borderBottom: activeTab === 'search' ? '2px solid var(--color-primary)' : 'none', color: activeTab === 'search' ? 'var(--color-primary)' : '#64748b', fontWeight: 600 }}>
                            <Search size={16} style={{ marginBottom: '-2px', marginRight: '6px' }} />
                            Database Search
                        </button>
                        <button onClick={() => setActiveTab('analytics')} style={{ background: 'none', border: 'none', padding: '0.5rem 0', cursor: 'pointer', borderBottom: activeTab === 'analytics' ? '2px solid var(--color-primary)' : 'none', color: activeTab === 'analytics' ? 'var(--color-primary)' : '#64748b', fontWeight: 600 }}>
                            <Gavel size={16} style={{ marginBottom: '-2px', marginRight: '6px' }} />
                            Judge Analytics
                        </button>
                    </div>
                </div>
            </header>

            {/* CONTENT AREA */}
            <div className="paper" style={{ flex: 1, padding: activeTab === 'chat' ? '0' : '2rem', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

                {/* --- CHAT TAB --- */}
                {activeTab === 'chat' && (
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <div style={{ flex: 1, padding: '2rem', overflowY: 'auto', backgroundColor: '#f8fafc' }}>
                            {chatHistory.map((msg, i) => (
                                <div key={i} style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                                    <div style={{ maxWidth: '80%', display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                                        <div style={{
                                            padding: '1rem 1.5rem',
                                            borderRadius: '16px',
                                            borderTopRightRadius: msg.role === 'user' ? '4px' : '16px',
                                            borderTopLeftRadius: msg.role === 'ai' ? '4px' : '16px',
                                            backgroundColor: msg.role === 'user' ? 'var(--color-primary)' : '#fff',
                                            color: msg.role === 'user' ? '#fff' : '#1e293b',
                                            boxShadow: msg.role === 'ai' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                                            lineHeight: '1.6'
                                        }}>
                                            {msg.text}
                                        </div>

                                        {/* Citation Cards for AI */}
                                        {msg.sources && (
                                            <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.75rem', overflowX: 'auto', maxWidth: '100%', paddingBottom: '0.5rem' }}>
                                                {msg.sources.map((src, idx) => (
                                                    <div key={idx} style={{ minWidth: '200px', backgroundColor: '#fff', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.2s' }}>
                                                        <div style={{ fontWeight: 600, color: 'var(--color-navy)', marginBottom: '0.25rem' }}>{src.title}</div>
                                                        <div style={{ color: '#64748b' }}>{src.citation}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem', padding: '1rem' }}>
                                    <div style={{ width: '8px', height: '8px', backgroundColor: '#94a3b8', borderRadius: '50%', animation: 'bounce 1s infinite' }}></div>
                                    <div style={{ width: '8px', height: '8px', backgroundColor: '#94a3b8', borderRadius: '50%', animation: 'bounce 1s infinite 0.2s' }}></div>
                                    <div style={{ width: '8px', height: '8px', backgroundColor: '#94a3b8', borderRadius: '50%', animation: 'bounce 1s infinite 0.4s' }}></div>
                                </div>
                            )}
                            <div ref={chatEndRef}></div>
                        </div>

                        {/* Input Area */}
                        <div style={{ padding: '1.5rem', backgroundColor: '#fff', borderTop: '1px solid #e2e8f0' }}>
                            <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
                                <input
                                    type="text"
                                    placeholder="Ask anything (e.g., 'Latest Supreme Court judgments on Bail in PMLA cases')..."
                                    value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
                                    style={{ width: '100%', padding: '1rem 3rem 1rem 1.5rem', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '1rem', outline: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}
                                />
                                <button onClick={handleChatSubmit} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-primary)' }}>
                                    <Send size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}


                {/* --- SEARCH TAB (Legacy View) --- */}
                {activeTab === 'search' && (
                    <div style={{ overflowY: 'auto' }}>
                        <div style={{ marginBottom: '2rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                    <input type="radio" name="searchType" checked={searchType === 'caselaw'} onChange={() => setSearchType('caselaw')} style={{ marginRight: '0.5rem' }} />
                                    <BookOpen size={16} style={{ marginRight: '0.4rem' }} /> Case Law
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                    <input type="radio" name="searchType" checked={searchType === 'bareact'} onChange={() => setSearchType('bareact')} style={{ marginRight: '0.5rem' }} />
                                    <Scale size={16} style={{ marginRight: '0.4rem' }} /> Bare Acts
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', backgroundColor: searchType === 'situation' ? '#f0f9ff' : 'transparent', padding: '2px 8px', borderRadius: '4px' }}>
                                    <input type="radio" name="searchType" checked={searchType === 'situation'} onChange={() => setSearchType('situation')} style={{ marginRight: '0.5rem' }} />
                                    <HelpCircle size={16} style={{ marginRight: '0.4rem', color: '#0284c7' }} /> Similar Situation
                                </label>
                            </div>

                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input
                                    type="text"
                                    placeholder="Enter keywords, citation, or act name..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{ flex: 1, padding: '0.75rem 1rem', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '4px', outline: 'none' }}
                                />
                                <button onClick={handleSearch} className="btn btn-primary" style={{ padding: '0 2rem' }}>
                                    <Search size={20} />
                                </button>
                            </div>
                        </div>

                        <div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--color-navy)' }}>
                                {results.length === 0 ? 'No Results Found' : 'Search Results'}
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {results.map((caseItem, i) => (
                                    <div key={i} className="paper" style={{ padding: '1.5rem', cursor: 'pointer', border: '1px solid #eee' }}>
                                        <h2 style={{ fontSize: '1.25rem', margin: '0 0 0.5rem 0', color: 'var(--color-navy)' }}>{caseItem.title}</h2>
                                        <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.75rem' }}>{caseItem.citation} • {caseItem.year}</div>
                                        <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#333', margin: 0 }}>{caseItem.summary}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* --- ANALYTICS TAB --- */}
                {activeTab === 'analytics' && (
                    <div className="fade-in" style={{ overflowY: 'auto' }}>
                        <div style={{ padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '8px', marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '2rem' }}>
                                <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', border: '1px solid #e5e7eb' }}>⚖️</div>
                                <div>
                                    <h2 style={{ margin: 0, fontSize: '1.8rem', color: '#111' }}>Justice A.K. Sikri (Retd)</h2>
                                    <p style={{ margin: '0.25rem 0 0 0', color: '#666' }}>Supreme Court of India • 20 Years Experience</p>
                                </div>
                                <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                                    <div style={{ fontSize: '2rem', fontWeight: 700, color: '#16a34a' }}>68%</div>
                                    <div style={{ fontSize: '0.85rem', color: '#666' }}>Bail Grant Rate</div>
                                </div>
                            </div>
                            {/* ... Analytics bars ... */}
                            <p style={{ color: '#666', fontStyle: 'italic' }}>Full Analytics Dashboard available in Premium Plan.</p>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Research;
