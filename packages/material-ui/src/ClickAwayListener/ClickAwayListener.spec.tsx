import React from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const ClickAwayListenerComponentTest = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  return (
    <ClickAwayListener getTargetEl={() => ref.current} onClickAway={() => {}}>
      <div ref={ref} />
    </ClickAwayListener>
  );
};
