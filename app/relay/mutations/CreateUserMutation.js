import Relay from 'react-relay';

export default class CreateUserMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {createUser}`;
  }

  getFatQuery() {
    return Relay.QL`fragment on CreateUserPayload {
      viewer
      user
    }`;
  }

  getConfigs() {
    return [
      {
        type: 'RANGE_ADD',
        parentName: 'viewer',
        parentID: this.props.viewerId,
        connectionName: 'allUsers',
        edgeName: 'edge',
        rangeBehaviors: {
          '': 'append',
        },
      },
    ];
  }

  getVariables() {
    return {
      givenName: this.props.givenName,
      familyName: this.props.familyName,
      picture: this.props.picture,
      slug: this.props.slug,
      authProvider: {
        auth0: {
          idToken: this.props.authToken,
        },
      },
    };
  }
}
