import { combineReducers } from '@reduxjs/toolkit';
import loading from './loading';
import pizzas from './pizzas';
import cart from './cart';
import filters from './filters';

export const rootReducer = combineReducers({
  loading,
  pizzas,
  cart,
  filters,
});
