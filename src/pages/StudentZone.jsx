import React from 'react';
import { Book, GraduationCap, Award, Video } from 'lucide-react';

const StudentZone = () => {
    return (
        <div>
            <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', color: 'var(--color-navy)', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>Junior Advocate & Student Zone</h1>
                <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-text-secondary)' }}>
                    Learn the craft. Master the procedure. Earn your robes.
                </p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '3rem' }}>

                {/* Learning Module */}
                <div className="paper" style={{ padding: '0', overflow: 'hidden' }}>
                    <div style={{ height: '140px', backgroundColor: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0369a1' }}>
                        <Book size={64} opacity={0.8} />
                    </div>
                    <div style={{ padding: '1.5rem' }}>
                        <h3 style={{ marginTop: 0, color: 'var(--color-navy)' }}>Case Briefing 101</h3>
                        <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: '1.6' }}>
                            Learn the IRAC method (Issue, Rule, Analysis, Conclusion) used by senior counsels to summarize 500-page files into 2 pages.
                        </p>
                        <button onClick={() => alert('Starting Module 1: Case Briefing IRAC Method...')} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>Start Module</button>
                    </div>
                </div>

                {/* Court Observation */}
                <div className="paper" style={{ padding: '0', overflow: 'hidden' }}>
                    <div style={{ height: '140px', backgroundColor: '#fdf4ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a21caf' }}>
                        <Video size={64} opacity={0.8} />
                    </div>
                    <div style={{ padding: '1.5rem' }}>
                        <h3 style={{ marginTop: 0, color: 'var(--color-navy)' }}>Virtual Court Observation</h3>
                        <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: '1.6' }}>
                            Watch selected proceedings from the Supreme Court with annotation layers clarifying <em>"Why did the judge ask that?"</em>
                        </p>
                        <button onClick={() => alert('Opening Video Player: SC Court No. 1 Proceedings...')} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>Watch & Learn</button>
                    </div>
                </div>

                {/* Internship Program */}
                <div className="paper" style={{ padding: '0', overflow: 'hidden' }}>
                    <div style={{ height: '140px', backgroundColor: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#15803d' }}>
                        <GraduationCap size={64} opacity={0.8} />
                    </div>
                    <div style={{ padding: '1.5rem' }}>
                        <h3 style={{ marginTop: 0, color: 'var(--color-navy)' }}>Virtual Internship</h3>
                        <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: '1.6' }}>
                            Complete real drafting tasks evaluated by practicing advocates. Earn a verified certificate for your CV.
                        </p>
                        <button onClick={() => alert('Redirecting to Application Form...')} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>Apply Now</button>
                    </div>
                </div>

            </div>

            <section className="paper" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', textAlign: 'center', marginBottom: '2rem' }}>Curriculum Roadmap</h2>
                <div style={{ borderLeft: '2px solid #ddd', paddingLeft: '2rem', marginLeft: '1rem' }}>

                    <div style={{ position: 'relative', marginBottom: '2rem' }}>
                        <div style={{ position: 'absolute', left: '-2.55rem', top: '0', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'var(--color-gold)', border: '4px solid white', boxShadow: '0 0 0 1px #ddd' }}></div>
                        <h4 style={{ margin: 0, fontSize: '1.1rem' }}>Level 1: The Clerk's Knowledge</h4>
                        <p style={{ margin: '0.5rem 0 0 0', color: '#666' }}>Court fees, filing procedures, registry defects, and managing the court diary.</p>
                    </div>

                    <div style={{ position: 'relative', marginBottom: '2rem' }}>
                        <div style={{ position: 'absolute', left: '-2.55rem', top: '0', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#cbd5e1', border: '4px solid white', boxShadow: '0 0 0 1px #ddd' }}></div>
                        <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#888' }}>Level 2: The Junior Draftsman</h4>
                        <p style={{ margin: '0.5rem 0 0 0', color: '#888' }}>Drafting basic bail applications, exemption applications, and legal notices.</p>
                    </div>

                    <div style={{ position: 'relative' }}>
                        <div style={{ position: 'absolute', left: '-2.55rem', top: '0', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#cbd5e1', border: '4px solid white', boxShadow: '0 0 0 1px #ddd' }}></div>
                        <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#888' }}>Level 3: The Arguing Counsel</h4>
                        <p style={{ margin: '0.5rem 0 0 0', color: '#888' }}>Court craft, handling judges' questions, and mastering citation research.</p>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default StudentZone;
