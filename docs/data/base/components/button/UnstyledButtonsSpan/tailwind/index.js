import * as React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/base/Button';
import Stack from '@mui/material/Stack';
import clsx from 'clsx';

export default function UnstyledButtonsSimple() {
  return (
    <Stack spacing={2} direction="row">
      <CustomButton className="hover:bg-violet-600 active:bg-violet-700">
        Button
      </CustomButton>
      <CustomButton disabled slots={{ root: 'span' }}>
        Disabled
      </CustomButton>
    </Stack>
  );
}

const CustomButton = React.forwardRef((props, ref) => {
  const { className, ...other } = props;
  return (
    <Button
      ref={ref}
      className={clsx(
        'cursor-pointer transition text-sm font-sans font-semibold leading-normal bg-violet-500 text-white rounded-lg px-4 py-2 border border-violet-500 shadow-[0_2px_1px_rgb(45_45_60_/_0.2),_inset_0_1.5px_1px_#a78bfa,_inset_0_-2px_1px_#7c3aed] dark:shadow-[0_2px_1px_rgb(0_0_0/_0.5),_inset_0_1.5px_1px_#a78bfa,_inset_0_-2px_1px_#7c3aed] hover:bg-violet-600 active:bg-violet-700 active:shadow-none focus-visible:shadow-[0_0_0_4px_#ddd6fe] dark:focus-visible:shadow-[0_0_0_4px_#a78bfa] focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none',
        className,
      )}
      {...other}
    />
  );
});

CustomButton.propTypes = {
  className: PropTypes.string,
};
