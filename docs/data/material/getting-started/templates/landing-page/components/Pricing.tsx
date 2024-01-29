import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

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
          <Typography variant="body1" color="text.secondary">
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
                  border: tier.title === 'Professional' ? '1px solid' : '',
                  borderColor: tier.title === 'Professional' ? 'primary.main' : '',
                  background:
                    tier.title === 'Professional'
                      ? 'linear-gradient(#033363, #021F3B)'
                      : '',
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      mb: 1,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      color:
                        tier.title === 'Professional' ? 'primary.contrastText' : '',
                    }}
                  >
                    <Typography variant="h6">{tier.title}</Typography>
                    {tier.title === 'Professional' && (
                      <Chip
                        icon={<AutoAwesomeIcon />}
                        label={tier.subheader}
                        size="small"
                        sx={{
                          background: (theme) =>
                            theme.palette.mode === 'light' ? '' : 'none',
                          backgroundColor: 'primary.contrastText',
                          '& .MuiChip-label': {
                            color: 'primary.dark',
                          },
                          '& .MuiChip-icon': {
                            color: 'primary.dark',
                          },
                        }}
                      />
                    )}
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'baseline',
                      color:
                        tier.title === 'Professional'
                          ? 'primary.contrastText'
                          : undefined,
                    }}
                  >
                    <Typography component="h2" variant="h2">
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6">&nbsp; per month</Typography>
                  </Box>
                  <Divider
                    sx={{
                      my: 3,
                      opacity: 0.2,
                      borderColor: 'grey.500',
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
                      }}
                    >
                      <CheckCircleRoundedIcon
                        sx={{
                          width: '20px',
                          color:
                            tier.title === 'Professional'
                              ? 'primary.light'
                              : 'primary.main',
                        }}
                      />
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color:
                            tier.title === 'Professional'
                              ? 'primary.contrastText'
                              : '',
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
                    variant={tier.buttonVariant as 'outlined' | 'contained'}
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
