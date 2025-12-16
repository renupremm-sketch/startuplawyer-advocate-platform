import React, { useState } from 'react';
import { Settings, Save, AlertTriangle, Database, FileText, Cpu, Shield, Plus, Upload, Trash2 } from 'lucide-react';

const AIConfig = () => {
    const [config, setConfig] = useState({
        llmModel: 'GPT-4-Turbo (Legal Fine-Tuned)',
        responseStyle: 'Judicial & Conservative',
        temperature: 0.2,
        systemPrompt: `You are a Senior Advocate of the Supreme Court of India. 
Your answers must be accurate, citations must be real, and your tone should be professional and authoritative.
Do not hallucinate case laws. If you are unsure, state that research is required.
Prioritize recent judgments from 2020-2024.`,
        restrictedTopics: 'Political Opinions, Religious Debates, Personal Legal Advice (Liability)',
        internetAccess: false
    });

    const [sources, setSources] = useState([
        { id: 1, name: 'Constitution of India (Full Text)', type: 'Bare Act', active: true },
        { id: 2, name: 'IPC, CrPC, Evidence Act (2023)', type: 'Bare Act', active: true },
        { id: 3, name: 'Supreme Court Case Repository (1950-2024)', type: 'Case Law', active: true },
    ]);

    const [customDocs, setCustomDocs] = useState([
        { id: 101, name: 'Chamber_Standard_Drafts_v2.pdf', size: '2.4 MB' },
        { id: 102, name: 'My_Previous_Arguments.pdf', size: '5.1 MB' }
    ]);

    const handleSave = () => {
        alert("AI Configuration Updated & System Prompt Retrained.");
    };

    return (
        <div style={{ paddingBottom: '4rem' }}>
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>AI Control Center</h1>
                    <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-text-secondary)' }}>
                        Configure the brain, conscience, and boundaries of your digital assistant.
                    </p>
                </div>
                <button onClick={handleSave} className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '1rem' }}>
                    <Save size={18} style={{ marginRight: '0.5rem' }} /> Save Configuration
                </button>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: '2rem' }}>

                {/* Left Column: Core Behavior */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* System Prompt (The Brain) */}
                    <section className="paper" style={{ borderTop: '4px solid var(--color-gold)' }}>
                        <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', marginTop: 0 }}>
                            <Cpu size={20} style={{ marginRight: '0.75rem', color: 'var(--color-navy)' }} />
                            System Prompt & Persona
                        </h2>
                        <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                            Define the exact persona and rules the AI must follow. This overrides all other settings.
                        </p>
                        <textarea
                            value={config.systemPrompt}
                            onChange={(e) => setConfig({ ...config, systemPrompt: e.target.value })}
                            style={{
                                width: '100%', height: '200px', padding: '1rem',
                                fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: '1.5',
                                border: '1px solid #ccc', borderRadius: '4px', resize: 'vertical',
                                backgroundColor: '#fcfbf9'
                            }}
                        />
                    </section>

                    {/* Configuration Fields */}
                    <section className="paper">
                        <h2 style={{ fontSize: '1.25rem', marginTop: 0, marginBottom: '1.5rem' }}>Model Parameters</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>LLM Model</label>
                                <select
                                    value={config.llmModel}
                                    onChange={(e) => setConfig({ ...config, llmModel: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
                                >
                                    <option>GPT-4-Turbo (Legal Fine-Tuned)</option>
                                    <option>Claude 3 Opus (Reasoning Expert)</option>
                                    <option>Llama 3 (On-Premise / Private)</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Response Style</label>
                                <select
                                    value={config.responseStyle}
                                    onChange={(e) => setConfig({ ...config, responseStyle: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
                                >
                                    <option>Judicial & Conservative</option>
                                    <option>Adversarial (Aggressive)</option>
                                    <option>Academic & Explanatory</option>
                                    <option>Simplified (Client Facing)</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* Knowledge Base (Custom PDF Sources) */}
                    <section className="paper">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <div>
                                <h2 style={{ fontSize: '1.25rem', margin: 0, display: 'flex', alignItems: 'center' }}>
                                    <Database size={20} style={{ marginRight: '0.75rem', color: 'var(--color-navy)' }} />
                                    Custom Knowledge Base
                                </h2>
                                <p style={{ fontSize: '0.85rem', color: '#666', margin: '0.25rem 0 0 0' }}>
                                    Upload PDFs, Previous Agreements, or Research Papers for the AI to learn from.
                                </p>
                            </div>
                            <button className="btn" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                                <Upload size={16} style={{ marginRight: '0.5rem' }} /> Upload New PDF
                            </button>
                        </div>

                        <div style={{ backgroundColor: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: '4px', padding: '1rem' }}>
                            {customDocs.map(doc => (
                                <div key={doc.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', backgroundColor: '#fff', border: '1px solid #e2e8f0', marginBottom: '0.5rem', borderRadius: '4px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <FileText size={18} color="#475569" style={{ marginRight: '0.75rem' }} />
                                        <span style={{ fontWeight: 500, color: '#333' }}>{doc.name}</span>
                                        <span style={{ fontSize: '0.75rem', color: '#888', marginLeft: '1rem' }}>{doc.size}</span>
                                    </div>
                                    <button className="btn" style={{ padding: '0.25rem', color: '#ef4444', border: 'none', background: 'none' }}>
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                            <div style={{ textAlign: 'center', marginTop: '1rem', fontStyle: 'italic', color: '#94a3b8', fontSize: '0.85rem' }}>
                                Drag & Drop PDF files here to train specific case knowledge.
                            </div>
                        </div>
                    </section>

                </div>

                {/* Right Column: Restrictions & Guardrails */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    <section className="paper" style={{ borderLeft: '4px solid #b91c1c' }}>
                        <h2 style={{ fontSize: '1.1rem', marginTop: 0, display: 'flex', alignItems: 'center', color: '#991b1b' }}>
                            <Shield size={18} style={{ marginRight: '0.5rem' }} />
                            Guardrails & Restrictions
                        </h2>

                        <div style={{ marginTop: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.85rem' }}>Restricted Topics (Blacklist)</label>
                            <input
                                type="text"
                                value={config.restrictedTopics}
                                onChange={(e) => setConfig({ ...config, restrictedTopics: e.target.value })}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #e2e8f0', color: '#b91c1c' }}
                            />
                            <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.5rem' }}>
                                AI will refuse to answer or process data related to these keywords.
                            </p>
                        </div>

                        <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Live Internet Search</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ fontSize: '0.8rem', color: config.internetAccess ? '#16a34a' : '#64748b' }}>
                                    {config.internetAccess ? 'Enabled' : 'Disabled'}
                                </span>
                                <div
                                    onClick={() => setConfig({ ...config, internetAccess: !config.internetAccess })}
                                    style={{
                                        width: '40px', height: '20px', borderRadius: '20px',
                                        backgroundColor: config.internetAccess ? '#16a34a' : '#cbd5e1',
                                        position: 'relative', cursor: 'pointer', transition: 'background 0.2s'
                                    }}
                                >
                                    <div style={{
                                        width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#fff',
                                        position: 'absolute', top: '2px', left: config.internetAccess ? '22px' : '2px',
                                        transition: 'left 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
                                    }} />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="paper">
                        <h2 style={{ fontSize: '1.1rem', marginTop: 0, marginBottom: '1rem' }}>Source Priority</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {sources.map(source => (
                                <label key={source.id} style={{ display: 'flex', alignItems: 'center', padding: '0.5rem', borderRadius: '4px', backgroundColor: source.active ? '#f0fdf4' : '#fff', border: '1px solid #e2e8f0' }}>
                                    <input
                                        type="checkbox"
                                        checked={source.active}
                                        onChange={() => {
                                            const newSources = sources.map(s => s.id === source.id ? { ...s, active: !s.active } : s);
                                            setSources(newSources);
                                        }}
                                        style={{ marginRight: '0.75rem', width: '16px', height: '16px' }}
                                    />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{source.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{source.type}</div>
                                    </div>
                                </label>
                            ))}
                            <button className="btn" style={{ justifyContent: 'center', border: '1px dashed #cbd5e1', backgroundColor: '#f8fafc', color: '#64748b' }}>
                                <Plus size={16} style={{ marginRight: '0.5rem' }} /> Add Legal Database source
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AIConfig;
