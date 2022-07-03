import React from 'react';
import {
  CartSummaryContainer,
  SummaryAmount,
  SummaryAmountDescription,
  SummaryAmountNumber,
  SummaryPrice,
  SummaryPriceDescription,
  SummaryPriceNumber,
} from './styled';

interface IProps {
  totalPrice: number;
  totalAmount: number;
}

export const CartSummary: React.FC<IProps> = ({ totalPrice, totalAmount }) => {
  return (
    <CartSummaryContainer>
      <SummaryAmount>
        <SummaryAmountDescription>Всего пицц: </SummaryAmountDescription>
        <SummaryAmountNumber>{` ${totalAmount} шт.`}</SummaryAmountNumber>
      </SummaryAmount>
      <SummaryPrice>
        <SummaryPriceDescription>Сумма заказа: </SummaryPriceDescription>
        <SummaryPriceNumber>{` ${totalPrice} руб.`}</SummaryPriceNumber>
      </SummaryPrice>
    </CartSummaryContainer>
  );
};
