import React from 'react';
import Relay from 'react-relay';

import NavLink from 'components/NavLink';
import UserBadge from 'containers/UserBadge';
import previewCardStyles from 'components/PreviewCard/styles.css';

class UserPreview extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    className: React.PropTypes.string,
    user: React.PropTypes.shape({
      slug: React.PropTypes.string.isRequired,
      givenName: React.PropTypes.string.isRequired,
      familyName: React.PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    const {
      slug,
      givenName,
      familyName,
    } = this.props.user;

    return (
      <NavLink
        className={this.props.className || previewCardStyles.PreviewCard}
        to={`/${slug}`}
      >
        <UserBadge user={this.props.user} />
        <p>{`${givenName} ${familyName}`}</p>
      </NavLink>
    );
  }
}

export default Relay.createContainer(UserPreview, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        ${UserBadge.getFragment('user')}
        slug
        givenName
        familyName
      }
    `,
  },
});
