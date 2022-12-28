import { styled } from '@mui/joy/styles';

// Can be used in the styled() utility
const Test = styled('div')(({ theme }) =>
  theme.unstable_sx({
    color: 'primary.100',
    bgcolor: 'primary.700',
    m: 2,
  }),
);

// Can be used in when styles are defined as arrays
const TestArray = styled('div')(
  ({ theme }) => theme.unstable_sx({ color: 'primary.100' }),
  ({ theme }) => theme.unstable_sx({ mt: 2 }),
);

// Can be used inside pseudo elements
const TestPseudo = styled('div')(({ theme }) => ({
  ...theme.unstable_sx({ color: 'primary.100' }),
  '&:hover': theme.unstable_sx({ color: 'primary.700' }),
}));
