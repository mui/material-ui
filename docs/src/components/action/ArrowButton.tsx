import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import KeyboardArrowLeftRounded from '@material-ui/icons/KeyboardArrowLeftRounded';
import KeyboardArrowRightRounded from '@material-ui/icons/KeyboardArrowRightRounded';

export default function ArrowButton({
  mode: modeProp,
  direction,
  ...props
}: { direction: 'left' | 'right'; mode?: 'light' | 'dark' } & IconButtonProps) {
  const globalTheme = useTheme();
  const mode = modeProp || globalTheme.palette.mode;
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
        color: mode === 'dark' ? '#fff' : 'primary.main',
        border: '1px solid',
        borderColor: mode === 'dark' ? 'primaryDark.300' : 'primary.main',
        '&.Mui-disabled': {
          opacity: 0.5,
          color: mode === 'dark' ? '#fff' : 'grey.500',
          borderColor: mode === 'dark' ? 'primary.700' : 'grey.500',
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
