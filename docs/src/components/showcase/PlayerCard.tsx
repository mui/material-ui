import * as React from 'react';
import { ThemeProvider, Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
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

export default function PlayerCard({ theme: externalTheme }: { theme?: Theme }) {
  const [paused, setPaused] = React.useState(true);
  const ui = (
    <Fade in timeout={700}>
      <Card
        variant="outlined"
        sx={(theme) => ({
          p: 1,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          ...theme.getStyle({
            bgcolor: {
              dark: 'primaryDark.800',
            },
          }),
          [`& .${iconButtonClasses.root}`]: {
            border: '1px solid',
            borderColor: 'grey.200',
            ...theme.getStyle({
              borderColor: {
                dark: 'primaryDark.500',
              },
            }),
          },
        })}
      >
        <CardMedia
          component="img"
          width="124"
          height="124"
          alt="Beside Myself album cover"
          src="/static/images/cards/basement-beside-myself.jpeg"
          sx={{
            borderRadius: 0.5,
            width: 'clamp(124px, (304px - 100%) * 999 , 100%)',
          }}
        />
        <Box sx={{ alignSelf: 'center', px: { xs: 0, sm: 2 } }}>
          <Typography
            variant="body1"
            color="text.primary"
            fontWeight={600}
            sx={{ textAlign: { xs: 'center', sm: 'start' }, mt: { xs: 1.5, sm: 0 } }}
          >
            Ultraviolet
          </Typography>
          <Typography
            component="div"
            variant="caption"
            color="text.secondary"
            fontWeight={500}
            sx={{ textAlign: { xm: 'center', sm: 'start' } }}
          >
            Basement • Beside Myself
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            sx={{ mt: 2, justifyContent: { xs: 'space-between', sm: 'flex-start' } }}
          >
            <IconButton aria-label="fast rewind" disabled size="small">
              <FastRewindRounded fontSize="small" />
            </IconButton>
            <IconButton
              aria-label={paused ? 'play' : 'pause'}
              size="small"
              sx={{ mx: 1 }}
              onClick={() => setPaused((val) => !val)}
            >
              {paused ? <PlayArrowRounded fontSize="small" /> : <PauseRounded fontSize="small" />}
            </IconButton>
            <IconButton aria-label="fast forward" disabled size="small">
              <FastForwardRounded fontSize="small" />
            </IconButton>
          </Stack>
        </Box>
      </Card>
    </Fade>
  );
  if (!externalTheme) {
    return ui;
  }
  return <ThemeProvider theme={externalTheme}>{ui}</ThemeProvider>;
}
