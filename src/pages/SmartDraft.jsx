import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PenTool, CheckCircle, AlertTriangle, Download, Copy, BookOpen, Wand2, Zap, BarChart3, RefreshCw } from 'lucide-react';

const SmartDraft = () => {
    const location = useLocation();

    // Check if we received generated content from Agreements page
    const initialContent = location.state?.generatedAgreement || `IN THE HIGH COURT OF DELHI AT NEW DELHI
CRIMINAL ORIGINAL JURISDICTION
BAIL APPLICATION NO. ______ OF 2024

IN THE MATTER OF:
Rajiv Kumar ... Petitioner
VERSUS
State of NCT of Delhi ... Respondent

APPLICATION UNDER SECTION 439 OF THE CODE OF CRIMINAL PROCEDURE, 1973 FOR GRANT OF REGULAR BAIL

MOST RESPECTFULLY SHOWETH:

1. That the Petitioner is a law-abiding citizen of India and has been falsely implicated in FIR No. 45/2024 registered at PS Connaught Place under Sections 420/406 IPC.

2. That the Petitioner was arrested on 15.11.2024 and has been in judicial custody since then.

3. That the investigation is complete and the Charge Sheet has been filed. No fruitful purpose will be served by keeping the Petitioner behind bars.`;
    const initialTitle = location.state?.agreementType || 'Bail Application u/s 439 CrPC';

    const [activeDraft, setActiveDraft] = useState(initialTitle);
    const [content, setContent] = useState(initialContent);

    const [winProb, setWinProb] = useState(65);
    const contentRef = useRef(null);

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        alert('Copied to Clipboard!');
    };

    const handleExport = () => {
        const element = document.createElement("a");
        const file = new Blob([content], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "Bail_Application_Draft.txt";
        document.body.appendChild(element);
        element.click();
    };

    const handleInsert = (text) => {
        setContent(prev => prev + "\n\n" + text);
        // Animate win probability up
        setWinProb(prev => Math.min(prev + 5, 95));

        if (contentRef.current) {
            setTimeout(() => {
                contentRef.current.scrollTop = contentRef.current.scrollHeight;
            }, 100);
        }
    };

    const handleRewrite = (style) => {
        const newText = "\n\n[AI REWRITTEN - " + style.toUpperCase() + "]\n" +
            "4. It is most respectfully submitted that the continued incarceration of the Petitioner is in direct violation of his fundamental right to life and liberty enshrined under Article 21 of the Constitution. The allegations are civil in nature and have been given a criminal colour solely to exert pressure.";

        handleInsert(newText);
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2rem', height: 'calc(100vh - 120px)' }}>
            {/* Editor Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h2 style={{ fontSize: '1.5rem', color: 'var(--color-navy)', margin: 0 }}>Drafting Assistant</h2>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>{activeDraft} • Draft ID: D-9021</p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <button onClick={handleCopy} className="btn" style={{ padding: '0.5rem 1rem' }}><Copy size={16} style={{ marginRight: '0.5rem' }} /> Copy</button>
                        <button onClick={handleExport} className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}><Download size={16} style={{ marginRight: '0.5rem' }} /> Export</button>
                    </div>
                </header>

                <div style={{ position: 'relative', flex: 1 }}>
                    <textarea
                        ref={contentRef}
                        className="paper"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        style={{ width: '100%', height: '100%', padding: '3rem', fontFamily: 'var(--font-serif)', lineHeight: '2', whiteSpace: 'pre-wrap', overflowY: 'auto', border: '1px solid #e2e8f0', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.02)', resize: 'none', fontSize: '1.05rem', color: '#333', boxSizing: 'border-box' }}
                    />

                    {/* Floating Tone Tools */}
                    <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', display: 'flex', gap: '0.5rem', backgroundColor: '#fff', padding: '0.5rem', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', display: 'flex', alignItems: 'center', paddingRight: '0.5rem', borderRight: '1px solid #eee' }}>
                            <RefreshCw size={12} style={{ marginRight: '4px' }} /> AI Rewrite
                        </span>
                        <button onClick={() => handleRewrite('Strong')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', color: '#b91c1c', fontWeight: 500 }}>Fierce</button>
                        <button onClick={() => handleRewrite('Polite')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', color: '#15803d', fontWeight: 500 }}>Formal</button>
                        <button onClick={() => handleRewrite('Concise')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', color: '#0369a1', fontWeight: 500 }}>Concise</button>
                    </div>
                </div>
            </div>

            {/* Assistant Sidebar */}
            <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                {/* Win Probability Meter */}
                <div className="paper" style={{ padding: '1.5rem', textAlign: 'center', background: 'linear-gradient(135deg, #1e3a8a 0%, #172554 100%)', color: 'white' }}>
                    <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: 0.9 }}>
                        <BarChart3 size={16} style={{ marginRight: '0.5rem' }} /> Win Probability
                    </h3>
                    <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto' }}>
                        <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#ffffff33" strokeWidth="3" />
                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#22c55e" strokeWidth="3" strokeDasharray={`${winProb}, 100`} />
                        </svg>
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '1.5rem', fontWeight: 700 }}>
                            {winProb}%
                        </div>
                    </div>
                    <p style={{ margin: '1rem 0 0 0', fontSize: '0.8rem', opacity: 0.8 }}>Strong arguments detected. Add citations to improve.</p>
                </div>

                {/* Smart Suggestions */}
                <div className="paper" style={{ padding: '0', border: '1px solid #bfdbfe', backgroundColor: '#eff6ff' }}>
                    <div style={{ padding: '1rem', borderBottom: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', color: '#1e40af' }}>
                        <Wand2 size={18} style={{ marginRight: '0.5rem' }} />
                        <strong style={{ fontSize: '0.9rem' }}>Smart Suggestions</strong>
                    </div>
                    <div style={{ padding: '1rem' }}>
                        <div style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #dbeafe' }}>
                            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1e3a8a', marginBottom: '0.25rem' }}>Add Ground of Parity</div>
                            <p style={{ margin: 0, fontSize: '0.8rem', color: '#3b82f6' }}>Co-accused Suresh was granted bail yesterday. Strong ground for parity.</p>
                            <button onClick={() => handleInsert("4. That the co-accused Suresh has already been granted bail vide order dated 15.12.2024. The Petitioner claims parity with the co-accused.")} className="btn" style={{ marginTop: '0.5rem', padding: '0.25rem 0.5rem', fontSize: '0.75rem', backgroundColor: '#fff' }}>+ Insert Clause</button>
                        </div>
                        <div>
                            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1e3a8a', marginBottom: '0.25rem' }}>Triple Test Compliance</div>
                            <p style={{ margin: 0, fontSize: '0.8rem', color: '#3b82f6' }}>Explicitly mention no flight risk and deep roots in society.</p>
                            <button onClick={() => handleInsert("5. That the Petitioner has deep roots in society and there is no risk of him fleeing from justice or tampering with evidence.")} className="btn" style={{ marginTop: '0.5rem', padding: '0.25rem 0.5rem', fontSize: '0.75rem', backgroundColor: '#fff' }}>+ Insert Clause</button>
                        </div>
                    </div>
                </div>

                {/* Citation Checker */}
                <div className="paper" style={{ padding: '0' }}>
                    <div style={{ padding: '1rem', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center' }}>
                        <BookOpen size={18} style={{ marginRight: '0.5rem', color: 'var(--color-navy)' }} />
                        <strong style={{ fontSize: '0.9rem' }}>Relevant Precedents</strong>
                    </div>
                    <ul style={{ listStyle: 'none', padding: '1rem', margin: 0, fontSize: '0.85rem' }}>
                        <li style={{ marginBottom: '1rem' }}>
                            <a href="#" style={{ color: 'var(--color-navy)', fontWeight: 600, textDecoration: 'none' }}>Sanjay Chandra v. CBI</a>
                            <div style={{ color: '#666', marginTop: '2px' }}>(2012) 1 SCC 40</div>
                            <div style={{ fontSize: '0.8rem', color: '#15803d', marginTop: '4px' }}>✓ Supports Bail</div>
                        </li>
                    </ul>
                </div>

            </aside>
        </div>
    );
};

export default SmartDraft;
