import React from 'react';
import { Tag, Clock, FileText, Plus } from 'lucide-react';

const Evidence = () => {
    return (
        <div>
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>Evidence & Case Files</h1>
                    <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-text-secondary)' }}>
                        Exhibits, documents, and chronological timelines.
                    </p>
                </div>
                <button className="btn btn-primary">+ Upload Evidence</button>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) 1fr', gap: '2rem' }}>

                {/* Document List */}
                <div className="paper" style={{ padding: 0 }}>
                    <div style={{ padding: '1rem', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', backgroundColor: '#f9f9f9' }}>
                        <strong style={{ color: '#444' }}>WP(C) 1234/2024 - Case Documents</strong>
                        <button className="btn" style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem' }}>Filter by Type</button>
                    </div>

                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                        <tbody>
                            {[
                                { fid: 'Ex-P1', name: 'Impugned Order dated 12.05.2024', date: '15 May 2024', type: 'Exhibit', tags: ['Crucial', 'Order'] },
                                { fid: 'Doc-2', name: 'Representation to Authority', date: '01 Apr 2024', type: 'Annexure', tags: ['P-2'] },
                                { fid: 'Doc-3', name: 'Medical Rerports of Petitioner', date: '10 Mar 2024', type: 'Annexure', tags: ['P-3', 'Medical'] },
                                { fid: 'Int-1', name: 'Email Correspondence with Dept', date: 'Feb 2024', type: 'Internal', tags: ['Privileged'] },
                            ].map((doc, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid #f1f1f1' }}>
                                    <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--color-navy)', width: '10%' }}>{doc.fid}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <div>{doc.name}</div>
                                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                                            {doc.tags.map(t => (
                                                <span key={t} style={{ fontSize: '0.75rem', padding: '1px 6px', backgroundColor: '#e2e8f0', borderRadius: '4px', color: '#475569' }}>{t}</span>
                                            ))}
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem', color: '#666', width: '20%' }}>{doc.date}</td>
                                    <td style={{ padding: '1rem', width: '15%' }}>
                                        <span style={{ fontSize: '0.8rem', padding: '2px 8px', borderRadius: '12px', border: '1px solid #ddd' }}>{doc.type}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Timeline Builder */}
                <aside className="paper" style={{ height: 'fit-content' }}>
                    <h3 style={{ marginTop: 0, marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
                        <Clock size={18} style={{ marginRight: '0.5rem' }} /> Fact Timeline
                    </h3>
                    <div style={{ borderLeft: '2px solid #e2e8f0', paddingLeft: '1.5rem', marginLeft: '0.5rem', position: 'relative' }}>

                        {[
                            { date: '01 Jan 2024', event: 'Show Cause Notice issued by Respondent.' },
                            { date: '15 Jan 2024', event: 'Reply filed by Petitioner denying allegations.' },
                            { date: '12 May 2024', event: 'Impugned Order passed terminating services.' },
                            { date: '16 Nov 2024', event: 'Writ Petition filed before High Court.' },
                        ].map((item, i) => (
                            <div key={i} style={{ marginBottom: '2rem', position: 'relative' }}>
                                <div style={{ position: 'absolute', left: '-1.85rem', top: '4px', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--color-navy)', border: '2px solid white', boxShadow: '0 0 0 1px #cbd5e1' }}></div>
                                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b' }}>{item.date}</div>
                                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem', lineHeight: '1.4' }}>{item.event}</p>
                            </div>
                        ))}

                        <button className="btn" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem', border: '1px dashed #cbd5e1' }}>
                            <Plus size={16} style={{ marginRight: '0.5rem' }} /> Add Event
                        </button>

                    </div>
                </aside>

            </div>
        </div>
    );
};

export default Evidence;
