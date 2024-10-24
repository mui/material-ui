import * as React from 'react';
import PropTypes from 'prop-types';
import MUISwipeableDrawer from '@mui/material/SwipeableDrawer';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { useMediaQuery } from '@mui/system';

function SwipeIndicator() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        pt: 2,
      }}
    >
      <Box
        sx={{
          width: 32,
          height: 4,
          backgroundColor: 'grey.200',
          borderRadius: 4,
        }}
      />
    </Box>
  );
}

function DrawerHeader(props) {
  const { children, ...other } = props;

  return (
    <Paper
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 2,
        borderBottom: '1px solid',
        borderColor: 'divider',
        boxShadow: 'none',
      }}
      elevation={16}
      square
    >
      <Stack
        direction="row"
        px={2}
        py={2}
        gap={3}
        sx={{
          alignItems: 'center',
        }}
        {...other}
      >
        {children}
      </Stack>
    </Paper>
  );
}

DrawerHeader.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
};

export { DrawerHeader };

function Drawer(props) {
  const { children, anchor, width = 320, container, ...other } = props;
  const isBottomDrawer = anchor === 'bottom';
  const isTouch = useMediaQuery('(hover: none)');

  return (
    <MUISwipeableDrawer
      {...other}
      anchor={anchor}
      container={container}
      PaperProps={{
        sx: {
          boxSizing: 'border-box',
          ...(isBottomDrawer
            ? { pb: 1, maxHeight: 'calc(100% - 100px)' }
            : { width }),
        },
      }}
      disableSwipeToOpen
      onOpen={() => {}} // required by SwipeableDrawer but not used in this demo
    >
      {isTouch && isBottomDrawer && <SwipeIndicator />}
      {children}
    </MUISwipeableDrawer>
  );
}

Drawer.propTypes = {
  /**
   * Side from which the drawer will appear.
   * @default 'left'
   */
  anchor: PropTypes.oneOf(['bottom', 'left', 'right', 'top']),
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * You can also provide a callback, which is called in a React layout effect.
   * This lets you set the container from a ref, and also makes server-side rendering possible.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: PropTypes.func,
  width: PropTypes.number,
};

export { Drawer };
