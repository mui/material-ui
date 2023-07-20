import * as React from 'react';
import { alpha } from '@mui/material/styles';
// import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Section from 'docs/src/layouts/Section';
import Link from 'docs/src/modules/components/Link';

// Note: All of the commented code will be put back in once logos for each Core product are done.

const content = [
  {
    // logo:
    title: 'Material UI',
    description: "An open-source React component library that implements Google's Material Design.",
    link: '/material-ui/',
  },
  {
    // logo:
    title: 'Joy UI',
    description:
      "An easy to customize open-source React component library that implements MUI's own in-house design principles by default.",
    link: '/joy-ui/getting-started/',
  },
  {
    // logo:
    title: 'Base UI',
    description:
      'A library of unstyled components with production-ready functionality, along with low-level hooks.',
    link: '/base-ui/',
  },
  {
    // logo:
    title: 'MUI System',
    description: 'A set of CSS utilities to help you build custom designs more efficiently.',
    link: '/system/getting-started/',
  },
];

export default function CoreProducts() {
  return (
    <Section cozy>
      <Grid container spacing={2}>
        {content.map(({ title, description, link }) => (
          <Grid key={title} item xs={12} md={6}>
            <Paper
              component={Link}
              href={link}
              variant="outlined"
              sx={(theme) => ({
                p: 2.5,
                height: '100%',
                position: 'relative',
                borderRadius: '12px',
                border: '1px solid',
                borderColor: 'grey.100',
                background: `linear-gradient(to top right, ${alpha(
                  theme.palette.primary[50],
                  0.3,
                )} 40%, ${alpha(theme.palette.grey[50], 0.2)} 100%)`,

                '&:hover': {
                  borderColor: 'primary.500',
                  boxShadow:
                    '0px 1px 6px 0px rgba(194, 224, 255, 1), 0px 2px 30px 0px rgba(234, 237, 241, 0.3) inset',
                },

                ...theme.applyDarkStyles({
                  bgcolor: 'primaryDark.900',
                  borderColor: 'primaryDark.700',
                  background: `linear-gradient(to top right, ${alpha(
                    theme.palette.primary[900],
                    0.1,
                  )} 40%, ${alpha(theme.palette.primaryDark[800], 0.2)} 100%)`,

                  '&:hover': {
                    boxShadow: '0px 1px 6px #0059B3, inset 0px 2px 30px rgba(0, 0, 0, 0.1)',
                  },
                }),
              })}
            >
              {/* <Box
                sx={(theme) => ({
                  width: 40,
                  height: 40,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'primary.200',
                  bgcolor: 'primary.50',
                  boxShadow:
                    '0px 1px 6px 0px rgba(194, 224, 255, 1), 0px 2px 30px 0px rgba(234, 237, 241, 0.3) inset',
                  ...theme.applyDarkStyles({
                    borderColor: 'primary.400',
                    bgcolor: 'primary.900',
                    boxShadow:
                      '0px 1px 6px 0px rgba(0, 89, 178, 1), 0px 2px 30px 0px rgba(0, 0, 0, 0.25) inset',
                  }),
                })}
              >
                {logo}
              </Box> */}
              <Typography
                fontWeight="bold"
                component="h3"
                color="text.primary"
                variant="body1"
                // mt={2}
                mb={0.5}
              >
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Section>
  );
}
