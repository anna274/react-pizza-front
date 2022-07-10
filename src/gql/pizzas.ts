import { gql } from '@apollo/client';

export const GET_PIZZAS = gql`
  query getPizzas($pizzaFilter: PizzaFilter) {
    pizzas(pizzaFilter: $pizzaFilter) {
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
        orderedAmount
        maxAmount
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

export const GET_PIZZA_TYPES = gql`
  query getPizzaTypes {
    pizza_types {
      id
      name
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
