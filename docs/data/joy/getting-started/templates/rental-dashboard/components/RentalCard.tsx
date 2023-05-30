import * as React from 'react';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import {
  AspectRatio,
  Box,
  Card,
  CardContent,
  CardOverflow,
  Chip,
  Grid,
  IconButton,
  Stack,
} from '@mui/joy';

import Rating from './Rating';

export default function RentalCard() {
  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={(theme) => ({
        transition: '250ms all',
        '--Card-padding': '0',

        [theme.breakpoints.up('md')]: {
          '--Card-padding': '16px',
        },
        '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
      })}
    >
      <Stack
        direction={{
          xs: 'column',
          sm: 'row',
          md: 'column',
          lg: 'row',
        }}
        width="100%"
        spacing={2.5}
      >
        <Box
          width={{
            xs: '100%',
            sm: 200,
          }}
        >
          <AspectRatio
            ratio={200 / 144}
            sx={(theme) => ({
              borderRadius: 'md',
              [theme.breakpoints.down('md')]: {
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              },
            })}
          >
            <img
              alt=""
              src="https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&w=400"
              style={{ display: 'block' }}
            />
          </AspectRatio>
        </Box>
        <Box
          sx={(theme) => ({
            flex: 1,
            padding: {
              xs: 2,
              sm: 0,
            },
          })}
        >
          <Stack
            spacing={1}
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <div>
              <Typography color="primary" fontSize="sm" fontWeight="lg">
                Entire apartment rental in Collingwood
              </Typography>
              <Typography fontWeight="md" fontSize="lg">
                <Link
                  overlay
                  underline="none"
                  href="#interactive-card"
                  sx={{ color: 'text.primary' }}
                >
                  A Stylish Apt, 5 min walk to Queen Victoria Market
                </Link>
              </Typography>
            </div>
            {/* todo: use toggle when its ready */}
            <IconButton variant="soft">
              <i data-feather="star" />
            </IconButton>
          </Stack>
          <Stack spacing={1} direction="row">
            <Rating value={5} />

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
        </Box>
      </Stack>
    </Card>
  );
}
