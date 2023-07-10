import * as React from 'react';
import ButtonBase, { ButtonBaseProps } from '@mui/material/ButtonBase';

export default function Highlighter({
  disableBorder = false,
  selected = false,
  selectedBg = 'white',
  sx,
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
  const ref = React.useRef<null | HTMLButtonElement>(null);
  return (
    <ButtonBase
      ref={ref}
      {...props}
      onClick={(event) => {
        if (ref.current) {
          ref.current.scrollIntoView({ block: 'nearest' });
        }
        if (props.onClick) {
          props.onClick(event);
        }
      }}
      onFocusVisible={(event) => {
        if (ref.current) {
          ref.current.scrollIntoView({ block: 'nearest' });
        }
        if (props.onFocusVisible) {
          props.onFocusVisible(event);
        }
      }}
      sx={[
        (theme) => ({
          justifyContent: 'flex-start',
          textAlign: 'left',
          alignItems: 'center',
          borderRadius: 1,
          height: '100%',
          border: '1px solid transparent',
          transitionProperty: 'all',
          transitionDuration: '150ms',
          color: 'primary.300',
          ...((!disableBorder || selected) && {
            borderColor: 'grey.200',
          }),
          ...(selected && {
            bgcolor: lightSelectedBg[selectedBg],
            borderColor: 'grey.200',
            color: 'primary.500',
          }),
          ...(!selected && {
            '&:hover, &:focus': {
              bgcolor: 'grey.100',
              '@media (hover: none)': {
                bgcolor: 'transparent',
              },
            },
          }),
          ...theme.applyDarkStyles({
            color: 'primary.800',
            ...((!disableBorder || selected) && {
              borderColor: 'primaryDark.500',
            }),
            ...(selected && {
              bgcolor: 'primaryDark.700',
              borderColor: 'primaryDark.300',
              color: 'primary.300',
            }),
            ...(!selected && {
              '&:hover, &:focus': {
                bgcolor: 'primaryDark.800',
                '@media (hover: none)': {
                  bgcolor: 'transparent',
                },
              },
            }),
          }),
          '&.Mui-disabled': {
            opacity: 0.4,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );
}
