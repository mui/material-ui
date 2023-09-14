import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Section from 'docs/src/layouts/Section';
import Link from 'docs/src/modules/components/Link';

export default function BaseUITestimonial() {
  return (
    <Section>
      <Grid container spacing={{ xs: 6, sm: 10 }} alignItems="center">
        <Grid xs={12} sm={6}>
          <Box
            sx={(theme) => ({
              pt: 3,
              pl: 3,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              background: 'linear-gradient(49deg, #F3F6F9 0%, #F0F7FF 92.71%)',
              backgroundClip: 'padding-box',
              overflow: 'hidden',
              '& img': {
                borderTop: '1px solid',
                borderLeft: '1px solid',
                borderColor: 'divider',
                width: '100%',
                borderTopLeftRadius: '12px',
                display: 'block',
              },
              ...theme.applyDarkStyles({
                borderColor: 'divider',
                background: 'linear-gradient(49deg, #101418 0%, #001933 92.71%)',
              }),
            })}
          >
            <img
              src="/static/branding/joy-ui/big-agi-cover.jpg"
              srcSet="/static/branding/joy-ui/big-agi-cover.jpg 1x, /static/branding/joy-ui/big-agi-cover-2x.jpg 2x "
              alt="Screenshot displaying part of the Big-AGI home page that's built with Joy UI."
              loading="lazy"
              width="570px"
            />
          </Box>
          <Typography variant="body2" sx={{ mt: 2 }}>
            big-AGI&apos;s AI web interface, powered by Joy UI &nbsp;&nbsp;
            <Typography component="span" variant="inherit" sx={{ color: 'divider' }}>
              /
            </Typography>
            &nbsp;&nbsp;
            <Link href="https://big-agi.com/" target="_blank">
              View it live <ArrowForward fontSize="small" />
            </Link>
          </Typography>
        </Grid>
        <Grid xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Typography>
            “Joy UI played a pivotal role in shaping the success of big-AGI. It turns heads with its
            stunning looks and makes other devs envious with its responsiveness, lightweight
            footprint, comprehensive documentation, and polished API. Using Joy UI is a delight, and
            the optimal React frontend choice.”
          </Typography>
          <Divider />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Avatar alt="" src="/static/branding/joy-ui/enricoros.png" />
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" fontWeight="semiBold" color="text.primary">
                Enrico Ros
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Director of Product Management
              </Typography>
            </Box>
            <Box component="img" src="/static/branding/joy-ui/big-agi-logo.svg" alt="" />
          </Box>
        </Grid>
      </Grid>
    </Section>
  );
}
