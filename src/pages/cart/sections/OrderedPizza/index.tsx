import React from 'react';
import { AmountButtons } from 'components';
import {
  OrderedPizzaContainer,
  PizzaImage,
  PizzaInfo,
  PizzaModification,
  PizzaName,
  PizzaRemoveButton,
  PizzaPrice,
} from './styled';
import { IPizza, IPizzaModification, ICartPizza } from 'types';

interface IProps {
  orderedPizza: ICartPizza;
  onAdd: (pizza: IPizza, modification: IPizzaModification) => void;
  onRemoveOne: (pizza: IPizza, modification: IPizzaModification) => void;
  onRemoveModification: (pizza: IPizza, modification: IPizzaModification) => void;
}

export const OrderedPizza: React.FC<IProps> = ({
  orderedPizza: {
    modification: { size, dough },
    pizza: { name, image },
    modification,
    pizza,
    amount,
    price,
  },
  onAdd,
  onRemoveOne,
  onRemoveModification,
}) => {
  return (
    <OrderedPizzaContainer>
      <PizzaImage src={image} />
      <PizzaInfo>
        <PizzaName>{name}</PizzaName>
        <PizzaModification>{`${dough} тесто, ${size} см.`}</PizzaModification>
      </PizzaInfo>
      <AmountButtons
        amount={amount}
        onAdd={() => onAdd(pizza, modification)}
        onRemove={() => onRemoveOne(pizza, modification)}
      />
      <PizzaPrice>{`${price} руб.`}</PizzaPrice>
      <PizzaRemoveButton onClick={() => onRemoveModification(pizza, modification)}>
        ×
      </PizzaRemoveButton>
    </OrderedPizzaContainer>
  );
};
