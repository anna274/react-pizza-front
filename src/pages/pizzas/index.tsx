import React, { useMemo, useState } from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import { Link } from 'react-router-dom';
import {
  GET_PIZZAS,
  AVAILABILITY_UPDATE_SUBSCRIPTION,
  GET_PIZZA_AVAILABILITY,
  GET_PIZZA_TYPES,
} from 'gql/pizzas';
import { IPizza, IPizzaAvailability, IPizzaType } from 'types';
import { Header, Button, PageContainer, PageHeader } from 'components';
import { cartVar } from 'index';
import { Pizza } from './sections/pizza';
import { PizzasContainer, PizzaFilters, PizzaFilter } from './styled';

const baseFilter: IPizzaType = {
  id: 'base',
  name: 'Все',
};

export const Pizzas: React.FC = () => {
  const [filter, setFilter] = useState<IPizzaType>(baseFilter);
  const { loading, error, data: { pizzas } = {}, refetch } = useQuery(GET_PIZZAS);
  const { data: { pizza_types = [] } = {} } = useQuery(GET_PIZZA_TYPES);
  const { data: { pizza_availability } = {} } = useQuery(GET_PIZZA_AVAILABILITY);
  const { data: subscriptionData, error: subscribtionError } = useSubscription(
    AVAILABILITY_UPDATE_SUBSCRIPTION,
  );
  const updatedAvailability = subscriptionData?.availabilityUpdated?.updated_pizza_availability;
  const availabilityToShow: IPizzaAvailability[] = useMemo(() => {
    return updatedAvailability ? updatedAvailability : pizza_availability;
  }, [updatedAvailability, pizza_availability]);

  if (loading) {
    return <div>Loading....</div>;
  }
  if (error || subscribtionError) {
    window.location.reload();
    return <div>Loading....</div>;
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
      {pizza_types.length > 0 && (
        <PizzaFilters>
          {[baseFilter, ...pizza_types].map(({ id, name }: IPizzaType) => (
            <PizzaFilter
              key={id}
              selected={filter?.id === id}
              onClick={() => {
                setFilter({ id, name });
                console.log('id === baseFilter.id', id === baseFilter.id);
                refetch({ pizzaFilter: id === baseFilter.id ? {} : { id } });
              }}
            >
              {name}
            </PizzaFilter>
          ))}
        </PizzaFilters>
      )}
      <PageHeader text="Все пиццы" />
      <PizzasContainer>
        {pizzas?.map((pizza: IPizza) => (
          <Pizza
            key={pizza.id}
            pizza={pizza}
            pizzaAvailability={availabilityToShow?.find(({ pizzaId }) => pizzaId === pizza.id)}
          />
        ))}
        {pizzas.length === 0 && <div>Пицц такого вида нет у нас в меню :(</div>}
      </PizzasContainer>
    </PageContainer>
  );
};
