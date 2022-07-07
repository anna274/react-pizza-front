import { gql } from '@apollo/client';

export const GET_PIZZAS = gql`
  query getPizzas {
    pizzas {
      id
      name
      image
      modifications {
        id
        dough
        size
        price
        pizzasIds
      }
      pizzaAvailability {
        maxAmount
        orderedAmount
      }
    }
    cart @client
  }
`;

export const GET_PIZZA_AVAILABILITY = gql`
  query getPizzaAvailability {
    pizza_availability {
      pizzaId
      orderedAmount
      maxAmount
    }
  }
`;

export const AVAILABILITY_UPDATE_SUBSCRIPTION = gql`
  subscription onAvailabilityUpdated {
    availabilityUpdated {
      updated_pizza_availability {
        pizzaId
        orderedAmount
        maxAmount
      }
    }
  }
`;
