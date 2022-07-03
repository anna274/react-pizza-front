import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_PIZZAS } from 'gql/pizzas';
import { IPizza } from 'types';
import { Header, Button, PageContainer, PageHeader } from 'components';
import { cartVar } from 'index';
import { Pizza } from './sections/pizza';
import { PizzasContainer } from './styled';

export const Pizzas: React.FC = () => {
  const { loading, error, data } = useQuery(GET_PIZZAS);
  if (loading) {
    return <div>Loading....</div>;
  }
  if (error) {
    return <div>Error....</div>;
  }
  const { totalAmount, totalPrice } = cartVar();

  return (
    <PageContainer>
      <Header>
        <Button
          variant="contained"
          children={<Link to="/cart">{`${totalPrice} руб. | ${totalAmount}`}</Link>}
          onClick={() => {}}
        />
      </Header>
      <PageHeader text="Все пиццы" />
      <PizzasContainer>
        {data?.pizzas?.map((pizza: IPizza) => (
          <Pizza key={pizza.id} pizza={pizza} />
        ))}
      </PizzasContainer>
    </PageContainer>
  );
};
