import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, MoreVertical, Plus, Search, ChevronLeft, ChevronRight, X, Mic, MicOff, Edit, Trash2 } from 'lucide-react';

const CaseDiary = () => {
    const [cases, setCases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [newCase, setNewCase] = useState({ title: '', caseNo: '', court: '', time: '', type: 'Hearing', stage: 'Arguments' });
    const [editingCase, setEditingCase] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [openMenuId, setOpenMenuId] = useState(null);

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
        setEditingCase({ ...c });
        setIsEditModalOpen(true);
        setOpenMenuId(null);
    };

    const handleDeleteCase = (caseId) => {
        const updatedCases = cases.filter(c => c.id !== caseId);
        setCases(updatedCases);
        localStorage.setItem('demo_cases', JSON.stringify(updatedCases));
        setOpenMenuId(null);
    };

    const handleSaveEdit = () => {
        const updatedCases = cases.map(c => c.id === editingCase.id ? editingCase : c);
        setCases(updatedCases);
        localStorage.setItem('demo_cases', JSON.stringify(updatedCases));
        setIsEditModalOpen(false);
        setEditingCase(null);
    };

    const jumpToDate = () => {
        setShowDatePicker(!showDatePicker);
    };

    const handleDateChange = (direction) => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + direction);
        setSelectedDate(newDate);
    };

    const handleVoiceRecord = () => {
        setIsRecording(true);
        setTimeout(() => {
            setIsRecording(false);
            setNewCase({
                title: 'Recorded Case Entry #' + Math.floor(Math.random() * 100),
                caseNo: 'Unknown',
                court: 'High Court',
                time: '11:00 AM',
                type: 'Urgent Mentioning',
                stage: 'Admission',
                notes: 'Transcribed: Client called regarding urgent stay matter. Needs filing by tomorrow morning.'
            });
            setIsModalOpen(true);
        }, 3000);
    };

    const formatDate = (date) => {
        const options = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-IN', options);
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
                    <button
                        onClick={handleVoiceRecord}
                        className="btn"
                        style={{ backgroundColor: isRecording ? '#fee2e2' : '#fff', border: isRecording ? '1px solid #ef4444' : '1px solid var(--color-border)', color: isRecording ? '#b91c1c' : 'inherit', minWidth: '140px' }}
                    >
                        {isRecording ? (
                            <><div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444', marginRight: '8px', animation: 'pulse 1s infinite' }}></div> Recording...</>
                        ) : (
                            <><Mic size={16} style={{ marginRight: '0.5rem' }} /> Voice Entry</>
                        )}
                    </button>
                    <button onClick={jumpToDate} className="btn" style={{ backgroundColor: '#fff', border: '1px solid var(--color-border)', position: 'relative' }}>
                        <Calendar size={16} style={{ marginRight: '0.5rem' }} /> Jump to Date
                    </button>
                    <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
                        <Plus size={16} style={{ marginRight: '0.5rem' }} /> Add New Entry
                    </button>
                </div>
            </header>

            {/* Date Picker Modal */}
            {showDatePicker && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }} onClick={() => setShowDatePicker(false)}>
                    <div className="paper" style={{ width: '350px', padding: '2rem' }} onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h2 style={{ margin: 0 }}>Select Date</h2>
                            <button onClick={() => setShowDatePicker(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
                        </div>
                        <input
                            type="date"
                            value={selectedDate.toISOString().split('T')[0]}
                            onChange={(e) => {
                                setSelectedDate(new Date(e.target.value));
                                setShowDatePicker(false);
                            }}
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
                        />
                    </div>
                </div>
            )}

            {/* Calendar Strip */}
            <div className="paper" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <button onClick={() => handleDateChange(-1)} className="btn"><ChevronLeft size={20} /></button>
                <div style={{ textAlign: 'center' }}>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--color-navy)' }}>{formatDate(selectedDate)}</h3>
                    <span style={{ fontSize: '0.9rem', color: '#666' }}>
                        {selectedDate.toDateString() === new Date().toDateString() ? 'Today' : ''}
                    </span>
                </div>
                <button onClick={() => handleDateChange(1)} className="btn"><ChevronRight size={20} /></button>
            </div>

            {/* Case List */}
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {cases.map((c) => (
                        <div key={c.id} className="paper" style={{ display: 'grid', gridTemplateColumns: '80px 1fr 200px 50px', alignItems: 'center', gap: '1.5rem', transition: 'transform 0.2s', padding: '1.5rem', position: 'relative' }}>
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
                                    <div style={{ marginTop: '0.75rem', fontSize: '0.9rem', backgroundColor: '#fffbeb', padding: '0.5rem', borderRadius: '4px', borderLeft: '3px solid #fcd34d', color: '#b45309' }}>
                                        <span>📝 {c.notes}</span>
                                    </div>
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
                                <button
                                    onClick={() => setOpenMenuId(openMenuId === c.id ? null : c.id)}
                                    className="btn"
                                    style={{ padding: '0.5rem' }}
                                >
                                    <MoreVertical size={18} color="#94a3b8" />
                                </button>

                                {/* Dropdown Menu */}
                                {openMenuId === c.id && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '100%',
                                        right: '2rem',
                                        marginTop: '0.5rem',
                                        backgroundColor: 'white',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        zIndex: 10,
                                        minWidth: '150px'
                                    }}>
                                        <button
                                            onClick={() => handleEditClick(c)}
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem 1rem',
                                                border: 'none',
                                                background: 'none',
                                                textAlign: 'left',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                fontSize: '0.9rem',
                                                color: '#334155'
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                        >
                                            <Edit size={16} style={{ marginRight: '0.5rem' }} /> Edit Note
                                        </button>
                                        <button
                                            onClick={() => handleDeleteCase(c.id)}
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem 1rem',
                                                border: 'none',
                                                background: 'none',
                                                textAlign: 'left',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                fontSize: '0.9rem',
                                                color: '#ef4444'
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                        >
                                            <Trash2 size={16} style={{ marginRight: '0.5rem' }} /> Delete
                                        </button>
                                    </div>
                                )}
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
                                    <div style={{ marginTop: '0.5rem' }}>
                                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.25rem' }}>Notes</label>
                                        <textarea
                                            placeholder="Details or Voice Transcript will appear here..."
                                            value={newCase.notes || ''}
                                            onChange={(e) => setNewCase({ ...newCase, notes: e.target.value })}
                                            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', minHeight: '80px', fontFamily: 'inherit' }}
                                        />
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
