import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Search, Book, Briefcase, Scale, Building, ChevronRight, Star } from 'lucide-react';

const Drafting = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const templates = [
        { id: 1, title: 'Non-Disclosure Agreement (Mutual)', category: 'Corporate', popular: true, desc: 'Standard mutual NDA for business discussions.' },
        { id: 2, title: 'Bail Application u/s 439 CrPC', category: 'Criminal', popular: true, desc: 'Regular bail application for non-bailable offences.' },
        { id: 3, title: 'Employment Agreement', category: 'Corporate', popular: false, desc: 'Comprehensive contract for full-time employees.' },
        { id: 4, title: 'Commercial Lease Deed', category: 'Real Estate', popular: false, desc: 'Lease agreement for office or retail space.' },
        { id: 5, title: 'Writ Petition (Civil)', category: 'Appellate', popular: true, desc: 'Article 226 petition against arbitrary state action.' },
        { id: 6, title: 'Freelance Service Contract', category: 'Corporate', popular: false, desc: 'Contract for independent contractors/consultants.' },
        { id: 7, title: 'Legal Notice (Recovery)', category: 'Civil', popular: false, desc: 'Notice for recovery of dues under CPC.' },
        { id: 8, title: 'Shareholders Agreement', category: 'Corporate', popular: false, desc: 'Defining rights/obligations of shareholders.' },
    ];

    const filteredTemplates = templates.filter(t => t.title.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleUseTemplate = (title) => {
        // In a real app, we'd pass the template ID/content to the editor
        // For demo, we just navigate
        navigate('/smart-draft');
    };

    return (
        <div>
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>Template Library</h1>
                    <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-text-secondary)' }}>
                        Over 200+ vetted legal templates for every practice area.
                    </p>
                </div>
                <div style={{ position: 'relative', width: '300px' }}>
                    <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input
                        type="text"
                        placeholder="Search templates..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '8px', border: '1px solid #ccc', outline: 'none' }}
                    />
                </div>
            </header>

            {/* Categories */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                {['All', 'Corporate', 'Civil', 'Criminal', 'Real Estate', 'Appellate'].map((cat, i) => (
                    <button key={i} className="btn" style={{ backgroundColor: i === 0 ? 'var(--color-navy)' : 'white', color: i === 0 ? 'white' : '#64748b', border: '1px solid #e2e8f0', minWidth: 'auto' }}>
                        {cat}
                    </button>
                ))}
            </div>

            {/* Template Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {filteredTemplates.map((t) => (
                    <div key={t.id} className="paper" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
                        onClick={() => handleUseTemplate(t.title)}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)'; }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                            <div style={{ padding: '0.5rem', borderRadius: '8px', backgroundColor: '#f1f5f9', color: 'var(--color-navy)' }}>
                                {t.category === 'Corporate' && <Briefcase size={20} />}
                                {t.category === 'Criminal' && <Scale size={20} />}
                                {t.category === 'Real Estate' && <Building size={20} />}
                                {t.category === 'Civil' && <FileText size={20} />}
                                {t.category === 'Appellate' && <Book size={20} />}
                            </div>
                            {t.popular && (
                                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#d97706', backgroundColor: '#fef3c7', padding: '2px 8px', borderRadius: '12px', display: 'flex', alignItems: 'center' }}>
                                    <Star size={12} style={{ marginRight: '4px', fill: '#d97706' }} /> Popular
                                </span>
                            )}
                        </div>
                        <h3 style={{ fontSize: '1.1rem', margin: '0 0 0.5rem 0', color: '#1e293b' }}>{t.title}</h3>
                        <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0 0 1.5rem 0', flex: 1, lineHeight: '1.5' }}>{t.desc}</p>

                        <div style={{ display: 'flex', alignItems: 'center', color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.9rem' }}>
                            Use Template <ChevronRight size={16} style={{ marginLeft: '4px' }} />
                        </div>
                    </div>
                ))}
            </div>

            {filteredTemplates.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8' }}>
                    <Search size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                    <p>No templates found matching "{searchTerm}"</p>
                </div>
            )}
        </div>
    );
};

export default Drafting;
