import React from 'react';
import Relay from 'react-relay';

import Img from 'components/Img';
import styles from './styles.css';

class UserBadge extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    user: React.PropTypes.shape({
      picture: React.PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    return (
      <Img
        className={styles.Badge}
        src={this.props.user.picture}
        alt="avatar"
      />
    );
  }
}

export default Relay.createContainer(UserBadge, {
  fragments: {
    user: () => Relay.QL`fragment on User { picture }`,
  },
});
