import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import Link from 'docs/src/modules/components/Link';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import ROUTES from 'docs/src/route';

export default function JoyUIEnd() {
  return (
    <Section bg="dim" cozy>
      <Box sx={{ textAlign: 'center' }}>
        <SectionHeadline
          alwaysCenter
          inverted
          overline="Community"
          title={
            <Typography variant="h2" textAlign="center">
              Get and give help by joining
              <br /> our contributors community
            </Typography>
          }
          description={
            <React.Fragment>
              MUI Core components were crafted by many hands, all over the world.
              <br />
              Join the community to help us expand it even further!
            </React.Fragment>
          }
        />
        <Button
          href={ROUTES.joyDocs}
          component={Link}
          noLinkStyle
          size="large"
          variant="contained"
          endIcon={<KeyboardArrowRightRounded />}
          sx={{ mt: 2 }}
        >
          Get started
        </Button>
      </Box>
    </Section>
  );
}
