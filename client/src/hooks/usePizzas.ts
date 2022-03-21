import { useQuery } from '@apollo/client';
import { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPizzas } from '../redux/slices/pizzas';
import { AppState } from '../redux/store';
import * as queries from '../graphql/queries';

type TResponse = {
  getPizzas: TPizza[];
};

export const usePizzas = () => {
  const dispatch = useDispatch();
  const { sortBy, filterBy, order } = useSelector(
    (state: AppState) => state.filters
  );
  const { data, loading } = useQuery<TResponse>(queries.GET_PIZZAS, {
    variables: {
      sortBy,
      filterBy,
      order,
    },
  });

  useLayoutEffect(() => {
    if (loading) setPizzas([]);
  }, [loading]);

  useEffect(() => {
    if (!data) return;
    dispatch(setPizzas(data.getPizzas));
  }, [data]);
};
