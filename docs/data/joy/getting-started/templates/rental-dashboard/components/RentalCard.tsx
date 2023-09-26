import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FmdGoodRoundedIcon from '@mui/icons-material/FmdGoodRounded';
import KingBedRoundedIcon from '@mui/icons-material/KingBedRounded';
import WifiRoundedIcon from '@mui/icons-material/WifiRounded';
import Star from '@mui/icons-material/Star';
import Direction from 'docs/data/material/guides/right-to-left/Direction';

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
      variant="soft"
      orientation="horizontal"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        p: 0,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'var(--joy-palette-neutral-outlinedBorder)',
        '&:hover': {
          boxShadow: 'lg',
          borderColor: 'var(--joy-palette-neutral-outlinedDisabledBorder)',
        },
      }}
    >
      <Box
        sx={{
          height: { xs: 200, sm: 'auto' },
          width: {
            xs: '100%',
            sm: 200,
          },
          position: 'relative',
          overflow: { xs: 'hidden', sm: 'initial' },
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
          <img alt="" src={image} />
          <Stack
            alignItems="center"
            direction="row"
            sx={{ position: 'absolute', top: 0, width: '100%', p: 1 }}
          >
            {rareFind && (
              <Chip
                variant="soft"
                color="success"
                startDecorator={<WorkspacePremiumRoundedIcon />}
                size="md"
              >
                Rare find
              </Chip>
            )}
            <IconButton
              variant="plain"
              size="sm"
              color={isLiked ? 'danger' : 'neutral'}
              onClick={() => setIsLiked((prev) => !prev)}
              sx={{
                display: { xs: 'flex', sm: 'none' },
                ml: 'auto',
                borderRadius: '50%',
                zIndex: '20',
              }}
            >
              <FavoriteRoundedIcon />
            </IconButton>
          </Stack>
        </AspectRatio>
      </Box>
      <Stack
        sx={{
          p: 2,
        }}
        spacing={1.5}
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

        <Stack spacing={2} direction="row">
          <Typography level="body-xs" startDecorator={<FmdGoodRoundedIcon />}>
            Collingwood VIC
          </Typography>
          <Typography level="body-xs" startDecorator={<KingBedRoundedIcon />}>
            1 bed
          </Typography>
          <Typography level="body-xs" startDecorator={<WifiRoundedIcon />}>
            Wi-Fi
          </Typography>
        </Stack>
        <Stack direction="row">
          <Typography
            level="title-sm"
            startDecorator={
              <React.Fragment>
                <Star sx={{ color: 'warning.400' }} />
                <Star sx={{ color: 'warning.400' }} />
                <Star sx={{ color: 'warning.400' }} />
                <Star sx={{ color: 'warning.400' }} />
                <Star sx={{ color: 'warning.200' }} />
              </React.Fragment>
            }
            sx={{ display: 'flex', gap: 1 }}
          >
            4.0
          </Typography>
          <Typography level="title-lg" sx={{ flexGrow: 1, textAlign: 'right' }}>
            <strong>$540</strong> <Typography level="body-md">total</Typography>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
