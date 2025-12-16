import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, History, Download, Eye, Plus, CheckCircle, UploadCloud, Search, ShieldAlert, MessageSquare } from 'lucide-react';

const Agreements = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('drafts');
    const [analysisFile, setAnalysisFile] = useState(null);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const fileInputRef = React.useRef(null);

    const onUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setAnalysisFile(file);
        setIsScanning(true);
        setAnalysisResult(null); // Reset previous results

        // Simulate AI Processing Time
        setTimeout(() => {
            setIsScanning(false);
            setAnalysisResult({
                score: 72,
                risks: [
                    { severity: 'High', text: 'Missing Indemnity Clause for Third-Party Claims.' },
                    { severity: 'Medium', text: 'Termination notice period is ambiguous (undefined days).' },
                    { severity: 'Low', text: 'Governing Law not specified (Defaulting to local jurisdiction).' }
                ],
                summary: 'Standard service agreement. favorable to the Service Provider. Lacks standard liability caps found in similar industry contracts.'
            });
        }, 2000);
    };

    const agreementList = [
        { id: 'AG-2024-001', title: 'Non-Disclosure Agreement (Mutual)', client: 'TechCorp India', updated: '16 Dec 2024', status: 'Draft', version: 'v3.2' },
        { id: 'AG-2024-002', title: 'Commercial Lease Deed', client: 'Mr. Rajesh Verma', updated: '14 Dec 2024', status: 'Internal Review', version: 'v1.0' },
        { id: 'AG-2023-089', title: 'Shareholders Agreement', client: 'Innovate Pvt Ltd', updated: '20 Nov 2024', status: 'Executed', version: 'FINAL' },
    ];

    // handleFileUpload is removed as per instructions

    return (
        <div>
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>Agreements & Contracts</h1>
                    <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-text-secondary)' }}>
                        Drafting, Version Control, and AI Risk Analysis.
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={() => navigate('/drafting')} className="btn" style={{ backgroundColor: '#fff', border: '1px solid var(--color-border)' }}>
                        <FileText size={16} style={{ marginRight: '0.5rem' }} /> Template Library
                    </button>
                    <button onClick={() => navigate('/smart-draft')} className="btn btn-primary">
                        <Plus size={16} style={{ marginRight: '0.5rem' }} /> New Agreement
                    </button>
                </div>
            </header>

            {/* Hidden Input for Real File Picking */}
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept=".pdf,.docx,.doc"
                onChange={handleFileChange}
            />

            {/* Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', marginBottom: '2rem' }}>
                <div onClick={() => setActiveTab('drafts')} style={{ padding: '1rem 2rem', cursor: 'pointer', fontWeight: 600, fontFamily: 'var(--font-sans)', borderBottom: activeTab === 'drafts' ? '3px solid var(--color-navy)' : 'none', color: activeTab === 'drafts' ? 'var(--color-navy)' : '#64748b' }}>
                    Active Drafts
                </div>
                <div onClick={() => setActiveTab('review')} style={{ padding: '1rem 2rem', cursor: 'pointer', fontWeight: 600, fontFamily: 'var(--font-sans)', borderBottom: activeTab === 'review' ? '3px solid var(--color-navy)' : 'none', color: activeTab === 'review' ? 'var(--color-navy)' : '#64748b' }}>
                    AI Review & Analysis
                </div>
                <div onClick={() => setActiveTab('executed')} style={{ padding: '1rem 2rem', cursor: 'pointer', fontWeight: 600, fontFamily: 'var(--font-sans)', borderBottom: activeTab === 'executed' ? '3px solid var(--color-navy)' : 'none', color: activeTab === 'executed' ? 'var(--color-navy)' : '#64748b' }}>
                    Executed / Registered
                </div>
            </div>

            {activeTab === 'review' ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    {/* Left Column: Upload & Chat */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div
                            className="paper"
                            style={{
                                border: '2px dashed #cbd5e1',
                                backgroundColor: isScanning ? '#f0f9ff' : '#f8fafc',
                                padding: '3rem',
                                textAlign: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                            onClick={onUploadClick}
                        >
                            {isScanning ? (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'fadeIn 0.5s' }}>
                                    <div style={{ width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTopColor: '#0ea5e9', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '1rem' }}></div>
                                    <h3 style={{ margin: 0, color: '#0f172a' }}>Scanning {analysisFile?.name}...</h3>
                                    <p style={{ color: '#0ea5e9' }}>Extracting clauses & checking risks...</p>
                                </div>
                            ) : (
                                <>
                                    <UploadCloud size={48} color="#94a3b8" style={{ marginBottom: '1rem' }} />
                                    <h3 style={{ margin: 0, color: '#475569' }}>{analysisFile ? 'Analyze Another Document' : 'Upload Agreement for Review'}</h3>
                                    <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                                        {analysisFile ? `Last analyzed: ${analysisFile.name}` : 'Click to select PDF/DOCX'}
                                    </p>
                                </>
                            )}
                        </div>

                        {(analysisFile || analysisResult) && (
                            <div className="paper fade-in" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ borderBottom: '1px solid #eee', paddingBottom: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <MessageSquare size={18} color="var(--color-navy)" />
                                    <strong style={{ color: 'var(--color-navy)' }}>Chat with Document</strong>
                                </div>
                                <div style={{ flex: 1, backgroundColor: '#f9f9f9', borderRadius: '4px', padding: '1rem', marginBottom: '1rem', color: '#666', fontStyle: 'italic', fontSize: '0.9rem' }}>
                                    Ask questions like "What are the termination clauses?" or "Is there a non-compete?"...
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <input type="text" placeholder="Ask a question..." style={{ flex: 1, padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                                    <button className="btn btn-primary">Ask</button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Results */}
                    <div>
                        {analysisResult ? (
                            <div className="paper fade-in" style={{ borderTop: '4px solid #f59e0b' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                    <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Risk Analysis Report</h2>
                                    <span style={{ fontSize: '1.5rem', fontWeight: 700, color: analysisResult.score > 80 ? '#16a34a' : '#d97706' }}>
                                        {analysisResult.score}/100
                                    </span>
                                </div>

                                <div style={{ marginBottom: '2rem' }}>
                                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#64748b' }}>Executive Summary</h4>
                                    <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.6', color: '#333' }}>{analysisResult.summary}</p>
                                </div>

                                <div>
                                    <h4 style={{ margin: '0 0 1rem 0', color: '#b91c1c', display: 'flex', alignItems: 'center' }}>
                                        <ShieldAlert size={16} style={{ marginRight: '0.5rem' }} /> Missing Points & Risks
                                    </h4>
                                    <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
                                        {analysisResult.risks.map((risk, i) => (
                                            <li key={i} style={{ marginBottom: '0.75rem', fontSize: '0.9rem', color: '#333' }}>
                                                <span style={{
                                                    display: 'inline-block', padding: '2px 6px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, marginRight: '0.5rem',
                                                    backgroundColor: risk.severity === 'High' ? '#fee2e2' : '#fef3c7',
                                                    color: risk.severity === 'High' ? '#991b1b' : '#92400e'
                                                }}>
                                                    {risk.severity}
                                                </span>
                                                {risk.text}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#94a3b8', fontStyle: 'italic', minHeight: '300px' }}>
                                {isScanning ? 'AI is analyzing the document structure...' : 'Upload a document to view AI analysis.'}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="paper" style={{ padding: 0 }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', textAlign: 'left', color: '#64748b' }}>
                                <th style={{ padding: '1rem' }}>Agreement Title</th>
                                <th style={{ padding: '1rem' }}>Client</th>
                                <th style={{ padding: '1rem' }}>Last Updated</th>
                                <th style={{ padding: '1rem' }}>Version</th>
                                <th style={{ padding: '1rem' }}>Status</th>
                                <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {agreementList.map((doc) => (
                                <tr key={doc.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ fontWeight: 600, color: 'var(--color-navy)', display: 'flex', alignItems: 'center' }}>
                                            <FileText size={16} style={{ marginRight: '0.5rem', color: '#94a3b8' }} />
                                            {doc.title}
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginLeft: '1.5rem', marginTop: '4px' }}>Ref: {doc.id}</div>
                                    </td>
                                    <td style={{ padding: '1rem', color: '#333' }}>{doc.client}</td>
                                    <td style={{ padding: '1rem', color: '#64748b' }}>{doc.updated}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{ backgroundColor: '#f1f5f9', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600, color: '#475569' }}>
                                            {doc.version}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            backgroundColor: doc.status === 'Executed' ? '#ecfdf5' : '#fff7ed',
                                            color: doc.status === 'Executed' ? '#047857' : '#c2410c',
                                            padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 500, border: doc.status === 'Executed' ? '1px solid #a7f3d0' : '1px solid #fed7aa'
                                        }}>
                                            {doc.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                            <button onClick={() => alert('Opening Version History Log...')} className="btn" style={{ padding: '0.4rem', color: '#64748b' }} title="View Version History"><History size={16} /></button>
                                            <button onClick={() => alert('Opening Preview Modal...')} className="btn" style={{ padding: '0.4rem', color: '#64748b' }} title="Preview"><Eye size={16} /></button>
                                            <button onClick={() => alert('Downloading PDF...')} className="btn" style={{ padding: '0.4rem', color: '#64748b' }} title="Download"><Download size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Version Control Alert Sim */}
            {
                activeTab !== 'review' && (
                    <div style={{ marginTop: '2rem', maxWidth: '600px' }}>
                        <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '4px', padding: '1rem', display: 'flex', gap: '1rem' }}>
                            <CheckCircle size={20} color="#2563eb" style={{ marginTop: '2px' }} />
                            <div>
                                <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.95rem', color: '#1e40af' }}>Version Control Active</h4>
                                <p style={{ margin: 0, fontSize: '0.85rem', color: '#1e3a8a', lineHeight: '1.5' }}>
                                    Every edit made to an agreement is tracked with timestamp and user ID.
                                    Use the "History" button to revert to previous versions or compare changes (Delta View).
                                </p>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default Agreements;
