import { ApolloClient, InMemoryCache } from '@apollo/client';


const createApolloClient = () => {
  return new ApolloClient({
    // Replace the IP address part with your own IP address!
    uri: 'http://192.168.7.98:4000/graphql',
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;