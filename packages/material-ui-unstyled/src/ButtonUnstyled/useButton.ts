import * as React from 'react';

interface Props {
  onKeyDown?: React.KeyboardEventHandler;
  onClick?: React.EventHandler<any>;
  onMouseDown?: React.EventHandler<any>;
}

export default function useButton({ onClick, onKeyDown, onMouseDown }: Props) {
  const [isPressed, setPressed] = React.useState(false);

  const handleClick = (e: React.SyntheticEvent) => {
    onClick?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<any>) => {
    if (e.key === ' ') {
      e.preventDefault();
      setPressed(true);
      handleClick(e);
      document.addEventListener(
        'keyup',
        () => {
          if (e.key === ' ') {
            setPressed(false);
          }
        },
        {
          once: true,
        },
      );
    }

    onKeyDown?.(e);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setPressed(true);
    document.addEventListener('mouseup', () => setPressed(false), {
      once: true,
    });

    onMouseDown?.(e);
  };

  return {
    getRootProps: () => ({
      role: 'button',
      onKeyDown: handleKeyDown,
      onClick: handleClick,
      onMouseDown: handleMouseDown,
      tabIndex: 0,
    }),
    isPressed,
  };
}
