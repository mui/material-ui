import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import {
  AspectRatio,
  Card,
  CardContent,
  CardOverflow,
  Chip,
  Grid,
  IconButton,
  Stack,
} from '@mui/joy';

export default function RentalCard() {
  return (
    <Card variant="outlined" orientation="horizontal">
      <CardOverflow>
        <AspectRatio
          ratio="4/3"
          sx={{
            width: 200,
            // bgcolor: 'background.level2',
            borderRadius: 'md',
          }}
        >
          <img
            alt=""
            src="https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&w=400"
          />
        </AspectRatio>
        <Chip
          variant="soft"
          startDecorator={<i data-feather="award" />}
          size="sm"
          sx={{ position: 'absolute', bottom: 8, left: 8 }}
        >
          Rare find
        </Chip>
      </CardOverflow>
      <CardContent sx={{ px: 2 }}>
        <Stack
          spacing={1}
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <div>
            <Typography color="primary" fontWeight="xl">
              Entire apartment rental in Collingwood
            </Typography>
            <Typography fontWeight="lg" fontSize="xl">
              A Stylish Apt, 5 min walk to Queen Victoria Market
            </Typography>
          </div>
          {/* todo: use toggle when its ready */}
          <IconButton variant="soft">
            <i data-feather="star" />
          </IconButton>
        </Stack>
        <Stack spacing={1} direction="row">
          <Typography>4.9</Typography>
          <Typography>202 reviews</Typography>
        </Stack>

        <Stack spacing={1} direction="row" justifyContent="space-between">
          <Typography startDecorator={<i data-feather="map-pin" />}>
            Collingwood VIC
          </Typography>
          <Typography startDecorator={<i data-feather="box" />}>1 bed</Typography>
          <Typography startDecorator={<i data-feather="wifi" />}>Wi-Fi</Typography>
          <Typography>
            <strong>$540</strong> <Typography>total</Typography>
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
