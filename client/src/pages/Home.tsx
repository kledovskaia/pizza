import { FC } from 'react';
import { Categories } from '../components/Categories';
import { Pizza } from '../components/Pizza';
import { Sort } from '../components/Sort';

type Props = {
  items: TPizza[];
};

export const Home: FC<Props> = ({ items }) => {
  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories
            items={['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']}
          />
          <Sort items={['популярности', 'цене', 'алфавиту']} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {items.map((item) => (
            <Pizza key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};
