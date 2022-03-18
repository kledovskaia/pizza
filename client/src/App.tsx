import axios from 'axios';
import { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Page } from './components/Page';
import { Cart } from './pages/Cart';
import { Home } from './pages/Home';
import { setPizzas } from './redux/slices/pizzas';

type Props = {
  [key in keyof typeof actions]: typeof actions[key];
};

const App: FC<Props> = ({ setPizzas }) => {
  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { pizzas },
      } = await axios.get<{
        pizzas: TPizza[];
      }>('http://localhost:3000/db.json');
      setPizzas(pizzas);
    };
    fetchData();
  }, []);

  return (
    <Page>
      <Routes>
        <Route path="/cart" element={<Cart />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Page>
  );
};

const actions = { setPizzas };
const connectedApp = connect(null, actions)(App);

export { connectedApp as App };
