import { memo, useState } from 'react';

const categoryVariants = [
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
];

const Categories = () => {
  const [active, setActive] = useState<GetArrayItemType<
    typeof categoryVariants
  > | null>(null);

  return (
    <div className="categories">
      <ul>
        <li
          className={active === null ? 'active' : ''}
          onClick={() => setActive(null)}
        >
          Все
        </li>
        {categoryVariants.map((name) => (
          <li
            key={name}
            className={active === name ? 'active' : ''}
            onClick={() => setActive(name)}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default memo(Categories);
