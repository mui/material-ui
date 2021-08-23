import * as React from 'react';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import KeyboardArrowLeftRounded from '@material-ui/icons/KeyboardArrowLeftRounded';
import KeyboardArrowRightRounded from '@material-ui/icons/KeyboardArrowRightRounded';

export default function ArrowButton({
  direction,
  ...props
}: { direction: 'left' | 'right' } & IconButtonProps) {
  const label = {
    left: 'Previous',
    right: 'Next',
  };
  return (
    <IconButton
      size="small"
      aria-label={label[direction]}
      {...props}
      sx={{
        color: (theme) => (theme.palette.mode === 'dark' ? '#fff' : 'primary.main'),
        border: '1px solid',
        borderColor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.300' : 'grey.200'),
        '&:hover': {
          borderColor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.200' : 'grey.300'),
        },
        '&.Mui-disabled': {
          opacity: 0.5,
          color: (theme) => (theme.palette.mode === 'dark' ? '#fff' : 'grey.700'),
          borderColor: (theme) => (theme.palette.mode === 'dark' ? 'primary.700' : 'grey.300'),
        },
        '& + .MuiIconButton-root': {
          ml: 2,
        },
        ...props.sx,
      }}
    >
      {direction === 'left' && <KeyboardArrowLeftRounded fontSize="small" />}
      {direction === 'right' && <KeyboardArrowRightRounded fontSize="small" />}
    </IconButton>
  );
}
