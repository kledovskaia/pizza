import { FC, memo } from 'react';
import { connect } from 'react-redux';
import { setFilterBy } from '../redux/slices/filters';
import { AppState } from '../redux/store';

const categoryVariants = [
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
];

type Props = typeof actions & ReturnType<typeof mapStateToProps>;

const Categories: FC<Props> = ({ active, setActive }) => {
  return (
    <div className="categories">
      <ul>
        <li
          className={active === null ? 'active' : ''}
          onClick={() => setActive(null)}
        >
          Все
        </li>
        {categoryVariants.map((name, index) => (
          <li
            key={name}
            className={active === index ? 'active' : ''}
            onClick={() => setActive(index)}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  active: state.filters.filterBy,
});

const actions = {
  setActive: setFilterBy,
};

export default connect(mapStateToProps, actions)(memo(Categories));
