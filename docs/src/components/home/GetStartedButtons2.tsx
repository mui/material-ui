import * as React from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import Button from '@mui/material/Button';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import ROUTES from 'docs/src/route';
import Link from 'docs/src/modules/components/Link';
import NpmCopyButton from 'docs/src/components/action/NpmCopyButton';

interface GetStartedButtons2Props extends BoxProps {
  primaryUrl?: string;
  primaryLabel?: string;
  secondaryUrl?: string;
  secondaryLabel?: string;
  installation?: string;
  targetPrimary?: string;
  targetSecondary?: string;
}

export default function GetStartedButtons2(props: GetStartedButtons2Props) {
  const {
    primaryLabel,
    primaryUrl = ROUTES.documentation,
    secondaryUrl,
    secondaryLabel,
    installation,
    targetPrimary = '_self',
    targetSecondary = '_self',
    ...other
  } = props;
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
          href={primaryUrl}
          component={Link}
          noLinkStyle
          size="large"
          variant="contained"
          endIcon={<KeyboardArrowRightRounded />}
          target={targetPrimary}
          sx={{
            flexShrink: 0,
            mr: { xs: 0, md: 1.5 },
            mb: { xs: 2, md: 0 },
          }}
        >
          {primaryLabel}
        </Button>
        <Button
          href={secondaryUrl}
          component={Link}
          noLinkStyle
          variant="outlined"
          size="large"
          target={targetSecondary}
          color="secondary"
          endIcon={<KeyboardArrowRightRounded />}
        >
          {secondaryLabel}
        </Button>
      </Box>
      {installation ? <NpmCopyButton installation={installation} sx={{ mt: 2 }} /> : null}
    </React.Fragment>
  );
}
