import * as React from 'react';
import Box from '@mui/joy/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/joy/Button';
import Tooltip from '@mui/joy/Tooltip';

export default function PositionedTooltips() {
  return (
    <Box sx={{ width: 500 }}>
      <Grid container sx={{ justifyContent: 'center' }}>
        <Grid item>
          <Tooltip title="Add" placement="top-start">
            <Button variant="plain">top-start</Button>
          </Tooltip>
          <Tooltip title="Add" placement="top">
            <Button variant="plain">top</Button>
          </Tooltip>
          <Tooltip title="Add" placement="top-end">
            <Button variant="plain">top-end</Button>
          </Tooltip>
        </Grid>
      </Grid>
      <Grid container sx={{ justifyContent: 'center' }}>
        <Grid item xs={6}>
          <Tooltip title="Add" placement="left-start">
            <Button variant="plain">left-start</Button>
          </Tooltip>
          <br />
          <Tooltip title="Add" placement="left">
            <Button variant="plain">left</Button>
          </Tooltip>
          <br />
          <Tooltip title="Add" placement="left-end">
            <Button variant="plain">left-end</Button>
          </Tooltip>
        </Grid>
        <Grid
          item
          container
          xs={6}
          direction="column"
          sx={{ alignItems: 'flex-end' }}
        >
          <Grid item>
            <Tooltip title="Add" placement="right-start">
              <Button variant="plain">right-start</Button>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title="Add" placement="right">
              <Button variant="plain">right</Button>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title="Add" placement="right-end">
              <Button variant="plain">right-end</Button>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
      <Grid container sx={{ justifyContent: 'center' }}>
        <Grid item>
          <Tooltip title="Add" placement="bottom-start">
            <Button variant="plain">bottom-start</Button>
          </Tooltip>
          <Tooltip title="Add" placement="bottom">
            <Button variant="plain">bottom</Button>
          </Tooltip>
          <Tooltip title="Add" placement="bottom-end">
            <Button variant="plain">bottom-end</Button>
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  );
}
