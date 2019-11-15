import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { amber, purple, cyan, brown } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { CSSTransition } from 'react-transition-group';
import {
  flip,
  glide,
  shuffle,
  fade,
  scale,
  carousel,
  cube,
  fold,
  unfold,
  glideIn,
  glideOut,
  drop,
  rise,
  room,
  pull,
  push,
  pushPull,
  side,
  slide,
  glueIn,
  glueOut,
} from 'react-tiger-transition';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  formControl: {
    margin: theme.spacing(0, 0, 2, 2),
    width: 120,
  },
  transitionContainer: {
    position: 'relative',
    width: '100%',
    height: 160,
    perspective: 1200,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  transitionLayout: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    transform: `translate3d(0, 0, 0)`,
    transformStyle: 'preserve-3d',
    backfaceVisibility: 'hidden',
    overflow: 'hidden',
  },
  transitionScreen: {
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  a: {
    backgroundColor: amber[500],
  },
  b: {
    backgroundColor: purple[500],
  },
  c: {
    backgroundColor: cyan[500],
  },
  d: {
    backgroundColor: brown[500],
  },
}));

const tabs = ['a', 'b', 'c', 'd'];

const animations = [
  { label: 'slide', func: slide },
  { label: 'flip', func: flip },
  { label: 'glide', func: glide },
  { label: 'glideIn', func: glideIn },
  { label: 'glideOut', func: glideOut },
  { label: 'fade', func: fade },
  { label: 'scale', func: scale },
  { label: 'carousel', func: carousel },
  { label: 'cube', func: cube },
  { label: 'fold', func: fold },
  { label: 'unfold', func: unfold },
  { label: 'drop', func: drop },
  { label: 'rise', func: rise },
  { label: 'room', func: room },
  { label: 'pull', func: pull },
  { label: 'push', func: push },
  { label: 'pushPull', func: pushPull },
  { label: 'side', func: side },
  { label: 'shuffle', func: shuffle },
  { label: 'glueIn', func: glueIn },
  { label: 'glueOut', func: glueOut },
];

export default function() {
  const classes = useStyles();
  const [value, setValue] = React.useState(tabs[0]);
  const [transition, setTransition] = React.useState('transition-left');
  const [animation, setAnimation] = React.useState('slide');

  function handleTabChange(event, newValue) {
    setTransition(value > newValue ? 'transition-right' : 'transition-left');
    setValue(newValue);
  }

  function handleSelectChange(event) {
    setAnimation(event.target.value);
  }

  React.useEffect(() => {
    const nextAnimation = animations.find(el => el.label === animation);
    if (nextAnimation) {
      nextAnimation.func({
        name: 'transition-left',
      });

      nextAnimation.func({
        name: 'transition-right',
        direction: 'right',
      });
    }
  }, [animation]);

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="animation-select">Animation</InputLabel>
        <Select
          value={animation}
          onChange={handleSelectChange}
          inputProps={{
            name: 'animation',
            id: 'animations-select',
          }}
        >
          {animations.map(el => (
            <MenuItem key={el.label} value={el.label}>
              {el.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <AppBar position="static">
        <Tabs value={value} onChange={handleTabChange} centered>
          {tabs.map(tab => (
            <Tab key={tab} label={tab} value={tab} />
          ))}
        </Tabs>
      </AppBar>
      <div className={classes.transitionContainer}>
        {tabs.map(tab => (
          <CSSTransition
            key={tab}
            mountOnEnter
            unmountOnExit
            in={tab === value}
            timeout={600}
            classNames={transition}
          >
            <div className={classes.transitionLayout}>
              <div className={clsx(classes.transitionScreen, classes[tab])}>
                <Typography variant="h1">{tab}</Typography>
              </div>
            </div>
          </CSSTransition>
        ))}
      </div>
    </div>
  );
}
