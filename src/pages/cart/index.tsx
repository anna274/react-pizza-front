import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_PIZZAS } from 'gql/pizzas';
import { CREATE_ORDER } from 'gql/orders';
import { ICartPizza, IPizza, IPizzaModification } from 'types';
import { Header, PageContainer, PageHeader, Button } from 'components';
import {
  getOrderedPizzasWithPizza,
  getOrderedPizzasWithoutPizza,
  getOrderedPizzasWithoutPizzaModification,
  getCartItemId,
  getOrderPayload,
} from 'helpers';
import { cartVar } from 'index';
import { OrderedPizza } from './sections/OrderedPizza';
import { CartSummary } from './sections/CartSummary';
import { EmptyCart } from './sections/EmptyCart';
import { OrderItemsContainer, PageFooter } from './styled';

export const Cart: React.FC = () => {
  const {
    data: {
      cart: { totalAmount, totalPrice, orderedPizzas },
    },
  } = useQuery(GET_PIZZAS);
  const [createOrder, { loading: creatingOrder }] = useMutation(CREATE_ORDER, {
    onCompleted: () => {
      window.location.href = '/';
    },
  });
  const onPayHandler = () => {
    const order = getOrderPayload(cartVar());
    createOrder({
      variables: {
        order,
      },
      optimisticResponse: {
        createOrder: {
          id: '11111111-b1fa-4440-be72-3a558959ca8e',
          totalAmount: order.totalAmount,
          totalPrice: order.totalPrice,
          __typename: 'Order',
          orderedPizzas: order.orderedPizzas.map((item) => ({
            ...item,
            __typename: 'OrderedPizzas',
          })),
        },
      },
    });
  };

  const onAddHandler = (pizza: IPizza, modification: IPizzaModification) => {
    const { totalAmount, totalPrice, orderedPizzas } = cartVar();
    const { price = 0 } = modification;
    const updatedCart = {
      totalPrice: Math.round((totalPrice + price) * 100) / 100,
      totalAmount: totalAmount + 1,
      orderedPizzas: getOrderedPizzasWithPizza(orderedPizzas, modification, pizza),
    };
    cartVar(updatedCart);
  };
  const onRemoveOneHandler = (pizza: IPizza, modification: IPizzaModification) => {
    const { totalAmount, totalPrice, orderedPizzas } = cartVar();
    const { price = 0 } = modification;
    const updatedCart = {
      totalPrice: Math.round((totalPrice - price) * 100) / 100,
      totalAmount: totalAmount - 1,
      orderedPizzas: getOrderedPizzasWithoutPizza(orderedPizzas, modification, pizza),
    };
    cartVar(updatedCart);
  };
  const onRemoveModificationHandler = (pizza: IPizza, modification: IPizzaModification) => {
    const cartitemId = getCartItemId(modification, pizza);
    const { totalAmount, totalPrice, orderedPizzas } = cartVar();
    const { price = 0 } = modification;
    const { amount } = orderedPizzas[cartitemId];
    const updatedCart = {
      totalPrice: Math.round((totalPrice - price * amount) * 100) / 100,
      totalAmount: totalAmount - amount,
      orderedPizzas: getOrderedPizzasWithoutPizzaModification(orderedPizzas, modification, pizza),
    };
    cartVar(updatedCart);
  };
  const onCleanHandler = () => {
    cartVar({
      totalAmount: 0,
      totalPrice: 0,
      orderedPizzas: {},
    });
  };

  if (totalAmount === 0) {
    return (
      <PageContainer>
        <Header />
        <EmptyCart />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Header />
      <PageHeader text="Корзина">
        <Button variant="not-bordered" onClick={onCleanHandler}>
          Очистить корзину
        </Button>
      </PageHeader>
      <OrderItemsContainer>
        {Object.entries(orderedPizzas).map(([key, orderedPizza]) => (
          <OrderedPizza
            key={key}
            orderedPizza={orderedPizza as ICartPizza}
            onAdd={onAddHandler}
            onRemoveOne={onRemoveOneHandler}
            onRemoveModification={onRemoveModificationHandler}
          />
        ))}
      </OrderItemsContainer>
      <CartSummary totalAmount={totalAmount} totalPrice={totalPrice} />
      <PageFooter>
        <Button onClick={() => {}} size="big">
          <Link to="/#">Вернуться назад</Link>
        </Button>
        <Button variant="contained" size="big" onClick={onPayHandler} disabled={creatingOrder}>
          {creatingOrder ? 'Мы сохдаём Ваш заказ...' : 'Оплатить сейчас'}
        </Button>
      </PageFooter>
    </PageContainer>
  );
};
