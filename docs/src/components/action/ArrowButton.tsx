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
            color: {
              default: 'primary.main',
              dark: '#fff',
            },
            borderColor: {
              default: 'grey.200',
              dark: 'primaryDark.300',
            },
          }),
          '&:hover': theme.getStyle({
            borderColor: {
              default: 'grey.300',
              dark: 'primaryDark.200',
            },
          }),
          '&.Mui-disabled': {
            opacity: 0.5,
            ...theme.getStyle({
              color: {
                default: 'grey.700',
                dark: '#fff',
              },
              borderColor: {
                default: 'grey.300',
                dark: 'primary.700',
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
