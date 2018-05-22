import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

export const styles = theme => {
  return ({
    root: {
      flex: '1',
    },
    box: {
      border: `1px dashed ${theme.palette.grey[400]}`,
      height: '80px',
      '&>div': {
        border: `1px dotted ${theme.palette.grey[400]}`,
      }
    },
  })
};

function SimpleBoxes(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Box margin={10} className={classes.box} inline>
        Box (inline)
      </Box>
      <Box margin={10} hAlign="start" className={classes.box}>
        Box (hAlign: start)
      </Box>
      <Box margin={10} hAlign="center" className={classes.box}>
        Box (hAlign: center)
      </Box>
      <Box margin={10} hAlign="end" className={classes.box}>
        Box (hAlign: end)
      </Box>
      <Box margin={10} hAlign="space-between" className={classes.box}>
        <div>Box (hAlign: space-between)</div>
        <div>Box (hAlign: space-between)</div>
        <div>Box (hAlign: space-between)</div>
      </Box>
      <Box margin={10} hAlign="space-around" className={classes.box}>
        <div>Box (hAlign: space-around)</div>
        <div>Box (hAlign: space-around)</div>
        <div>Box (hAlign: space-around)</div>
      </Box>
      <Box margin={10} hAlign="space-evenly" className={classes.box}>
        <div>Box (hAlign: space-evenly)</div>
        <div>Box (hAlign: space-evenly)</div>
        <div>Box (hAlign: space-evenly)</div>
      </Box>
      <Box margin={10} vAlign="start" className={classes.box}>
        <div>Box (vAlign: start)</div>
        <div>Box (vAlign: start)</div>
        <div>Box (vAlign: start)</div>
      </Box>
      <Box margin={10} vAlign="center" className={classes.box}>
        <div>Box (vAlign: center)</div>
        <div>Box (vAlign: center)</div>
        <div>Box (vAlign: center)</div>
      </Box>
      <Box margin={10} vAlign="end" className={classes.box}>
        <div>Box (vAlign: end)</div>
        <div>Box (vAlign: end)</div>
        <div>Box (vAlign: end)</div>
      </Box>
      <Box margin={10} vAlign="baseline" className={classes.box}>
        <div style={{fontSize:'18px'}}>Box (vAlign: baseline)</div>
        <div style={{fontSize:'34px'}}>Box (vAlign: baseline)</div>
        <div style={{fontSize:'10px'}}>Box (vAlign: baseline)</div>
      </Box>
      <Box margin={10} vAlign="stretch" className={classes.box}>
        <div>Box (vAlign: stretch)</div>
        <div>Box (vAlign: stretch)</div>
        <div>Box (vAlign: stretch)</div>
      </Box>
    </div>
  );
}

SimpleBoxes.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleBoxes);
