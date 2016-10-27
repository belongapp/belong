import React from 'react';
import Relay from 'react-relay';
import { FormattedMessage } from 'react-intl';

import NavLink from 'components/NavLink';
import ViewerWidget from 'containers/ViewerWidget';
import messages from './messages';
import styles from './styles.css';

const HeaderLink = ({ to, msg }) => (
  <NavLink to={to} className={styles.navlink} activeClassName={styles.isAtLocation}>
    <FormattedMessage {...msg} />
  </NavLink>
);
HeaderLink.propTypes = {
  to: React.PropTypes.string.isRequired,
  msg: React.PropTypes.object.isRequired,
};

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    viewer: React.PropTypes.object.isRequired,
    location: React.PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className={styles.navbar}>
        <HeaderLink to="/" msg={messages.home} />
        <HeaderLink to="/discover" msg={messages.discover} />
        {this.props.location !== '/login' && <ViewerWidget
          viewer={this.props.viewer}
          className={`${styles.navlink} ${styles.alignRight}`}
        />}
      </div>
    );
  }
}

export default Relay.createContainer(Header, {
  fragments: {
    viewer: () => Relay.QL`        
      fragment on Viewer {
        ${ViewerWidget.getFragment('viewer')}
      }
    `,
  },
});
