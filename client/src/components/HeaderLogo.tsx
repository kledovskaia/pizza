import { memo } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/pizza-logo.svg';

const HeaderLogo = () => {
  return (
    <Link to="/" className="header__logo">
      <img width="38" src={logo} alt="Pizza logo" />
      <div>
        <h1>React Pizza</h1>
        <p>самая вкусная пицца во вселенной</p>
      </div>
    </Link>
  );
};

export default memo(HeaderLogo);
