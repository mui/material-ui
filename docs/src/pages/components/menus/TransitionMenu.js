import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';

function ButtonMenu(props) {
  const { id, label, TransitionComponent, TransitionInnerComponent } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
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

ButtonMenu.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.node,
  TransitionComponent: PropTypes.elementType.isRequired,
  TransitionInnerComponent: PropTypes.elementType,
};

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
