import * as React from 'react';
import Box from '@mui/material/Box';
import ButtonBase, { ButtonBaseProps } from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import AddCircleOutlineRounded from '@mui/icons-material/AddCircleOutlineRounded';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';

export default (function More(props: ButtonBaseProps) {
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
        {
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          cursor: 'pointer',
          borderRadius: 1,
          height: '100%',
          border: '2px dashed',
          transitionProperty: 'all',
          transitionDuration: '150ms',
          borderColor: 'grey.200',
          '&:hover, &:focus': {
            borderColor: 'primary.main',
            bgcolor: 'primary.50',
            '@media (hover: none)': {
              bgcolor: 'transparent',
            },
          },
        },
        (theme) =>
          theme.applyDarkStyles({
            borderColor: 'primaryDark.500',
            '&:hover, &:focus': {
              bgcolor: 'primaryDark.700',
            },
          }),
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      <Box component="span" sx={{ mr: 1, px: '3px', lineHeight: 0 }}>
        <AddCircleOutlineRounded color="primary" fontSize="small" />
      </Box>
      <Typography component="span" color="primary.main" variant="body2" fontWeight="bold">
        Much more{' '}
        <KeyboardArrowRightRounded
          color="primary"
          fontSize="small"
          sx={{ verticalAlign: 'middle' }}
        />
      </Typography>
    </ButtonBase>
  );
} as typeof ButtonBase);
