import { gql, useQuery } from '@apollo/client';
import { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Page from './components/Page';
import { Cart } from './pages/Cart';
import Home from './pages/Home';
import { setPizzas } from './redux/slices/pizzas';

const GET_PIZZAS = gql`
  query getPizzas($sortBy: Int, $filter: Int, $order: String) {
    getPizzas(sortBy: $sortBy, filter: $filter, order: $order) {
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
type Props = typeof actions;

const App: FC<Props> = ({ setPizzas }) => {
  const { data, loading, error } = useQuery(GET_PIZZAS);

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

const actions = {
  setPizzas,
};

export default connect(null, actions)(App);
