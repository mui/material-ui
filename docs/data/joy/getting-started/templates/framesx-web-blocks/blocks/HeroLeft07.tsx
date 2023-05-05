/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Box from '@mui/joy/Box';
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
        A descriptive secondary text placeholder.
        <br /> Use it to explain your business offer better.
      </Typography>
      <Card
        variant="outlined"
        color="neutral"
        orientation="horizontal"
        sx={{ gap: 2, my: 1 }}
      >
        <AutoAwesomeIcon color="info" fontSize="xl3" />
        <Box>
          <Typography fontSize="xl" fontWeight="lg" sx={{ mb: 1 }}>
            The new version is out.
          </Typography>
          <Typography level="body2">
            This is where a notification message will appear. <br />
            Enter text into this container.
          </Typography>
        </Box>
      </Card>
      <Button size="lg">Download the App</Button>
    </TwoSidedLayout>
  );
}
