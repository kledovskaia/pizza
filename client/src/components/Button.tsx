import classNames from 'classnames';
import { FC, memo, ReactNode } from 'react';

enum modificators {
  outline,
  add,
  cart,
  circle,
}

type Props = {
  [key in keyof typeof modificators]?: boolean;
} & {
  children: ReactNode;
  className?: string;
  onClick?: (...arg: any[]) => void;
};

const Button: FC<Props> = (props) => {
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

export default memo(Button);
