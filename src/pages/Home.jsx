import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, FileText, Scale, MessageSquare, ArrowRight, Zap, BookOpen } from 'lucide-react';

const Home = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsTyping(true);
        // Simulate AI processing
        setTimeout(() => {
            setIsTyping(false);
            navigate('/research');
        }, 1500);
    };

    const exampleQueries = [
        "What are the grounds for granting bail under Section 439 CrPC?",
        "Draft a mutual NDA for a tech startup",
        "Find recent Supreme Court judgments on Article 21",
        "Analyze this employment agreement for risks"
    ];

    return (
        <div style={{ minHeight: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column' }}>

            {/* Hero Section */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '4rem 2rem', textAlign: 'center', background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)' }}>

                <div style={{ maxWidth: '900px', width: '100%' }}>
                    {/* Branding */}
                    <div style={{ marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                            <Sparkles size={32} color="#0ea5e9" style={{ marginRight: '12px' }} />
                            <h1 style={{ fontSize: '3rem', margin: 0, background: 'linear-gradient(135deg, #0369a1 0%, #0ea5e9 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 800 }}>
                                LexMind AI
                            </h1>
                        </div>
                        <p style={{ fontSize: '1.5rem', color: '#64748b', margin: 0, fontWeight: 500 }}>
                            Your AI Legal Assistant for Indian Law
                        </p>
                    </div>

                    {/* Main Search Box */}
                    <form onSubmit={handleSearch} style={{ marginBottom: '3rem' }}>
                        <div style={{ position: 'relative', maxWidth: '700px', margin: '0 auto' }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: 'white',
                                borderRadius: '16px',
                                padding: '1.5rem 2rem',
                                boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                                border: '2px solid transparent',
                                transition: 'all 0.3s ease'
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#0ea5e9'}
                                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
                            >
                                <MessageSquare size={24} color="#94a3b8" style={{ marginRight: '1rem' }} />
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Ask anything... 'Find bail cases', 'Draft an NDA', 'Explain Section 138 NI Act'"
                                    style={{
                                        flex: 1,
                                        border: 'none',
                                        outline: 'none',
                                        fontSize: '1.1rem',
                                        color: '#0f172a'
                                    }}
                                />
                                <button
                                    type="submit"
                                    style={{
                                        background: 'linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)',
                                        border: 'none',
                                        borderRadius: '12px',
                                        padding: '0.75rem 2rem',
                                        color: 'white',
                                        fontWeight: 600,
                                        fontSize: '1rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        transition: 'transform 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                    {isTyping ? 'Thinking...' : 'Ask AI'} <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                                </button>
                            </div>
                        </div>
                    </form>

                    {/* Example Queries */}
                    <div style={{ marginBottom: '3rem' }}>
                        <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1rem', fontWeight: 500 }}>Try asking:</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
                            {exampleQueries.map((q, i) => (
                                <button
                                    key={i}
                                    onClick={() => setQuery(q)}
                                    style={{
                                        backgroundColor: 'white',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '24px',
                                        padding: '0.5rem 1.25rem',
                                        fontSize: '0.9rem',
                                        color: '#475569',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#0ea5e9';
                                        e.currentTarget.style.color = 'white';
                                        e.currentTarget.style.borderColor = '#0ea5e9';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'white';
                                        e.currentTarget.style.color = '#475569';
                                        e.currentTarget.style.borderColor = '#e2e8f0';
                                    }}
                                >
                                    {q.length > 50 ? q.substring(0, 47) + '...' : q}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quick Access Cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
                        <div
                            onClick={() => navigate('/research')}
                            className="paper"
                            style={{
                                padding: '2rem',
                                textAlign: 'center',
                                cursor: 'pointer',
                                border: '2px solid transparent',
                                transition: 'all 0.3s',
                                background: 'white'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = '#0ea5e9';
                                e.currentTarget.style.transform = 'translateY(-4px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'transparent';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            <div style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '16px',
                                background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1rem auto'
                            }}>
                                <Scale size={28} color="#0369a1" />
                            </div>
                            <h3 style={{ fontSize: '1.1rem', color: '#0f172a', marginBottom: '0.5rem' }}>Find Judgments</h3>
                            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0 }}>Search 10M+ Indian case laws</p>
                        </div>

                        <div
                            onClick={() => navigate('/agreements')}
                            className="paper"
                            style={{
                                padding: '2rem',
                                textAlign: 'center',
                                cursor: 'pointer',
                                border: '2px solid transparent',
                                transition: 'all 0.3s',
                                background: 'white'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = '#0ea5e9';
                                e.currentTarget.style.transform = 'translateY(-4px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'transparent';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            <div style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '16px',
                                background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1rem auto'
                            }}>
                                <FileText size={28} color="#d97706" />
                            </div>
                            <h3 style={{ fontSize: '1.1rem', color: '#0f172a', marginBottom: '0.5rem' }}>Review Agreements</h3>
                            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0 }}>AI-powered contract analysis</p>
                        </div>

                        <div
                            onClick={() => navigate('/drafting')}
                            className="paper"
                            style={{
                                padding: '2rem',
                                textAlign: 'center',
                                cursor: 'pointer',
                                border: '2px solid transparent',
                                transition: 'all 0.3s',
                                background: 'white'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = '#0ea5e9';
                                e.currentTarget.style.transform = 'translateY(-4px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'transparent';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            <div style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '16px',
                                background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1rem auto'
                            }}>
                                <Zap size={28} color="#059669" />
                            </div>
                            <h3 style={{ fontSize: '1.1rem', color: '#0f172a', marginBottom: '0.5rem' }}>Generate Drafts</h3>
                            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0 }}>500+ legal templates</p>
                        </div>
                    </div>

                </div>
            </div>

            {/* Footer Trust Indicators */}
            <div style={{ backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0', padding: '2rem', textAlign: 'center' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                    <div>
                        <div style={{ fontSize: '2rem', fontWeight: 700, color: '#0369a1' }}>10M+</div>
                        <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Judgments Indexed</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '2rem', fontWeight: 700, color: '#0369a1' }}>500+</div>
                        <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Legal Templates</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '2rem', fontWeight: 700, color: '#0369a1' }}>24/7</div>
                        <div style={{ fontSize: '0.9rem', color: '#64748b' }}>AI Assistant</div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Home;
