import * as React from 'react';
import Typography from '@mui/material/Typography';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Item from '@mui/material/Unstable_Menu2Item';

function createVirtualAnchor(clientX, clientY) {
  return {
    getBoundingClientRect() {
      return DOMRect.fromRect({ x: clientX, y: clientY, width: 0, height: 0 });
    },
  };
}

export default function ContextMenu2() {
  const [anchor, setAnchor] = React.useState(null);
  // A menu without a trigger has no element to restore focus to, so point
  // `finalFocus` at the surface that was right-clicked.
  const areaRef = React.useRef(null);

  const handleContextMenu = (event) => {
    event.preventDefault();
    setAnchor(createVirtualAnchor(event.clientX + 2, event.clientY - 6));
  };

  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <div
      ref={areaRef}
      tabIndex={-1}
      onContextMenu={handleContextMenu}
      style={{ cursor: 'context-menu' }}
    >
      <Typography>
        Right click anywhere in this paragraph to open the context menu. Lorem ipsum
        dolor sit amet, consectetur adipiscing elit. Nullam ipsum purus, bibendum sit
        amet vulputate eget, porta semper ligula.
      </Typography>
      <Menu2
        open={anchor !== null}
        onOpenChange={(open) => {
          if (!open) {
            handleClose();
          }
        }}
        anchor={anchor ?? undefined}
        positionMethod="fixed"
        finalFocus={areaRef}
      >
        <Menu2Item onClick={handleClose}>Copy</Menu2Item>
        <Menu2Item onClick={handleClose}>Print</Menu2Item>
        <Menu2Item onClick={handleClose}>Highlight</Menu2Item>
        <Menu2Item onClick={handleClose}>Email</Menu2Item>
      </Menu2>
    </div>
  );
}
