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
  onClick?: (...arg: any[]) => void;
};

export const Button: FC<Props> = (props) => {
  return (
    <button
      onClick={props.onClick}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          props.onClick?.(event);
        }
      }}
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
