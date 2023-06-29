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
        variant="soft"
        color="success"
        endDecorator={
          <Chip color="success" size="sm" sx={{ borderRadius: '3px', mr: '2px' }}>
            HIRING!
          </Chip>
        }
        sx={{ '--Link-gap': '0.5rem', pr: 0, pl: 1 }}
      >
        Careers
      </Link>
    </Box>
  );
}
