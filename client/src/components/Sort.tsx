import { FC, memo, useCallback, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../redux/store';
import { setSortBy } from '../redux/slices/filters';

const sortVariants = ['популярности', 'цене', 'алфавиту'];

type Props = typeof actions & ReturnType<typeof mapStateToProps>;

const Sort: FC<Props> = ({ sortBy, setSortBy }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const sortRef = useRef(null!);
  const togglePopup = useCallback(() => setIsPopupOpen((state) => !state), []);

  useEffect(() => {
    const handleOutsideClick = function (event: Event) {
      const path = event.composedPath && event.composedPath();
      if (!path.includes(sortRef.current)) setIsPopupOpen(false);
    };
    document.body.addEventListener('click', handleOutsideClick);
    return () => document.body.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <div ref={sortRef} className={`sort ${isPopupOpen ? 'sort--open' : ''}`}>
      <div onClick={togglePopup} className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span>{sortVariants[selected]}</span>
      </div>
      {isPopupOpen && (
        <div className="sort__popup">
          <ul>
            {sortVariants.map((name, index) => (
              <li
                key={name}
                className={selected === index ? 'active' : ''}
                onClick={() => setSelected(index)}
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  sortBy: state.filters.sortBy,
});

const actions = {
  setSortBy,
};

export default connect(mapStateToProps, actions)(memo(Sort));
