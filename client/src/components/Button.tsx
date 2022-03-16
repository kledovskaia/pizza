import classNames from 'classnames';
import { FC } from 'react';

type Props = {
  className: string;
};

export const Button: FC<Props> = ({ className, children }) => {
  return (
    <button
      className={classNames('button', className, {
        outline: 'button--outline',
        add: 'button--add',
      })}
    >
      {children}
    </button>
  );
};
