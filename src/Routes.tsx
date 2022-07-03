import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PATHS } from 'consts';
import { Pizzas } from 'pages/pizzas';
import { Cart } from 'pages/cart';

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATHS.pizzas} element={<Pizzas />} />
        <Route path={PATHS.cart} element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
};
