import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Scale, BookOpen, FileText, Users, Gavel, LayoutDashboard, PenTool, GraduationCap, Shield, Settings, Menu, X } from 'lucide-react';

const Layout = ({ children }) => {
  const location = useLocation();
  const [role, setRole] = useState('Senior Advocate');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modernized Access List
  const navItems = [
    { label: 'Home', path: '/', icon: LayoutDashboard },
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Case Diary', path: '/case-diary', icon: BookOpen },
    { label: 'Generate Agreement', path: '/agreements', icon: FileText },
    { label: 'Review', path: '/review', icon: Shield },
    { label: 'Research', path: '/research', icon: Scale },
    { label: 'Court Intel', path: '/court-intel', icon: Gavel },
    { label: 'AI Config', path: '/ai-config', icon: Settings },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg-app)', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>

      {/* Immersive Background Spotlights */}
      <div style={{ position: 'fixed', top: '-20%', left: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' }}></div>
      <div style={{ position: 'fixed', bottom: '-20%', right: '-10%', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(100px)', zIndex: 0, pointerEvents: 'none' }}></div>

      {/* Modern Top Navigation Bar */}
      <nav className="glass" style={{
        position: 'sticky', top: 0, zIndex: 50,
        padding: '0.75rem 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255,255,255,0.4)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <Scale size={20} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.2rem', margin: 0, lineHeight: 1, letterSpacing: '-0.5px', color: 'var(--color-primary)' }}>Lex<span style={{ color: 'var(--color-accent)' }}>Mind</span></h1>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', letterSpacing: '1px' }}>AI ADVOCATE</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div style={{ display: 'flex', gap: '0.5rem', display: window.innerWidth < 1000 ? 'none' : 'flex' }}>
            {navItems.slice(0, 6).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  textDecoration: 'none',
                  color: location.pathname === item.path ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  background: location.pathname === item.path ? 'rgba(15, 23, 42, 0.05)' : 'transparent',
                  transition: 'all 0.2s',
                  display: 'flex', alignItems: 'center', gap: '0.5rem'
                }}
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.4rem 1rem', borderRadius: '20px', background: '#f1f5f9', color: '#334155', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }}></div>
            Online
          </div>
          <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
            New Project
          </button>
        </div>
      </nav>

      {/* Main Workspace */}
      <main style={{ flex: 1, padding: '2rem', position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        {/* Breadcrumb / Title Context (Optional) */}

        <div className="fade-in">
          {children}
        </div>
      </main>

    </div>
  );
};

export default Layout;
