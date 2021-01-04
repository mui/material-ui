import React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { grey } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/core/Skeleton';
import Typography from '@material-ui/core/Typography';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

const drawerBleeding = 56;

function SwipeableEdgeDrawer(props) {
  const { window } = props;
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
      <CssBaseline />
      <Global
        styles={{
          body: {
            backgroundColor: `${grey[100]} !important`,
          },
          '.MuiPaper-root.MuiPaper-root': {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
      <Box sx={{ textAlign: 'center', pt: 1 }}>
        <Button onClick={toggleDrawer(true)}>Open</Button>
      </Box>
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
            backgroundColor: '#fff',
          }}
        >
          <Box
            sx={{
              width: 30,
              height: 6,
              bgcolor: 'grey.300',
              borderRadius: '3px',
              position: 'absolute',
              top: 8,
              left: 'calc(50% - 15px)',
            }}
          />
          <Typography sx={{ p: 2, color: 'text.secondary' }}>51 results</Typography>
        </Box>
        <Box sx={{ mx: 2, mb: 2, height: '100%', overflow: 'auto' }}>
          <Skeleton variant="rectangular" height="100%" />
        </Box>
      </SwipeableDrawer>
    </div>
  );
}

SwipeableEdgeDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default SwipeableEdgeDrawer;
