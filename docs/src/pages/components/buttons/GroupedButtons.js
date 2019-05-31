import React from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const styles = {
  gridItem: {
    flexBasis: 'auto'
  },
};

function GroupedButtons(props) {
const { classes } = props;

  return (
      <Grid container spacing={4} justify="center">
        <Grid container item direction="column" alignItems="center" spacing={2} xs={12} md={6}>
          <Grid item xs={12} className={classes.gridItem}>
            <ButtonGroup size="small" aria-label="Small outlined button group">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={12} className={classes.gridItem}>
            <ButtonGroup color="primary" aria-label="Outlined primary button group">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={12} className={classes.gridItem}>
            <ButtonGroup
              color="secondary"
              size="large"
              aria-label="Large outlined secondary button group"
            >
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
        <Grid container item direction="column" alignItems="center" spacing={2} xs={12} md={6}>
          <Grid item xs={12} className={classes.gridItem}>
            <ButtonGroup variant="contained" size="small" aria-label="Small contained button group">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={12} className={classes.gridItem}>
            <ButtonGroup
              variant="contained"
              color="primary"
              aria-label="Full-width contained primary button group"
            >
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={12} className={classes.gridItem}>
            <ButtonGroup
              variant="contained"
              color="secondary"
              size="large"
              aria-label="Large contained secondary button group"
            >
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
        <Grid container item xs={6} className={classes.gridItem}>
          <ButtonGroup fullWidth aria-label="Full width outlined button group">
            <Button>Full</Button>
            <Button>width</Button>
            <Button>ButtonGroup</Button>
          </ButtonGroup>
        </Grid>
      </Grid>
  );
}

GroupedButtons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GroupedButtons);
