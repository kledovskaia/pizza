import axios from 'axios';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page } from './components/Page';
import { Cart } from './pages/Cart';
import { Home } from './pages/Home';

export const App = () => {
  const [items, setItems] = useState<TPizza[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { pizzas },
      } = await axios.get<{
        pizzas: TPizza[];
      }>('http://localhost:3000/db.json');
      setItems(pizzas);
    };
    fetchData();
  }, []);

  return (
    <Page>
      <Routes>
        <Route path="/cart" element={<Cart />} />
        <Route path="/" element={<Home items={items} />} />
      </Routes>
    </Page>
  );
};
