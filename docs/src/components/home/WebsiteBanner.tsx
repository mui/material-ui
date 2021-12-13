import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function WebsiteBanner(props) {
  return props.content ? (
    <Box
      sx={{
        p: 1.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? `linear-gradient(90deg, ${theme.palette.primary[900]}, ${theme.palette.primary[600]} 120%)`
            : `linear-gradient(-90deg, ${theme.palette.primary[700]}, ${theme.palette.primary[500]} 120%)`,
      }}
    >
      <Typography
        variant="body2"
        fontWeight="medium"
        sx={{
          color: '#fff',
        }}
      >
        {props.content}
      </Typography>
    </Box>
  ) : null;
}
