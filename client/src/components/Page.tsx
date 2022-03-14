import { FC } from 'react';
import { Header } from './Header';

export const Page: FC = ({ children }) => {
  return (
    <div className="wrapper">
      <Header />
      {children}
    </div>
  );
};
