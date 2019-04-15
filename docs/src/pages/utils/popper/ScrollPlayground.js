import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
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

const styles = theme => ({
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
        borderColor: `transparent transparent ${theme.palette.common.white} transparent`,
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
        borderColor: `${theme.palette.common.white} transparent transparent transparent`,
      },
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      marginLeft: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 1em 1em 0',
        borderColor: `transparent ${theme.palette.common.white} transparent transparent`,
      },
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 0 1em 1em',
        borderColor: `transparent transparent transparent ${theme.palette.common.white}`,
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
});

class ScrollPlayground extends React.Component {
  anchorRef = React.createRef();

  state = {
    arrow: false,
    arrowRef: null,
    disablePortal: false,
    flip: true,
    open: false,
    placement: 'bottom',
    preventOverflow: 'scrollParent',
  };

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value,
    });
  };

  handleChangeTarget = key => event => {
    this.setState({
      [key]: event.target.value,
    });
  };

  handleClickButton = () => {
    this.setState(state => ({
      open: !state.open,
    }));
  };

  handleArrowRef = node => {
    this.setState({
      arrowRef: node,
    });
  };

  centerScroll = ref => {
    if (!ref) {
      return;
    }

    const container = ref.parentElement;
    container.scrollTop = ref.clientHeight / 4;
    container.scrollLeft = ref.clientWidth / 4;
  };

  render() {
    const { classes } = this.props;
    const { open, placement, disablePortal, flip, preventOverflow, arrow, arrowRef } = this.state;

    const code = `
\`\`\`jsx
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
\`\`\`
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
            ref={this.centerScroll}
          >
            <div>
              <Button
                ref={this.anchorRef}
                variant="contained"
                onClick={this.handleClickButton}
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
                anchorEl={this.anchorRef.current}
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
                {arrow ? <span className={classes.arrow} ref={this.handleArrowRef} /> : null}
                <Paper className={classes.paper}>
                  <DialogTitle>{"Use Google's location service?"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText>Let Google help apps determine location.</DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClickButton} color="primary">
                      Disagree
                    </Button>
                    <Button onClick={this.handleClickButton} color="primary">
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
                SelectProps={{ native: true }}
                value={placement}
                onChange={this.handleChangeTarget('placement')}
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
                  onChange={this.handleChange('disablePortal')}
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
                SelectProps={{ native: true }}
                value={preventOverflow}
                onChange={this.handleChangeTarget('preventOverflow')}
              >
                <option value="disabled">disabled</option>
                <option value="scrollParent">scrollParent</option>
                <option value="viewport">viewport</option>
                <option value="window">window</option>
              </TextField>
            </div>
            <FormControlLabel
              control={<Switch checked={flip} onChange={this.handleChange('flip')} value="flip" />}
              label={[
                'Flip',
                '(flip the popper’s placement when it starts to overlap its reference element)',
              ].join(' ')}
            />
            <FormControlLabel
              control={
                <Switch checked={arrow} onChange={this.handleChange('arrow')} value="arrow" />
              }
              label="Arrow"
            />
          </Grid>
        </Grid>
        <MarkdownElement text={code} />
      </div>
    );
  }
}

ScrollPlayground.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScrollPlayground);
