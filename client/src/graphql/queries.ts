import { gql } from '@apollo/client';

export const GET_PIZZAS = gql`
  query getPizzas($sortBy: String, $filterBy: Int, $order: String) {
    getPizzas(sortBy: $sortBy, filterBy: $filterBy, order: $order) {
      id
      imageUrl
      name
      types
      sizes
      price
      category
      rating
    }
  }
`;
