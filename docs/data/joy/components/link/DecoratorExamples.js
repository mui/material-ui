import * as React from 'react';
import Box from '@mui/joy/Box';
import CircularProgress from '@mui/joy/CircularProgress';
import Link from '@mui/joy/Link';
import Chip from '@mui/joy/Chip';

export default function DecoratorExamples() {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
    >
      <Link href="#common-examples" disabled startDecorator={<CircularProgress />}>
        Processing...
      </Link>

      <Link
        href="#common-examples"
        underline="none"
        variant="outlined"
        color="neutral"
        endDecorator={
          <Chip color="success" variant="soft" size="sm" sx={{}}>
            hiring
          </Chip>
        }
        sx={{ '--Link-gap': '0.5rem', pl: 1, py: 0.5, borderRadius: 'md' }}
      >
        Careers
      </Link>
    </Box>
  );
}
