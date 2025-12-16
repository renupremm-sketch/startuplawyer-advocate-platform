import React, { useState } from 'react';
import { Search, BookOpen, Scale, Filter, ChevronRight, Gavel, HelpCircle } from 'lucide-react';

const Research = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('caselaw');

    const allResults = [
        {
            title: 'Kesavananda Bharati v. State of Kerala',
            citation: '(1973) 4 SCC 225',
            summary: 'Established the "Basic Structure Doctrine" of the Constitution of India. Parliament cannot alter the basic features of the Constitution.',
            court: 'Supreme Court of India',
            year: '1973',
            relevance: '98%',
            type: 'Landmark',
            situationMatch: 'Constitutional Amendment Validity'
        },
        {
            title: 'Maneka Gandhi v. Union of India',
            citation: '1978 AIR 597',
            summary: 'Expanded the meaning of "Life and Personal Liberty" under Article 21. Procedure established by law must be just, fair, and reasonable.',
            court: 'Supreme Court of India',
            year: '1978',
            relevance: '95%',
            type: 'Landmark',
            situationMatch: 'Passport Impounding'
        },
        {
            title: 'Driver v. State (Hypothetical)',
            citation: '2023 DHC 445',
            summary: 'Held that sudden brake failure due to rain is a mechanical defect, not negligence, provided maintenance records are clean.',
            court: 'High Court of Delhi',
            year: '2023',
            relevance: '92%',
            type: 'Recent',
            situationMatch: 'Driver Crash Rain'
        }
    ];

    const [results, setResults] = useState(allResults);

    const handleSearch = () => {
        if (!searchTerm) {
            setResults(allResults);
            return;
        }

        // Simulating Search Delay
        const filtered = allResults.filter(r =>
            r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (r.situationMatch && r.situationMatch.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setResults(filtered);
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem' }}>

            {/* Filters Sidebar */}
            <aside className="paper" style={{ padding: '1.5rem' }}>
                <h3 style={{ marginTop: 0, marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
                    <Filter size={18} style={{ marginRight: '0.5rem' }} /> Filters
                </h3>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Jurisdiction</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label><input type="checkbox" defaultChecked /> Supreme Court</label>
                        <label><input type="checkbox" defaultChecked /> High Courts</label>
                        <label><input type="checkbox" /> Tribunals (NCLT/CAT)</label>
                    </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Date Range</label>
                    <select style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}>
                        <option>All Time</option>
                        <option>Last 5 Years</option>
                        <option>Last 1 Year</option>
                        <option>Custom Range</option>
                    </select>
                </div>
            </aside>

            {/* Main Search Area */}
            <main>
                <header style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>Legal Research & Intelligence</h1>
                    <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-text-secondary)' }}>
                        Search across 10M+ judgments, Acts, and legal commentaries.
                    </p>
                </header>

                <div className="paper" style={{ padding: '1.5rem', marginBottom: '2rem', border: '1px solid var(--color-gold)' }}>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <input type="radio" name="searchType" checked={searchType === 'caselaw'} onChange={() => setSearchType('caselaw')} style={{ marginRight: '0.5rem' }} />
                            <BookOpen size={16} style={{ marginRight: '0.4rem' }} /> Case Law
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <input type="radio" name="searchType" checked={searchType === 'bareact'} onChange={() => setSearchType('bareact')} style={{ marginRight: '0.5rem' }} />
                            <Scale size={16} style={{ marginRight: '0.4rem' }} /> Bare Acts
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <input type="radio" name="searchType" checked={searchType === 'judge'} onChange={() => setSearchType('judge')} style={{ marginRight: '0.5rem' }} />
                            <Gavel size={16} style={{ marginRight: '0.4rem' }} /> Judge History
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', backgroundColor: searchType === 'situation' ? '#f0f9ff' : 'transparent', padding: '2px 8px', borderRadius: '4px' }}>
                            <input type="radio" name="searchType" checked={searchType === 'situation'} onChange={() => setSearchType('situation')} style={{ marginRight: '0.5rem' }} />
                            <HelpCircle size={16} style={{ marginRight: '0.4rem', color: '#0284c7' }} /> Similar Situation (AI)
                        </label>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <input
                            type="text"
                            placeholder={searchType === 'situation' ? "Describe the facts (e.g., 'Driver crashed due to heavy rain on highway')..." : "Enter keywords, citation, or act name..."}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            style={{ flex: 1, padding: '0.75rem 1rem', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '4px', outline: 'none' }}
                        />
                        <button onClick={handleSearch} className="btn btn-primary" style={{ padding: '0 2rem' }}>
                            <Search size={20} />
                        </button>
                    </div>
                </div>

                {/* Results Simulation */}
                <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--color-navy)' }}>
                        {results.length === 0 ? 'No Results Found' : (searchType === 'situation' ? 'Judgments with Similar Facts' : 'Top Relevancy Matches')}
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {results.map((caseItem, i) => (
                            <div key={i} className="paper" style={{ padding: '1.5rem', transition: 'transform 0.2s', cursor: 'pointer' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                        {caseItem.type} • {caseItem.court}
                                    </div>
                                    <div style={{ backgroundColor: '#f0fdf4', color: '#166534', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600 }}>
                                        {caseItem.relevance} Match
                                    </div>
                                </div>
                                <h2 style={{ fontSize: '1.25rem', margin: '0 0 0.5rem 0', color: 'var(--color-navy)' }}>{caseItem.title}</h2>
                                <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.75rem', fontFamily: 'var(--font-sans)', fontWeight: 500 }}>
                                    {caseItem.citation} • {caseItem.year}
                                </div>
                                <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#333', margin: 0 }}>
                                    {caseItem.summary}
                                </p>
                                <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', color: '#2563eb', fontSize: '0.9rem', fontWeight: 500 }}>
                                    Read Full Judgment <ChevronRight size={16} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </main>
        </div>
    );
};

export default Research;
