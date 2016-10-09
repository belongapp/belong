import React from 'react';
import Relay from 'react-relay';

import TrackList from 'containers/TrackList';
import NotFound from 'components/NotFound';
import UserPreview from 'containers/UserPreview';
import styles from './styles.css';

class ProfilePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    viewer: React.PropTypes.shape({
      User: Relay.PropTypes.Container.isRequired,
    }).isRequired,
  };

  render() {
    if (!this.props.viewer.User) {
      return <NotFound />;
    }

    return (
      <div className={styles.Wrapper}>
        <UserPreview
          className={styles.Header}
          user={this.props.viewer.User}
        />
        <TrackList user={this.props.viewer.User} />
      </div>
    );
  }
}

export default Relay.createContainer(ProfilePage, {
  initialVariables: {
    slug: null,
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        User(slug: $slug) {
          ${UserPreview.getFragment('user')}
          ${TrackList.getFragment('user')}
        }
      }
    `,
  },
});
