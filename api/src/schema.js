import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    getPizzas(sortBy: String, filterBy: Int, order: String): [Pizza!]!
  }

  type Pizza {
    id: ID!
    imageUrl: String!
    name: String!
    types: [Int!]!
    sizes: [Int!]!
    price: Int!
    category: Int!
    rating: Int!
  }
`;
