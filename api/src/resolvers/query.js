const sortTypes = {
  popularity: 'rating',
  price: 'price',
  alphabet: 'name',
};

export const getPizzas = async (
  parent,
  { sortBy, filterBy, order },
  { models }
) => {
  if (filterBy === null) {
    return await models.Pizza.find({}, null, {
      sort: { [sortTypes[sortBy]]: order },
    });
  } else {
    return await models.Pizza.find({}, null, {
      sort: { [sortTypes[sortBy]]: order },
    })
      .where('category')
      .equals(filterBy)
      .sort(`${order}${sortTypes[sortBy]}`);
  }
};
