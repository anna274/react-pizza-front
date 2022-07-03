import React from 'react';
import { ButtonsContainer, AmountButton, AmountNumber } from './styled';

interface IProps {
  amount: number;
  onAdd: () => void;
  onRemove: () => void;
}

export const AmountButtons: React.FC<IProps> = ({ amount, onAdd, onRemove }) => {
  return (
    <ButtonsContainer>
      <AmountButton onClick={onRemove}>-</AmountButton>
      <AmountNumber>{amount}</AmountNumber>
      <AmountButton onClick={onAdd}>+</AmountButton>
    </ButtonsContainer>
  );
};
