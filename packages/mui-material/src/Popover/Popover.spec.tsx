import * as React from 'react';
import { Popover, PaperProps } from '@mui/material';
import { expectType } from '@mui/types';

const paperProps: PaperProps<'span'> = {
  component: 'span',
  onClick: (event) => {
    expectType<React.MouseEvent<HTMLSpanElement, MouseEvent>, typeof event>(event);
  },
};
function Test() {
  return (
    <>
      <Popover open />;
      <Popover open PaperProps={paperProps} />;
    </>
  );
}
