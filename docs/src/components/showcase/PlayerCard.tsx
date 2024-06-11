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

export default function PlayerCard({ disableTheming }: { disableTheming?: boolean }) {
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
            gap: 2,
            ...(!disableTheming && {
              borderColor: 'grey.200',
              boxShadow: (theme) => `0px 4px 8px ${alpha(theme.palette.grey[200], 0.6)}`,
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
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
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
            ...(!disableTheming && {
              borderRadius: '6px',
            }),
          }}
        />
        <Stack direction="column" spacing={1} useFlexGap sx={{ alignItems: 'center' }}>
          <div>
            <Typography sx={{ color: 'text.primary', fontWeight: 'semiBold' }}>
              Contemplative Reptile
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontWeight: 'medium',
                textAlign: 'center',
                width: '100%',
              }}
            >
              Sounds of Nature
            </Typography>
          </div>
          <Stack direction="row" spacing={1} useFlexGap sx={{ alignItems: 'center' }}>
            <IconButton aria-label="Shuffle" disabled size="small">
              <ShuffleRoundedIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label="Fast rewind" disabled size="small">
              <FastRewindRounded fontSize="small" />
            </IconButton>
            <IconButton
              aria-label={paused ? 'Play music' : 'Pause music'}
              onClick={() => setPaused((val) => !val)}
              sx={{ mx: 1 }}
            >
              {paused ? <PlayArrowRounded /> : <PauseRounded />}
            </IconButton>
            <IconButton aria-label="Fast forward" disabled size="small">
              <FastForwardRounded fontSize="small" />
            </IconButton>
            <IconButton aria-label="Loop music" disabled size="small">
              <LoopRoundedIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </Card>
    </Fade>
  );
}
