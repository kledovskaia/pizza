import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  value: {} as {
    [key in TPizza['id']]: {
      items: TCartPizza[];
      count: number;
    };
  },
};

const cart = createSlice({
  initialState,
  name: 'cart',
  reducers: {
    addPizza: (state, action: PayloadAction<TCartPizza>) => {
      const pizza = state.value[action.payload.id]?.items?.find(
        (pizza) =>
          pizza.size === action.payload.size &&
          pizza.type === action.payload.type
      );
      if (pizza) {
        pizza.subTotal += pizza.price;
        pizza.count++;
        state.value[action.payload.id].count++;
      } else {
        state.value[action.payload.id] = {
          items: [
            ...(state.value[action.payload.id]?.items || []),
            {
              ...action.payload,
              subTotal: action.payload.price,
              count: 1,
            },
          ],
          count: (state.value[action.payload.id]?.count || 0) + 1,
        };
      }
    },
    removePizza: (state, action: PayloadAction<TCartPizza>) => {
      const index = state.value[action.payload.id]?.items.findIndex(
        (pizza) =>
          pizza.size === action.payload.size &&
          pizza.type === action.payload.type
      );
      const count = state.value[action.payload.id]?.items[index].count || 0;

      if (count > 1) {
        const pizza = state.value[action.payload.id]?.items[index];
        pizza.subTotal -= pizza.price;
        pizza.count--;
      } else {
        state.value[action.payload.id]?.items.splice(index, 1);
      }
      state.value[action.payload.id].count--;
    },
    removeAllPizzas: (state) => {
      state.value = {};
    },
  },
});

export const { addPizza, removePizza, removeAllPizzas } = cart.actions;
export default cart.reducer;
