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
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FmdGoodRoundedIcon from '@mui/icons-material/FmdGoodRounded';
import KingBedRoundedIcon from '@mui/icons-material/KingBedRounded';
import WifiRoundedIcon from '@mui/icons-material/WifiRounded';

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
      variant="plain"
      orientation="horizontal"
      sx={{
        p: 0,
        overflow: 'hidden',
      }}
    >
      <Stack
        direction={{
          xs: 'column',
          sm: 'row',
        }}
        width="100%"
        spacing={2}
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
            ratio="1"
            sx={(theme) => ({
              borderRadius: 'ms',
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              maxHeight: 4,
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
                color="success"
                startDecorator={<WorkspacePremiumRoundedIcon />}
                size="sm"
                sx={{ position: 'absolute', top: 110, left: 8 }}
              >
                Rare find
              </Chip>
            )}
            <IconButton
              variant={isLiked ? 'solid' : 'soft'}
              size="sm"
              onClick={() => setIsLiked((prev) => !prev)}
              sx={{
                position: 'absolute',
                top: 1,
                right: 1,
                display: { xs: 'flex', sm: 'none' },
              }}
            >
              <FavoriteRoundedIcon />
            </IconButton>
          </AspectRatio>
        </Box>
        <Stack
          sx={{
            p: 2,
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
              <Typography level="body-sm">{category}</Typography>
              <Typography level="title-md">
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
              variant="plain"
              size="sm"
              color={isLiked ? 'danger' : 'neutral'}
              onClick={() => setIsLiked((prev) => !prev)}
              sx={{
                display: { xs: 'none', sm: 'flex' },
                borderRadius: '50%',
              }}
            >
              <FavoriteRoundedIcon />
            </IconButton>
          </Stack>
          <Stack spacing={1} direction="row">
            <Rating />
          </Stack>

          <Stack spacing={3} direction="row">
            <Typography level="body-xs" startDecorator={<FmdGoodRoundedIcon />}>
              Collingwood VIC
            </Typography>
            <Typography
              level="body-xs"
              startDecorator={<KingBedRoundedIcon />}
              display={{
                xs: 'none',
                md: 'flex',
              }}
            >
              1 bed
            </Typography>
            <Typography
              level="body-xs"
              startDecorator={<WifiRoundedIcon />}
              display={{
                xs: 'none',
                md: 'flex',
              }}
            >
              Wi-Fi
            </Typography>
            <Typography level="title-lg" sx={{ flexGrow: 1, textAlign: 'right' }}>
              <strong>$540</strong> <Typography level="body-md">total</Typography>
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
