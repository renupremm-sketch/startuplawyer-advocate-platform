import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Scale, BookOpen, FileText, Users, Gavel, LayoutDashboard, PenTool, GraduationCap, Shield, Lock, Settings } from 'lucide-react';

const Layout = ({ children }) => {
  const location = useLocation();
  const [role, setRole] = useState('Senior Advocate'); // Roles: Senior Advocate, Junior Advocate, Intern

  // Define access levels
  const navItems = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard, access: ['Senior Advocate', 'Junior Advocate', 'Intern'] },
    { label: 'Case Diary', path: '/case-diary', icon: BookOpen, access: ['Senior Advocate', 'Junior Advocate', 'Intern'] },
    { label: 'Drafting & AI', path: '/smart-draft', icon: PenTool, access: ['Senior Advocate', 'Junior Advocate'] },
    { label: 'Agreements', path: '/agreements', icon: FileText, access: ['Senior Advocate', 'Junior Advocate'] },
    { label: 'Evidence', path: '/evidence', icon: FileText, access: ['Senior Advocate', 'Junior Advocate'] },
    { label: 'Research', path: '/research', icon: Scale, access: ['Senior Advocate', 'Junior Advocate', 'Intern'] },
    { label: 'Court Intel', path: '/court-intel', icon: Gavel, access: ['Senior Advocate', 'Junior Advocate'] },
    { label: 'Clients', path: '/clients', icon: Users, access: ['Senior Advocate'] }, // Strict confidentiality
    { label: 'Student Zone', path: '/student-zone', icon: GraduationCap, access: ['Senior Advocate', 'Junior Advocate', 'Intern'] },
    { label: 'Ethics', path: '/ethics', icon: Shield, access: ['Senior Advocate', 'Junior Advocate', 'Intern'] },
    { label: 'AI Configuration', path: '/ai-config', icon: Settings, access: ['Senior Advocate'] },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside style={{
        width: '260px',
        backgroundColor: 'var(--color-navy)',
        color: 'var(--color-text-inverse)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        height: '100%',
        zIndex: 10,
        boxShadow: '4px 0 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{ padding: '2rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <h1 style={{ color: 'white', fontSize: '1.25rem', fontFamily: 'var(--font-serif)', margin: 0 }}>
            Advocate Platform
          </h1>
          <p style={{ color: '#aaa', fontSize: '0.8rem', marginTop: '0.5rem', fontFamily: 'var(--font-sans)', letterSpacing: '0.5px' }}>
            PRACTICE. PRECEDENT. PROCESS.
          </p>
        </div>

        <nav style={{ flex: 1, padding: '1.5rem 0' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            const hasAccess = item.access.includes(role);

            return (
              <div key={item.path}>
                {hasAccess ? (
                  <Link
                    to={item.path}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0.9rem 1.5rem',
                      color: isActive ? 'var(--color-gold)' : '#e0e0e0',
                      backgroundColor: isActive ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                      borderLeft: isActive ? '4px solid var(--color-gold)' : '4px solid transparent',
                      transition: 'all 0.2s ease',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.9rem',
                      fontWeight: isActive ? 600 : 400,
                      textDecoration: 'none'
                    }}
                  >
                    <Icon size={18} style={{ marginRight: '1rem', opacity: isActive ? 1 : 0.8 }} />
                    {item.label}
                  </Link>
                ) : (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.9rem 1.5rem',
                    color: '#64748b',
                    cursor: 'not-allowed',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.9rem'
                  }}>
                    <Lock size={16} style={{ marginRight: '1rem', opacity: 0.5 }} />
                    <span style={{ opacity: 0.5 }}>{item.label}</span>
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '4px', backgroundColor: 'var(--color-gold)', color: 'var(--color-navy)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '1rem',
              fontFamily: 'var(--font-serif)', fontWeight: 700
            }}>
              {role === 'Senior Advocate' ? 'SA' : role === 'Junior Advocate' ? 'JA' : 'IN'}
            </div>
            <div>
              <p style={{ margin: 0, fontSize: '0.9rem', fontFamily: 'var(--font-sans)', fontWeight: 500, color: 'white' }}>
                {role === 'Senior Advocate' ? 'Sr. Counsel' : role === 'Junior Advocate' ? 'Junior Adv.' : 'Legal Intern'}
              </p>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#ccc', fontFamily: 'var(--font-sans)' }}>Chambers of Law</p>
            </div>
          </div>

          {/* Role Switcher Simulator */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              width: '100%', padding: '0.5rem', borderRadius: '4px', border: 'none', backgroundColor: 'rgba(255,255,255,0.1)',
              color: '#fff', fontSize: '0.8rem', outline: 'none', cursor: 'pointer'
            }}
          >
            <option style={{ color: '#000' }} value="Senior Advocate">View as: Senior Advocate</option>
            <option style={{ color: '#000' }} value="Junior Advocate">View as: Junior Advocate</option>
            <option style={{ color: '#000' }} value="Intern">View as: Clerk / Intern</option>
          </select>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{
        flex: 1,
        marginLeft: '260px',
        padding: '2.5rem 3rem',
        backgroundColor: 'var(--color-bg-app)',
        minHeight: '100vh'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
