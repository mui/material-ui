import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 300,
    },
    container: {
      display: 'flex',
      justifyContent: 'space-around',
      height: 120,
      width: 250,
    },
    halfWidth: {
      width: '50%',
    },
    paper: {
      margin: theme.spacing(1),
    },
    svg: {
      width: 100,
      height: 100,
    },
    polygon: {
      fill: theme.palette.common.white,
      stroke: theme.palette.divider,
      strokeWidth: 1,
    },
  }),
);

export default function SimpleCollapse() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <div className={classes.root}>
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label="Show"
      />
      <div className={classes.container}>
        <Collapse in={checked}>
          <Paper elevation={4} className={classes.paper}>
            <svg className={classes.svg}>
              <polygon
                points="0,100 50,00, 100,100"
                className={classes.polygon}
              />
            </svg>
          </Paper>
        </Collapse>
        <Collapse in={checked} collapsedSize={40}>
          <Paper elevation={4} className={classes.paper}>
            <svg className={classes.svg}>
              <polygon
                points="0,100 50,00, 100,100"
                className={classes.polygon}
              />
            </svg>
          </Paper>
        </Collapse>
      </div>
      <div className={classes.container}>
        <div className={classes.halfWidth}>
          <Collapse orientation="horizontal" in={checked}>
            <Paper elevation={4} className={classes.paper}>
              <svg className={classes.svg}>
                <polygon
                  points="0,100 50,00, 100,100"
                  className={classes.polygon}
                />
              </svg>
            </Paper>
          </Collapse>
        </div>
        <div className={classes.halfWidth}>
          <Collapse orientation="horizontal" in={checked} collapsedSize={40}>
            <Paper elevation={4} className={classes.paper}>
              <svg className={classes.svg}>
                <polygon
                  points="0,100 50,00, 100,100"
                  className={classes.polygon}
                />
              </svg>
            </Paper>
          </Collapse>
        </div>
      </div>
    </div>
  );
}
