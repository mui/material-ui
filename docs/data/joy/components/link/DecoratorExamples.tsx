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
        endDecorator={
          <Chip
            sx={{
              color: 'neutral',
              color: 'success',
            }}
            variant="soft"
            size="sm"
          >
            hiring
          </Chip>
        }
      >
        Careers
      </Link>
    </Box>
  );
}
