import * as React from 'react';
import Box, { BoxProps } from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import AddCircleOutlineRounded from '@material-ui/icons/AddCircleOutlineRounded';
import KeyboardArrowRightRounded from '@material-ui/icons/KeyboardArrowRightRounded';

export default function Highlighter({
  onClick,
  sx,
}: {
  onClick?: BoxProps['onClick'];
  sx?: BoxProps['sx'];
}) {
  return (
    <Box
      role="button"
      onClick={onClick}
      sx={{
        p: 2,
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        borderRadius: 1,
        height: '100%',
        border: '2px dashed',
        borderColor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.500' : 'grey.200'),
        '&:hover': {
          borderColor: 'primary.main',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.700' : 'primary.50'),
          '@media (hover: none)': {
            bgcolor: 'transparent',
          },
        },
        ...sx,
      }}
    >
      <Box sx={{ mr: 2, px: '3px', lineHeight: 0 }}>
        <AddCircleOutlineRounded color="primary" sx={{ fontSize: 17 }} />
      </Box>
      <Typography color="primary.main" variant="body2" fontWeight="bold">
        Much more{' '}
        <KeyboardArrowRightRounded color="primary" sx={{ verticalAlign: 'middle', fontSize: 15 }} />
      </Typography>
    </Box>
  );
}
