import * as React from 'react';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import { Instance } from '@popperjs/core';

export default function AnchorElTooltips() {
  const positionRef = React.useRef<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const popperRef = React.useRef<Instance>(null);
  const areaRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent) => {
    positionRef.current = { x: event.clientX, y: event.clientY };

    if (popperRef.current != null) {
      popperRef.current.update();
    }
  };

  return (
    <Tooltip
      title="Add"
      placement="top"
      arrow
      PopperProps={{
        popperRef,
        anchorEl: {
          getBoundingClientRect: () => ({
            top: areaRef.current!.getBoundingClientRect().top,
            left: positionRef.current.x,
            right: positionRef.current.x,
            bottom: areaRef.current!.getBoundingClientRect().bottom,
            width: 0,
            height: 0,
          }),
        },
      }}
    >
      <Box
        ref={areaRef}
        onMouseMove={handleMouseMove}
        sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          p: 2,
        }}
      >
        Hover
      </Box>
    </Tooltip>
  );
}
