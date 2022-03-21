import { Route, Routes } from 'react-router-dom';
import Page from './components/Page';
import { usePizzas } from './hooks/usePizzas';
import Cart from './pages/Cart';
import Home from './pages/Home';

const App = () => {
  usePizzas();

  return (
    <Page>
      <Routes>
        <Route path="/cart" element={<Cart />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Page>
  );
};

export default App;
