import React from 'react';
import { Users, File, Lock, MoreHorizontal } from 'lucide-react';

const Clients = () => {
    const clients = [
        { name: 'Mr. Rajesh Verma', type: 'Individual', matter: 'Property Dispute Sec-14', status: 'Active', retainer: 'Paid' },
        { name: 'TechCorp India Pvt Ltd', type: 'Corporate', matter: 'Trademark Defense', status: 'Active', retainer: 'Pending' },
        { name: 'Mrs. Sunita Devi', type: 'Pro Bono', matter: 'Family Pension', status: 'Closed', retainer: 'N/A' },
    ];

    return (
        <div>
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>Client Files</h1>
                    <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-text-secondary)' }}>
                        Confidential records, fees, and vakalatnamas.
                    </p>
                </div>
                <button onClick={() => alert('New Client Registration Form (KYC)')} className="btn btn-primary">+ New Client</button>
            </header>

            <div className="paper" style={{ padding: 0 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-sans)', fontSize: '0.95rem' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', textAlign: 'left' }}>
                            <th style={{ padding: '1rem', width: '30%' }}>Client Name / Type</th>
                            <th style={{ padding: '1rem', width: '30%' }}>Matter Details</th>
                            <th style={{ padding: '1rem', width: '15%' }}>Status</th>
                            <th style={{ padding: '1rem', width: '15%' }}>Retainer</th>
                            <th style={{ padding: '1rem', width: '10%' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((client, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s' }}>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ fontWeight: 600, color: 'var(--color-navy)' }}>{client.name}</div>
                                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{client.type}</div>
                                </td>
                                <td style={{ padding: '1rem', color: '#333' }}>{client.matter}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 500,
                                        backgroundColor: client.status === 'Active' ? '#f0fdf4' : '#f1f5f9',
                                        color: client.status === 'Active' ? '#166534' : '#64748b'
                                    }}>
                                        {client.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        color: client.retainer === 'Pending' ? '#b91c1c' : '#059669',
                                        fontWeight: 500
                                    }}>
                                        {client.retainer}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <button onClick={() => alert('Viewing Client Details...')} className="btn" style={{ padding: '0.4rem', color: '#64748b' }}>
                                        <MoreHorizontal size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '2rem' }}>
                <div className="paper" style={{ flex: 1, backgroundColor: '#fffbe6', border: '1px solid #ffe58f' }}>
                    <h3 style={{ fontSize: '1.1rem', marginTop: 0, marginBottom: '0.5rem', color: '#b7791f', display: 'flex', alignItems: 'center' }}>
                        <Lock size={16} style={{ marginRight: '0.5rem' }} /> Encrypted Vault
                    </h3>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
                        Client notes stored in this section are end-to-end encrypted. No AI processing is applied to this data for privacy.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Clients;
