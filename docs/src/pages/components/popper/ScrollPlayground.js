import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  scrollContainer: {
    height: 400,
    overflow: 'auto',
    marginBottom: theme.spacing(3),
  },
  scroll: {
    position: 'relative',
    width: '230%',
    backgroundColor: theme.palette.background.paper,
    height: '230%',
  },
  legend: {
    marginTop: theme.spacing(2),
    maxWidth: 300,
  },
  paper: {
    maxWidth: 400,
    overflow: 'auto',
  },
  select: {
    width: 200,
  },
  popper: {
    zIndex: 1,
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent ${theme.palette.background.paper} transparent`,
      },
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '1em 1em 0 1em',
        borderColor: `${theme.palette.background.paper} transparent transparent transparent`,
      },
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      marginLeft: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 1em 1em 0',
        borderColor: `transparent ${theme.palette.background.paper} transparent transparent`,
      },
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 0 1em 1em',
        borderColor: `transparent transparent transparent ${theme.palette.background.paper}`,
      },
    },
  },
  arrow: {
    position: 'absolute',
    fontSize: 7,
    width: '3em',
    height: '3em',
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    },
  },
}));

export default function ScrollPlayground() {
  const anchorRef = React.useRef(null);
  const [arrowRef, setArrowRef] = React.useState(null);

  const [arrow, setArrow] = React.useState(false);
  const [disablePortal, setDisablePortal] = React.useState(false);
  const [flip, setFlip] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState('bottom');
  const [preventOverflow, setPreventOverflow] = React.useState('scrollParent');

  const handleClickButton = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const centerScroll = (element) => {
    if (!element) {
      return;
    }

    const container = element.parentElement;
    container.scrollTop = element.clientHeight / 4;
    container.scrollLeft = element.clientWidth / 4;
  };

  const classes = useStyles();

  const jsx = `
  <Popper
    placement="${placement}"
    disablePortal={${disablePortal}}
    modifiers={{
      flip: {
        enabled: ${flip},
      },
      preventOverflow: {
        enabled: ${preventOverflow !== 'disabled'},
        boundariesElement: '${preventOverflow === 'disabled' ? 'scrollParent' : preventOverflow}',
      },
      arrow: {
        enabled: ${arrow},
        element: arrowRef,
      },
    }}
  >
  `;
  const id = open ? 'scroll-playground' : null;

  return (
    <div className={classes.root}>
      <div className={classes.scrollContainer}>
        <Grid
          className={classes.scroll}
          container
          alignItems="center"
          justify="center"
          ref={centerScroll}
        >
          <div>
            <Button
              ref={anchorRef}
              variant="contained"
              onClick={handleClickButton}
              aria-describedby={id}
            >
              Toggle Popper
            </Button>
            <Typography className={classes.legend}>
              Scroll around this container to experiment with flip and preventOverflow modifiers.
            </Typography>
            <Popper
              id={id}
              open={open}
              anchorEl={anchorRef.current}
              placement={placement}
              disablePortal={disablePortal}
              className={classes.popper}
              modifiers={{
                flip: {
                  enabled: flip,
                },
                arrow: {
                  enabled: arrow,
                  element: arrowRef,
                },
                preventOverflow: {
                  enabled: preventOverflow !== 'disabled',
                  boundariesElement:
                    preventOverflow === 'disabled' ? 'scrollParent' : preventOverflow,
                },
              }}
            >
              {arrow ? <span className={classes.arrow} ref={setArrowRef} /> : null}
              <Paper className={classes.paper}>
                <DialogTitle>{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                  <DialogContentText>Let Google help apps determine location.</DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClickButton} color="primary">
                    Disagree
                  </Button>
                  <Button onClick={handleClickButton} color="primary">
                    Agree
                  </Button>
                </DialogActions>
              </Paper>
            </Popper>
          </div>
        </Grid>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom variant="h6">
            Appearance
          </Typography>
          <div>
            <TextField
              margin="normal"
              className={classes.select}
              label="Placement"
              select
              InputLabelProps={{ id: 'scroll-playground-placement-label' }}
              SelectProps={{
                native: true,
                inputProps: { 'aria-labelledby': 'scroll-playground-placement-label' },
              }}
              value={placement}
              onChange={(event) => {
                setPlacement(event.target.value);
              }}
            >
              <option value="top-start">top-start</option>
              <option value="top">top</option>
              <option value="top-end">top-end</option>
              <option value="left-start">left-start</option>
              <option value="left">left</option>
              <option value="left-end">left-end</option>
              <option value="right-start">right-start</option>
              <option value="right">right</option>
              <option value="right-end">right-end</option>
              <option value="bottom-start">bottom-start</option>
              <option value="bottom">bottom</option>
              <option value="bottom-end">bottom-end</option>
            </TextField>
          </div>
          <FormControlLabel
            control={
              <Switch
                checked={disablePortal}
                onChange={(event) => {
                  setDisablePortal(event.target.checked);
                }}
                value="disablePortal"
              />
            }
            label="Disable portal (the children stay within it's parent DOM hierarchy)"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom variant="h6">
            Modifiers (options from Popper.js)
          </Typography>
          <div>
            <TextField
              margin="normal"
              className={classes.select}
              label="Prevent overflow"
              select
              InputLabelProps={{ id: 'scroll-playground-overflow-label' }}
              SelectProps={{
                native: true,
                inputProps: { 'aria-labelledby': 'scroll-playground-overflow-label' },
              }}
              value={preventOverflow}
              onChange={(event) => {
                setPreventOverflow(event.target.value);
              }}
            >
              <option value="disabled">disabled</option>
              <option value="scrollParent">scrollParent</option>
              <option value="viewport">viewport</option>
              <option value="window">window</option>
            </TextField>
          </div>
          <FormControlLabel
            control={
              <Switch
                checked={flip}
                onChange={(event) => {
                  setFlip(event.target.checked);
                }}
                value="flip"
              />
            }
            label={[
              'Flip',
              '(flip the popper’s placement when it starts to overlap its reference element)',
            ].join(' ')}
          />
          <FormControlLabel
            control={
              <Switch
                checked={arrow}
                onChange={(event) => {
                  setArrow(event.target.checked);
                }}
                value="arrow"
              />
            }
            label="Arrow"
          />
        </Grid>
      </Grid>
      <HighlightedCode code={jsx} language="jsx" />
    </div>
  );
}
