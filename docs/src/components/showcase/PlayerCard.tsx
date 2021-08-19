import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FastForwardRounded from '@material-ui/icons/FastForwardRounded';
import FastRewindRounded from '@material-ui/icons/FastRewindRounded';
import PlayArrowRounded from '@material-ui/icons/PlayArrowRounded';
import PauseRounded from '@material-ui/icons/PauseRounded';

const Image = styled('img')(({ theme }) => ({
  border: '1px solid',
  borderColor: theme.palette.mode === 'dark' ? theme.palette.primaryDark[500] : '#fff',
  borderRadius: 5,
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  border: '1px solid',
  borderColor:
    theme.palette.mode === 'dark' ? theme.palette.primaryDark[500] : theme.palette.grey[200],
}));

export default function PlayerCard() {
  const [paused, setPaused] = React.useState(true);
  return (
    <Card variant="outlined" sx={{ display: 'flex', p: 1 }}>
      <Image
        alt="Beside Myself album cover"
        src="/static/images/cards/basement-beside-myself.jpg"
        width="124"
        height="124"
      />
      <Box sx={{ alignSelf: 'center', mx: 2 }}>
        <Typography variant="body1" fontWeight={500}>
          Ultraviolet
        </Typography>
        <Typography component="div" variant="body2" color="text.secondary">
          Basement • Beside Myself
        </Typography>
        <Box sx={{ mt: 2 }}>
          <StyledIconButton aria-label="fast rewind" size="small" disabled>
            <FastRewindRounded fontSize="small" />
          </StyledIconButton>
          <StyledIconButton
            aria-label={paused ? 'play' : 'pause'}
            onClick={() => setPaused((val) => !val)}
            sx={{ mx: 2 }}
          >
            {paused ? <PlayArrowRounded /> : <PauseRounded />}
          </StyledIconButton>
          <StyledIconButton aria-label="fast forward" size="small" disabled>
            <FastForwardRounded fontSize="small" />
          </StyledIconButton>
        </Box>
      </Box>
    </Card>
  );
}
