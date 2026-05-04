import { Link, useLocation } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'All Products' },
    { path: '/favorites', label: 'Favorites' },
    { path: '/contact', label: 'Contact Us' },
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: '#fff',
      borderBottom: '1px solid #ddd',
      padding: '0 20px',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img src="/logo.png" alt="LienPet" style={{ height: '40px' }} />
      </Link>

      <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              backgroundColor: location.pathname === item.path ? '#2d5a27' : 'transparent',
              color: location.pathname === item.path ? '#fff' : '#333',
              textDecoration: 'none'
            }}
          >
            {item.label}
          </Link>
        ))}
        <div style={{ marginLeft: '16px', borderLeft: '1px solid #ddd', paddingLeft: '16px' }}>
          <LanguageSwitcher />
        </div>
      </nav>
    </header>
  );
}
