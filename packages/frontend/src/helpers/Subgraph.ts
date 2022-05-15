import { ApolloClient, InMemoryCache } from "@apollo/client";
import config from '../config/config.json';

export const steadyApolloClient = new ApolloClient({
  uri: config.STEADY_SUBGRAPH_URL,
  cache: new InMemoryCache()
});