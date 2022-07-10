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
import { PizzasContainer, PizzaFilters, PizzaFilter, LoadMoreButtonContainer } from './styled';

const baseFilter: IPizzaType = {
  id: 'base',
  name: 'Все',
};

const LIMIT = 4;

export const Pizzas: React.FC = () => {
  const [filter, setFilter] = useState<IPizzaType>(baseFilter);
  const [offset, setOffset] = useState<number>(0);
  const {
    loading,
    error,
    data: { pizzas: { edges: pizzas = [], pageInfo: { hasNextPage = false } = {} } = {} } = {},
    refetch,
    fetchMore,
  } = useQuery(GET_PIZZAS, {
    variables: {
      offset,
      limit: LIMIT,
    },
  });

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
                refetch({
                  offset: 0,
                  limit: LIMIT,
                  ...{ pizzaTypeId: id === baseFilter.id ? undefined : id },
                });
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
      {hasNextPage && (
        <LoadMoreButtonContainer>
          <Button
            variant="contained"
            size="big"
            children="Загрузить больше пицц!!!"
            onClick={() => {
              setOffset(offset + LIMIT);
              fetchMore({
                variables: {
                  offset: offset + LIMIT,
                },
              });
            }}
          />
        </LoadMoreButtonContainer>
      )}
    </PageContainer>
  );
};
