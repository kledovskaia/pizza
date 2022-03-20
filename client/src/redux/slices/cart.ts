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
      const { id } = action.payload;
      const { pizzas } = state.value;
      const isFirstOfType = !pizzas[id];

      if (isFirstOfType) {
        pizzas[id] = {
          items: [
            {
              ...action.payload,
              subTotal: action.payload.price,
              count: 1,
            },
          ],
          count: 1,
        };
      } else {
        const pizzaGroup = pizzas[id];
        const alreadyAddedPizza = pizzaGroup.items.find(
          (pizza) =>
            pizza.size === action.payload.size &&
            pizza.type === action.payload.type
        );
        if (alreadyAddedPizza) {
          alreadyAddedPizza.subTotal += alreadyAddedPizza.price;
          alreadyAddedPizza.count++;
          pizzaGroup.count++;
        } else {
          pizzaGroup.items.push({
            ...action.payload,
            subTotal: action.payload.price,
            count: 1,
          });
          pizzaGroup.count = (pizzaGroup?.count || 0) + 1;
        }
      }
      state.value.totalCount++;
      state.value.totalPrice += action.payload.price;
    },
    removePizza: (state, action: PayloadAction<TCartPizza>) => {
      const pizzaGroup = state.value.pizzas[action.payload.id];
      const pizzas = pizzaGroup?.items;
      const index = pizzas.findIndex(
        (pizza) =>
          pizza.size === action.payload.size &&
          pizza.type === action.payload.type
      );

      const pizza = pizzas[index];
      const count = pizza.count;
      if (count > 1) {
        pizza.subTotal -= pizza.price;
      } else {
        pizzas.splice(index, 1);
        if (!pizzaGroup.items.length) {
          delete state.value.pizzas[action.payload.id];
        }
      }
      pizza.count--;
      pizzaGroup.count--;
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
