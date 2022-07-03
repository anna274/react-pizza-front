import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider, makeVar } from '@apollo/client';
import { ICart } from 'types';
import App from './App';

export const cartVar = makeVar<ICart>({
  totalPrice: 0,
  totalAmount: 0,
  orderedPizzas: {},
});

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
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
