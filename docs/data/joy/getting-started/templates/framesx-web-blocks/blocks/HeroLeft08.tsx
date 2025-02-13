import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Star from '@mui/icons-material/Star';
import TwoSidedLayout from '../components/TwoSidedLayout';

export default function HeroLeft08() {
  return (
    <TwoSidedLayout>
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
          flexWrap: 'wrap',
          gap: 2,
          my: 2,
          '& > *': { flex: 'auto' },
        }}
      >
        <Button size="lg" variant="outlined" color="neutral">
          Learn More
        </Button>
        <Button size="lg" endDecorator={<ArrowForward fontSize="xl" />}>
          Get Started
        </Button>
      </Box>
      <Box
        sx={(theme) => ({
          display: 'flex',
          columnGap: 4.5,
          rowGap: 1.5,
          textAlign: 'center',
          alignSelf: 'stretch',
          '& > *': {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            alignItems: 'center',
          },
          [theme.breakpoints.up(834)]: {
            textAlign: 'left',
            '& > *': {
              alignItems: 'initial',
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
            Rated by <b>5k</b> people on trustpilot.com
          </Typography>
        </div>
        <div>
          <Typography sx={{ fontSize: 'xl4', fontWeight: 'lg' }}>9.5k+</Typography>
          <Typography textColor="text.secondary">
            Active users from the top world companies.
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
        HeroLeft08
      </Typography>
    </TwoSidedLayout>
  );
}
