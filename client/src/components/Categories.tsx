import { FC, memo, useState } from 'react';

type Props = {
  items: string[];
};

export const Categories: FC<Props> = ({ items }) => {
  const [active, setActive] = useState<GetArrayItemType<typeof items> | null>(
    null
  );

  return (
    <div className="categories">
      <ul>
        <li
          className={active === null ? 'active' : ''}
          onClick={() => setActive(null)}
        >
          Все
        </li>
        {items.map((name) => (
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
