import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const initials = user?.fullName
    ? user.fullName.split(' ').map(n => n[0]).join('').toUpperCase()
    : '?';

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">ShopApp</Link>

      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>

        {user ? (
          <>
            <Link to="/cart" className="nav-link">Cart</Link>
            <Link to="/orders" className="nav-link">Orders</Link>
            <div className="nav-user">
              <div className="nav-avatar">{initials}</div>
              <span>{user.fullName}</span>
              <button className="nav-btn nav-btn-outline" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-btn nav-btn-outline">Sign In</Link>
            <Link to="/register" className="nav-btn nav-btn-filled">Get Started</Link>
          </>
        )}
      </div>
    </nav>
  );
}
