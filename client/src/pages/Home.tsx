import { FC, memo } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../redux/store';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaLoader from '../components/PizzaLoader';

type Props = ReturnType<typeof mapStateToProps>;

const Home: FC<Props> = ({ items, cart }) => {
  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {!items.length &&
            new Array(8)
              .fill(null)
              .map((_, index) => <PizzaLoader key={index} />)}
          {!!items.length &&
            items.map((item) => (
              <PizzaBlock
                key={item.id}
                count={cart.pizzas[item.id]?.count}
                {...item}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  items: state.pizzas.value,
  cart: state.cart.value,
});

export default connect(mapStateToProps)(memo(Home));
