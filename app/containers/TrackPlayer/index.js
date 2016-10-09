import React from 'react';
import Relay from 'react-relay';
import ReactPlayer from 'react-player';

import styles from './styles.css';

class TrackPlayer extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    viewer: React.PropTypes.shape({
      Track: React.PropTypes.shape({
        title: React.PropTypes.string.isRequired,
        url: React.PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  render() {
    return (
      <div>
        <h1>{this.props.viewer.Track.title}</h1>
        <ReactPlayer
          className={styles.Track}
          url={this.props.viewer.Track.url}
          controls
        />
      </div>
    );
  }
}

export default Relay.createContainer(TrackPlayer, {
  initialVariables: {
    trackId: null,
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        Track(id: $trackId) {
          title
          url
        }
      }
    `,
  },
});
