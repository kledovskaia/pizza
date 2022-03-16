import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  value: [] as TCartPizza[],
};

const cart = createSlice({
  initialState,
  name: 'cart',
  reducers: {
    addPizza: (
      state,
      action: PayloadAction<GetArrayItemType<typeof initialState['value']>>
    ) => {
      const index = state.value.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index) {
        const pizza = state.value[index];
        pizza.subTotal += pizza.price;
        pizza.count++;
      } else {
        state.value.push(action.payload);
      }
    },
    removePizza: (
      state,
      action: PayloadAction<
        GetArrayItemType<typeof initialState['value']>['id']
      >
    ) => {
      const index = state.value.findIndex((item) => item.id === action.payload);
      const count = state.value[index].count;

      if (count > 1) {
        const pizza = state.value[index];
        pizza.subTotal -= pizza.price;
        pizza.count--;
      } else {
        state.value.splice(index, 1);
      }
    },
    removeAllPizzas: (state) => {
      state.value = [];
    },
  },
});

export const { addPizza, removePizza, removeAllPizzas } = cart.actions;
export default cart.reducer;
