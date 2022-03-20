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
      const { id, price, size, type } = action.payload;
      const { pizzas } = state.value;
      const isFirstOfType = !pizzas[id];

      if (isFirstOfType) {
        pizzas[id] = {
          items: [
            {
              ...action.payload,
              subTotal: price,
              count: 1,
            },
          ],
          count: 1,
        };
      } else {
        const pizzaGroup = pizzas[id];
        const alreadyAddedPizza = pizzaGroup.items.find(
          (pizza) => pizza.size === size && pizza.type === type
        );
        if (alreadyAddedPizza) {
          alreadyAddedPizza.subTotal += alreadyAddedPizza.price;
          alreadyAddedPizza.count++;
          pizzaGroup.count++;
        } else {
          pizzaGroup.items.push({
            ...action.payload,
            subTotal: price,
            count: 1,
          });
          pizzaGroup.count = (pizzaGroup?.count || 0) + 1;
        }
      }
      state.value.totalCount++;
      state.value.totalPrice += price;
    },
    removePizza: (state, action: PayloadAction<TCartPizza>) => {
      const { id, size, type, price } = action.payload;
      const pizzasState = state.value.pizzas;
      const pizzaGroup = pizzasState[id];
      const pizzas = pizzaGroup?.items;
      const index = pizzas.findIndex(
        (pizza) => pizza.size === size && pizza.type === type
      );

      const pizza = pizzas[index];
      const count = pizza.count;
      if (count > 1) {
        pizza.subTotal -= pizza.price;
      } else {
        pizzas.splice(index, 1);
        if (!pizzaGroup.items.length) {
          delete pizzasState[id];
        }
      }
      pizza.count--;
      pizzaGroup.count--;
      state.value.totalCount--;
      state.value.totalPrice -= price;
    },
    removeAllPizzas: (state, action: PayloadAction<TCartPizza>) => {
      const { id, size, type } = action.payload;
      const pizzasState = state.value.pizzas;
      const pizzaGroup = pizzasState[id];
      const pizzas = pizzaGroup.items;

      const index = pizzas.findIndex(
        (pizza) => pizza.size === size && pizza.type === type
      );
      state.value.totalCount -= pizzas[index].count;
      state.value.totalPrice -= pizzas[index].subTotal;
      pizzaGroup.count -= pizzas[index].count;

      if (pizzaGroup.items.length > 1) {
        pizzaGroup.items.splice(index, 1);
      } else {
        delete pizzasState[id];
      }
    },
    clear: (state) => {
      state.value = initialState.value;
    },
  },
});

export const { addPizza, removePizza, removeAllPizzas, clear } = cart.actions;
export default cart.reducer;
