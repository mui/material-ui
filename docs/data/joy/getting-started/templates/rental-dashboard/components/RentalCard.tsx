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

type RentalCardProps = {
  title: React.ReactNode;
  category: React.ReactNode;
  rareFind?: boolean;
  liked?: boolean;
};

export default function RentalCard({
  category,
  title,
  rareFind = false,
  liked = false,
}: RentalCardProps) {
  const [isLiked, setIsLiked] = React.useState(liked);
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
        // flexGrow={1}
      >
        <Box
          sx={{
            width: {
              xs: '100%',
              sm: 200,
            },
            marginBottom: {
              xs: -2.5,
              sm: 0,
            },
            // position: 'relative',
          }}
        >
          <AspectRatio
            ratio={16 / 9}
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
            {rareFind && (
              <Chip
                variant="soft"
                startDecorator={<i data-feather="award" />}
                size="sm"
                sx={{ position: 'absolute', bottom: 8, left: 8 }}
              >
                Rare find
              </Chip>
            )}
            <IconButton
              variant={isLiked ? 'solid' : 'soft'}
              onClick={() => setIsLiked((prev) => !prev)}
              sx={{
                position: 'absolute',
                bottom: 8,
                right: 8,
                display: { xs: 'block', sm: 'none' },
              }}
            >
              <i data-feather="star" />
            </IconButton>
          </AspectRatio>
        </Box>
        <Stack
          sx={{
            padding: {
              // padding top on mobile needs to be zero or remove margin
              xs: 2,
              sm: 0,
            },
          }}
          spacing={1}
          flex={1}
        >
          <Stack
            spacing={1}
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <div>
              <Typography color="primary" fontSize="sm" fontWeight="lg">
                {category}
              </Typography>
              <Typography fontWeight="md" fontSize="lg">
                <Link
                  overlay
                  underline="none"
                  href="#interactive-card"
                  sx={{ color: 'text.primary' }}
                >
                  {title}
                </Link>
              </Typography>
            </div>
            {/* todo: use toggle when its ready */}
            <IconButton
              variant={isLiked ? 'solid' : 'soft'}
              onClick={() => setIsLiked((prev) => !prev)}
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
            <Typography
              startDecorator={<i data-feather="box" />}
              display={{
                xs: 'none',
                md: 'flex',
              }}
            >
              1 bed
            </Typography>
            <Typography
              startDecorator={<i data-feather="wifi" />}
              display={{
                xs: 'none',
                md: 'flex',
              }}
            >
              Wi-Fi
            </Typography>
            <Typography>
              <strong>$540</strong> <Typography>total</Typography>
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
