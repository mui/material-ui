import { unstable_sx as sx, styled } from '@mui/system';

// Can be used in the styled() utility
const Test = styled('div')(({ theme }) =>
  sx(
    {
      color: 'primary.main',
      bgcolor: 'primary.light',
      m: 2,
    },
    theme,
  ),
);
