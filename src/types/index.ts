export interface IPizzaModification {
  id: string;
  dough: string;
  size: number;
  price: number;
  pizzasIds?: string[];
}

export interface IPizzaType {
  id: string;
  name: string;
  pizzaIds?: string[];
}

export interface IPizza {
  id: string;
  name: string;
  image: string;
  modifications: IPizzaModification[];
  pizzaAvailability: IPizzaAvailability;
}

export interface IPizzaAvailability {
  pizzaId: string;
  maxAmount: number;
  orderedAmount: number;
}

export interface ICartPizza {
  pizza: IPizza;
  modification: IPizzaModification;
  price: number;
  amount: number;
}

export interface ICartPizzas {
  [key: string]: ICartPizza;
}

export interface ICart {
  totalPrice: number;
  totalAmount: number;
  orderedPizzas: ICartPizzas;
}
