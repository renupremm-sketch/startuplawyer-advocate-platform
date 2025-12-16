import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, MoreVertical, Plus, Search, ChevronLeft, ChevronRight, X } from 'lucide-react';

const CaseDiary = () => {
    const [cases, setCases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [newCase, setNewCase] = useState({ title: '', caseNo: '', court: '', time: '', type: 'Hearing', stage: 'Arguments' });
    const [editingCase, setEditingCase] = useState(null);

    // Initial Load - Demo Data
    useEffect(() => {
        const storedCases = localStorage.getItem('demo_cases');
        if (storedCases) {
            setCases(JSON.parse(storedCases));
        } else {
            const initialData = [
                { id: 1, title: 'State vs. Rajesh Kumar', caseNo: 'Cr. Case 45/2023', court: 'High Court, Court 4', time: '10:30 AM', type: 'Hearing', stage: 'Arguments', notes: 'Focus on cross-examination of PW-3.' },
                { id: 2, title: 'Amitabh vs. TechCorp', caseNo: 'Civ. Suit 892/2024', court: 'District Court, Saket', time: '02:00 PM', type: 'Evidence', stage: 'Plaintiff Evidence', notes: 'Submit affidavit of admission/denial.' },
            ];
            setCases(initialData);
            localStorage.setItem('demo_cases', JSON.stringify(initialData));
        }
        setLoading(false);
    }, []);

    const handleAddCase = () => {
        const caseEntry = { id: Date.now(), ...newCase };
        const updatedCases = [...cases, caseEntry];
        setCases(updatedCases);
        localStorage.setItem('demo_cases', JSON.stringify(updatedCases));
        setIsModalOpen(false);
        setNewCase({ title: '', caseNo: '', court: '', time: '', type: 'Hearing', stage: 'Arguments' });
    };

    const handleEditClick = (c) => {
        setEditingCase({ ...c }); // Copy to avoid direct mutation
        setIsEditModalOpen(true);
    };

    const handleSaveEdit = () => {
        const updatedCases = cases.map(c => c.id === editingCase.id ? editingCase : c);
        setCases(updatedCases);
        localStorage.setItem('demo_cases', JSON.stringify(updatedCases));
        setIsEditModalOpen(false);
        setEditingCase(null);
    };

    const jumpToDate = () => {
        alert("Date picker would open here. (Demo Mode)");
    };

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>Daily Case Diary</h1>
                    <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-text-secondary)' }}>
                        Manage hearings, track evidence stages, and schedule logs.
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={jumpToDate} className="btn" style={{ backgroundColor: '#fff', border: '1px solid var(--color-border)' }}>
                        <Calendar size={16} style={{ marginRight: '0.5rem' }} /> Jump to Date
                    </button>
                    <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
                        <Plus size={16} style={{ marginRight: '0.5rem' }} /> Add New Entry
                    </button>
                </div>
            </header>

            {/* Calendar Strip (Simplified) */}
            <div className="paper" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <button className="btn"><ChevronLeft size={20} /></button>
                <div style={{ textAlign: 'center' }}>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--color-navy)' }}>Monday, 16 Dec 2024</h3>
                    <span style={{ fontSize: '0.9rem', color: '#666' }}>Today</span>
                </div>
                <button className="btn"><ChevronRight size={20} /></button>
            </div>

            {/* Case List */}
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {cases.map((c) => (
                        <div key={c.id} className="paper" style={{ display: 'grid', gridTemplateColumns: '80px 1fr 200px 50px', alignItems: 'center', gap: '1.5rem', transition: 'transform 0.2s', padding: '1.5rem' }}>
                            <div style={{ textAlign: 'center', paddingRight: '1.5rem', borderRight: '1px solid #eee' }}>
                                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-navy)' }}>{c.time.split(' ')[0]}</div>
                                <div style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase' }}>{c.time.split(' ')[1]}</div>
                            </div>

                            <div>
                                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', color: '#334155' }}>
                                    {c.title} <span style={{ fontSize: '0.85rem', fontWeight: 400, color: '#94a3b8', marginLeft: '0.5rem' }}>({c.caseNo})</span>
                                </h3>
                                <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem', color: '#64748b' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}><MapPin size={14} style={{ marginRight: '4px' }} /> {c.court}</div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}><Clock size={14} style={{ marginRight: '4px' }} /> {c.type}</div>
                                </div>
                                {c.notes && (
                                    <div style={{ marginTop: '0.75rem', fontSize: '0.9rem', backgroundColor: '#fffbeb', padding: '0.5rem', borderRadius: '4px', borderLeft: '3px solid #fcd34d', color: '#b45309', display: 'flex', justifyContent: 'space-between' }}>
                                        <span>📝 {c.notes}</span>
                                        <button onClick={() => handleEditClick(c)} style={{ border: 'none', background: 'none', color: '#b45309', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.8rem' }}>Edit Note</button>
                                    </div>
                                )}
                                {!c.notes && (
                                    <button onClick={() => handleEditClick(c)} style={{ marginTop: '0.5rem', border: 'none', background: 'none', color: '#64748b', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center' }}>+ Add Note</button>
                                )}
                            </div>

                            <div style={{ textAlign: 'right' }}>
                                <span style={{
                                    padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600,
                                    backgroundColor: c.stage === 'Arguments' ? '#e0f2fe' : '#f0fdf4',
                                    color: c.stage === 'Arguments' ? '#0369a1' : '#15803d'
                                }}>
                                    {c.stage}
                                </span>
                            </div>

                            <div style={{ textAlign: 'right' }}>
                                <button className="btn" style={{ padding: '0.5rem' }}><MoreVertical size={18} color="#94a3b8" /></button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Add/Edit Modal */}
            {(isModalOpen || isEditModalOpen) && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                    <div className="paper" style={{ width: '500px', padding: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h2 style={{ margin: 0 }}>{isEditModalOpen ? 'Edit Case Note' : 'Add New Case Entry'}</h2>
                            <button onClick={() => { setIsModalOpen(false); setIsEditModalOpen(false); }} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {/* If Editing, only show Notes (or all fields? user asked to 'edit note', let's show all for flexibility but focus on note) */}
                            {isEditModalOpen ? (
                                <>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Case Note / Tasks</label>
                                        <textarea
                                            value={editingCase.notes || ''}
                                            onChange={(e) => setEditingCase({ ...editingCase, notes: e.target.value })}
                                            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', minHeight: '100px' }}
                                        />
                                    </div>
                                    <button onClick={handleSaveEdit} className="btn btn-primary" style={{ marginTop: '1rem' }}>Save Changes</button>
                                </>
                            ) : (
                                <>
                                    <input placeholder="Case Title (e.g. State vs X)" value={newCase.title} onChange={e => setNewCase({ ...newCase, title: e.target.value })} style={{ padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                                    <input placeholder="Case Number" value={newCase.caseNo} onChange={e => setNewCase({ ...newCase, caseNo: e.target.value })} style={{ padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <input placeholder="Court" value={newCase.court} onChange={e => setNewCase({ ...newCase, court: e.target.value })} style={{ padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                                        <input type="time" value={newCase.time} onChange={e => setNewCase({ ...newCase, time: e.target.value })} style={{ padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                                    </div>
                                    <button onClick={handleAddCase} className="btn btn-primary" style={{ marginTop: '1rem' }}>Add to Diary</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CaseDiary;
