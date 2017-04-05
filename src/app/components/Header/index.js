import React from 'react';
import { IndexLink, Link } from 'react-router';
import * as styles from './styles.css';

const UnauthorizedNav = function UnauthorizedNav() {
  return (
    <ul className="navbar-nav">
      <li className="nav-item">
        <button className="btn my-2" type="submit">
          <Link to="/login">Sign In</Link>
        </button>
      </li>
      <li>
        <button className="btn my-2" type="submit">
          <Link to="/signup">Create Account</Link>
        </button>
      </li>
    </ul>
  );
};

const AuthorizedNav = function AuthorizedNav({ user, logout }) {
  return (
    <ul className="navbar-nav">
      <li className="nav-item mr-4">
        <div className={styles.greeting}>Signed in as <b className="text-capitalize">{user.firstName}</b></div>
      </li>
      <li className="nav-item">
        <button onClick={logout} className={styles.logout}>Logout</button>
      </li>
    </ul>
  );
};

const HeaderComponent = function HeaderComponent({ user, logout }) {
  return (
    <nav className={`navbar navbar-toggleable-xl navbar-inverse fixed-top bg-inverse ${styles.header__nav}`}>
      <IndexLink to="/" className="navbar-brand">Turbulence</IndexLink>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">&nbsp;</li>
        </ul>
        { user && user.isAuthorized ? <AuthorizedNav {...({ user, logout })} /> : <UnauthorizedNav /> }
      </div>
    </nav>
  );
};

HeaderComponent.propTypes = {
  user: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.bool]),
  logout: React.PropTypes.func.isRequired,
};

AuthorizedNav.propTypes = Object.assign({}, HeaderComponent.propTypes);

export default HeaderComponent;

