import * as React from 'react';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TwoSidedLayout from '../components/TwoSidedLayout';

export default function HeroLeft07() {
  return (
    <TwoSidedLayout>
      <Typography
        level="h1"
        fontWeight="xl"
        fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
      >
        A large headlinerer about our product features & services
      </Typography>
      <Typography fontSize="lg" textColor="text.secondary" lineHeight="lg">
        A descriptive secondary text placeholder. Use it to explain your business
        offer better.
      </Typography>
      <Card
        variant="outlined"
        color="neutral"
        orientation="horizontal"
        sx={{ gap: 2, my: 1, textAlign: 'left' }}
      >
        <AutoAwesomeIcon color="success" fontSize="xl3" />
        <div>
          <Typography fontSize="xl" fontWeight="lg" sx={{ mb: 1 }}>
            The new version is out.
          </Typography>
          <Typography level="body-sm">
            This is where a notification message will appear. <br />
            Enter text into this container.
          </Typography>
        </div>
      </Card>
      <Button size="lg">Download the App</Button>
      <Typography
        level="body-xs"
        sx={{
          position: 'absolute',
          top: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        HeroLeft07
      </Typography>
    </TwoSidedLayout>
  );
}
