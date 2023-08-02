import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Rating from './Rating';

type RentalCardProps = {
  category: React.ReactNode;
  image: string;
  liked?: boolean;
  rareFind?: boolean;
  title: React.ReactNode;
};

export default function RentalCard({
  category,
  title,
  rareFind = false,
  liked = false,
  image,
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
        boxShadow: 'none',
        borderRadius: 'sm',
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
            marginBottom: {
              xs: -2.5,
              sm: 0,
            },
          }}
        >
          <AspectRatio
            ratio={16 / 9}
            sx={(theme) => ({
              borderRadius: 'xs',
              [theme.breakpoints.down('sm')]: {
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              },
            })}
          >
            <img alt="" src={image} style={{ display: 'block' }} />
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
                display: { xs: 'flex', sm: 'none' },
              }}
            >
              <i data-feather="star" />
            </IconButton>
          </AspectRatio>
        </Box>
        <Stack
          sx={{
            padding: {
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
            <IconButton
              variant={isLiked ? 'solid' : 'soft'}
              onClick={() => setIsLiked((prev) => !prev)}
              sx={{
                display: { xs: 'none', sm: 'flex' },
              }}
            >
              <i data-feather="star" />
            </IconButton>
          </Stack>
          <Stack spacing={1} direction="row">
            <Rating />

            <Typography>202 reviews</Typography>
          </Stack>

          <Stack spacing={3} direction="row">
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
            <Typography sx={{ flexGrow: 1, textAlign: 'right' }}>
              <strong>$540</strong> <Typography>total</Typography>
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
