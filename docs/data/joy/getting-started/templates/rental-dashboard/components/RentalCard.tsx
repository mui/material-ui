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
      sx={{
        transition: '250ms all',
        padding: {
          xs: 0,
          sm: 2,
        },
        '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
      }}
    >
      <Stack
        direction={{
          xs: 'column',
          sm: 'row',
        }}
        width="100%"
        spacing={2.5}
      >
        <Box
          sx={{
            width: {
              xs: '100%',
              sm: 200,
            },
            // position: 'relative',
          }}
        >
          <AspectRatio
            ratio={200 / 144}
            sx={(theme) => ({
              borderRadius: 'md',
              [theme.breakpoints.down('sm')]: {
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
            <Chip
              variant="soft"
              startDecorator={<i data-feather="award" />}
              size="sm"
              sx={{ position: 'absolute', bottom: 8, left: 8 }}
            >
              Rare find
            </Chip>
          </AspectRatio>

          <IconButton
            variant="soft"
            sx={{
              position: 'absolute',
              bottom: 8,
              right: 8,
              display: { xs: 'block', sm: 'none' },
            }}
          >
            <i data-feather="star" />
          </IconButton>
        </Box>
        <Stack
          // sx={{
          //   flex: 1,
          //   padding: {
          //     xs: 2,
          //     sm: 0,
          //   },
          // }}
          spacing={2}
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
            <IconButton
              variant="soft"
              sx={{
                display: { xs: 'none', sm: 'block' },
              }}
            >
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
        </Stack>
      </Stack>
    </Card>
  );
}
