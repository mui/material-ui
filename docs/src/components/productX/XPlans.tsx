import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Section from 'docs/src/layouts/Section';
import Button from '@mui/material/Button';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import Link from 'docs/src/modules/components/Link';
import ROUTES from 'docs/src/route';
import Frame from 'docs/src/components/action/Frame';

const Image = styled('img')(({ theme }) => ({
  filter: 'drop-shadow(-8px 4px 20px rgba(61, 71, 82, 0.1))',
  transition: '0.3s',
  display: 'block',
  height: 'auto',
  borderRadius: '8px',
  ...theme.applyDarkStyles({
    filter: 'drop-shadow(-8px 4px 20px rgba(0, 0, 0, 0.4))',
  }),
}));

export default function XPlans() {
  return (
    <Section>
      <Grid container spacing={2} alignItems="center">
        <Grid item md={6} sx={{ minWidth: 0 }}>
          <Box maxWidth={500} sx={{ mb: { xs: 2, sm: 0 } }}>
            <SectionHeadline
              overline="Plans"
              title={
                <Typography variant="h2">
                  Available with <GradientText>MIT and commercial licenses</GradientText>
                </Typography>
              }
              description="MUI X components are available under two licenses: MIT for the free community version, and commercial for Pro and Premium plans."
            />
            <Button
              component={Link}
              href={ROUTES.pricing}
              noLinkStyle
              size="large"
              variant="contained"
              endIcon={<KeyboardArrowRightRounded />}
              sx={{ width: { xs: '100%', sm: 'auto' } }}
            >
              Compare plans
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Frame>
            <Frame.Demo
              sx={{
                overflow: 'hidden',
                height: { xs: 240, sm: 390 },
                perspective: '1000px',
              }}
            >
              <Image
                src={`/static/branding/mui-x/Mocktable-light.png`}
                alt=""
                loading="lazy"
                width="300"
                sx={(theme) => ({
                  width: { sm: 480 },
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  ...theme.applyDarkStyles({
                    content: 'url(/static/branding/mui-x/Mocktable-dark.png)',
                  }),
                })}
              />
            </Frame.Demo>
          </Frame>
        </Grid>
      </Grid>
    </Section>
  );
}
