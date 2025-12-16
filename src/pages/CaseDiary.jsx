import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, BookOpen, PenTool, Search, X } from 'lucide-react';

const CaseDiary = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [cases, setCases] = useState([]);
    const [showModal, setShowModal] = useState(false);

    // Form State
    const [newCase, setNewCase] = useState({
        court_name: 'High Court of Delhi',
        case_number: '',
        title: '',
        stage: 'Admission'
    });

    const fetchCases = () => {
        fetch('http://localhost:5000/api/cases')
            .then(res => res.json())
            .then(data => {
                if (data.data) setCases(data.data);
            })
            .catch(err => console.error("Error fetching cases:", err));
    };

    useEffect(() => {
        fetchCases();
    }, []);

    const handleSave = async () => {
        if (!newCase.case_number || !newCase.title) return alert("Case Number and Title are required.");

        try {
            const res = await fetch('http://localhost:5000/api/cases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCase)
            });
            const result = await res.json();
            if (result.message === 'success') {
                alert('Case Saved Successfully!');
                setShowModal(false);
                setNewCase({ court_name: 'High Court of Delhi', case_number: '', title: '', stage: 'Admission' });
                fetchCases(); // Refresh list
            }
        } catch (error) {
            console.error("Error saving case:", error);
            alert("Failed to save case.");
        }
    };

    return (
        <div>
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>Case Diary</h1>
                    <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-text-secondary)' }}>
                        Daily proceedings and history tracking.
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={() => alert('Date Picker modal will open here.')} className="btn" style={{ backgroundColor: '#fff', border: '1px solid var(--color-border)' }}>
                        <CalendarIcon size={16} style={{ marginRight: '0.5rem' }} /> Jump to Date
                    </button>
                    <button onClick={() => setShowModal(true)} className="btn btn-primary">
                        + Add New Entry
                    </button>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem' }}>

                {/* Date Navigator & Quick List */}
                <aside>
                    <div className="paper" style={{ padding: '0', overflow: 'hidden', marginBottom: '1.5rem' }}>
                        <div style={{ padding: '1rem', backgroundColor: 'var(--color-navy)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <ChevronLeft size={20} style={{ cursor: 'pointer' }} onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 1)))} />
                            <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>{selectedDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                            <ChevronRight size={20} style={{ cursor: 'pointer' }} onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 1)))} />
                        </div>
                        <div style={{ padding: '1rem' }}>
                            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#999', marginBottom: '0.5rem', fontFamily: 'var(--font-sans)', textTransform: 'uppercase' }}>
                                Quick Cause List
                            </div>
                            {cases.length > 0 ? cases.map((c, i) => (
                                <div key={i} style={{ padding: '0.75rem', borderBottom: '1px solid #eee', cursor: 'pointer', transition: 'background 0.2s' }}>
                                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-navy)' }}>{c.case_number_original}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#555', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.title}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.25rem' }}>{c.court_name}</div>
                                </div>
                            )) : <div style={{ color: '#888', fontStyle: 'italic', fontSize: '0.9rem' }}>No cases found.</div>}
                        </div>
                    </div>

                    <div className="paper" style={{ padding: '1.5rem', textAlign: 'center', color: '#666' }}>
                        <Search size={24} style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
                        <p style={{ fontSize: '0.9rem', fontFamily: 'var(--font-sans)', margin: 0 }}>Search past diaries by Case Number or Party Name</p>
                    </div>
                </aside>

                {/* Diary Pages */}
                <main>
                    {cases.length > 0 ? cases.map((c, i) => (
                        <div key={i} className="paper" style={{ marginBottom: '2rem', borderTop: '4px solid var(--color-gold)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '1rem', marginBottom: '1rem' }}>
                                <div>
                                    <h2 style={{ fontSize: '1.25rem', margin: 0, color: 'var(--color-navy)' }}>{c.title}</h2>
                                    <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.25rem', fontFamily: 'var(--font-sans)' }}>
                                        <strong>{c.case_number_original}</strong> • {c.court_name}
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right', fontSize: '0.9rem', fontFamily: 'var(--font-sans)' }}>
                                    <div style={{ color: '#666' }}>Bench</div>
                                    <div style={{ fontWeight: 600, color: 'var(--color-navy)' }}>{c.judge_name || 'Not Assigned'}</div>
                                </div>
                            </div>

                            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', lineHeight: '1.8', color: '#2c3e50', whiteSpace: 'pre-wrap', marginBottom: '1.5rem' }}>
                                {c.notes || 'No proceeding notes available for this hearing.'}
                            </div>

                            <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '4px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <span style={{ fontSize: '0.8rem', color: '#64748b', fontFamily: 'var(--font-sans)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Next Hearing</span>
                                    <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-navy)' }}>Jan 24, 2025</div>
                                </div>
                                <div>
                                    <span style={{ fontSize: '0.8rem', color: '#64748b', fontFamily: 'var(--font-sans)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Current Stage</span>
                                    <div style={{ fontSize: '1rem', fontWeight: 500 }}>{c.current_stage}</div>
                                </div>
                                <button onClick={() => alert('Editing Note...')} className="btn" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
                                    <PenTool size={14} style={{ marginRight: '0.5rem' }} /> Edit Note
                                </button>
                            </div>
                        </div>
                    )) : (
                        <div className="paper" style={{ textAlign: 'center', padding: '3rem' }}>
                            <BookOpen size={48} opacity={0.2} style={{ marginBottom: '1rem' }} />
                            <h3 style={{ color: '#888' }}>No Cases Found</h3>
                            <p style={{ color: '#999' }}>Click "+ Add New Entry" to create a case file.</p>
                        </div>
                    )}
                </main>

            </div>

            {/* Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div className="paper" style={{ width: '500px', padding: '2rem', position: 'relative' }}>
                        <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer' }}>
                            <X size={24} color="#666" />
                        </button>

                        <h2 style={{ marginTop: 0, color: 'var(--color-navy)', fontSize: '1.5rem' }}>New Case Entry</h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Court</label>
                                <select
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
                                    value={newCase.court_name}
                                    onChange={(e) => setNewCase({ ...newCase, court_name: e.target.value })}
                                >
                                    <option>High Court of Delhi</option>
                                    <option>Supreme Court of India</option>
                                    <option>Patiala House District Court</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Case Number</label>
                                <input
                                    type="text"
                                    placeholder="e.g. WP(C) 1234/2024"
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
                                    value={newCase.case_number}
                                    onChange={(e) => setNewCase({ ...newCase, case_number: e.target.value })}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Case Title / Parties</label>
                                <input
                                    type="text"
                                    placeholder="e.g. State vs. Rajiv Kumar"
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
                                    value={newCase.title}
                                    onChange={(e) => setNewCase({ ...newCase, title: e.target.value })}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Stage</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Admission"
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
                                    value={newCase.stage}
                                    onChange={(e) => setNewCase({ ...newCase, stage: e.target.value })}
                                />
                            </div>

                            <button onClick={handleSave} className="btn btn-primary" style={{ marginTop: '1rem', justifyContent: 'center', padding: '1rem' }}>
                                Save Case File
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CaseDiary;
