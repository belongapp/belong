import React from 'react';
import Relay from 'react-relay';
import NavLink from 'components/NavLink';
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
      <NavLink to={slug} className={styles.link}>
        <UserBadge picture={picture} />
        <span className={styles.UserName}>{givenName}</span>
      </NavLink>
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
