import { styled } from '@mui/joy/styles';

// Can be used in the styled() utility
const Test = styled('div')(({ theme }) =>
  theme.unstable_sx({
    color: 'primary.100',
    bgcolor: 'primary.700',
    m: 2,
  }),
);
