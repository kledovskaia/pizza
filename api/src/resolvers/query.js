import { data } from '../data.js';

export const getPizzas = async (
  parent,
  { sortBy, filter, order },
  { models }
) => {
  return await models.Pizza.find({});
};
