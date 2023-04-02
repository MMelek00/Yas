import { ApolloClient } from "@apollo/client";
import { cache } from "./cache";

export const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache,
});
