import { Link, NavLink } from 'react-router-dom';
import './appHeader.scss';

export default function AppHeader() {
  return (
    <header className="app__header">
      <h1 className="app__title">
        <Link to="/">
          <span>Marvel</span> information portal
        </Link>
      </h1>
      <nav className="app__menu">
        <ul>
          <li>
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'active-link' : undefined)}>
              Characters
            </NavLink>
          </li>
          /
          <li>
            <NavLink to="/comics" className={({ isActive }) => (isActive ? 'active-link' : undefined)}>
              Comics
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
