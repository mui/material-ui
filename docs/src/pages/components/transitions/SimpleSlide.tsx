import React from 'react';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-around',
    },
    controls: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    wrapper: {
      width: 100,
      height: 100,
      border: '1px dashed black',
      display: 'flex',
    },
    paper: {
      zIndex: 1,
      width: 100,
      height: 100,
      position: 'relative',
      left: 0,
      top: 0,
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

export default function SimpleSlide() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);
  const [checkedParent, setCheckedParent] = React.useState(false);
  const parent = React.useRef<HTMLDivElement>(null);

  const handleChange = () => {
    setChecked((prev) => !prev);
    setCheckedParent(false);
  };
  const handleChangeParent = () => {
    setCheckedParent((prev) => !prev);
    setChecked(false);
  };

  return (
    <div className={classes.root}>
      <div className={classes.controls}>
        <FormControlLabel
          control={<Switch checked={checked} onChange={handleChange} />}
          label="Show"
        />
        <FormControlLabel
          control={<Switch checked={checkedParent} onChange={handleChangeParent} />}
          label="Show(from parent)"
        />
      </div>
      <div className={classes.wrapper} ref={parent}>
        <Slide direction="up" in={checked} timeout={500} mountOnEnter unmountOnExit>
          <Paper elevation={4} className={classes.paper}>
            <svg className={classes.svg}>
              <polygon points="0,100 50,00, 100,100" className={classes.polygon} />
            </svg>
          </Paper>
        </Slide>
        <Slide
          direction="up"
          in={checkedParent}
          timeout={500}
          parentRef={parent.current as any}
          mountOnEnter
          unmountOnExit
        >
          <Paper elevation={4} className={classes.paper}>
            <svg className={classes.svg}>
              <polygon points="0,100 50,00, 100,100" className={classes.polygon} />
            </svg>
          </Paper>
        </Slide>
      </div>
    </div>
  );
}
