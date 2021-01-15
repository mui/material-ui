import React from 'react';
import Button from '@material-ui/core/Button';
import Collapse, { CollapseProps } from '@material-ui/core/Collapse';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade, { FadeProps } from '@material-ui/core/Fade';

interface ButtonMenuProps {
  id: string;
  label: React.ReactNode;
  TransitionComponent: React.ElementType<CollapseProps & FadeProps>;
  TransitionInnerComponent?: React.ElementType<CollapseProps & FadeProps>;
}

function ButtonMenu(props: ButtonMenuProps) {
  const { id, label, TransitionComponent, TransitionInnerComponent } = props;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button aria-controls={id} aria-haspopup="true" onClick={handleClick}>
        {label}
      </Button>
      <Menu
        id={id}
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={TransitionComponent}
        TransitionInnerComponent={TransitionInnerComponent}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default function TransitionMenu() {
  return (
    <React.Fragment>
      <ButtonMenu
        id="collapse-menu"
        label="open with collapse transition"
        TransitionComponent={Fade}
        TransitionInnerComponent={Collapse}
      />
      <ButtonMenu
        id="fade-menu"
        label="open with fade transition"
        TransitionComponent={Fade}
      />
    </React.Fragment>
  );
}
