import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Section from 'docs/src/layouts/Section';

export default function BaseUITestimonial() {
  return (
    <Section>
      <Grid container spacing={{ xs: 6, sm: 10 }} alignItems="center">
        <Grid xs={12} sm={6}>
          <Box
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              pt: 3,
              pl: 3,
              background:
                'linear-gradient(49deg, rgba(194, 224, 255, 0.24) 0%, rgba(0, 127, 255, 0.44) 92.71%)',
              backgroundClip: 'padding-box',
              overflow: 'auto',
              '& img': {
                width: '100%',
                borderTopLeftRadius: '12px',
                display: 'block',
              },
            }}
          >
            <Typography variant="h4" component="h2">
              big-AGI
            </Typography>
            <Typography variant="body2" mb={2.5}>
              AI web interface
            </Typography>
            <img
              src="/static/branding/joy-ui/big-agi-cover.jpg"
              srcSet="/static/branding/joy-ui/big-agi-cover.jpg 1x, /static/branding/joy-ui/big-agi-cover-2x.jpg 2x "
              alt="Screenshot displaying part of the Big-AGI home page that's built with Joy UI."
              loading="lazy"
              width="570px"
            />
          </Box>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Open-source AI web interface, powered by Joy UI
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
              <Typography variant="body2" fontWeight={600}>
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
