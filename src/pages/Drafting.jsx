import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Search, Book } from 'lucide-react';

const Drafting = () => {
    const navigate = useNavigate();

    return (
        <div>
            <header style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>Drafting System</h1>
                <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-text-secondary)' }}>Access ready drafts and smart templates.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
                <div onClick={() => navigate('/smart-draft')} className="paper" style={{ cursor: 'pointer', borderTop: '4px solid var(--color-navy)' }}>
                    <h3 style={{ marginBottom: '0.5rem' }}>Civil Pleadings</h3>
                    <p style={{ fontSize: '0.9rem', color: '#666', fontFamily: 'var(--font-sans)' }}>Plaint, Written Statement, IA, Affidavit</p>
                </div>
                <div onClick={() => navigate('/smart-draft')} className="paper" style={{ cursor: 'pointer', borderTop: '4px solid var(--color-navy)' }}>
                    <h3 style={{ marginBottom: '0.5rem' }}>Criminal Drafts</h3>
                    <p style={{ fontSize: '0.9rem', color: '#666', fontFamily: 'var(--font-sans)' }}>Bail, Anticipatory Bail, Quash Petition</p>
                </div>
                <div onClick={() => navigate('/smart-draft')} className="paper" style={{ cursor: 'pointer', borderTop: '4px solid var(--color-navy)' }}>
                    <h3 style={{ marginBottom: '0.5rem' }}>Appellate</h3>
                    <p style={{ fontSize: '0.9rem', color: '#666', fontFamily: 'var(--font-sans)' }}>Writs, First Appeals, SLPs</p>
                </div>
            </div>

            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Recent Drafts</h2>
            <div className="paper" style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9f9' }}>
                <div style={{ textAlign: 'center', color: '#888' }}>
                    <FileText size={48} style={{ marginBottom: '1rem', opacity: 0.3, margin: '0 auto' }} />
                    <p style={{ fontFamily: 'var(--font-sans)' }}>Select a template to start drafting or open a recent file.</p>
                    <button onClick={() => navigate('/smart-draft')} className="btn btn-primary" style={{ marginTop: '1rem' }}>Open Draft Assistant</button>
                </div>
            </div>
        </div>
    );
};

export default Drafting;

