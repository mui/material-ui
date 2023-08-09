import * as React from 'react';
import { expectType } from '@mui/types';
import { Popover, PaperProps } from '@mui/material';

const paperProps: PaperProps<'span'> = {
  component: 'span',
  onClick: (event) => {
    expectType<React.MouseEvent<HTMLSpanElement, MouseEvent>, typeof event>(event);
  },
};
function Test() {
  return (
    <React.Fragment>
      <Popover open />;
      <Popover open PaperProps={paperProps} />
    </React.Fragment>
  );
}
