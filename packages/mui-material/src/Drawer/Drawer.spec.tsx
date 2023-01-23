import * as React from 'react';
import { Drawer, PaperProps } from '@mui/material';
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
      <Drawer open />;
      <Drawer open PaperProps={paperProps} />;
    </>
  );
}
