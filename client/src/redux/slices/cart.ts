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
      const pizza = state.value.pizzas[action.payload.id]?.items?.find(
        (pizza) =>
          pizza.size === action.payload.size &&
          pizza.type === action.payload.type
      );
      if (pizza) {
        pizza.subTotal += pizza.price;
        pizza.count++;
        state.value.pizzas[action.payload.id].count++;
        state.value.totalCount++;
        state.value.totalPrice += action.payload.price;
      } else {
        state.value.pizzas[action.payload.id] = {
          items: [
            ...(state.value.pizzas[action.payload.id]?.items || []),
            {
              ...action.payload,
              subTotal: action.payload.price,
              count: 1,
            },
          ],
          count: (state.value.pizzas[action.payload.id]?.count || 0) + 1,
        };
        state.value.totalCount++;
        state.value.totalPrice += action.payload.price;
      }
    },
    removePizza: (state, action: PayloadAction<TCartPizza>) => {
      const index = state.value.pizzas[action.payload.id]?.items.findIndex(
        (pizza) =>
          pizza.size === action.payload.size &&
          pizza.type === action.payload.type
      );
      const count = state.value.pizzas[action.payload.id]?.items[index].count;

      if (count > 1) {
        const pizza = state.value.pizzas[action.payload.id]?.items[index];
        pizza.subTotal -= pizza.price;
        pizza.count--;
      } else {
        state.value.pizzas[action.payload.id]?.items.splice(index, 1);
      }
      state.value.pizzas[action.payload.id].count--;
      state.value.totalCount--;
      state.value.totalPrice -= action.payload.price;
    },
    removeAllPizzas: (state, action: PayloadAction<TCartPizza>) => {
      const index = state.value.pizzas[action.payload.id]?.items?.findIndex(
        (pizza) =>
          pizza.size === action.payload.size &&
          pizza.type === action.payload.type
      );
      state.value.totalCount -=
        state.value.pizzas[action.payload.id].items[index].count;
      state.value.totalPrice -=
        state.value.pizzas[action.payload.id].items[index].subTotal;
      state.value.pizzas[action.payload.id].count -=
        state.value.pizzas[action.payload.id].items[index].count;

      state.value.pizzas[action.payload.id]?.items?.splice(index, 1);
    },
    clear: (state) => {
      state.value = initialState.value;
    },
  },
});

export const { addPizza, removePizza, removeAllPizzas, clear } = cart.actions;
export default cart.reducer;
