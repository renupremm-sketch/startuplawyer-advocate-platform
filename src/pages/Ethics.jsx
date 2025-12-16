import React from 'react';
import { Shield, Book, Award } from 'lucide-react';

const Ethics = () => {
    return (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <header style={{ textAlign: 'center', marginBottom: '3rem', borderBottom: '1px solid #ddd', paddingBottom: '2rem' }}>
                <Shield size={48} color="var(--color-navy)" style={{ marginBottom: '1rem' }} />
                <h1 style={{ fontSize: '2.5rem', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>Professional Conduct & Ethics</h1>
                <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                    Adherence to the Bar Council of India Rules is the hallmark of a true advocate.
                </p>
            </header>

            <div className="paper" style={{ padding: '3rem', fontFamily: 'var(--font-serif)' }}>
                <h2 style={{ fontSize: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
                    Chapter II: Standards of Professional Conduct and Etiquette
                </h2>

                <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.2rem', color: '#b45309' }}>Section I - Duty to the Court</h3>
                    <p>
                        1. An advocate shall, during the presentation of his case and while otherwise acting before a court, conduct himself with dignity and self-respect. He shall not be servile and whenever there is proper ground for serious complaint against a judicial officer, it shall be his right and duty to submit his grievance to proper authorities.
                    </p>
                    <p>
                        2. An advocate shall maintain towards the courts a respectful attitude, bearing in mind that the dignity of the judicial office is essential for the survival of a free community.
                    </p>
                    <p>
                        3. An advocate shall not influence the decision of a court by any illegal or improper means. Private communications with a judge relating to a pending case are forbidden.
                    </p>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.2rem', color: '#b45309' }}>Section II - Duty to the Client</h3>
                    <p>
                        11. An advocate is bound to accept any brief in the Courts or Tribunals or before any other authorities in or before which he proposes to practise at a fee consistent with his standing at the Bar and the nature of the case.
                    </p>
                    <p>
                        12. An advocate shall not ordinarily withdraw from engagements, once accepted, without sufficient cause and unless reasonable and sufficient notice is given to the client.
                    </p>
                </div>

                <div style={{ backgroundColor: '#f8fafc', padding: '2rem', border: '1px solid #e2e8f0', marginTop: '3rem' }}>
                    <h4 style={{ margin: '0 0 1rem 0', fontFamily: 'var(--font-sans)', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>Platform Pledge</h4>
                    <p style={{ fontStyle: 'italic', color: '#555', margin: 0 }}>
                        "I solemnly affirm that I shall uphold the Constitution, the Rule of Law, and the dignity of the profession. I shall use this platform to enhance justice, not to mislead the court."
                    </p>
                    <div style={{ marginTop: '1.5rem', textAlign: 'right', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
                        — Accepted by User on 16/12/2024
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Ethics;
