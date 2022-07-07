import React from 'react';
import { ButtonsContainer, AmountButton, AmountNumber } from './styled';

interface IProps {
  amount: number;
  onAdd: () => void;
  onRemove: () => void;
  disableAddButton?: boolean;
}

export const AmountButtons: React.FC<IProps> = ({ amount, onAdd, onRemove, disableAddButton }) => {
  return (
    <ButtonsContainer>
      <AmountButton onClick={onRemove}>-</AmountButton>
      <AmountNumber>{amount}</AmountNumber>
      <AmountButton disabled={disableAddButton} onClick={onAdd}>
        +
      </AmountButton>
    </ButtonsContainer>
  );
};
