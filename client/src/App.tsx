import { Route, Routes } from 'react-router-dom';
import { Page } from './components/Page';
import { Cart } from './pages/Cart';
import { Home } from './pages/Home';

export const App = () => {
  return (
    <Page>
      <Routes>
        <Route path="/cart" element={<Cart />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Page>
  );
};
