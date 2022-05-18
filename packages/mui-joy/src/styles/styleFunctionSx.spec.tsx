import { experimental_sx as sx, styled } from '@mui/joy/styles';

// Can be used in the styled() utility
const Test = styled('div')(
  sx({
    color: 'primary.100',
    bgcolor: 'primary.700',
    m: 2,
  }),
);
