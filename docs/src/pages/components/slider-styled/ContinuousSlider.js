import * as React from 'react';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/SliderStyled';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import Box from '@material-ui/core/Box';

const Root = styled('div')({
  width: 200,
});

const theme = createMuiTheme();

export default function ContinuousSlider() {
  const [value, setValue] = React.useState(30);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Root>
      <Typography id="continuous-slider" gutterBottom>
        Volume
      </Typography>
      <Grid container spacing={2}>
        <Grid item>
          <VolumeDown />
        </Grid>
        <Grid item xs>
          <Slider
            value={value}
            onChange={handleChange}
            aria-labelledby="continuous-slider"
          />
        </Grid>
        <Grid item>
          <VolumeUp />
        </Grid>
      </Grid>
      <Typography id="disabled-slider" gutterBottom>
        Disabled slider
      </Typography>
      <Slider disabled defaultValue={30} aria-labelledby="disabled-slider" />
      <Typography gutterBottom>Regular Box</Typography>
      <Box component="span" p={3}>
        <Slider
          value={value}
          onChange={handleChange}
          aria-labelledby="continuous-slider"
        />
      </Box>
      <Typography gutterBottom>Cloned Box</Typography>
      <Box component="span" color="secondary.main" clone>
        <Slider
          value={value}
          onChange={handleChange}
          aria-labelledby="continuous-slider"
        />
      </Box>
      <Typography gutterBottom>Children as fn Box</Typography>
      <Box color="secondary.main">
        {({ className }) => (
          <Slider
            value={value}
            onChange={handleChange}
            aria-labelledby="continuous-slider"
            className={className}
          />
        )}
      </Box>
    </Root>
  );
}
