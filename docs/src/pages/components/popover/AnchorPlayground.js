import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import Grid from '@material-ui/core/Grid';
import green from '@material-ui/core/colors/green';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

const styles = theme => ({
  buttonWrapper: {
    position: 'relative',
    marginBottom: theme.spacing(4),
  },
  anchor: {
    backgroundColor: green[500],
    width: 10,
    height: 10,
    borderRadius: '50%',
    position: 'absolute',
  },
  radioAnchor: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checked: {},
  typography: {
    margin: theme.spacing(2),
  },
});

const inlineStyles = {
  anchorVertical: {
    top: {
      top: -5,
    },
    center: {
      top: 'calc(50% - 5px)',
    },
    bottom: {
      bottom: -5,
    },
  },
  anchorHorizontal: {
    left: {
      left: -5,
    },
    center: {
      left: 'calc(50% - 5px)',
    },
    right: {
      right: -5,
    },
  },
};

class AnchorPlayground extends React.Component {
  anchorRef = React.createRef();

  state = {
    open: false,
    anchorOriginVertical: 'top',
    anchorOriginHorizontal: 'left',
    transformOriginVertical: 'top',
    transformOriginHorizontal: 'left',
    positionTop: 200, // Just so the popover can be spotted more easily
    positionLeft: 400, // Same as above
    anchorReference: 'anchorEl',
  };

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value,
    });
  };

  handleNumberInputChange = key => event => {
    this.setState({
      [key]: parseInt(event.target.value, 10),
    });
  };

  handleClickButton = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const { classes } = this.props;
    const {
      open,
      anchorOriginVertical,
      anchorOriginHorizontal,
      transformOriginVertical,
      transformOriginHorizontal,
      positionTop,
      positionLeft,
      anchorReference,
    } = this.state;

    let mode = '';

    if (anchorReference === 'anchorPosition') {
      mode = `
  anchorReference="${anchorReference}"
  anchorPosition={{ top: ${positionTop}, left: ${positionLeft} }}`;
    }

    const code = `
\`\`\`jsx
<Popover ${mode}
  anchorOrigin={{
    vertical: '${anchorOriginVertical}',
    horizontal: '${anchorOriginHorizontal}',
  }}
  transformOrigin={{
    vertical: '${transformOriginVertical}',
    horizontal: '${transformOriginHorizontal}',
  }}
>
  The content of the Popover.
</Popover>
\`\`\`
`;

    const radioAnchorClasses = { root: classes.radioAnchor, checked: classes.checked };

    return (
      <div>
        <Grid container justify="center">
          <Grid item className={classes.buttonWrapper}>
            <Button ref={this.anchorRef} variant="contained" onClick={this.handleClickButton}>
              Open Popover
            </Button>
            {anchorReference === 'anchorEl' && (
              <div
                className={classes.anchor}
                style={{
                  ...inlineStyles.anchorVertical[anchorOriginVertical],
                  ...inlineStyles.anchorHorizontal[anchorOriginHorizontal],
                }}
              />
            )}
          </Grid>
        </Grid>
        <Popover
          open={open}
          anchorEl={this.anchorRef.current}
          anchorReference={anchorReference}
          anchorPosition={{ top: positionTop, left: positionLeft }}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: anchorOriginVertical,
            horizontal: anchorOriginHorizontal,
          }}
          transformOrigin={{
            vertical: transformOriginVertical,
            horizontal: transformOriginHorizontal,
          }}
        >
          <Typography className={classes.typography}>The content of the Popover.</Typography>
        </Popover>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">anchorReference</FormLabel>
              <RadioGroup
                row
                aria-label="anchorReference"
                name="anchorReference"
                value={anchorReference}
                onChange={this.handleChange('anchorReference')}
              >
                <FormControlLabel value="anchorEl" control={<Radio />} label="anchorEl" />
                <FormControlLabel
                  value="anchorPosition"
                  control={<Radio />}
                  label="anchorPosition"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="position-top">anchorPosition.top</InputLabel>
              <Input
                id="position-top"
                type="number"
                value={positionTop}
                onChange={this.handleNumberInputChange('positionTop')}
              />
            </FormControl>
            &nbsp;
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="position-left">anchorPosition.left</InputLabel>
              <Input
                id="position-left"
                type="number"
                value={positionLeft}
                onChange={this.handleNumberInputChange('positionLeft')}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">anchorOrigin.vertical</FormLabel>
              <RadioGroup
                aria-label="anchorOriginVertical"
                name="anchorOriginVertical"
                value={anchorOriginVertical}
                onChange={this.handleChange('anchorOriginVertical')}
              >
                <FormControlLabel
                  value="top"
                  control={<Radio classes={radioAnchorClasses} />}
                  label="Top"
                />
                <FormControlLabel
                  value="center"
                  control={<Radio classes={radioAnchorClasses} />}
                  label="Center"
                />
                <FormControlLabel
                  value="bottom"
                  control={<Radio classes={radioAnchorClasses} />}
                  label="Bottom"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">transformOrigin.vertical</FormLabel>
              <RadioGroup
                aria-label="transformOriginVertical"
                name="transformOriginVertical"
                value={transformOriginVertical}
                onChange={this.handleChange('transformOriginVertical')}
              >
                <FormControlLabel value="top" control={<Radio color="primary" />} label="Top" />
                <FormControlLabel
                  value="center"
                  control={<Radio color="primary" />}
                  label="Center"
                />
                <FormControlLabel
                  value="bottom"
                  control={<Radio color="primary" />}
                  label="Bottom"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">anchorOrigin.horizontal</FormLabel>
              <RadioGroup
                row
                aria-label="anchorOriginHorizontal"
                name="anchorOriginHorizontal"
                value={anchorOriginHorizontal}
                onChange={this.handleChange('anchorOriginHorizontal')}
              >
                <FormControlLabel
                  value="left"
                  control={<Radio classes={radioAnchorClasses} />}
                  label="Left"
                />
                <FormControlLabel
                  value="center"
                  control={<Radio classes={radioAnchorClasses} />}
                  label="Center"
                />
                <FormControlLabel
                  value="right"
                  control={<Radio classes={radioAnchorClasses} />}
                  label="Right"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">transformOrigin.horizontal</FormLabel>
              <RadioGroup
                row
                aria-label="transformOriginHorizontal"
                name="transformOriginHorizontal"
                value={transformOriginHorizontal}
                onChange={this.handleChange('transformOriginHorizontal')}
              >
                <FormControlLabel value="left" control={<Radio color="primary" />} label="Left" />
                <FormControlLabel
                  value="center"
                  control={<Radio color="primary" />}
                  label="Center"
                />
                <FormControlLabel value="right" control={<Radio color="primary" />} label="Right" />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <MarkdownElement text={code} />
      </div>
    );
  }
}

AnchorPlayground.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AnchorPlayground);
