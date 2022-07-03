import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'components';
import EmptyCartLogo from 'assets/images/empty-cart.png';
import {
  EmptyCartContainer,
  EmptyCartDescription,
  EmptyCartHeader,
  EmptyCartImage,
} from './styled';

export const EmptyCart: React.FC = () => {
  return (
    <EmptyCartContainer>
      <EmptyCartHeader>Корзина пустая 😕</EmptyCartHeader>
      <EmptyCartDescription>
        Вероятней всего, вы не заказывали ещё пиццу. Для того, чтобы заказать пиццу, перейди на
        главную страницу.
      </EmptyCartDescription>
      <EmptyCartImage src={EmptyCartLogo} />
      <Button size="big" variant="contained" onClick={() => {}}>
        <Link to="/">Вернуться назад</Link>
      </Button>
    </EmptyCartContainer>
  );
};
