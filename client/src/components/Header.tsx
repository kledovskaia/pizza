import { HeaderLogo } from './HeaderLogo';
import { HeaderCart } from './HeaderCart';

export const Header = () => {
  return (
    <div className="header">
      <div className="container">
        <HeaderLogo />
        <HeaderCart />
      </div>
    </div>
  );
};
