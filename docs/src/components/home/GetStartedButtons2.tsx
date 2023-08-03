import * as React from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import Button from '@mui/material/Button';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import ROUTES from 'docs/src/route';
import Link from 'docs/src/modules/components/Link';
import NpmCopyButton from 'docs/src/components/action/NpmCopyButton';

interface GetStartedButtons2Props extends BoxProps {
  getStartedUrl?: string;
  learnUrl?: string;
  learnLabel?: string;
  installation?: string;
}

export default function GetStartedButtons2(props: GetStartedButtons2Props) {
  const { getStartedUrl = ROUTES.documentation, learnUrl, learnLabel, ...other } = props;
  return (
    <React.Fragment>
      <Box
        {...other}
        sx={{
          display: 'flex',
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          '&& > *': {
            minWidth: { xs: '100%', md: '0%' },
          },
          ...other.sx,
        }}
      >
        <Button
          href={getStartedUrl}
          component={Link}
          noLinkStyle
          size="large"
          variant="contained"
          endIcon={<KeyboardArrowRightRounded />}
          sx={{
            flexShrink: 0,
            mr: { xs: 0, md: 1.5 },
            mb: { xs: 2, md: 0 },
          }}
        >
          Get started
        </Button>
        <Button
          href={learnUrl}
          component={Link}
          noLinkStyle
          variant="outlined"
          size="large"
          color="secondary"
          endIcon={<KeyboardArrowRightRounded />}
        >
          {learnLabel}
        </Button>
      </Box>
      <NpmCopyButton installation="npm install @mui/base" sx={{ mt: 2 }} />
    </React.Fragment>
  );
}
