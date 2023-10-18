import * as React from 'react';
import PropTypes from 'prop-types';
import { Button as BaseButton } from '@mui/base/Button';
import Stack from '@mui/material/Stack';
import clsx from 'clsx';

export default function UnstyledButtonsIntroduction() {
  return (
    <Stack spacing={2} direction="row">
      <Button>Button</Button>
      <Button disabled>Disabled</Button>
    </Stack>
  );
}

const Button = React.forwardRef((props, ref) => {
  const { className, ...other } = props;
  return (
    <BaseButton
      ref={ref}
      className={clsx(
        'cursor-pointer disabled:cursor-not-allowed text-sm font-sans bg-violet-500 hover:bg-violet-600 active:bg-violet-700 text-white rounded-lg font-semibold px-4 py-2 border-none disabled:opacity-50',
        className,
      )}
      {...other}
    />
  );
});

Button.propTypes = {
  className: PropTypes.string,
};
