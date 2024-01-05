import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Fade from '@mui/material/Fade';
import IconButton, { iconButtonClasses } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import PauseRounded from '@mui/icons-material/PauseRounded';
import ShuffleRoundedIcon from '@mui/icons-material/ShuffleRounded';
import LoopRoundedIcon from '@mui/icons-material/LoopRounded';

export default function PlayerCard({
  disableTheming,
  extraStyles,
}: {
  disableTheming?: boolean;
  extraStyles?: boolean;
}) {
  const [paused, setPaused] = React.useState(true);
  return (
    <Fade in timeout={700}>
      <Card
        variant="outlined"
        sx={[
          {
            width: { xs: '100%', sm: 'auto' },
            p: 2,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            borderColor: extraStyles ? 'primary.200' : 'grey.200',
            gap: 2,
            boxShadow: (theme) =>
              extraStyles
                ? '0 2px 4px rgba(0, 127, 255, 0.2)'
                : `0px 4px 8px ${alpha(theme.palette.grey[200], 0.6)}`,
            ...(!disableTheming && {
              [`& .${iconButtonClasses.root}`]: {
                border: '1px solid',
                bgcolor: 'primary.50',
                color: 'primary.500',
                borderColor: 'primary.200',
                '&:hover': {
                  bgcolor: 'primary.100',
                },
              },
              [`& .${iconButtonClasses.disabled}`]: {
                height: 'fit-content',
                bgcolor: 'transparent',
                border: '1px solid',
                borderColor: 'grey.100',
                color: 'grey.300',
              },
            }),
          },
          !disableTheming &&
            ((theme) =>
              theme.applyDarkStyles({
                bgcolor: 'primaryDark.900',
                borderColor: extraStyles ? 'primary.800' : 'primaryDark.700',
                boxShadow: extraStyles
                  ? '0 2px 4px rgba(0, 127, 255, 0.2)'
                  : '0px 4px 8px rgba(0, 0, 0, 0.4)',
                [`& .${iconButtonClasses.root}`]: {
                  bgcolor: 'primary.900',
                  color: 'primary.200',
                  borderColor: 'primary.600',
                  '&:hover': {
                    bgcolor: 'primary.800',
                  },
                },
                [`& .${iconButtonClasses.disabled}`]: {
                  bgcolor: 'transparent',
                  border: '1px solid',
                  borderColor: 'primaryDark.600',
                  color: 'primaryDark.400',
                },
              })),
        ]}
      >
        <CardMedia
          component="img"
          width="100"
          height="100"
          alt="Contemplative Reptile album cover"
          src="/static/images/cards/contemplative-reptile.jpg"
          sx={{
            width: { xs: '100%', sm: 100 },
            borderRadius: 0.6,
          }}
        />
        <Stack direction="column" spacing={2} alignItems="center">
          <Stack direction="column" spacing={0.2} alignItems="center">
            <Typography color="text.primary" fontWeight="medium" fontSize={15}>
              Contemplative Reptile
            </Typography>
            <Typography
              component="div"
              variant="caption"
              color="text.secondary"
              fontWeight="regular"
            >
              Sounds of Nature
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <IconButton aria-label="shuffle" disabled size="small" sx={{ flexGrow: 0 }}>
              <ShuffleRoundedIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label="fast rewind" disabled size="small">
              <FastRewindRounded fontSize="small" />
            </IconButton>
            <IconButton
              aria-label={paused ? 'play' : 'pause'}
              sx={{ mx: 1 }}
              onClick={() => setPaused((val) => !val)}
            >
              {paused ? <PlayArrowRounded /> : <PauseRounded />}
            </IconButton>
            <IconButton aria-label="fast forward" disabled size="small">
              <FastForwardRounded fontSize="small" />
            </IconButton>
            <IconButton aria-label="loop" disabled size="small">
              <LoopRoundedIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </Card>
    </Fade>
  );
}
