import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  value: [] as TPizza[],
};

export const pizzas = createSlice({
  initialState,
  name: 'pizzas',
  reducers: {
    setPizzas: (state, action: PayloadAction<typeof initialState['value']>) => {
      state.value = action.payload;
    },
  },
});

export const { setPizzas } = pizzas.actions;
export default pizzas.reducer;
