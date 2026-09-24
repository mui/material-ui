import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Item from '@mui/material/Unstable_Menu2Item';

export default function ControlledMenu2() {
  const [anchor, setAnchor] = React.useState(null);

  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <div>
      <IconButton
        aria-label="More actions"
        onClick={(event) => setAnchor(event.currentTarget)}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu2
        open={anchor !== null}
        onOpenChange={(open) => {
          if (!open) {
            handleClose();
          }
        }}
        anchor={anchor ?? undefined}
        sideOffset={4}
      >
        <Menu2Item onClick={handleClose}>Rename</Menu2Item>
        <Menu2Item onClick={handleClose}>Duplicate</Menu2Item>
        <Menu2Item onClick={handleClose}>Delete</Menu2Item>
      </Menu2>
    </div>
  );
}
