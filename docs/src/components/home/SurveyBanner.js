import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from 'docs/src/modules/components/Link';
import ROUTES from 'docs/src/route';
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';

export default function SurveyBanner() {
  return (
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
        Help shape the future of MUI! &nbsp;🚀 &nbsp;&nbsp;&nbsp;Please take a few minutes to
        complete the{' '}
        <Link href={ROUTES.suvery2021} sx={{ color: '#fff', textDecoration: 'underline' }}>
          2021 MUI developer survey <ArrowRightAltRoundedIcon fontSize="small" />
        </Link>
      </Typography>
    </Box>
  );
}
