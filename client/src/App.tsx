import { gql, useQuery } from '@apollo/client';
import { FC, useEffect, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Page from './components/Page';
import { Cart } from './pages/Cart';
import Home from './pages/Home';
import { setPizzas } from './redux/slices/pizzas';
import { AppState } from './redux/store';

const GET_PIZZAS = gql`
  query getPizzas($sortBy: String, $filterBy: Int, $order: String) {
    getPizzas(sortBy: $sortBy, filterBy: $filterBy, order: $order) {
      id
      imageUrl
      name
      types
      sizes
      price
      category
      rating
    }
  }
`;
type Props = ReturnType<typeof mapStateToProps> & typeof actions;

const App: FC<Props> = ({ setPizzas, sortBy, filterBy, order }) => {
  const { data, loading, error } = useQuery(GET_PIZZAS, {
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
    setPizzas(data.getPizzas);
  }, [data]);

  return (
    <Page>
      <Routes>
        <Route path="/cart" element={<Cart />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Page>
  );
};

const mapStateToProps = (state: AppState) => ({
  sortBy: state.filters.sortBy,
  filterBy: state.filters.filterBy,
  order: state.filters.order,
});

const actions = {
  setPizzas,
};

export default connect(mapStateToProps, actions)(App);
