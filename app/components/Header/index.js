import React from 'react';
import Relay from 'react-relay';
import { FormattedMessage } from 'react-intl';

import A from 'components/A';
import Img from 'components/Img';
import NavLink from 'components/NavLink';
import ViewerWidget from 'containers/ViewerWidget';
import Banner from './banner.png';
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
      <div>
        <A className={styles.logoWrapper} href="https://twitter.com/mxstbr">
          <Img className={styles.logo} src={Banner} alt="belong - Logo" />
        </A>
        <div className={styles.navbar}>
          <HeaderLink to="/" msg={messages.home} />
          {this.props.location !== '/login' && <ViewerWidget viewer={this.props.viewer} />}
        </div>
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
