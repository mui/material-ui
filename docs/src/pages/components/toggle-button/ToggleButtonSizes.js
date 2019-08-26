import React from 'react';
import CheckIcon from '@material-ui/icons/Check';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

export default function ToggleButtonSizes() {
  const [selected, setSelected] = React.useState(false);
  const [alignment, setAlignment] = React.useState('left');

  const toggleSelected = () => {
    setSelected(!selected);
  };

  const handleChangeAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const groupChildren = [
    <ToggleButton key={1} value="left">
      <FormatAlignLeftIcon />
    </ToggleButton>,
    <ToggleButton key={2} value="center">
      <FormatAlignCenterIcon />
    </ToggleButton>,
    <ToggleButton key={3} value="right">
      <FormatAlignRightIcon />
    </ToggleButton>,
    <ToggleButton key={4} value="justify" disabled>
      <FormatAlignJustifyIcon />
    </ToggleButton>,
  ];

  return (
    <Grid container spacing={2} direction="column" alignItems="center">
      <Grid item>
        <Typography gutterBottom>Size a standalone toggle button:</Typography>
      </Grid>
      <Grid item>
        <ToggleButton size="small" selected={selected} onChange={toggleSelected}>
          <CheckIcon />
          <Box ml={1}>Toggle</Box>
        </ToggleButton>
      </Grid>
      <Grid item>
        <ToggleButton size="medium" selected={selected} onChange={toggleSelected}>
          <CheckIcon />
          <Box ml={1}>Toggle</Box>
        </ToggleButton>
      </Grid>
      <Grid item>
        <ToggleButton size="large" selected={selected} onChange={toggleSelected}>
          <CheckIcon />
          <Box ml={1}>Toggle</Box>
        </ToggleButton>
      </Grid>
      <Grid item>
        <Typography gutterBottom>Size an entire group of toggle buttons:</Typography>
      </Grid>
      <Grid item>
        <ToggleButtonGroup
          size="small"
          value={alignment}
          exclusive
          onChange={handleChangeAlignment}
        >
          {groupChildren}
        </ToggleButtonGroup>
      </Grid>
      <Grid item>
        <ToggleButtonGroup
          size="medium"
          value={alignment}
          exclusive
          onChange={handleChangeAlignment}
        >
          {groupChildren}
        </ToggleButtonGroup>
      </Grid>
      <Grid item>
        <ToggleButtonGroup
          size="large"
          value={alignment}
          exclusive
          onChange={handleChangeAlignment}
        >
          {groupChildren}
        </ToggleButtonGroup>
      </Grid>
    </Grid>
  );
}
