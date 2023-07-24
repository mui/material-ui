import * as React from 'react';
import ButtonBase, { ButtonBaseProps } from '@mui/material/ButtonBase';
import { alpha } from '@mui/material/styles';

export default function Highlighter({
  disableBorder = false,
  selected = false,
  sx,
  ...props
}: {
  disableBorder?: boolean;
  selectedBg?: 'white' | 'comfort';
  selected?: boolean;
} & ButtonBaseProps) {
  const ref = React.useRef<null | HTMLButtonElement>(null);
  return (
    <ButtonBase
      component="span"
      ref={ref}
      {...props}
      onClick={(event: any) => {
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
            borderColor: 'grey.100',
          }),
          ...(selected && {
            bgcolor: '#FFF',
            borderColor: 'primary.300',
            boxShadow: `0px 1px 6px ${
              (theme.vars || theme).palette.primary[100]
            }, inset 0px 2px 8px ${(theme.vars || theme).palette.grey[50]}`,
            color: 'primary.500',
          }),
          ...(!selected && {
            '&:hover, &:focus': {
              bgcolor: 'primary.50',
              borderColor: 'primary.100',
              '@media (hover: none)': {
                bgcolor: 'transparent',
              },
            },
          }),
          ...theme.applyDarkStyles({
            color: 'primary.800',
            ...((!disableBorder || selected) && {
              borderColor: 'primaryDark.700',
            }),
            ...(selected && {
              bgcolor: `${alpha(theme.palette.primary[900], 0.3)}`,
              borderColor: 'primary.700',
              color: 'primary.300',
              boxShadow: `0px 1px 6px ${
                (theme.vars || theme).palette.primary[800]
              }, inset 0px 2px 8px ${(theme.vars || theme).palette.primaryDark[800]}`,
            }),
            ...(!selected && {
              '&:hover, &:focus': {
                bgcolor: 'primaryDark.800',
                borderColor: 'primaryDark.700',
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
