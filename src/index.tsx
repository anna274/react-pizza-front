import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  makeVar,
  split,
  HttpLink,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { ICart } from 'types';
import App from './App';

export const cartVar = makeVar<ICart>({
  totalPrice: 0,
  totalAmount: 0,
  orderedPizzas: {},
});
//@ts-ignore
const customFetch = async (uri, options) => {
  const response = await fetch(uri, options);
  console.log('response', response);
  return response;
};

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  //@ts-ignore
  fetch: customFetch,
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:4000/graphql',
  }),
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          cart: {
            read() {
              return cartVar();
            },
          },
        },
      },
      Pizza: {
        keyFields: ['id', 'name'],
      },
    },
  }),
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
