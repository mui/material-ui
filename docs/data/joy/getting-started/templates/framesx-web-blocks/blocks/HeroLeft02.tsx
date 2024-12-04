import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Star from '@mui/icons-material/Star';
import TwoSidedLayout from '../components/TwoSidedLayout';

export default function HeroLeft02() {
  return (
    <TwoSidedLayout>
      <Typography color="primary" sx={{ fontSize: 'lg', fontWeight: 'lg' }}>
        The power to do more
      </Typography>
      <Typography
        level="h1"
        sx={{
          fontWeight: 'xl',
          fontSize: 'clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)',
        }}
      >
        A large headlinerer about our product features & services
      </Typography>
      <Typography
        textColor="text.secondary"
        sx={{ fontSize: 'lg', lineHeight: 'lg' }}
      >
        A descriptive secondary text placeholder. Use it to explain your business
        offer better.
      </Typography>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          my: 2,
          flexWrap: 'wrap',
          '& > *': { flex: 'auto' },
        }}
      >
        <Input size="lg" placeholder="Sign in with email" />
        <Button size="lg" endDecorator={<ArrowForward fontSize="xl" />}>
          Get Started
        </Button>
      </Box>
      <Box
        sx={(theme) => ({
          display: 'flex',
          textAlign: 'center',
          alignSelf: 'stretch',
          columnGap: 4.5,
          '& > *': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            flex: 1,
          },
          [theme.breakpoints.up(834)]: {
            textAlign: 'left',
            '& > *': {
              flexDirection: 'row',
              gap: 1.5,
              justifyContent: 'initial',
              flexWrap: 'nowrap',
              flex: 'none',
            },
          },
        })}
      >
        <div>
          <Typography
            endDecorator={<Star fontSize="xl4" sx={{ color: 'warning.300' }} />}
            sx={{ fontSize: 'xl4', fontWeight: 'lg' }}
          >
            4.9
          </Typography>
          <Typography textColor="text.secondary">
            Over <b>5k</b> positive <br /> customer reviews.
          </Typography>
        </div>
        <div>
          <Typography sx={{ fontSize: 'xl4', fontWeight: 'lg' }}>2M</Typography>
          <Typography textColor="text.secondary">
            Global <br /> Transactions.
          </Typography>
        </div>
      </Box>
      <Typography
        level="body-xs"
        sx={{
          position: 'absolute',
          top: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        HeroLeft02
      </Typography>
    </TwoSidedLayout>
  );
}
