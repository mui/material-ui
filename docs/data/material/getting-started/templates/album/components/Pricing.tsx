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
import { yellow, green } from '@mui/material/colors';

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
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
              <Card>
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
                        sx={{ alignSelf: 'center', mb: 1 }}
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
                  <Divider sx={{ my: 2 }} />
                  {tier.description.map((line) => (
                    <Box
                      key={line}
                      sx={{ display: 'flex', gap: 1, p: 1, alignItems: 'center' }}
                    >
                      <CheckCircleTwoToneIcon sx={{ color: green[400] }} />
                      <Typography variant="subtitle2" color="text.secondary">
                        {line}
                      </Typography>
                    </Box>
                  ))}
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant={tier.buttonVariant as 'outlined' | 'contained'}
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
