import * as React from 'react';
import Box from '@material-ui/core/Box';
import ButtonBase, { ButtonBaseProps } from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import AddCircleOutlineRounded from '@material-ui/icons/AddCircleOutlineRounded';
import KeyboardArrowRightRounded from '@material-ui/icons/KeyboardArrowRightRounded';

export default (function Highlighter(props: ButtonBaseProps) {
  return (
    <ButtonBase
      {...props}
      sx={{
        p: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        cursor: 'pointer',
        borderRadius: 1,
        height: '100%',
        border: '2px dashed',
        borderColor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.500' : 'grey.200'),
        '&:hover, &:focus': {
          borderColor: 'primary.main',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.700' : 'primary.50'),
          '@media (hover: none)': {
            bgcolor: 'transparent',
          },
        },
        ...props.sx,
      }}
    >
      <Box sx={{ mr: 2, px: '3px', lineHeight: 0 }}>
        <AddCircleOutlineRounded color="primary" sx={{ fontSize: 17 }} />
      </Box>
      <Typography color="primary.main" variant="body2" fontWeight="bold">
        Much more{' '}
        <KeyboardArrowRightRounded color="primary" sx={{ verticalAlign: 'middle', fontSize: 15 }} />
      </Typography>
    </ButtonBase>
  );
} as typeof ButtonBase);
