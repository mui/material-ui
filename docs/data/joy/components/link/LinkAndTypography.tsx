import * as React from 'react';
import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import Launch from '@mui/icons-material/Launch';
import LinkIcon from '@mui/icons-material/Link';

export default function LinkAndTypography() {
  return (
    <Box sx={{ maxWidth: 360 }}>
      <Typography
        id="heading-demo"
        level="h2"
        endDecorator={
          <Link
            variant="outlined"
            aria-labelledby="heading-demo"
            href="#heading-demo"
            sx={{ fontSize: 'md', borderRadius: 'sm' }}
          >
            <LinkIcon />
          </Link>
        }
        sx={{ fontSize: 'lg', mb: 1, scrollMarginTop: 100 }}
      >
        Heading
      </Typography>
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore{' '}
        <Link href="#heading-demo" startDecorator={<Launch />}>
          Magna Aliqua
        </Link>
        . Maecenas sed enim ut sem viverra aliquet eget.
      </Typography>
    </Box>
  );
}
