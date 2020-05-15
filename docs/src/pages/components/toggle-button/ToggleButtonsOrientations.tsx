import React from 'react';
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ViewQuiltIcon from '@material-ui/icons/ViewQuilt';
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

export default function ToggleButtonSizes() {
  const [view, setView] = React.useState('list');

  const handleChange = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
    setView(nextView);
  };

  return (
    <Grid container direction="row" justify="space-evenly" alignItems="center">
      <Grid item>
        <ToggleButtonGroup orientation="vertical" value={view} exclusive onChange={handleChange}>
          <ToggleButton value="list" aria-label="list">
            <ViewListIcon />
          </ToggleButton>
          <ToggleButton value="module" aria-label="module">
            <ViewModuleIcon />
          </ToggleButton>
          <ToggleButton value="quilt" aria-label="quilt">
            <ViewQuiltIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
      <Grid item>
        <ToggleButtonGroup orientation="horizontal" value={view} exclusive onChange={handleChange}>
          <ToggleButton value="list" aria-label="list">
            <ViewListIcon />
          </ToggleButton>
          <ToggleButton value="module" aria-label="module">
            <ViewModuleIcon />
          </ToggleButton>
          <ToggleButton value="quilt" aria-label="quilt">
            <ViewQuiltIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
    </Grid>
  );
}
