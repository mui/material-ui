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
import { alpha } from '@mui/material';

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import Chip from '@mui/material/Chip';

import { brandColor } from '../getLPTheme';

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
      'Dedicated team',
      'Best deals',
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
            mb: 6,
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component="h2" variant="h4" color="text.primary">
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
                  p: 2,
                  border: (theme) => {
                    if (tier.title === 'Professional') {
                      return theme.palette.mode === 'light'
                        ? `1px solid ${brandColor[500]}`
                        : `1px solid ${brandColor[700]}`;
                    }
                    return '';
                  },
                  background: (theme) => {
                    if (tier.title === 'Professional') {
                      return theme.palette.mode === 'light'
                        ? `linear-gradient(to bottom, ${brandColor[700]}, ${brandColor[900]})`
                        : `linear-gradient(to bottom, ${brandColor[800]}, ${brandColor[900]})`;
                    }
                    return '';
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      mb: 1,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      color: tier.title === 'Professional' ? brandColor[50] : '',
                    }}
                  >
                    <Typography
                      variant="h6"
                      color="inherit"
                      sx={{
                        color: (theme) => {
                          if (tier.title === 'Professional') {
                            return theme.palette.mode === 'light'
                              ? brandColor[200]
                              : brandColor[300];
                          }
                          return '';
                        },
                      }}
                    >
                      {tier.title}
                    </Typography>
                    {tier.title === 'Professional' && (
                      <Chip
                        icon={<AutoAwesomeIcon />}
                        label={tier.subheader}
                        size="small"
                        sx={{
                          borderColor: (theme) =>
                            theme.palette.mode === 'light'
                              ? ''
                              : `${alpha(brandColor[500], 0.3)}`,
                          background: (theme) =>
                            theme.palette.mode === 'light'
                              ? ''
                              : `linear-gradient(to bottom right, ${brandColor[50]}, ${brandColor[100]})`,
                          fontWeight: '600',
                          '& .MuiChip-label': {
                            color: (theme) =>
                              theme.palette.mode === 'light' ? '' : brandColor[500],
                          },
                          '& .MuiChip-icon': {
                            color: (theme) =>
                              theme.palette.mode === 'light' ? '' : brandColor[500],
                          },
                        }}
                      />
                    )}
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'baseline',
                      color: tier.title === 'Professional' ? brandColor[50] : '',
                    }}
                  >
                    <Typography component="h2" variant="h2" color="inherit">
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="inherit">
                      &nbsp; per month
                    </Typography>
                  </Box>
                  <Divider
                    sx={{
                      my: 3,
                      borderColor: `${alpha(brandColor[500], 0.3)}`,
                    }}
                  />
                  {tier.description.map((line) => (
                    <Box
                      key={line}
                      sx={{
                        display: 'flex',
                        gap: 1.5,
                        p: 1,
                        alignItems: 'center',
                        color: tier.title === 'Professional' ? brandColor[200] : '',
                      }}
                    >
                      <CheckCircleRoundedIcon
                        sx={{
                          width: '20px',
                          color:
                            tier.title === 'Professional'
                              ? brandColor[200]
                              : brandColor[300],
                        }}
                      />
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: tier.title === 'Professional' ? brandColor[50] : '',
                        }}
                      >
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
