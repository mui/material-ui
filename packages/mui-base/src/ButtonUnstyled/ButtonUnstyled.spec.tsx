import * as React from 'react';
import clsx from 'clsx';
import ButtonUnstyled, {
  ButtonUnstyledProps,
  ButtonUnstyledRootSlotProps,
} from '@mui/base/ButtonUnstyled';

const CustomButtonRoot = React.forwardRef(function CustomButtonRoot(
  props: ButtonUnstyledRootSlotProps,
) {
  const { ownerState, ...other } = props;
  const classes = clsx(
    other.className,
    ownerState.active && 'active',
    ownerState.focusVisible && 'focusVisible',
  );

  return <button type="button" {...other} className={classes} />;
});

function ButtonWithCustomRoot(props: ButtonUnstyledProps) {
  return <ButtonUnstyled {...props} components={{ Root: CustomButtonRoot }} />;
}
