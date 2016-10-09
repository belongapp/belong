import React from 'react';
import Relay from 'react-relay';

import NavLink from 'components/NavLink';
import styles from './styles.css';
import previewCardStyles from 'components/PreviewCard/styles.css';

class Track extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    track: React.PropTypes.shape({
      id: React.PropTypes.string.isRequired,
      title: React.PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    return (
      <NavLink
        to={`/track/${this.props.track.id}`}
        className={`${previewCardStyles.PreviewCard} ${styles.Wrapper}`}
      >
        <p className={styles.PlayButton}>▶</p>
        <p>{this.props.track.title}</p>
      </NavLink>
    );
  }
}

export default Relay.createContainer(Track, {
  fragments: {
    track: () => Relay.QL`fragment on Track {
      id
      title
    }`,
  },
});
