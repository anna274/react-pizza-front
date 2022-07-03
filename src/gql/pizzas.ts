import { gql } from '@apollo/client';

export const GET_PIZZAS = gql`
  query getPizzas {
    pizzas {
      id
      name
      image
      popularity
      modifications {
        id
        dough
        size
        price
        pizzasIds
      }
    }
    cart @client
  }
`;
