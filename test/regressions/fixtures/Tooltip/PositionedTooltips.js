import * as React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

// Used /docs/src/pages/components/tooltips/PositionedTooltips.js as inspiration.
function PositionedTooltips() {
  return (
    <Box sx={{ width: 400, padding: '50px 70px' }}>
      <Grid container justifyContent="center">
        <Grid item>
          <Tooltip open arrow title="Add" placement="top-start">
            <Button>top-start</Button>
          </Tooltip>
          <Tooltip open arrow title="Add" placement="top">
            <Button>top</Button>
          </Tooltip>
          <Tooltip open arrow title="Add" placement="top-end">
            <Button>top-end</Button>
          </Tooltip>
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Grid item xs={6}>
          <Tooltip open arrow title="Add" placement="left-start">
            <Button>left-start</Button>
          </Tooltip>
          <br />
          <Tooltip open arrow title="Add" placement="left">
            <Button>left</Button>
          </Tooltip>
          <br />
          <Tooltip open arrow title="Add" placement="left-end">
            <Button>left-end</Button>
          </Tooltip>
        </Grid>
        <Grid item container xs={6} alignItems="flex-end" direction="column">
          <Grid item>
            <Tooltip open arrow title="Add" placement="right-start">
              <Button>right-start</Button>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip open arrow title="Add" placement="right">
              <Button>right</Button>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip open arrow title="Add" placement="right-end">
              <Button>right-end</Button>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Grid item>
          <Tooltip open arrow title="Add" placement="bottom-start">
            <Button>bottom-start</Button>
          </Tooltip>
          <Tooltip open arrow title="Add" placement="bottom">
            <Button>bottom</Button>
          </Tooltip>
          <Tooltip open arrow title="Add" placement="bottom-end">
            <Button>bottom-end</Button>
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PositionedTooltips;
