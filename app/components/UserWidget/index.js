import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import UserBadge from 'components/UserBadge';
import styles from './styles.css';

class UserWidget extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    user: React.PropTypes.shape({
      givenName: React.PropTypes.string.isRequired,
      picture: React.PropTypes.string.isRequired,
      slug: React.PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    const {
      givenName,
      picture,
      slug,
    } = this.props.user;

    return (
      <Link to={slug} className={styles.link}>
        <UserBadge picture={picture} />
        <span className={styles.UserName}>{givenName}</span>
      </Link>
    );
  }
}

export default Relay.createContainer(UserWidget, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        givenName
        picture
        slug
      }
    `,
  },
});
