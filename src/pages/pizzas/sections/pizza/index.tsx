import React, { useState } from 'react';
import { IPizza, IPizzaModification, ICart } from 'types';
import { Button, AmountButtons } from 'components';
import { getOrderedPizzasWithPizza, getOrderedPizzasWithoutPizza, getCartItemId } from 'helpers';
import { cartVar } from 'index';
import {
  PizzaContainer,
  PizzaImage,
  PizzaName,
  ModificationsContainer,
  ModificationsGroup,
  Modification,
  PizzaFooter,
  PizzaPrice,
} from './styled';

interface IProps {
  pizza: IPizza;
}

const SIZE_OPTIONS: number[] = [26, 30, 40];
const DOUGH_OPTIONS: string[] = ['тонкое', 'традиционное'];

const getSelectedModification = (
  modifications: IPizzaModification[],
  selectedSize: number,
  selectedDough: string,
) => {
  return (
    modifications.find(({ size, dough }) => size === selectedSize && dough === selectedDough) ||
    ({} as IPizzaModification)
  );
};

const getNumberOfSelectedPizzas = (
  cart: ICart,
  selectedModification: IPizzaModification,
  pizza: IPizza,
) => {
  return cart.orderedPizzas[getCartItemId(selectedModification, pizza)]?.amount;
};

export const Pizza: React.FC<IProps> = ({ pizza: { name, image, modifications }, pizza }) => {
  const [selectedSize, setSize] = useState(SIZE_OPTIONS[0]);
  const [selectedDough, setDough] = useState(DOUGH_OPTIONS[0]);
  const [selectedModification, setModification] = useState(
    getSelectedModification(modifications, selectedSize, selectedDough),
  );

  const onSizeChange = (newSize: number) => {
    setSize(newSize);
    setModification(getSelectedModification(modifications, newSize, selectedDough));
  };
  const onDoughChange = (newDough: string) => {
    setDough(newDough);
    setModification(getSelectedModification(modifications, selectedSize, newDough));
  };
  const onAddHandler = () => {
    const { totalAmount, totalPrice, orderedPizzas } = cartVar();
    const { price: selectedPizzaPrice = 0 } = selectedModification;
    const updatedCart = {
      totalPrice: totalPrice + selectedPizzaPrice,
      totalAmount: totalAmount + 1,
      orderedPizzas: getOrderedPizzasWithPizza(orderedPizzas, selectedModification, pizza),
    };
    cartVar(updatedCart);
  };
  const onRemoveHandler = () => {
    const { totalAmount, totalPrice, orderedPizzas } = cartVar();
    const { price: selectedPizzaPrice = 0 } = selectedModification;
    const updatedCart = {
      totalPrice: totalPrice - selectedPizzaPrice,
      totalAmount: totalAmount - 1,
      orderedPizzas: getOrderedPizzasWithoutPizza(orderedPizzas, selectedModification, pizza),
    };
    cartVar(updatedCart);
  };
  const numberOfSelectedPizzas = getNumberOfSelectedPizzas(cartVar(), selectedModification, pizza);
  return (
    <PizzaContainer>
      <PizzaImage src={image} />
      <PizzaName>{name}</PizzaName>
      <ModificationsContainer>
        <ModificationsGroup>
          {SIZE_OPTIONS.map((option) => (
            <Modification
              key={option}
              selected={option === selectedModification?.size}
              onClick={() => onSizeChange(option)}
            >{`${option}см`}</Modification>
          ))}
        </ModificationsGroup>
        <ModificationsGroup>
          {DOUGH_OPTIONS.map((option) => (
            <Modification
              key={option}
              selected={option === selectedModification?.dough}
              onClick={() => onDoughChange(option)}
            >
              {option}
            </Modification>
          ))}
        </ModificationsGroup>
      </ModificationsContainer>
      <PizzaFooter>
        <PizzaPrice>{`${selectedModification?.price} руб.`}</PizzaPrice>
        {numberOfSelectedPizzas > 0 ? (
          <AmountButtons
            amount={numberOfSelectedPizzas}
            onAdd={onAddHandler}
            onRemove={onRemoveHandler}
          />
        ) : (
          <Button children="+ Добавить" onClick={onAddHandler} />
        )}
      </PizzaFooter>
    </PizzaContainer>
  );
};
