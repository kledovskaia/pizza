import { FC } from 'react';
import Header from './Header';

const Page: FC = ({ children }) => {
  return (
    <div className="wrapper">
      <Header />
      {children}
    </div>
  );
};

export default Page;
