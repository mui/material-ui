import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/system';

import { brandColor } from '../getLPTheme';

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import Chip from '@mui/material/Chip';

const tiers = [
  {
    title: 'Free',
    price: '0',
    description: [
      '10 users included',
      '2 GB of storage',
      'Help center access',
      'Email support',
    ],
    buttonText: 'Sign up for free',
    buttonVariant: 'outlined',
  },
  {
    title: 'Professional',
    subheader: 'Best choice',
    price: '15',
    description: [
      '20 users included',
      '10 GB of storage',
      'Help center access',
      'Priority email support',
    ],
    buttonText: 'Get started',
    buttonVariant: 'contained',
  },
  {
    title: 'Enterprise',
    price: '30',
    description: [
      '50 users included',
      '30 GB of storage',
      'Help center access',
      'Phone & email support',
    ],
    buttonText: 'Contact us',
    buttonVariant: 'outlined',
  },
];

export default function Pricing() {
  return (
    <div>
      <Container
        id="pricing"
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            mb: 8,
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component="h2" variant="h4" color="text.primary" gutterBottom>
            Pricing
          </Typography>
          <Typography variant="body1" color="text.secondary" component="p">
            Quickly build an effective pricing table for your potential customers
            with this layout. It&apos;s built with default MUI components with little
            customization.
          </Typography>
        </Box>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          {tiers.map((tier) => (
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === 'Enterprise' ? 12 : 6}
              md={4}
            >
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  p: 1,
                  border: (theme) =>
                    tier.title === 'Professional'
                      ? theme.palette.mode === 'light'
                        ? `1px solid ${brandColor[200]}`
                        : `1px solid ${brandColor[700]}`
                      : '',
                  bgcolor: (theme) =>
                    tier.title === 'Professional'
                      ? theme.palette.mode === 'light'
                        ? alpha(brandColor[100], 0.5)
                        : alpha(brandColor[900], 0.7)
                      : '',
                  boxShadow: (theme) =>
                    tier.title === 'Professional'
                      ? theme.palette.mode === 'light'
                        ? `0 0 24px ${brandColor[100]}`
                        : `0 0 24px ${brandColor[800]}`
                      : 'none',
                }}
              >
                <CardContent>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
                  >
                    <Typography variant="h6" gutterBottom>
                      {tier.title}
                    </Typography>
                    {tier.title === 'Professional' && (
                      <Chip
                        icon={<AutoAwesomeIcon />}
                        label={tier.subheader}
                        size="small"
                        sx={{
                          alignSelf: 'center',
                          mb: 1,
                          backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                              ? brandColor[100]
                              : brandColor[800],
                          fontWeight: '600',
                          '& .MuiChip-label': {
                            color: (theme) =>
                              theme.palette.mode === 'light'
                                ? brandColor[500]
                                : brandColor[400],
                          },
                          '& .MuiChip-icon': {
                            color: (theme) =>
                              theme.palette.mode === 'light'
                                ? brandColor[500]
                                : brandColor[400],
                          },
                        }}
                      />
                    )}
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'baseline',
                    }}
                  >
                    <Typography component="h2" variant="h2" color="text.primary">
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      &nbsp; per month
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 3 }} />
                  {tier.description.map((line) => (
                    <Box
                      key={line}
                      sx={{
                        display: 'flex',
                        gap: 1.5,
                        p: 1,
                        alignItems: 'center',
                      }}
                    >
                      <CheckCircleRoundedIcon
                        sx={{
                          width: '20px',
                          color: 'success.main',
                        }}
                      />
                      <Typography variant="subtitle2" color="text.secondary">
                        {line}
                      </Typography>
                    </Box>
                  ))}
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant={tier.buttonVariant}
                    component="a"
                    href="/material-ui/getting-started/templates/checkout/"
                    target="_blank"
                  >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
