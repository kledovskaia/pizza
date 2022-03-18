import { FC } from 'react';
import { connect } from 'react-redux';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import { Pizza } from '../components/Pizza';
import { AppState } from '../redux/store';

type Props = {
  items: TPizza[];
};

const categoryVariants = [
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
];
const sortVariants = ['популярности', 'цене', 'алфавиту'];

const Home: FC<Props> = ({ items }) => {
  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories items={categoryVariants} />
          <Sort items={sortVariants} />
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

export default connect(mapStateToProps)(Home);
