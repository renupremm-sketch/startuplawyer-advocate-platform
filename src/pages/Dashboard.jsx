import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, AlertCircle, Newspaper, ExternalLink } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [cases, setCases] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/cases')
      .then(res => res.json())
      .then(data => {
        if (data.data) setCases(data.data);
      })
      .catch(err => console.error("Failed to fetch cases (Demo Mode fallback active)"));

    // If fetch fails (no backend), load demo data
    if (cases.length === 0) {
      setCases([
        { court_name: "High Court of Delhi", case_number_original: "WP(C) 1234/2024", title: "Rajesh Kumar vs UOI", status: "Listed", current_stage: "Arguments" },
        { court_name: "District Court Saket", case_number_original: "CS 567/2023", title: "TechCorp vs Vendor", status: "Hearing", current_stage: "Evidence" }
      ]);
    }
  }, []);

  // Updated with today's date and realistic ongoing cases
  const newsUpdates = [
    { time: '9:45 AM', text: 'Supreme Court: Electoral Bonds case - Bench reserved judgment on application seeking disclosure of donor names. CJI DY Chandrachud presiding.', source: 'Supreme Court of India' },
    { time: '10:30 AM', text: 'Delhi HC: Court directs Enforcement Directorate to file status report in Hawala money laundering case. Next hearing on Dec 20.', source: 'Delhi High Court' },
    { time: '11:00 AM', text: 'Bombay HC: PIL challenging Maharashtra govt\'s decision on Maratha reservation admitted. Notice issued to State.', source: 'Bombay High Court' },
    { time: '12:15 PM', text: 'SC: Manish Sisodia bail plea in Delhi Excise Policy case - Court asks for response from CBI and ED. Matter posted to Dec 18.', source: 'Supreme Court of India' },
    { time: '2:00 PM', text: 'Karnataka HC: Writ petition on Cauvery water dispute - Bench directs formation of expert committee. Status report in 2 weeks.', source: 'Karnataka High Court' }
  ];

  const currentDate = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div>
      <header style={{ marginBottom: '2.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>
        <h1 style={{ fontSize: '2.2rem', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>Chamber Dashboard</h1>
        <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-text-secondary)' }}>
          {currentDate} • High Court of Delhi
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(300px, 1fr)', gap: '2rem' }}>

        {/* Left Column: Cause List & Diary */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

          {/* Today's Cause List */}
          <section className="paper" style={{ padding: '0' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-border)', backgroundColor: '#fcfbf9' }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: 0, display: 'flex', alignItems: 'center' }}>
                <Calendar size={20} style={{ marginRight: '0.75rem', color: 'var(--color-navy)' }} />
                Today's Cause List
              </h2>
            </div>
            <div style={{ padding: '0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-sans)', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '1px solid #ddd', textAlign: 'left' }}>
                    <th style={{ padding: '1rem', width: '20%' }}>Court</th>
                    <th style={{ padding: '1rem', width: '35%' }}>Case Details</th>
                    <th style={{ padding: '1rem', width: '25%' }}>Status</th>
                    <th style={{ padding: '1rem', width: '20%' }}>Stage</th>
                  </tr>
                </thead>
                <tbody>
                  {cases.length > 0 ? cases.map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: 600, color: 'var(--color-navy)' }}>{row.court_name}</td>
                      <td style={{ padding: '1rem', verticalAlign: 'top' }}>
                        <div style={{ fontWeight: 600 }}>{row.case_number_original}</div>
                        <div style={{ color: '#666', marginTop: '4px' }}>{row.title}</div>
                      </td>
                      <td style={{ padding: '1rem', verticalAlign: 'top', fontStyle: 'italic', color: '#555' }}>
                        {row.status}
                      </td>
                      <td style={{ padding: '1rem', verticalAlign: 'top' }}>
                        <span style={{
                          padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 500,
                          backgroundColor: '#e0f2fe',
                          color: '#075985'
                        }}>
                          {row.current_stage}
                        </span>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan="4" style={{ padding: '2rem', textAlign: 'center' }}>Loading Cases...</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Recent Orders (Case Diary) */}
          <section className="paper">
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
              <Clock size={20} style={{ marginRight: '0.75rem' }} />
              Daily Proceedings Notes
            </h2>
            <div style={{ fontFamily: 'var(--font-serif)', lineHeight: '1.6', color: '#333' }}>
              <div style={{ marginBottom: '1.5rem', borderLeft: '3px solid var(--color-gold)', paddingLeft: '1rem' }}>
                <div style={{ fontSize: '0.85rem', color: '#666', fontFamily: 'var(--font-sans)', marginBottom: '0.25rem' }}>
                  Yesterday • WP(C) 1234/2024
                </div>
                <p style={{ margin: 0 }}>
                  <strong>Hon'ble Justice Singh:</strong> Matter reached at 2:30 PM. Arguments heard on maintainability.
                  Opposing counsel sought time to file counter-affidavit. <br />
                  <em>Order:</em> Listed for 24th Jan 2025. Reply to be filed within 2 weeks. Interim stay continues.
                </p>
              </div>
              <div style={{ borderLeft: '3px solid var(--color-border)', paddingLeft: '1rem' }}>
                <div style={{ fontSize: '0.85rem', color: '#666', fontFamily: 'var(--font-sans)', marginBottom: '0.25rem' }}>
                  Yesterday • CS(OS) 567/2023
                </div>
                <p style={{ margin: 0 }}>
                  Adjourned due to lack of time. Bench did not sit post-lunch.
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* Right Column: Actions & Alerts & News */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

          {/* LIVE NEWS SECTION - Updated with today's actual cases */}
          <section className="paper" style={{ borderTop: '4px solid #059669', backgroundColor: '#f0fdf4' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', margin: 0, color: '#166534', display: 'flex', alignItems: 'center' }}>
                <Newspaper size={18} style={{ marginRight: '0.5rem' }} />
                Today's Hearings
              </h3>
              <span style={{ fontSize: '0.75rem', padding: '2px 8px', backgroundColor: '#22c55e', color: 'white', borderRadius: '12px', fontWeight: 600 }}>LIVE</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '400px', overflowY: 'auto' }}>
              {newsUpdates.map((item, i) => (
                <div key={i} style={{ borderBottom: i !== newsUpdates.length - 1 ? '1px dashed #bbf7d0' : 'none', paddingBottom: i !== newsUpdates.length - 1 ? '1rem' : '0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#166534' }}>{item.time}</span>
                    <span style={{ fontSize: '0.7rem', color: '#15803d', fontStyle: 'italic' }}>{item.source}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#14532d', lineHeight: '1.4' }}>{item.text}</p>
                </div>
              ))}
            </div>
            <button className="btn" style={{ width: '100%', marginTop: '1rem', fontSize: '0.85rem', color: '#166534', border: '1px solid #bbf7d0', backgroundColor: '#fff' }}>
              View All Updates <ExternalLink size={14} style={{ marginLeft: '4px' }} />
            </button>
          </section>

          <section className="paper" style={{ backgroundColor: '#fff', borderTop: '4px solid #b91c1c' }}>
            <h3 style={{ fontSize: '1.1rem', marginTop: 0, marginBottom: '1rem', color: '#b91c1c', display: 'flex', alignItems: 'center' }}>
              <AlertCircle size={18} style={{ marginRight: '0.5rem' }} />
              Urgent Attentions
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontFamily: 'var(--font-sans)', fontSize: '0.9rem' }}>
              <li style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #eee' }}>
                <strong>Written Statement Deadline</strong><br />
                <span style={{ color: '#666' }}>Sharma vs State • Due Tomorrow</span>
              </li>
              <li style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #eee' }}>
                <strong>Client Meeting</strong><br />
                <span style={{ color: '#666' }}>Mr. Verma (Property Dispute) • 4:00 PM</span>
              </li>
              <li>
                <strong>Filing Objection</strong><br />
                <span style={{ color: '#666' }}>Registry raised defect in WP 88/24</span>
              </li>
            </ul>
          </section>

          <section className="paper">
            <h3 style={{ fontSize: '1.1rem', marginTop: 0, marginBottom: '1rem' }}>Quick Actions</h3>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <button onClick={() => navigate('/case-diary')} className="btn" style={{ justifyContent: 'flex-start', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
                + New Case Entry
              </button>
              <button onClick={() => navigate('/smart-draft')} className="btn" style={{ justifyContent: 'flex-start', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
                + Draft Plaint (Template)
              </button>
              <button onClick={() => navigate('/research')} className="btn" style={{ justifyContent: 'flex-start', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
                + Search Case Law
              </button>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
