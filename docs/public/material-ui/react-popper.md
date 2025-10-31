---
productId: material-ui
title: React Popper component
components: Popper
githubLabel: 'component: Popper'
githubSource: packages/mui-material/src/Popper
---

# Popper

A Popper can be used to display some content on top of another. It's an alternative to react-popper.

Some important features of the Popper component:

- 🕷 Popper relies on the 3rd party library ([Popper.js](https://popper.js.org/docs/v2/)) for perfect positioning.
- 💄 It's an alternative API to react-popper. It aims for simplicity.
- Its child element is a [MUI Base Portal](https://v6.mui.com/base-ui/react-portal/) on the body of the document to avoid rendering problems.
  You can disable this behavior with `disablePortal`.
- The scroll isn't blocked like with the [Popover](/material-ui/react-popover/) component.
  The placement of the popper updates with the available area in the viewport.
- Clicking away does not hide the Popper component.
  If you need this behavior, you can use the [Click-Away Listener](/material-ui/react-click-away-listener/) - see the example in the [menu documentation section](/material-ui/react-menu/#composition-with-menu-list).
- The `anchorEl` is passed as the reference object to create a new `Popper.js` instance.

{{"component": "@mui/docs/ComponentLinkHeader", "design": false}}

## Basic Popper

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';

export default function SimplePopper() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <div>
      <button aria-describedby={id} type="button" onClick={handleClick}>
        Toggle Popper
      </button>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
          The content of the Popper.
        </Box>
      </Popper>
    </div>
  );
}
```

## Transitions

The open/close state of the popper can be animated with a render prop child and a transition component.
This component should respect the following conditions:

- Be a direct child descendent of the popper.
- Call the `onEnter` callback prop when the enter transition starts.
- Call the `onExited` callback prop when the exit transition is completed.
  These two callbacks allow the popper to unmount the child content when closed and fully transitioned.

Popper has built-in support for [react-transition-group](https://github.com/reactjs/react-transition-group).

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';

export default function TransitionsPopper() {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  return (
    <div>
      <button aria-describedby={id} type="button" onClick={handleClick}>
        Toggle Popper
      </button>
      <Popper id={id} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
              The content of the Popper.
            </Box>
          </Fade>
        )}
      </Popper>
    </div>
  );
}
```

Alternatively, you can use [react-spring](https://github.com/pmndrs/react-spring).

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import { useSpring, animated } from '@react-spring/web';

interface FadeProps {
  children?: React.ReactElement<unknown>;
  in?: boolean;
  onEnter?: () => void;
  onExited?: () => void;
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

export default function SpringPopper() {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'spring-popper' : undefined;

  return (
    <div>
      <button aria-describedby={id} type="button" onClick={handleClick}>
        Toggle Popper
      </button>
      <Popper id={id} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
              The content of the Popper.
            </Box>
          </Fade>
        )}
      </Popper>
    </div>
  );
}
```

## Positioned popper

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Popper, { PopperPlacementType } from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';

export default function PositionedPopper() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState<PopperPlacementType>();

  const handleClick =
    (newPlacement: PopperPlacementType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setOpen((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };

  return (
    <Box sx={{ width: 500 }}>
      <Popper
        // Note: The following zIndex style is specifically for documentation purposes and may not be necessary in your application.
        sx={{ zIndex: 1200 }}
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <Typography sx={{ p: 2 }}>The content of the Popper.</Typography>
            </Paper>
          </Fade>
        )}
      </Popper>
      <Grid container sx={{ justifyContent: 'center' }}>
        <Grid>
          <Button onClick={handleClick('top-start')}>top-start</Button>
          <Button onClick={handleClick('top')}>top</Button>
          <Button onClick={handleClick('top-end')}>top-end</Button>
        </Grid>
      </Grid>
      <Grid container sx={{ justifyContent: 'center' }}>
        <Grid size={6}>
          <Button onClick={handleClick('left-start')}>left-start</Button>
          <br />
          <Button onClick={handleClick('left')}>left</Button>
          <br />
          <Button onClick={handleClick('left-end')}>left-end</Button>
        </Grid>
        <Grid container direction="column" sx={{ alignItems: 'flex-end' }} size={6}>
          <Grid>
            <Button onClick={handleClick('right-start')}>right-start</Button>
          </Grid>
          <Grid>
            <Button onClick={handleClick('right')}>right</Button>
          </Grid>
          <Grid>
            <Button onClick={handleClick('right-end')}>right-end</Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid container sx={{ justifyContent: 'center' }}>
        <Grid>
          <Button onClick={handleClick('bottom-start')}>bottom-start</Button>
          <Button onClick={handleClick('bottom')}>bottom</Button>
          <Button onClick={handleClick('bottom-end')}>bottom-end</Button>
        </Grid>
      </Grid>
    </Box>
  );
}
```

## Scroll playground

```jsx
import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiPopper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import { HighlightedCode } from '@mui/docs/HighlightedCode';

const Popper = styled(MuiPopper, {
  shouldForwardProp: (prop) => prop !== 'arrow',
})(({ theme }) => ({
  zIndex: 1,
  '& > div': {
    position: 'relative',
  },
  '&[data-popper-placement*="bottom"]': {
    '& .MuiPopper-arrow': {
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
  },
  '&[data-popper-placement*="top"]': {
    '& .MuiPopper-arrow': {
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
  },
  '&[data-popper-placement*="right"]': {
    '& .MuiPopper-arrow': {
      left: 0,
      marginLeft: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 1em 1em 0',
        borderColor: `transparent ${theme.palette.background.paper} transparent transparent`,
      },
    },
  },
  '&[data-popper-placement*="left"]': {
    '& .MuiPopper-arrow': {
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
  variants: [
    {
      props: ({ arrow }) => arrow,
      style: {
        '&[data-popper-placement*="bottom"]': {
          '& > div': {
            marginTop: 2,
          },
        },
      },
    },
    {
      props: ({ arrow }) => !arrow,
      style: {
        '&[data-popper-placement*="bottom"]': {
          '& > div': {
            marginTop: 0,
          },
        },
      },
    },
    {
      props: ({ arrow }) => arrow,
      style: {
        '&[data-popper-placement*="top"]': {
          '& > div': {
            marginBottom: 2,
          },
        },
      },
    },
    {
      props: ({ arrow }) => !arrow,
      style: {
        '&[data-popper-placement*="top"]': {
          '& > div': {
            marginBottom: 0,
          },
        },
      },
    },
    {
      props: ({ arrow }) => arrow,
      style: {
        '&[data-popper-placement*="right"]': {
          '& > div': {
            marginLeft: 2,
          },
        },
      },
    },
    {
      props: ({ arrow }) => !arrow,
      style: {
        '&[data-popper-placement*="right"]': {
          '& > div': {
            marginLeft: 0,
          },
        },
      },
    },
    {
      props: ({ arrow }) => arrow,
      style: {
        '&[data-popper-placement*="left"]': {
          '& > div': {
            marginRight: 2,
          },
        },
      },
    },
    {
      props: ({ arrow }) => !arrow,
      style: {
        '&[data-popper-placement*="left"]': {
          '& > div': {
            marginRight: 0,
          },
        },
      },
    },
  ],
}));

const Arrow = styled('div')({
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
});

export default function ScrollPlayground() {
  const anchorRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);

  const [placement, setPlacement] = React.useState('bottom');
  const [disablePortal, setDisablePortal] = React.useState(false);

  const [flip, setFlip] = React.useState({
    enabled: true,
    altBoundary: true,
    rootBoundary: 'document',
  });
  const [preventOverflow, setPreventOverflow] = React.useState({
    enabled: true,
    altAxis: true,
    altBoundary: true,
    tether: true,
    rootBoundary: 'document',
  });

  const [arrow, setArrow] = React.useState(false);
  const [arrowRef, setArrowRef] = React.useState(null);

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

  const jsx = `
<Popper
  placement="${placement}"
  disablePortal={${disablePortal}}
  modifiers={[
    {
      name: 'flip',
      enabled: ${flip.enabled},
      options: {
        altBoundary: ${flip.altBoundary},
        rootBoundary: '${flip.rootBoundary}',
        padding: 8,
      },
    },
    {
      name: 'preventOverflow',
      enabled: ${preventOverflow.enabled},
      options: {
        altAxis: ${preventOverflow.altAxis},
        altBoundary: ${preventOverflow.altBoundary},
        tether: ${preventOverflow.tether},
        rootBoundary: '${preventOverflow.rootBoundary}',
        padding: 8,
      },
    },
    {
      name: 'arrow',
      enabled: ${arrow},
      options: {
        element: arrowRef,
      },
    },
  ]}
>
  `;
  const id = open ? 'scroll-playground' : null;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ height: 400, overflow: 'auto', mb: 3 }}>
        <Grid
          container
          ref={centerScroll}
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            width: '230%',
            bgcolor: 'background.paper',
            height: '230%',
          }}
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
            <Typography sx={{ mt: 2, maxWidth: 300 }}>
              Scroll around this container to experiment with flip and
              preventOverflow modifiers.
            </Typography>
            <Popper
              id={id}
              open={open}
              arrow={arrow}
              anchorEl={anchorRef.current}
              placement={placement}
              disablePortal={disablePortal}
              modifiers={[
                {
                  name: 'flip',
                  enabled: flip.enabled,
                  options: {
                    altBoundary: flip.altBoundary,
                    rootBoundary: flip.rootBoundary,
                    padding: 8,
                  },
                },
                {
                  name: 'preventOverflow',
                  enabled: preventOverflow.enabled,
                  options: {
                    altAxis: preventOverflow.altAxis,
                    altBoundary: preventOverflow.altBoundary,
                    tether: preventOverflow.tether,
                    rootBoundary: preventOverflow.rootBoundary,
                    padding: 8,
                  },
                },
                {
                  name: 'arrow',
                  enabled: arrow,
                  options: {
                    element: arrowRef,
                  },
                },
              ]}
            >
              <div>
                {arrow ? (
                  <Arrow ref={setArrowRef} className="MuiPopper-arrow" />
                ) : null}
                <Paper sx={{ maxWidth: 400, overflow: 'auto' }}>
                  <DialogTitle>{"Use Google's location service?"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Let Google help apps determine location.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClickButton}>Disagree</Button>
                    <Button onClick={handleClickButton}>Agree</Button>
                  </DialogActions>
                </Paper>
              </div>
            </Popper>
          </div>
        </Grid>
      </Box>
      <Grid container spacing={2}>
        <Grid container size={12}>
          <Grid size={12}>
            <Typography variant="h6" component="div">
              Appearance
            </Typography>
          </Grid>
          <Grid size={6}>
            <TextField
              margin="dense"
              sx={{ width: 200 }}
              label="Placement"
              select
              value={placement}
              onChange={(event) => {
                setPlacement(event.target.value);
              }}
              variant="standard"
              slotProps={{
                select: {
                  native: true,
                  inputProps: {
                    'aria-labelledby': 'scroll-playground-placement-label',
                  },
                },

                inputLabel: {
                  id: 'scroll-playground-placement-label',
                },
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
          </Grid>
          <Grid size={6}>
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
              label="Disable portal"
            />
            <Typography
              variant="caption"
              sx={{ display: 'block', color: 'text.secondary' }}
            >
              (the children stay within their parent DOM hierarchy)
            </Typography>
          </Grid>
        </Grid>
        <Grid size={12}>
          <Typography variant="h6" component="div">
            Modifiers (options from Popper.js)
          </Typography>
        </Grid>
        <Grid container spacing={1} size={12}>
          <Grid size={6}>
            <FormGroup>
              <Typography variant="subtitle1">Prevent Overflow</Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={preventOverflow.enabled}
                    onChange={(event) => {
                      setPreventOverflow((old) => ({
                        ...old,
                        enabled: event.target.checked,
                      }));
                    }}
                    value="arrow"
                  />
                }
                label="Enable"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={preventOverflow.altAxis}
                    onChange={(event) => {
                      setPreventOverflow((old) => ({
                        ...old,
                        altAxis: event.target.checked,
                      }));
                    }}
                    value="alt-axis"
                  />
                }
                label="Alt axis"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={preventOverflow.altBoundary}
                    onChange={(event) => {
                      setPreventOverflow((old) => ({
                        ...old,
                        altBoundary: event.target.checked,
                      }));
                    }}
                    value="alt-boundary"
                  />
                }
                label="Alt Boundary"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={preventOverflow.tether}
                    onChange={(event) => {
                      setPreventOverflow((old) => ({
                        ...old,
                        tether: event.target.checked,
                      }));
                    }}
                    value="tether"
                  />
                }
                label="Tether"
              />
              <TextField
                margin="dense"
                size="small"
                label="Root Boundary"
                select
                value={preventOverflow.rootBoundary}
                onChange={(event) => {
                  setPreventOverflow((old) => ({
                    ...old,
                    rootBoundary: event.target.value,
                  }));
                }}
                variant="standard"
                slotProps={{
                  select: {
                    native: true,
                    inputProps: {
                      'aria-labelledby':
                        'scroll-playground-prevent-overflow-root-boundary',
                    },
                  },

                  inputLabel: {
                    id: 'scroll-playground-prevent-overflow-root-boundary',
                  },
                }}
              >
                <option value="document">document</option>
                <option value="viewport">viewport</option>
              </TextField>
            </FormGroup>
          </Grid>
          <Grid size={6}>
            <FormGroup>
              <Typography variant="subtitle1">Flip</Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={flip.enabled}
                    onChange={(event) => {
                      setFlip((old) => ({
                        ...old,
                        enabled: event.target.checked,
                      }));
                    }}
                    value="enabled"
                  />
                }
                label="Enable"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={flip.altBoundary}
                    onChange={(event) => {
                      setFlip((old) => ({
                        ...old,
                        altBoundary: event.target.checked,
                      }));
                    }}
                    value="alt-boundary"
                  />
                }
                label="Alt Boundary"
              />
              <TextField
                margin="dense"
                size="small"
                label="Root Boundary"
                select
                value={flip.rootBoundary}
                onChange={(event) => {
                  setFlip((old) => ({
                    ...old,
                    rootBoundary: event.target.value,
                  }));
                }}
                variant="standard"
                slotProps={{
                  select: {
                    native: true,
                    inputProps: {
                      'aria-labelledby': 'scroll-playground-flip-root-boundary',
                    },
                  },

                  inputLabel: {
                    id: 'scroll-playground-flip-root-boundary',
                  },
                }}
              >
                <option value="document">document</option>
                <option value="viewport">viewport</option>
              </TextField>
            </FormGroup>
            <FormGroup>
              <Typography variant="subtitle1">Arrow</Typography>
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
                label="Enable"
              />
            </FormGroup>
          </Grid>
        </Grid>
      </Grid>
      <HighlightedCode code={jsx} language="jsx" />
    </Box>
  );
}
```

## Virtual element

The value of the `anchorEl` prop can be a reference to a fake DOM element.
You need to create an object shaped like the [`VirtualElement`](https://popper.js.org/docs/v2/virtual-elements/).

Highlight part of the text to see the popper:

```tsx
import * as React from 'react';
import Popper, { PopperProps } from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';

export default function VirtualElementPopper() {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<PopperProps['anchorEl']>(null);

  const previousAnchorElPosition = React.useRef<DOMRect>(undefined);

  React.useEffect(() => {
    if (anchorEl) {
      if (typeof anchorEl === 'object') {
        previousAnchorElPosition.current = anchorEl.getBoundingClientRect();
      } else {
        previousAnchorElPosition.current = anchorEl().getBoundingClientRect();
      }
    }
  }, [anchorEl]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleMouseUp = () => {
    const selection = window.getSelection();

    // Resets when the selection has a length of 0
    if (!selection || selection.anchorOffset === selection.focusOffset) {
      handleClose();
      return;
    }

    const getBoundingClientRect = () => {
      if (selection.rangeCount === 0 && previousAnchorElPosition.current) {
        setOpen(false);
        return previousAnchorElPosition.current;
      }
      return selection.getRangeAt(0).getBoundingClientRect();
    };

    setOpen(true);

    setAnchorEl({ getBoundingClientRect });
  };

  const id = open ? 'virtual-element-popper' : undefined;

  return (
    <div onMouseLeave={handleClose}>
      <Typography aria-describedby={id} onMouseUp={handleMouseUp}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ipsum purus,
        bibendum sit amet vulputate eget, porta semper ligula. Donec bibendum
        vulputate erat, ac fringilla mi finibus nec. Donec ac dolor sed dolor
        porttitor blandit vel vel purus. Fusce vel malesuada ligula. Nam quis
        vehicula ante, eu finibus est. Proin ullamcorper fermentum orci, quis finibus
        massa. Nunc lobortis, massa ut rutrum ultrices, metus metus finibus ex, sit
        amet facilisis neque enim sed neque. Quisque accumsan metus vel maximus
        consequat. Suspendisse lacinia tellus a libero volutpat maximus.
      </Typography>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        transition
        placement="bottom-start"
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <Typography sx={{ p: 2 }}>The content of the Popper.</Typography>
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  );
}
```

## Supplementary projects

For more advanced use cases you might be able to take advantage of:

### material-ui-popup-state

![stars](https://img.shields.io/github/stars/jcoreio/material-ui-popup-state?style=social&label=Star)
![npm downloads](https://img.shields.io/npm/dm/material-ui-popup-state.svg)

The package [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state) that takes care of popper state for you in most cases.

```tsx
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Popper from '@mui/material/Popper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';

export default function PopperPopupState() {
  return (
    <PopupState variant="popper" popupId="demo-popup-popper">
      {(popupState) => (
        <div>
          <Button variant="contained" {...bindToggle(popupState)}>
            Toggle Popper
          </Button>
          <Popper {...bindPopper(popupState)} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper>
                  <Typography sx={{ p: 2 }}>The content of the Popper.</Typography>
                </Paper>
              </Fade>
            )}
          </Popper>
        </div>
      )}
    </PopupState>
  );
}
```

# Popper API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Autocomplete](https://mui.com/material-ui/react-autocomplete/)
- [Menu](https://mui.com/material-ui/react-menu/)
- [Popper](https://mui.com/material-ui/react-popper/)

## Import

```jsx
import Popper from '@mui/material/Popper';
// or
import { Popper } from '@mui/material';
```

## Props

| Name                         | Type                                                                                                                                                                                                                                                                                                    | Default    | Required | Description                                                                                                                                                                        |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| open                         | `bool`                                                                                                                                                                                                                                                                                                  | -          | Yes      |                                                                                                                                                                                    |
| anchorEl                     | `HTML element \| object \| func`                                                                                                                                                                                                                                                                        | -          | No       |                                                                                                                                                                                    |
| children                     | `node \| func`                                                                                                                                                                                                                                                                                          | -          | No       |                                                                                                                                                                                    |
| component                    | `elementType`                                                                                                                                                                                                                                                                                           | -          | No       |                                                                                                                                                                                    |
| components (deprecated)      | `{ Root?: elementType }`                                                                                                                                                                                                                                                                                | `{}`       | No       | ⚠️ use the `slots` prop instead. This prop will be removed in a future major release. [How to migrate](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/).     |
| componentsProps (deprecated) | `{ root?: func \| object }`                                                                                                                                                                                                                                                                             | `{}`       | No       | ⚠️ use the `slotProps` prop instead. This prop will be removed in a future major release. [How to migrate](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/). |
| container                    | `HTML element \| func`                                                                                                                                                                                                                                                                                  | -          | No       |                                                                                                                                                                                    |
| disablePortal                | `bool`                                                                                                                                                                                                                                                                                                  | `false`    | No       |                                                                                                                                                                                    |
| keepMounted                  | `bool`                                                                                                                                                                                                                                                                                                  | `false`    | No       |                                                                                                                                                                                    |
| modifiers                    | `Array<{ data?: object, effect?: func, enabled?: bool, fn?: func, name?: any, options?: object, phase?: 'afterMain' \| 'afterRead' \| 'afterWrite' \| 'beforeMain' \| 'beforeRead' \| 'beforeWrite' \| 'main' \| 'read' \| 'write', requires?: Array<string>, requiresIfExists?: Array<string> }>`      | -          | No       |                                                                                                                                                                                    |
| placement                    | `'auto-end' \| 'auto-start' \| 'auto' \| 'bottom-end' \| 'bottom-start' \| 'bottom' \| 'left-end' \| 'left-start' \| 'left' \| 'right-end' \| 'right-start' \| 'right' \| 'top-end' \| 'top-start' \| 'top'`                                                                                            | `'bottom'` | No       |                                                                                                                                                                                    |
| popperOptions                | `{ modifiers?: array, onFirstUpdate?: func, placement?: 'auto-end' \| 'auto-start' \| 'auto' \| 'bottom-end' \| 'bottom-start' \| 'bottom' \| 'left-end' \| 'left-start' \| 'left' \| 'right-end' \| 'right-start' \| 'right' \| 'top-end' \| 'top-start' \| 'top', strategy?: 'absolute' \| 'fixed' }` | `{}`       | No       |                                                                                                                                                                                    |
| popperRef                    | `ref`                                                                                                                                                                                                                                                                                                   | -          | No       |                                                                                                                                                                                    |
| slotProps                    | `{ root?: func \| object }`                                                                                                                                                                                                                                                                             | `{}`       | No       |                                                                                                                                                                                    |
| slots                        | `{ root?: elementType }`                                                                                                                                                                                                                                                                                | `{}`       | No       |                                                                                                                                                                                    |
| sx                           | `Array<func \| object \| bool> \| func \| object`                                                                                                                                                                                                                                                       | -          | No       | The system prop that allows defining system overrides as well as additional CSS styles.                                                                                            |
| transition                   | `bool`                                                                                                                                                                                                                                                                                                  | `false`    | No       |                                                                                                                                                                                    |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element (native element).

## CSS

### Rule name

| Global class | Rule name | Description                             |
| ------------ | --------- | --------------------------------------- |
| -            | root      | Class name applied to the root element. |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/Popper/Popper.tsx](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/Popper/Popper.tsx)
