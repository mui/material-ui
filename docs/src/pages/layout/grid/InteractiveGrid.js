import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MarkdownElement from '@material-ui/docs/MarkdownElement';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  demo: {
    height: 240,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    height: '100%',
    color: theme.palette.text.secondary,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});

const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl'];

const defaultGridProps = {
  direction: 'row',
  justify: 'flex-start',
  alignItems: 'stretch',
};

function sortGridsByBreakpoints(a, b) {
  return breakpoints.indexOf(a.breakpoint) - breakpoints.indexOf(b.breakpoint);
}

class InteractiveGrid extends React.Component {
  state = {
    grids: [
      {
        direction: 'row',
        justify: 'flex-start',
        alignItems: 'stretch',
        breakpoint: 'xs',
      },
    ],
  };

  handleChange = (key, breakpoint) => (event, value) => {
    const grids = this.state.grids.slice();
    const index = grids.findIndex(grid => grid.breakpoint === breakpoint);
    grids[index][key] = value;
    this.setState({
      grids,
    });
  };

  handleChangeBreakpoints = () => (event, isChecked) => {
    const grids = this.state.grids.slice();
    const breakpoint = event.target.value;

    if (isChecked) {
      const item = { ...defaultGridProps, breakpoint };
      grids.push(item);
      grids.sort(sortGridsByBreakpoints);
    } else {
      const index = grids.findIndex(grid => grid.breakpoint === breakpoint);
      if (index > -1) {
        grids.splice(index, 1);
      }
    }

    this.setState({ grids });
  };

  render() {
    const { classes } = this.props;
    const { grids } = this.state;

    const selectedBreakpoints = grids.map(({ breakpoint }) => breakpoint);

    const gridProps = grids.reduce((acc, grid) => {
      const { breakpoint, direction, alignItems, justify } = grid;
      acc[`${breakpoint}Direction`] = String(direction);
      acc[`${breakpoint}Justify`] = String(justify);
      acc[`${breakpoint}AlignItems`] = String(alignItems);
      return acc;
    }, {});

    const code = `
    \`\`\`jsx
    <Grid
      container
      ${JSON.stringify(gridProps)
        .replace('{"', '')
        .replace(/,/g, ' ')
        .replace(/ "/g, ' ')
        .replace(/":/g, '=')
        .replace('}', '')}
    >
    \`\`\`
    `;

    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
          <Grid container spacing={16} className={classes.demo} {...gridProps}>
            {[0, 1, 2].map(value => (
              <Grid key={value} item>
                <Paper
                  className={classes.paper}
                  style={{ paddingTop: (value + 1) * 10, paddingBottom: (value + 1) * 10 }}
                >
                  {`Cell ${value + 1}`}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.control}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel>breakpoint</FormLabel>
                  <FormGroup row>
                    {breakpoints.map(breakpoint => (
                      <FormControlLabel
                        key={breakpoint}
                        control={
                          <Checkbox
                            checked={selectedBreakpoints.includes(breakpoint)}
                            onChange={this.handleChangeBreakpoints()}
                            value={breakpoint}
                          />
                        }
                        label={breakpoint}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        {grids.map(grid => (
          <Grid item xs={6}>
            <Paper className={classes.control} key="breakpoint">
              <Grid container spacing={24}>
                <Grid item xs={12}>
                  <Typography variant="subheading" gutterBottom>
                    breakpoint: {grid.breakpoint}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel>direction</FormLabel>
                    <RadioGroup
                      row
                      name="direction"
                      aria-label="Direction"
                      value={grid.direction}
                      onChange={this.handleChange('direction', grid.breakpoint)}
                    >
                      <FormControlLabel value="row" control={<Radio />} label="row" />
                      <FormControlLabel
                        value="row-reverse"
                        control={<Radio />}
                        label="row-reverse"
                      />
                      <FormControlLabel value="column" control={<Radio />} label="column" />
                      <FormControlLabel
                        value="column-reverse"
                        control={<Radio />}
                        label="column-reverse"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel>justify</FormLabel>
                    <RadioGroup
                      row
                      name="justify"
                      aria-label="Justify"
                      value={grid.justify}
                      onChange={this.handleChange('justify', grid.breakpoint)}
                    >
                      <FormControlLabel value="flex-start" control={<Radio />} label="flex-start" />
                      <FormControlLabel value="center" control={<Radio />} label="center" />
                      <FormControlLabel value="flex-end" control={<Radio />} label="flex-end" />
                      <FormControlLabel
                        value="space-between"
                        control={<Radio />}
                        label="space-between"
                      />
                      <FormControlLabel
                        value="space-around"
                        control={<Radio />}
                        label="space-around"
                      />
                      <FormControlLabel
                        value="space-evenly"
                        control={<Radio />}
                        label="space-evenly"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel>alignItems</FormLabel>
                    <RadioGroup
                      row
                      name="alignItems"
                      aria-label="Align items"
                      value={grid.alignItems}
                      onChange={this.handleChange('alignItems', grid.breakpoint)}
                    >
                      <FormControlLabel value="flex-start" control={<Radio />} label="flex-start" />
                      <FormControlLabel value="center" control={<Radio />} label="center" />
                      <FormControlLabel value="flex-end" control={<Radio />} label="flex-end" />
                      <FormControlLabel value="stretch" control={<Radio />} label="stretch" />
                      <FormControlLabel value="baseline" control={<Radio />} label="baseline" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
        <Grid item xs={12}>
          <MarkdownElement text={code} />
        </Grid>
      </Grid>
    );
  }
}

InteractiveGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InteractiveGrid);
