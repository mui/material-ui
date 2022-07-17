import * as React from 'react';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import KeyboardArrowLeftRounded from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';

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
      sx={(theme) => ({
        color: 'primary.main',
        border: '1px solid',
        borderColor: 'grey.200',
        [theme.getColorSchemeSelector('dark')]: {
          color: '#fff',
          borderColor: 'primaryDark.300',
        },
        '&:hover': {
          borderColor: 'grey.300',
          [theme.getColorSchemeSelector('dark')]: {
            borderColor: 'primaryDark.200',
          },
        },
        '&.Mui-disabled': {
          opacity: 0.5,
          color: 'grey.700',
          borderColor: 'grey.300',
          [theme.getColorSchemeSelector('dark')]: {
            color: '#fff',
            borderColor: 'primary.700',
          },
        },
        '& + .MuiIconButton-root': {
          ml: 2,
        },
        ...props.sx,
      })}
    >
      {direction === 'left' && <KeyboardArrowLeftRounded fontSize="small" />}
      {direction === 'right' && <KeyboardArrowRightRounded fontSize="small" />}
    </IconButton>
  );
}
