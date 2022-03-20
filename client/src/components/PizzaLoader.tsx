import { memo } from 'react';
import ContentLoader from 'react-content-loader';

const PizzaLoader = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={476}
    height={500}
    viewBox="0 0 476 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="139" cy="131" r="130" />
    <rect x="2" y="274" rx="5" ry="5" width="280" height="25" />
    <rect x="2" y="318" rx="5" ry="5" width="280" height="86" />
    <rect x="3" y="426" rx="5" ry="5" width="89" height="27" />
    <rect x="131" y="420" rx="20" ry="20" width="150" height="42" />
  </ContentLoader>
);

export default memo(PizzaLoader);
