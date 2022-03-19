const sortTypes = {
  popularity: 'rating',
  price: 'price',
  alphabet: 'name',
};

export const getPizzas = async (
  parent,
  { sortBy, filter, order },
  { models }
) => {
  if (filter === null) {
    return await models.Pizza.find({}, null, {
      sort: { [sortTypes[sortBy]]: order },
    });
  } else {
    return await models.Pizza.find({}, null, {
      sort: { [sortTypes[sortBy]]: order },
    })
      .where('category')
      .equals(filter)
      .sort(`${order}${sortTypes[sortBy]}`);
  }
};
