import { FC } from 'react';
import { connect } from 'react-redux';
import { Categories } from '../components/Categories';
import { Pizza } from '../components/Pizza';
import { Sort } from '../components/Sort';
import { AppState } from '../redux/store';

type Props = {
  items: TPizza[];
};

const Home: FC<Props> = ({ items }) => {
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

const mapStateToProps = (state: AppState) => ({
  items: state.pizzas.value,
});

const connectedHome = connect(mapStateToProps)(Home);

export { connectedHome as Home };
