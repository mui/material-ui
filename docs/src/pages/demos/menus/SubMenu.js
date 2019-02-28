import React from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

class SubMenu extends React.Component {
  handleSubMenuOpen = (e) => {
    const {item, onSubMenuOpen} = this.props;
    e.persist();
    onSubMenuOpen(item.key, e);
  }

  handleSubMenuClose = (e) => {
    const {item, onSubMenuClose} = this.props;
    onSubMenuClose(item.key, e);
  }

  render() {
    const {item, open, anchorEl, renderItems} = this.props;
    return (
      <React.Fragment key={item.key}>
        <MenuItem
          onClick={this.handleSubMenuOpen}
          aria-owns={item.child}
        >
          {item.item}
          <ArrowRightIcon />
        </MenuItem>
        <Menu
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleSubMenuClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
        >
          {
            item.subItems.map(subItem => renderItems(subItem))
          }
        </Menu>
      </React.Fragment>
    )
  }
}

SubMenu.propTypes = {
  anchorEl: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  item: PropTypes.object.isRequired,
  onSubMenuClose: PropTypes.func.isRequired,
  onSubMenuOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  renderItems: PropTypes.func.isRequired
}

export default SubMenu;