import React from 'react';
import { Link } from 'react-router';

import styles from './styles.css';

class NavLink extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    to: React.PropTypes.string.isRequired,
    children: React.PropTypes.node.isRequired,
    className: React.PropTypes.string,
    activeClassName: React.PropTypes.string,
  };

  render() {
    const { to, children, className, activeClassName } = this.props;
    return (
      <Link to={to} className={className} activeClassName={`${activeClassName} ${styles.isAtLocation}`}>
        {children}
      </Link>
    );
  }
}

export default NavLink;
