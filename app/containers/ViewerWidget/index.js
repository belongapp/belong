import React from 'react';
import { Link } from 'react-router';
import Relay, { updateNetworkLayer } from 'relay/index';
import { clearStorage, loggedIn, loggedOut } from 'containers/Viewer/lib';
import UserWidget from 'components/UserWidget';
import styles from './styles.css';
import buttonStyles from 'components/Button/styles.css';

class ViewerWidget extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    viewer: React.PropTypes.shape({
      user: React.PropTypes.object,
    }).isRequired,
  };

  render() {
    return (
      <div>
        {this.props.viewer.user && <UserWidget user={this.props.viewer.user} />}
        {loggedOut() && <Link to="/login" className={`${buttonStyles.button} ${styles.loginButton}`}>
          Log In
        </Link>}
        {loggedIn() && <div className={styles.dropDown}>
          <button className={styles.dropDownButton}>&#9660;</button>
          <div className={styles.dropDownContent}>
            <Link to="/" onClick={logout}>
              Log Out
            </Link>
          </div>
        </div>}
      </div>
    );
  }
}

export default Relay.createContainer(ViewerWidget, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        user {
          ${UserWidget.getFragment('user')}
        }
      }
    `,
  },
});

function logout() {
  clearStorage();
  updateNetworkLayer();
  window.location.pathname = '/';
}
