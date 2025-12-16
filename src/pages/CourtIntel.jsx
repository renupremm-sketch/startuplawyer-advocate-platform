import React from 'react';
import { Gavel, TrendingUp, AlertTriangle, FileText } from 'lucide-react';

const CourtIntel = () => {
    return (
        <div>
            <header style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>Courtroom Intelligence</h1>
                <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-text-secondary)' }}>
                    Insights, judge profiles, and strategic data.
                </p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 300px', gap: '2rem' }}>

                {/* Judge Profile */}
                <div className="paper" style={{ borderTop: '4px solid var(--color-navy)' }}>
                    <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
                        <div style={{
                            width: '80px', height: '80px', backgroundColor: '#e2e8f0', borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '2rem', color: '#64748b'
                        }}>
                            <Gavel size={40} />
                        </div>
                        <div>
                            <h2 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--color-navy)' }}>Hon'ble Justice A.K. Singh</h2>
                            <p style={{ margin: '0.25rem 0', color: '#666', fontFamily: 'var(--font-sans)' }}>High Court of Delhi • Court No. 4</p>
                            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                                <span style={{ fontSize: '0.8rem', padding: '2px 8px', borderRadius: '12px', backgroundColor: '#dbeafe', color: '#1e40af', border: '1px solid #bfdbfe' }}>Commercial</span>
                                <span style={{ fontSize: '0.8rem', padding: '2px 8px', borderRadius: '12px', backgroundColor: '#f3f4f6', color: '#374151', border: '1px solid #e5e7eb' }}>Civil Writs</span>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                        <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
                            <h4 style={{ margin: '0 0 0.5rem 0', color: '#475569', fontSize: '0.9rem', display: 'flex', alignItems: 'center' }}>
                                <TrendingUp size={16} style={{ marginRight: '0.5rem' }} /> Relief Rate
                            </h4>
                            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#16a34a' }}>~32%</div>
                            <p style={{ fontSize: '0.8rem', color: '#666', margin: 0 }}>Granting interim relief in admission matters.</p>
                        </div>
                        <div style={{ backgroundColor: '#fff7ed', padding: '1rem', borderRadius: '8px' }}>
                            <h4 style={{ margin: '0 0 0.5rem 0', color: '#9a3412', fontSize: '0.9rem', display: 'flex', alignItems: 'center' }}>
                                <AlertTriangle size={16} style={{ marginRight: '0.5rem' }} /> Adjournments
                            </h4>
                            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#c2410c' }}>Strict</div>
                            <p style={{ fontSize: '0.8rem', color: '#666', margin: 0 }}>Rarely grants easy passovers.</p>
                        </div>
                    </div>

                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Practical Strategy Notes</h3>
                    <ul style={{ lineHeight: '1.8', color: '#333', paddingLeft: '1.2rem' }}>
                        <li>Prefers <strong>concise synopses</strong> (max 2 pages) handed over before arguments.</li>
                        <li>Focus heavily on <strong>dates and events</strong> sequence.</li>
                        <li>Reads the file beforehand; do not repeat basic facts.</li>
                        <li>Often cites <em>Tata Sons vs. Greenpeace</em> in defamation matters.</li>
                    </ul>
                </div>

                {/* Sidebar - Other Judges / Courts */}
                <aside>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Registry Updates</h3>
                    <div className="paper" style={{ padding: '1rem', marginBottom: '1.5rem', backgroundColor: '#fff' }}>
                        <div style={{ borderBottom: '1px solid #eee', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
                            <strong style={{ display: 'block', fontSize: '0.9rem', color: '#b91c1c' }}>Filing Defect Trend</strong>
                            <p style={{ fontSize: '0.85rem', color: '#555', margin: '0.25rem 0 0 0' }}>
                                Strict check on margins (Left: 4cm). Many files returned today.
                            </p>
                        </div>
                        <div>
                            <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--color-navy)' }}>Listing Notice</strong>
                            <p style={{ fontSize: '0.85rem', color: '#555', margin: '0.25rem 0 0 0' }}>
                                Special Bench for Company Matters sits next Friday.
                            </p>
                        </div>
                    </div>

                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Browse Judges</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {['Justice A.K. Singh', 'Justice R. Menon', 'Justice S. Kaul (Retd)', 'Justice P.L. Datta'].map(name => (
                            <button onClick={() => alert(`Fetching profile for ${name}...`)} key={name} className="btn" style={{ justifyContent: 'flex-start', backgroundColor: '#fff', border: '1px solid #e2e8f0', color: '#444' }}>
                                {name}
                            </button>
                        ))}
                    </div>
                </aside>

            </div>
        </div>
    );
};

export default CourtIntel;
