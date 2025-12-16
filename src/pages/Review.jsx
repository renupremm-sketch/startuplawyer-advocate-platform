import React, { useState } from 'react';
import { UploadCloud, List, AlertTriangle, MessageSquare, X } from 'lucide-react';

const Review = () => {
    const [activeSubTab, setActiveSubTab] = useState('upload'); // 'upload' | 'summary' | 'missing' | 'qa'
    const [analysisFile, setAnalysisFile] = useState(null);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [chatInput, setChatInput] = useState('');

    const fileInputRef = React.useRef(null);

    const onUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setAnalysisFile(file);
        setIsScanning(true);
        setAnalysisResult(null);
        setChatMessages([]);

        setTimeout(() => {
            setIsScanning(false);
            setAnalysisResult({
                score: 72,
                risks: [
                    { severity: 'High', text: 'Missing Indemnity Clause for Third-Party Claims.' },
                    { severity: 'Medium', text: 'Termination notice period is ambiguous (undefined days).' },
                    { severity: 'Low', text: 'Governing Law not specified (Defaulting to local jurisdiction).' }
                ],
                summary: 'This is a standard service agreement favorable to the Service Provider. The agreement lacks standard liability caps commonly found in similar industry contracts. The payment terms are clearly defined with NET 30 days clause.',
                missingPoints: [
                    'Force Majeure Clause',
                    'Dispute Resolution Mechanism (Arbitration)',
                    'Intellectual Property Rights Assignment',
                    'Data Privacy and Protection Clause'
                ]
            });
            setActiveSubTab('summary'); // Auto-switch to summary after upload
        }, 2000);
    };

    const handleAsk = () => {
        if (!chatInput.trim()) return;
        const newMsg = { role: 'user', text: chatInput };
        setChatMessages([...chatMessages, newMsg]);
        setChatInput('');

        setTimeout(() => {
            setChatMessages(prev => [...prev, {
                role: 'ai',
                text: "Based on the agreement, the termination clause requires a 30-day notice period. However, it does not specify penalties for early termination."
            }]);
        }, 1000);
    };

    return (
        <div>
            <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept=".pdf,.docx,.doc,.txt" onChange={handleFileChange} />

            <header style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>Review Agreement</h1>
                <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-text-secondary)' }}>
                    Upload your agreement or legal document for AI-powered analysis
                </p>
            </header>

            {/* Sub-Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', backgroundColor: '#f8fafc', padding: '0.5rem', borderRadius: '12px', maxWidth: '600px' }}>
                <button onClick={() => setActiveSubTab('upload')} style={{ flex: 1, background: activeSubTab === 'upload' ? 'white' : 'transparent', border: 'none', padding: '0.75rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, color: activeSubTab === 'upload' ? 'var(--color-primary)' : '#64748b', transition: 'all 0.2s', boxShadow: activeSubTab === 'upload' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none' }}>
                    Upload
                </button>
                <button onClick={() => setActiveSubTab('summary')} style={{ flex: 1, background: activeSubTab === 'summary' ? 'white' : 'transparent', border: 'none', padding: '0.75rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, color: activeSubTab === 'summary' ? 'var(--color-primary)' : '#64748b', transition: 'all 0.2s', boxShadow: activeSubTab === 'summary' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none' }}>
                    Summary
                </button>
                <button onClick={() => setActiveSubTab('missing')} style={{ flex: 1, background: activeSubTab === 'missing' ? 'white' : 'transparent', border: 'none', padding: '0.75rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, color: activeSubTab === 'missing' ? 'var(--color-primary)' : '#64748b', transition: 'all 0.2s', boxShadow: activeSubTab === 'missing' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none' }}>
                    Missing Points
                </button>
                <button onClick={() => setActiveSubTab('qa')} style={{ flex: 1, background: activeSubTab === 'qa' ? 'white' : 'transparent', border: 'none', padding: '0.75rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, color: activeSubTab === 'qa' ? 'var(--color-primary)' : '#64748b', transition: 'all 0.2s', boxShadow: activeSubTab === 'qa' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none' }}>
                    Q&A
                </button>
            </div>

            {/* Upload Sub-Tab */}
            {activeSubTab === 'upload' && (
                <div className="paper" style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem', textAlign: 'center' }}>
                    <div
                        onClick={onUploadClick}
                        style={{
                            border: '2px dashed #cbd5e1',
                            borderRadius: '16px',
                            padding: '4rem 2rem',
                            cursor: 'pointer',
                            backgroundColor: isScanning ? '#f0f9ff' : '#f8fafc',
                            transition: 'all 0.3s'
                        }}
                    >
                        {isScanning ? (
                            <div>
                                <div style={{ width: '50px', height: '50px', border: '4px solid #e2e8f0', borderTopColor: '#0ea5e9', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1.5rem auto' }}></div>
                                <h3 style={{ margin: 0, color: '#0f172a', fontSize: '1.2rem' }}>Analyzing {analysisFile?.name}...</h3>
                                <p style={{ color: '#0ea5e9', margin: '0.5rem 0 0 0' }}>Extracting clauses & checking risks...</p>
                            </div>
                        ) : (
                            <>
                                <UploadCloud size={64} color="#64748b" style={{ margin: '0 auto 1.5rem auto' }} />
                                <h3 style={{ margin: 0, fontSize: '1.3rem', color: '#334155' }}>Drop your document here</h3>
                                <p style={{ color: '#94a3b8', fontSize: '0.95rem', margin: '0.5rem 0 0 0' }}>Supports PDF, DOC, DOCX, TXT files</p>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Summary Sub-Tab */}
            {activeSubTab === 'summary' && analysisResult && (
                <div className="paper fade-in" style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
                        <List size={24} style={{ marginRight: '0.75rem', color: 'var(--color-primary)' }} />
                        Document Summary
                    </h2>
                    <div style={{ backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid var(--color-primary)' }}>
                        <p style={{ margin: 0, fontSize: '1rem', lineHeight: '1.8', color: '#334155' }}>
                            {analysisResult.summary}
                        </p>
                    </div>
                    <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div style={{ backgroundColor: '#ecfdf5', padding: '1.5rem', borderRadius: '12px' }}>
                            <h4 style={{ margin: '0 0 0.5rem 0', color: '#059669' }}>Risk Score</h4>
                            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#059669' }}>{analysisResult.score}/100</div>
                        </div>
                        <div style={{ backgroundColor: '#fff7ed', padding: '1.5rem', borderRadius: '12px' }}>
                            <h4 style={{ margin: '0 0 0.5rem 0', color: '#d97706' }}>Issues Found</h4>
                            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#d97706' }}>{analysisResult.risks.length}</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Missing Points Sub-Tab */}
            {activeSubTab === 'missing' && analysisResult && (
                <div className="paper fade-in" style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
                        <AlertTriangle size={24} style={{ marginRight: '0.75rem', color: '#ef4444' }} />
                        Missing Points & Risks
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {analysisResult.risks.map((risk, i) => (
                            <div key={i} style={{ padding: '1.25rem', backgroundColor: '#fef2f2', borderRadius: '12px', borderLeft: '4px solid #ef4444' }}>
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <span style={{
                                        padding: '4px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, marginRight: '1rem',
                                        backgroundColor: risk.severity === 'High' ? '#fee2e2' : (risk.severity === 'Medium' ? '#fef3c7' : '#e0f2fe'),
                                        color: risk.severity === 'High' ? '#991b1b' : (risk.severity === 'Medium' ? '#92400e' : '#075985')
                                    }}>
                                        {risk.severity} Risk
                                    </span>
                                </div>
                                <p style={{ margin: 0, color: '#7f1d1d', fontSize: '1rem' }}>{risk.text}</p>
                            </div>
                        ))}
                    </div>

                    <h3 style={{ fontSize: '1.2rem', marginTop: '2rem', marginBottom: '1rem', color: '#334155' }}>Recommended Additions</h3>
                    <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {analysisResult.missingPoints.map((point, i) => (
                            <li key={i} style={{ fontSize: '1rem', color: '#64748b' }}>{point}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Q&A Sub-Tab */}
            {activeSubTab === 'qa' && analysisResult && (
                <div className="paper fade-in" style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem', display: 'flex', flexDirection: 'column', minHeight: '500px' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
                        <MessageSquare size={24} style={{ marginRight: '0.75rem', color: 'var(--color-primary)' }} />
                        Ask Questions About This Document
                    </h2>

                    <div style={{ flex: 1, backgroundColor: '#f9f9f9', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem', overflowY: 'auto', maxHeight: '400px' }}>
                        {chatMessages.length === 0 ? (
                            <div style={{ textAlign: 'center', color: '#94a3b8', padding: '3rem' }}>
                                <MessageSquare size={48} style={{ margin: '0 auto 1rem auto', opacity: 0.3 }} />
                                <p style={{ fontSize: '1rem' }}>Ask questions like:</p>
                                <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
                                    <li style={{ marginBottom: '0.5rem' }}>"What are the termination clauses?"</li>
                                    <li style={{ marginBottom: '0.5rem' }}>"Is there a non-compete agreement?"</li>
                                    <li>"What is the notice period?"</li>
                                </ul>
                            </div>
                        ) : (
                            chatMessages.map((msg, idx) => (
                                <div key={idx} style={{ marginBottom: '1rem', textAlign: msg.role === 'user' ? 'right' : 'left' }}>
                                    <div style={{
                                        display: 'inline-block',
                                        padding: '1rem 1.25rem',
                                        borderRadius: '12px',
                                        maxWidth: '80%',
                                        backgroundColor: msg.role === 'user' ? '#0ea5e9' : '#fff',
                                        color: msg.role === 'user' ? '#fff' : '#333',
                                        border: msg.role === 'user' ? 'none' : '1px solid #e2e8f0',
                                        boxShadow: msg.role === 'ai' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'
                                    }}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <input
                            type="text"
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            placeholder="Ask a question about the document..."
                            style={{ flex: 1, padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '1rem', outline: 'none' }}
                            onKeyPress={(e) => e.key === 'Enter' && handleAsk()}
                        />
                        <button onClick={handleAsk} className="btn btn-primary" style={{ padding: '1rem 2rem' }}>Ask AI</button>
                    </div>
                </div>
            )}

            {/* Show message if no file uploaded yet and not on upload tab */}
            {activeSubTab !== 'upload' && !analysisResult && (
                <div className="paper" style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem', textAlign: 'center' }}>
                    <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Please upload a document first to see analysis results.</p>
                    <button onClick={() => setActiveSubTab('upload')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
                        Go to Upload
                    </button>
                </div>
            )}
        </div>
    );
};

export default Review;
