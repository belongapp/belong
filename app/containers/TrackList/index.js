import React from 'react';
import Relay from 'react-relay';
import TrackPreview from 'containers/TrackPreview';

import styles from './styles.css';

class TrackList extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    user: React.PropTypes.shape({
      tracks: React.PropTypes.shape({
        edges: React.PropTypes.arrayOf(
          React.PropTypes.shape({
            node: Relay.PropTypes.Container.isRequired, // eslint-disable-line react/no-unused-prop-types
          }),
        ).isRequired,
      }).isRequired,
    }).isRequired,
  };

  render() {
    return (
      <div className={styles.TrackList}>
        {this.props.user.tracks.edges.reverse().map(({ node }) =>
          <TrackPreview key={node.id} track={node} />
        )}
      </div>
    );
  }
}

export default Relay.createContainer(TrackList, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        tracks(first: 1000000) {
          edges {
            node {
              id
              ${TrackPreview.getFragment('track')}
            }
          }
        }
      }
    `,
  },
});
