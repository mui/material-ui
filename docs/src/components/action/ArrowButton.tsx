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
      sx={[
        (theme) => ({
          border: '1px solid',
          ...theme.getStyle({
            default: {
              color: 'primary.main',
              borderColor: 'grey.200',
            },
            dark: {
              color: '#fff',
              borderColor: 'primaryDark.300',
            },
          }),
          '&:hover': theme.getStyle({
            default: {
              borderColor: 'grey.300',
            },
            dark: {
              borderColor: 'primaryDark.200',
            },
          }),
          '&.Mui-disabled': {
            opacity: 0.5,
            ...theme.getStyle({
              default: {
                color: 'grey.700',
                borderColor: 'grey.300',
              },
              dark: {
                color: '#fff',
                borderColor: 'primary.700',
              },
            }),
          },
          '& + .MuiIconButton-root': {
            ml: 2,
          },
        }),
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      {direction === 'left' && <KeyboardArrowLeftRounded fontSize="small" />}
      {direction === 'right' && <KeyboardArrowRightRounded fontSize="small" />}
    </IconButton>
  );
}
