import { FC, memo } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../redux/store';
import { addPizza } from '../redux/slices/cart';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaLoader from '../components/PizzaLoader';

type Props = ReturnType<typeof mapStateToProps> & typeof actions;

const Home: FC<Props> = ({ items, cart, addPizza, isLoading }) => {
  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading &&
            new Array(8)
              .fill(null)
              .map((_, index) => <PizzaLoader key={index} />)}
          {!isLoading &&
            !!items.length &&
            items.map((item) => (
              <PizzaBlock
                addPizza={addPizza}
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
  isLoading: state.loading.value,
});

const actions = {
  addPizza,
};

export default connect(mapStateToProps, actions)(memo(Home));
