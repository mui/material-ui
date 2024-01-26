import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import { alpha } from '@mui/material/styles';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import Link from 'docs/src/modules/components/Link';
import ROUTES from 'docs/src/route';
import References, { CORE_CUSTOMERS } from 'docs/src/components/home/References';

export default function CoreHeroEnd() {
  return (
    <Section
      cozy
      data-mui-color-scheme="dark"
      sx={{
        background: (theme) =>
          `linear-gradient(180deg, ${(theme.vars || theme).palette.primaryDark[900]} 50%,
        ${alpha(theme.palette.primary[800], 0.2)} 100%), ${
            (theme.vars || theme).palette.primaryDark[900]
          }`,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <SectionHeadline
          alwaysCenter
          overline="Community"
          title={
            <Typography variant="h2">
              Join our <GradientText>global community</GradientText>
            </Typography>
          }
          description="The core components were crafted by many hands, all over the world. Join us today to get help when you need it, and lend a hand when you can."
        />
        <Button
          aria-label="Learn more"
          component={Link}
          href={ROUTES.communityHelp}
          noLinkStyle
          size="large"
          variant="contained"
          endIcon={<KeyboardArrowRightRounded />}
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          Join our community
        </Button>
      </Box>
      <References companies={CORE_CUSTOMERS} />
    </Section>
  );
}
