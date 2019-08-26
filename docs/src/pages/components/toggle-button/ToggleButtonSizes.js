import React from 'react';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

export default function ToggleButtonSizes() {
  const [alignment, setAlignment] = React.useState('left');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const children = [
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
        <ToggleButtonGroup size="small" value={alignment} exclusive onChange={handleChange}>
          {children}
        </ToggleButtonGroup>
      </Grid>
      <Grid item>
        <ToggleButtonGroup size="medium" value={alignment} exclusive onChange={handleChange}>
          {children}
        </ToggleButtonGroup>
      </Grid>
      <Grid item>
        <ToggleButtonGroup size="large" value={alignment} exclusive onChange={handleChange}>
          {children}
        </ToggleButtonGroup>
      </Grid>
    </Grid>
  );
}
