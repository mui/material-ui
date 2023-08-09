import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Palette from '@mui/icons-material/Palette';
import LibraryBooks from '@mui/icons-material/LibraryBooks';
import CodeRounded from '@mui/icons-material/CodeRounded';
import GradientText from 'docs/src/components/typography/GradientText';
import Section from 'docs/src/layouts/Section';

const content = [
  {
    icon: <Palette fontSize="small" color="primary" />,
    title: 'For designers',
    description:
      'Save time getting the Material UI components all setup, leveraging the latest features from your favorite design tool.',
  },
  {
    icon: <LibraryBooks fontSize="small" color="primary" />,
    title: 'For product managers',
    description:
      'Quickly put together ideas and high-fidelity mockups/prototypes using components from your actual product.',
  },
  {
    icon: <CodeRounded fontSize="small" color="primary" />,
    title: 'For developers',
    description:
      'Effortlessly communicate with designers using the same language around the MUI Core components props and variants.',
  },
];

function DesignKitValues() {
  return (
    <Section>
      <Typography variant="body2" color="primary" fontWeight="bold">
        Collaboration
      </Typography>
      <Typography variant="h2" sx={{ mt: 1, mb: { xs: 2, sm: 4 }, maxWidth: 500 }}>
        Be more efficient <GradientText>designing and developing</GradientText> with the same
        library
      </Typography>
      <Grid container spacing={3}>
        {content.map(({ icon, title, description }) => (
          <Grid key={title} item xs={12} sm={6} md={4}>
            <Paper
              variant="outlined"
              sx={(theme) => ({
                p: 3,
                height: '100%',
                position: 'relative',
                borderRadius: '12px',
                border: '1px solid',
                borderColor: 'grey.100',
                background: `${(theme.vars || theme).palette.gradients.linearSubtle}`,

                ...theme.applyDarkStyles({
                  bgcolor: 'primaryDark.900',
                  borderColor: 'primaryDark.700',
                  background: `${(theme.vars || theme).palette.gradients.linearSubtle}`,
                }),
              })}
            >
              <Box
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
                {icon}
              </Box>
              <Typography
                fontWeight="bold"
                component="h3"
                color="text.primary"
                variant="body2"
                mt={2}
                mb={0.5}
              >
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                {description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Section>
  );
}

export default DesignKitValues;
