import * as React from 'react';
import { Button, ButtonProps } from '@mui/base/Button';
import Stack from '@mui/material/Stack';
import clsx from 'clsx';

export default function UnstyledButtonsSimple() {
  return (
    <Stack spacing={2} direction="row">
      <CustomButton className="hover:bg-violet-600 active:bg-violet-700">
        Button
      </CustomButton>
      <CustomButton disabled>Disabled</CustomButton>
    </Stack>
  );
}

const CustomButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { className, ...other } = props;
    return (
      <Button
        ref={ref}
        className={clsx(
          'cursor-pointer disabled:cursor-not-allowed text-sm font-sans bg-violet-500 text-white rounded-lg font-semibold px-4 py-2 border-none disabled:opacity-50',
          className,
        )}
        {...other}
      />
    );
  },
);
