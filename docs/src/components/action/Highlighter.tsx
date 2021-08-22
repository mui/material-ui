import * as React from 'react';
import ButtonBase, { ButtonBaseProps } from '@material-ui/core/ButtonBase';

export default function Highlighter({
  disableBorder = false,
  selected = false,
  selectedBg = 'white',
  ...props
}: {
  disableBorder?: boolean;
  selectedBg?: 'white' | 'comfort';
  selected?: boolean;
} & ButtonBaseProps) {
  const lightSelectedBg = {
    white: '#fff',
    comfort: 'grey.50',
  };
  return (
    <ButtonBase
      {...props}
      sx={{
        justifyContent: 'flex-start',
        textAlign: 'left',
        borderRadius: 1,
        height: '100%',
        border: '1px solid transparent',
        ...((!disableBorder || selected) && {
          borderColor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.500' : 'grey.200'),
        }),
        ...(selected && {
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? 'primaryDark.700' : lightSelectedBg[selectedBg],
          borderColor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.300' : 'grey.200'),
        }),
        ...(!selected && {
          '&:hover, &:focus': {
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.800' : 'grey.100'),
            '@media (hover: none)': {
              bgcolor: 'transparent',
            },
          },
        }),
        ...props.sx,
      }}
    />
  );
}
