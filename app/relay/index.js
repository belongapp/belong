import Relay from 'react-relay';
import { getToken } from 'containers/Viewer/lib';

export function updateNetworkLayer(token) {
  Relay.injectNetworkLayer(new Relay.DefaultNetworkLayer(process.env.GRAPHQL_ENDPOINT, {
    headers: token ? {
      Authorization: `Bearer ${token}`,
    } : null,
  }));
}

updateNetworkLayer(getToken());

export default Relay;
