import React from 'react';
import Relay from 'react-relay';

import UserPreview from 'containers/UserPreview';
import styles from './styles.css';

class DiscoverPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    viewer: React.PropTypes.object,
  };

  render() {
    return (
      <div className={styles.DiscoverPage}>
        {this.props.viewer.allUsers.edges.reverse()
          .map((u) => u.node)
          // TODO filter server-side when available: https://github.com/graphcool/feature-requests/issues/20
          .filter((u) => u.tracks.count > 0)
          .map((u) =>
            <UserPreview key={u.id} user={u} />
          )}
      </div>
    );
  }
}

export default Relay.createContainer(DiscoverPage, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        allUsers(first: 1000000) {
          edges {
            node {
              id
              ${UserPreview.getFragment('user')}
              tracks {
                count
              }
            }
          }
        }
      }
    `,
  },
});
