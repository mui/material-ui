import { experimental_sx as sx, styled } from '@mui/system';

// Can be used in the styled() utility
const Test = styled('div')(
  sx({
    color: 'primary.main',
    bgcolor: 'primary.light',
    m: 2,
  }),
);
