import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  value: {
    totalCount: 0,
    totalPrice: 0,
    pizzas: {} as {
      [key in TPizza['id']]: {
        items: TCartPizza[];
        count: number;
      };
    },
  },
};

const cart = createSlice({
  initialState,
  name: 'cart',
  reducers: {
    addPizza: (state, action: PayloadAction<TCartPizza>) => {
      if (!state.value.pizzas[action.payload.id])
        state.value.pizzas[action.payload.id] = {
          items: [],
          count: 0,
        };
      const pizzaGroup = state.value.pizzas[action.payload.id];
      const pizza = pizzaGroup?.items?.find(
        (pizza) =>
          pizza.size === action.payload.size &&
          pizza.type === action.payload.type
      );
      if (pizza) {
        pizza.subTotal += pizza.price;
        pizza.count++;
        pizzaGroup.count++;
        state.value.totalCount++;
        state.value.totalPrice += action.payload.price;
      } else {
        pizzaGroup.items.push({
          ...action.payload,
          subTotal: action.payload.price,
          count: 1,
        });
        pizzaGroup.count = (pizzaGroup?.count || 0) + 1;
        state.value.totalCount++;
        state.value.totalPrice += action.payload.price;
      }
    },
    removePizza: (state, action: PayloadAction<TCartPizza>) => {
      const pizzas = state.value.pizzas[action.payload.id]?.items;
      const index = pizzas.findIndex(
        (pizza) =>
          pizza.size === action.payload.size &&
          pizza.type === action.payload.type
      );
      const count = pizzas[index].count;

      const pizza = pizzas[index];
      if (count > 1) {
        pizza.subTotal -= pizza.price;
        pizza.count--;
      } else {
        pizzas.splice(index, 1);
        pizza.count--;
        if (!state.value.pizzas[action.payload.id].items.length) {
          delete state.value.pizzas[action.payload.id];
        }
      }
      state.value.totalCount--;
      state.value.totalPrice -= action.payload.price;
    },
    removeAllPizzas: (state, action: PayloadAction<TCartPizza>) => {
      const pizzas = state.value.pizzas[action.payload.id].items;
      const index = pizzas.findIndex(
        (pizza) =>
          pizza.size === action.payload.size &&
          pizza.type === action.payload.type
      );
      state.value.totalCount -= pizzas[index].count;
      state.value.totalPrice -= pizzas[index].subTotal;
      state.value.pizzas[action.payload.id].count -= pizzas[index].count;
      if (state.value.pizzas[action.payload.id].items.length > 1) {
        state.value.pizzas[action.payload.id].items.splice(index, 1);
      } else {
        delete state.value.pizzas[action.payload.id];
      }
    },
    clear: (state) => {
      state.value = initialState.value;
    },
  },
});

export const { addPizza, removePizza, removeAllPizzas, clear } = cart.actions;
export default cart.reducer;
