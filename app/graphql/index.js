import ApolloClient, { createNetworkInterface } from 'apollo-client';

const client = new ApolloClient({
  networkInterface: createNetworkInterface(process.env.GRAPHQL_ENDPOINT),
  reduxRootSelector: (state) => state.apollo,
});

export default client;

export const apolloReducer = client.reducer();
