import { IPizza, IPizzaModification, ICartPizzas, ICart } from 'types';

export const getCartItemId = (selectedModification: IPizzaModification, pizza: IPizza) => {
  return `${pizza.id}${selectedModification.id}`;
};

export const getOrderedPizzasWithPizza = (
  orderedPizzas: ICartPizzas,
  selectedModification: IPizzaModification,
  pizza: IPizza,
) => {
  const cartItemId = getCartItemId(selectedModification, pizza);
  let updatedOrderedPizzas = Object.assign({}, orderedPizzas);
  if (updatedOrderedPizzas[cartItemId]) {
    const { price, amount } = updatedOrderedPizzas[cartItemId];
    updatedOrderedPizzas = {
      ...updatedOrderedPizzas,
      [cartItemId]: {
        pizza,
        modification: selectedModification,
        price: Math.round((price + selectedModification.price) * 100) / 100,
        amount: amount + 1,
      },
    };
  } else {
    updatedOrderedPizzas = {
      ...updatedOrderedPizzas,
      [cartItemId]: {
        pizza,
        modification: selectedModification,
        price: selectedModification.price,
        amount: 1,
      },
    };
  }
  return updatedOrderedPizzas;
};

export const getOrderedPizzasWithoutPizza = (
  orderedPizzas: ICartPizzas,
  selectedModification: IPizzaModification,
  pizza: IPizza,
) => {
  let updatedOrderedPizzas = Object.assign({}, orderedPizzas);
  const cartItemId = getCartItemId(selectedModification, pizza);
  if (updatedOrderedPizzas[cartItemId]?.amount > 1) {
    const { price, amount } = updatedOrderedPizzas[cartItemId];
    updatedOrderedPizzas = {
      ...updatedOrderedPizzas,
      [cartItemId]: {
        pizza,
        modification: selectedModification,
        price: Math.round((price - selectedModification.price) * 100) / 100,
        amount: amount - 1,
      },
    };
    return updatedOrderedPizzas;
  }
  delete updatedOrderedPizzas[`${cartItemId}`];
  const { [cartItemId]: removedProperty, ...restObject } = updatedOrderedPizzas;
  return restObject;
};

export const getOrderedPizzasWithoutPizzaModification = (
  orderedPizzas: ICartPizzas,
  selectedModification: IPizzaModification,
  pizza: IPizza,
) => {
  let updatedOrderedPizzas = Object.assign({}, orderedPizzas);
  const cartItemId = getCartItemId(selectedModification, pizza);
  delete updatedOrderedPizzas[`${cartItemId}`];
  const { [cartItemId]: removedProperty, ...restObject } = updatedOrderedPizzas;
  return restObject;
};

export const getOrderPayload = (cart: ICart) => {
  const { orderedPizzas, totalAmount, totalPrice } = cart;
  const payloadOrderedPizzas = Object.values(orderedPizzas).map(
    ({ amount, pizza, modification }) => {
      return {
        pizzaId: pizza.id,
        dough: modification.dough,
        size: modification.size,
        price: modification.price,
        amount,
        pizzaName: pizza.name,
      };
    },
  );
  return {
    totalAmount,
    totalPrice,
    orderedPizzas: payloadOrderedPizzas,
  };
};
