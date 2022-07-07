import React, { useMemo } from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_PIZZAS, AVAILABILITY_UPDATE_SUBSCRIPTION, GET_PIZZA_AVAILABILITY } from 'gql/pizzas';
import { IPizza, IPizzaAvailability } from 'types';
import { Header, Button, PageContainer, PageHeader } from 'components';
import { cartVar } from 'index';
import { Pizza } from './sections/pizza';
import { PizzasContainer } from './styled';

export const Pizzas: React.FC = () => {
  console.log('GET_PIZZAS', GET_PIZZAS);
  console.log('GET_PIZZA_AVAILABILITY', GET_PIZZA_AVAILABILITY);
  console.log('AVAILABILITY_UPDATE_SUBSCRIPTION', AVAILABILITY_UPDATE_SUBSCRIPTION);
  const { loading, error, data: { pizzas } = {} } = useQuery(GET_PIZZAS);
  const { data: { pizza_availability } = {} } = useQuery(GET_PIZZA_AVAILABILITY);
  const { data: subscriptionData, error: subscribtionError } = useSubscription(
    AVAILABILITY_UPDATE_SUBSCRIPTION,
  );
  const updatedAvailability = subscriptionData?.availabilityUpdated?.updated_pizza_availability;
  const availabilityToShow: IPizzaAvailability[] = useMemo(() => {
    return updatedAvailability ? updatedAvailability : pizza_availability;
  }, [updatedAvailability, pizza_availability]);
  console.log('availabilityToShow', availabilityToShow);
  if (loading) {
    return <div>Loading....</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  if (subscribtionError) {
    return <div>{subscribtionError.message}</div>;
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
        {pizzas?.map((pizza: IPizza) => (
          <Pizza
            key={pizza.id}
            pizza={pizza}
            pizzaAvailability={availabilityToShow?.find(({ pizzaId }) => pizzaId === pizza.id)}
          />
        ))}
      </PizzasContainer>
    </PageContainer>
  );
};
