import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import DragHandleIcon from '@mui/icons-material/DragHandle';

import useResizeHandle from 'docs/src/modules/utils/useResizeHandle';
import Frame from '../../action/Frame';

export default function CustomThemeComparison() {
  const objectRef = React.useRef(null);
  const handleDragging = React.useCallback((target, length) => {
    const rect = target.getBoundingClientRect();
    target.style.setProperty(
      '--split-point',
      `clamp(12px, ${((length * 100) / rect.width).toFixed(2)}%, calc(100% - 12px))`,
    );
  }, []);
  const { dragging, getDragHandlers } = useResizeHandle(objectRef, {
    onDragging: handleDragging,
  });
  return (
    <Frame
      ref={objectRef}
      style={{ touchAction: dragging ? 'none' : 'auto' }}
      sx={{
        height: 'clamp(260px, 40vmax, 420px)',
        mx: { md: '-64px' },
        position: 'relative',
        mb: 2,
        '--split-point': '50%',
        '& > *': {
          borderRadius: '12px',
        },
      }}
    >
      <Frame.Demo
        sx={{
          overflow: 'auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          clipPath: 'inset(0 calc(100% - var(--split-point)) 0 0)',
        }}
      >
        <Box
          component="img"
          src="/static/screenshots/material-ui/getting-started/templates/dashboard-default.jpg"
          sx={(theme) => ({
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top',
            ...theme.applyStyles('dark', {
              content:
                'url(/static/screenshots/material-ui/getting-started/templates/dashboard-default-dark.jpg)',
            }),
          })}
        />
      </Frame.Demo>
      <Frame.Demo
        sx={{
          overflow: 'auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          clipPath: 'inset(0 0 0 var(--split-point))',
        }}
      >
        <Box
          component="img"
          src="/static/screenshots/material-ui/getting-started/templates/dashboard.jpg"
          sx={(theme) => ({
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top',
            ...theme.applyStyles('dark', {
              content:
                'url(/static/screenshots/material-ui/getting-started/templates/dashboard-dark.jpg)',
            }),
          })}
        />
      </Frame.Demo>
      <Box
        {...getDragHandlers()}
        sx={(theme) => ({
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: 20,
          left: 'var(--split-point)',
          transform: 'translateX(-50%)',
          cursor: 'col-resize',
          '&:hover': {
            '& .handleButton': {
              bgcolor: 'primary.50',
              borderColor: 'primary.300',
            },
          },
          ...theme.applyDarkStyles({
            '&:hover': {
              '& .handleButton': {
                bgcolor: 'primary.900',
                borderColor: 'primary.400',
              },
            },
          }),
        })}
      >
        <Box
          sx={(theme) => ({
            margin: '0 auto',
            width: 2,
            bgcolor: alpha(theme.palette.grey[200], 0.5),
            height: '100%',
            ...theme.applyDarkStyles({
              bgcolor: 'divider',
            }),
          })}
        />
        <Box
          className="handleButton"
          sx={(theme) => ({
            position: 'absolute',
            width: 42,
            height: 20,
            borderRadius: '12px',
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            top: { xs: '10%', sm: '20%' },
            left: '50%',
            transform: 'translateX(-50%) rotate(90deg)',
            transition: '0.15s',
            boxShadow: `2px 0 2px ${(theme.vars || theme).palette.grey[200]}`,
            ...theme.applyDarkStyles({
              boxShadow: `2px 0 2px ${(theme.vars || theme).palette.common.black}`,
            }),
          })}
        >
          <DragHandleIcon />
        </Box>
      </Box>
    </Frame>
  );
}
