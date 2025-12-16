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

    const getContextualAnswer = (question) => {
        const q = question.toLowerCase();

        // Termination related
        if (q.includes('terminat') || q.includes('notice') || q.includes('end')) {
            return "Based on the uploaded agreement, the termination provisions are outlined in Clause 9. Either party may terminate this agreement by providing 30 days' written notice to the other party. However, the agreement does not explicitly state penalties for early termination or breach of the notice period requirement. It's recommended to clarify with legal counsel what remedies are available for premature termination without proper notice.";
        }

        // Non-compete related
        if (q.includes('non-compete') || q.includes('competitive') || q.includes('competition')) {
            return "The current agreement does not contain a non-compete clause. This means there are no explicit restrictions preventing either party from engaging in competitive activities during or after the agreement term. If protecting business interests from competition is important, consider adding provisions that: (1) Define what constitutes competing activity, (2) Specify geographical and time limitations, (3) Ensure reasonableness to maintain enforceability under Indian Contract Act Section 27.";
        }

        // Payment related
        if (q.includes('payment') || q.includes('pay') || q.includes('fee')) {
            return "The payment terms are specified as NET 30 days from invoice date. This means payment is due within 30 days of the invoice being issued. However, the agreement lacks provisions for late payment penalties or interest charges. Industry standard practice would include consequences for delayed payments, such as interest at 1.5-2% per month or as per the applicable law (RBI guidelines), to incentivize timely payment and compensate for financial impact of delays.";
        }

        // Liability related
        if (q.includes('liability') || q.includes('damages') || q.includes('indemnity')) {
            return "Critical concern: The agreement does not include a limitation of liability clause or indemnity provisions. This means both parties could potentially face unlimited financial exposure in case of breach, damages, or third-party claims. Best practice recommends: (1) Cap liability to a multiple of fees paid (e.g., 12 months of fees), (2) Include mutual indemnification for third-party claims arising from each party's actions, (3) Specify what types of damages are excluded (consequential, indirect, punitive).";
        }

        // Intellectual Property related
        if (q.includes('intellectual property') || q.includes(' ip ') || q.includes('ownership') || q.includes('copyright')) {
            return "The agreement does not address intellectual property ownership, which is a significant omission. Without explicit provisions, disputes may arise regarding who owns deliverables, work product, or improvements made during the agreement term. Recommendation: Add clauses that clearly state (1) Whether IP transfers to the client upon payment or remains with the provider, (2) Background IP vs. foreground IP distinction, (3) License rights if ownership doesn't transfer, (4) Moral rights waiver where applicable.";
        }

        // Confidentiality related
        if (q.includes('confidential') || q.includes('nda') || q.includes('secret') || q.includes('disclosure')) {
            return "The agreement lacks comprehensive confidentiality provisions. While some information may be implicitly understood to be confidential, best practice requires explicit confidentiality clauses that: (1) Define what constitutes Confidential Information, (2) Specify obligations of the receiving party, (3) List exceptions (publicly available, independently developed, rightfully received from third party), (4) State the survival period post-termination (typically 3-5 years), (5) Address return/destruction of confidential materials upon agreement end.";
        }

        // Dispute resolution related
        if (q.includes('dispute') || q.includes('arbitration') || q.includes('mediation') || q.includes('court')) {
            return "The agreement does not specify a dispute resolution mechanism. This is problematic as it leaves parties uncertain about how to resolve conflicts, potentially leading to expensive and time-consuming litigation. Best practice recommendation: Include (1) Escalation procedure (negotiation, then mediation, then arbitration), (2) Arbitration provisions under Indian Arbitration and Conciliation Act, 1996, (3) Seat and venue of arbitration, (4) Number of arbitrators (typically 1 or 3), (5) Language of proceedings, (6) Governing law clause specifying which jurisdiction's laws apply.";
        }

        // Governing law
        if (q.includes('governing law') || q.includes('jurisdiction') || q.includes('which law')) {
            return "The agreement does not explicitly state the governing law or jurisdiction for disputes. This ambiguity means that in case of a dispute, local laws where the breach occurred or where the defendant resides may apply by default, which could be unfavorable. It's crucial to add a clause like: 'This Agreement shall be governed by and construed in accordance with the laws of India, and the parties submit to the exclusive jurisdiction of the courts in [specific city].' This provides certainty and prevents forum shopping.";
        }

        // Force majeure
        if (q.includes('force majeure') || q.includes('act of god') || q.includes('pandemic') || q.includes('natural disaster')) {
            return "The agreement does not contain a force majeure clause. Force majeure provisions protect parties from liability when performance becomes impossible due to extraordinary events beyond their control (e.g., natural disasters, wars, pandemics, government actions). Without this clause, parties remain obligated to perform even when circumstances make it impossible, risking breach. Recommended inclusion: (1) Definition of force majeure events, (2) Notice requirements when invoking, (3) Obligation to mitigate, (4) Whether the agreement suspends or terminates after prolonged force majeure.";
        }

        // Duration/relationship
        if (q.includes('duration') || q.includes('term') || q.includes('how long') || q.includes('period')) {
            return "The agreement does not clearly specify the term or duration of the contractual relationship. While it may be implied to be ongoing until terminated, best practice requires explicit statement such as: 'This Agreement shall commence on [date] and continue for a period of [X months/years], unless earlier terminated in accordance with Clause [Y].' Additionally, specify whether the agreement auto-renews and under what conditions, including any price escalation for renewal terms.";
        }

        // Default response with helpful suggestion
        return `Based on the uploaded agreement, I can help you understand specific clauses and provisions. Your question "${question}" is noted. 

To provide the most accurate answer, could you please be more specific about which aspect you'd like to explore? For example:
- Termination and notice period requirements
- Payment terms and late payment consequences  
- Liability limitations and indemnification
- Intellectual property ownership
- Confidentiality obligations
- Dispute resolution mechanisms
- Governing law and jurisdiction

Feel free to ask about specific clauses or sections you're concerned about!`;
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
                    {
                        severity: 'High',
                        text: 'Missing Indemnity Clause: The agreement does not contain provisions for indemnification against third-party claims. This exposes both parties to potential liability for damages, losses, or legal expenses arising from actions of third parties. Industry standard practice recommends including comprehensive indemnity clauses specifying the scope, limitations, and process for indemnification claims.'
                    },
                    {
                        severity: 'High',
                        text: 'Ambiguous Termination Notice Period: Clause 9.3 mentions termination rights but fails to specify the exact number of days required for notice. This ambiguity can lead to disputes regarding what constitutes adequate notice. Best practice requires explicitly stating notice periods (e.g., "30 days written notice") to ensure legal enforceability and prevent misunderstandings.'
                    },
                    {
                        severity: 'Medium',
                        text: 'Governing Law Not Specified: The agreement does not designate which jurisdiction\'s laws will govern the interpretation and enforcement of its terms. In absence of such specification, the agreement defaults to local jurisdiction laws where the dispute arises, which may not be favorable to either party. Recommendation: Explicitly state governing law (e.g., "Laws of India" or specific state laws) in a dedicated clause.'
                    },
                    {
                        severity: 'Medium',
                        text: 'No Limitation of Liability Cap: While the service agreement defines payment terms, it lacks provisions limiting the maximum liability of either party in case of breach or damages. Uncapped liability can result in disproportionate financial exposure. Industry practice suggests including reasonable liability caps (e.g., limited to fees paid in the last 12 months) to protect both parties.'
                    },
                    {
                        severity: 'Low',
                        text: 'Payment Terms Lack Late Payment Penalties: The agreement specifies NET 30 days payment terms but does not mention consequences for delayed payments such as interest charges or late fees. Adding provisions for late payment penalties (e.g., 1.5% per month or as per applicable law) encourages timely payments and compensates for delayed cash flow.'
                    }
                ],
                summary: `This is a service agreement between the Service Provider and the Client, governing the provision of professional services. The agreement demonstrates several strengths in its current form, particularly in the area of payment terms which are clearly defined with a NET 30 days clause, providing clarity on when invoices are due.

However, the review has identified multiple areas requiring attention to bring this agreement up to industry standards and legal best practices. Most critically, the agreement lacks an indemnity clause, which is concerning given the potential for third-party claims arising from service delivery. This omission leaves both parties exposed to financial and legal risks that could have been contractually managed.

The termination provisions present another significant concern, as they fail to specify exact notice periods. Such ambiguity undermines the enforceability of termination rights and creates uncertainty that could lead to disputes. Modern commercial agreements typically specify precise timeframes (such as 30 or 60 days) to ensure both parties understand their obligations.

From a jurisdictional perspective, the absence of a governing law clause is problematic. Without explicit designation of applicable law and jurisdiction, parties face uncertainty about which legal framework applies in case of disputes. This can result in forum shopping, increased litigation costs, and unpredictable outcomes.

The agreement also notably lacks a limitation of liability provision. In professional services agreements, such clauses are standard practice to cap financial exposure and provide predictability. The absence of liability caps means either party could potentially face unlimited damages in case of breach, which represents a significant commercial risk disproportionate to the value of services provided.

Additionally, while payment terms are defined, there are no provisions for consequences of late payment, such as interest or penalty fees. This omission may result in delayed payments with no recourse for compensation, affecting cash flow management.

**Positive Aspects:**
- Clear payment structure (NET 30 days)
- Professional formatting and basic service scope definition
- Standard commercial structure

**Recommendations for Improvement:**
Given these findings, it is strongly recommended that both parties work with legal counsel to incorporate the missing provisions identified in this analysis before execution. Particular attention should be paid to adding comprehensive indemnification, dispute resolution, and liability limitation clauses to ensure the agreement adequately protects both parties' interests while remaining fair and balanced. Consider reviewing similar industry agreements to ensure competitiveness while maintaining adequate legal protection.`,
                missingPoints: [
                    {
                        title: 'Force Majeure Clause',
                        description: 'Provision protecting parties from liability due to extraordinary events beyond their control (natural disasters, war, pandemics, government actions). Should specify what constitutes force majeure, notification requirements, and whether the agreement suspends or terminates.'
                    },
                    {
                        title: 'Dispute Resolution Mechanism',
                        description: 'Formal procedure for resolving disagreements, typically including mediation followed by arbitration. Should specify arbitration rules (e.g., Indian Arbitration and Conciliation Act, 1996), seat of arbitration, number of arbitrators, and language of proceedings. This provides cost-effective alternative to litigation.'
                    },
                    {
                        title: 'Intellectual Property Rights Assignment',
                        description: 'Clear provisions regarding ownership of work product, deliverables, and IP created during service delivery. Should specify whether IP transfers to client upon full payment, remains with provider, or is jointly owned. Essential for avoiding future ownership disputes.'
                    },
                    {
                        title: 'Confidentiality and Non-Disclosure Provisions',
                        description: 'Protection for sensitive business information, trade secrets, and proprietary data shared during the agreement term. Should define what constitutes confidential information, obligations of receiving party, exclusions, and survival period post-termination.'
                    },
                    {
                        title: 'Data Privacy and Protection Clause',
                        description: 'Compliance provisions for handling personal data under applicable laws (e.g., Digital Personal Data Protection Act, 2023 in India, GDPR for EU data). Should address data processing, security measures, breach notification, and data subject rights.'
                    },
                    {
                        title: 'Warranty and Representation Clauses',
                        description: 'Statements of fact and promises made by each party, such as authority to enter agreement, compliance with laws, and quality of services. Provides legal recourse if representations prove false.'
                    },
                    {
                        title: 'Insurance Requirements',
                        description: 'Specification of insurance coverage required from service provider (professional liability, general liability, cyber insurance) with minimum coverage amounts. Protects both parties from significant financial exposure.'
                    },
                    {
                        title: 'Audit Rights',
                        description: 'Right of client to audit service provider\'s records, processes, and compliance with agreement terms. Particularly important for ongoing service relationships and regulatory compliance.'
                    }
                ]
            });
            setActiveSubTab('summary'); // Auto-switch to summary after upload
        }, 2500);
    };

    const handleAsk = () => {
        if (!chatInput.trim()) return;
        const userQuestion = chatInput;
        const newMsg = { role: 'user', text: userQuestion };
        setChatMessages([...chatMessages, newMsg]);
        setChatInput('');

        setTimeout(() => {
            const aiResponse = getContextualAnswer(userQuestion);
            setChatMessages(prev => [...prev, {
                role: 'ai',
                text: aiResponse
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
                        AI-Powered Document Summary
                    </h2>
                    <div style={{ backgroundColor: '#f8fafc', padding: '2rem', borderRadius: '12px', borderLeft: '4px solid var(--color-primary)' }}>
                        <p style={{ margin: 0, fontSize: '1rem', lineHeight: '2', color: '#334155', whiteSpace: 'pre-line' }}>
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
                        Identified Risks & Issues
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {analysisResult.risks.map((risk, i) => (
                            <div key={i} style={{ padding: '1.5rem', backgroundColor: '#fef2f2', borderRadius: '12px', borderLeft: '4px solid #ef4444' }}>
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
                                    <span style={{
                                        padding: '6px 14px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700,
                                        backgroundColor: risk.severity === 'High' ? '#fee2e2' : (risk.severity === 'Medium' ? '#fef3c7' : '#e0f2fe'),
                                        color: risk.severity === 'High' ? '#991b1b' : (risk.severity === 'Medium' ? '#92400e' : '#075985')
                                    }}>
                                        {risk.severity} Risk
                                    </span>
                                </div>
                                <p style={{ margin: 0, color: '#7f1d1d', fontSize: '1rem', lineHeight: '1.8' }}>{risk.text}</p>
                            </div>
                        ))}
                    </div>

                    <h3 style={{ fontSize: '1.3rem', marginTop: '3rem', marginBottom: '1.5rem', color: '#334155' }}>Recommended Additions & Missing Clauses</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {analysisResult.missingPoints.map((point, i) => (
                            <div key={i} style={{ padding: '1.5rem', backgroundColor: '#fffbeb', borderRadius: '12px', borderLeft: '4px solid #fbbf24' }}>
                                <h4 style={{ margin: '0 0 0.5rem 0', color: '#92400e', fontSize: '1.1rem', fontWeight: 600 }}>{point.title}</h4>
                                <p style={{ margin: 0, color: '#78350f', fontSize: '0.95rem', lineHeight: '1.7' }}>{point.description}</p>
                            </div>
                        ))}
                    </div>
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
                                <MessageSquare size={48} style={{ margin: '0 auto 1rem auto', opacity: 0.3' }} />
                                <p style={{ fontSize: '1rem', marginBottom: '1rem' }}>Ask detailed questions about the agreement:</p>
                                <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem', textAlign: 'left', display: 'inline-block' }}>
                                    <li style={{ marginBottom: '0.75rem', padding: '0.5rem 1rem', backgroundColor: '#fff', borderRadius: '8px' }}>💬 "What are the termination clauses?"</li>
                                    <li style={{ marginBottom: '0.75rem', padding: '0.5rem 1rem', backgroundColor: '#fff', borderRadius: '8px' }}>💬 "Is there a non-compete agreement?"</li>
                                    <li style={{ marginBottom: '0.75rem', padding: '0.5rem 1rem', backgroundColor: '#fff', borderRadius: '8px' }}>💬 "What is the notice period?"</li>
                                    <li style={{ padding: '0.5rem 1rem', backgroundColor: '#fff', borderRadius: '8px' }}>💬 "How is liability handled?"</li>
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
                                        boxShadow: msg.role === 'ai' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                                        lineHeight: '1.7',
                                        whiteSpace: 'pre-line'
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
    )
}

{/* Show message if no file uploaded yet and not on upload tab */ }
{
    activeSubTab !== 'upload' && !analysisResult && (
        <div className="paper" style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem', textAlign: 'center' }}>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Please upload a document first to see analysis results.</p>
            <button onClick={() => setActiveSubTab('upload')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
                Go to Upload
            </button>
        </div>
    )
}
        </div >
    );
};

export default Review;
