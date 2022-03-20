import { FC } from 'react';
import Header from './Header';

const Page: FC = ({ children }) => {
  return (
    <div className="wrapper">
      <div className="inner">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default Page;
