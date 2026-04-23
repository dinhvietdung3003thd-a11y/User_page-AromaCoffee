import { Link, NavLink } from 'react-router-dom';
import { centerNavLinks } from '../../../config/navConfig';
import { routePaths } from '../../../router/routePaths';
import { useAuthStore } from '../../../store/authStore';
import './Navbar.css';

function Navbar() {
  const { isLoggedIn, user } = useAuthStore();

  return (
    <header className="navbar">
      <div className="navbar__left">
        <Link className="navbar__logo" to={routePaths.home}>
          Aroma Coffee
        </Link>
      </div>

      <nav className="navbar__center" aria-label="Main navigation">
        {centerNavLinks.map((link) => (
          <NavLink
            key={link.to}
            className={({ isActive }) =>
              `navbar__link ${isActive ? 'navbar__link--active' : ''}`.trim()
            }
            to={link.to}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="navbar__right">
        {!isLoggedIn ? (
          <>
            <Link className="navbar__action" to={routePaths.register}>
              Register
            </Link>
            <Link className="navbar__action navbar__action--primary" to={routePaths.login}>
              Login
            </Link>
          </>
        ) : (
          <div className="navbar__user" aria-label="Current user">
            <img
              alt="User avatar"
              className="navbar__avatar"
              src={user?.avatarUrl || '/placeholder-product.png'}
            />
            <span>{user?.fullName || 'Customer'}</span>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
