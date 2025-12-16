import React, { useState, useRef, useEffect } from 'react';
import { PenTool, CheckCircle, AlertTriangle, Download, Copy, BookOpen, Wand2 } from 'lucide-react';

const SmartDraft = () => {
    const [activeDraft, setActiveDraft] = useState('Bail Application u/s 439 CrPC');
    const [content, setContent] = useState(`IN THE HIGH COURT OF DELHI AT NEW DELHI
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

3. That the investigation is complete and the Charge Sheet has been filed. No fruitful purpose will be served by keeping the Petitioner behind bars.`);

    // For auto-scroll
    const contentRef = useRef(null);

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        // Toast could go here
    };

    const handleExport = () => {
        const element = document.createElement("a");
        const file = new Blob([content], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "Bail_Application_Draft.txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    };

    const handleInsert = (text) => {
        setContent(prev => prev + "\n\n" + text);
        // Scroll to bottom
        if (contentRef.current) {
            setTimeout(() => {
                contentRef.current.scrollTop = contentRef.current.scrollHeight;
            }, 100);
        }
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
                        <button onClick={handleExport} className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}><Download size={16} style={{ marginRight: '0.5rem' }} /> Export to Word</button>
                    </div>
                </header>

                <textarea
                    ref={contentRef}
                    className="paper"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    style={{ flex: 1, padding: '3rem', fontFamily: 'var(--font-serif)', lineHeight: '2', whiteSpace: 'pre-wrap', overflowY: 'auto', border: '1px solid #e2e8f0', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.02)', resize: 'none', fontSize: '1.05rem', color: '#333' }}
                />
            </div>

            {/* Assistant Sidebar */}
            <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

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
                        <li>
                            <a href="#" style={{ color: 'var(--color-navy)', fontWeight: 600, textDecoration: 'none' }}>Arnesh Kumar v. State of Bihar</a>
                            <div style={{ color: '#666', marginTop: '2px' }}>(2014) 8 SCC 273</div>
                            <div style={{ fontSize: '0.8rem', color: '#15803d', marginTop: '4px' }}>✓ Arrest Guidelines</div>
                        </li>
                    </ul>
                </div>

                {/* Weakness Warning */}
                <div className="paper" style={{ padding: '1rem', backgroundColor: '#fffbe6', border: '1px solid #fcd34d' }}>
                    <strong style={{ display: 'flex', alignItems: 'center', color: '#92400e', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                        <AlertTriangle size={16} style={{ marginRight: '0.5rem' }} /> Weak Ground Detected
                    </strong>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#b45309' }}>
                        Avoid arguing "facts of the case" in depth for bail. Stick to "broad probabilities".
                    </p>
                </div>

            </aside>
        </div>
    );
};

export default SmartDraft;
