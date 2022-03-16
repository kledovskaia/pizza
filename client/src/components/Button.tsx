import classNames from 'classnames';
import { FC } from 'react';

enum modificators {
  outline,
  add,
  cart,
}

type Props = {
  [key in keyof typeof modificators]?: boolean;
} & {
  className?: string;
};

export const Button: FC<Props> = (props) => {
  return (
    <button
      className={classNames(
        'button',
        props.className,
        Object.fromEntries(
          Object.keys(modificators).map((key) => [
            `button--${key}`,
            props[key as keyof typeof props],
          ])
        )
      )}
    >
      {props.children}
    </button>
  );
};
