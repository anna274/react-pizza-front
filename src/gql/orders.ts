import { gql } from '@apollo/client';

export const CREATE_ORDER = gql`
  mutation createOrder($order: OrderInput!) {
    createOrder(order: $order) {
      id
      totalAmount
      totalPrice
      orderedPizzas {
        dough
        size
        price
        amount
        pizzaName
      }
    }
  }
`;
