import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SubMenu from './SubMenu';

const items = [
  {
    key: '1',
    item: 'Item 1',
  },
  {
    key: '2',
    item: 'Item 2',
  },
  {
    key: '3',
    item: 'Item 3',
  },
  {
    key: '1stsub',
    item: 'More Items',
    child: 'first-cascade',
    subItems: [
      {
        key: 'more1',
        item: 'SubItem 1',
      },
      {
        key: 'more2',
        item: 'SubItem 2',
      },
      {
        key: 'more3',
        item: 'SubItem 3',
      },
      {
        key: 'secondsub',
        item: 'More Subitems',
        child: 'second-cascade',
        subItems: [
          {
            key: 'thirdsub',
            item: 'Check more',
            child: 'third-cascade',
            subItems: [
              {
                key: '1234',
                item: 'Last Item',
              },
              {
                key: '2222',
                item: 'Last Item',
              },
            ],
          },
        ],
      },
    ],
  },
];

class CascadingMenu extends React.Component {
  state = {
    anchorEl: null,
    anchorItems: {},
  };

  handleClick = e => {
    this.setState({
      anchorEl: e.target,
    });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleSubMenuOpen = (key, e) => {
    this.setState(prevState => {
      const anchorItems = Object.assign({}, prevState.anchorItems, {
        [key]: {
          anchorEl: e.target,
          open: true,
        },
      });
      return { anchorItems };
    });
  };

  handleSubMenuClose = key => {
    this.setState(prevState => {
      const anchorItems = Object.assign({}, prevState.anchorItems, {
        [key]: {
          anchorEl: null,
          open: false,
        },
      });
      return { anchorItems };
    });
  };

  handleCloseCascade = () => {
    this.setState({
      anchorItems: {}
    }, () => {
      this.setState({
        anchorEl: null
      })
    });
  }

  renderItems = item => {
    const { anchorItems } = this.state;
    const { open = false, anchorEl = {} } = anchorItems[item.key] || {};

    if (item.subItems) {
      return (
        <SubMenu
          key={item.key}
          open={open}
          anchorEl={anchorEl}
          item={item}
          onSubMenuOpen={this.handleSubMenuOpen}
          onSubMenuClose={this.handleSubMenuClose}
          renderItems={this.renderItems}
        />
      );
    }
    return (
      <MenuItem key={item.key} style={{ display: 'flex', justifyContent: 'space-between' }} onClick={this.handleCloseCascade}>
        {item.item}
      </MenuItem>
    );
  };

  renderMenuItems = menuItems => menuItems.map(item => this.renderItems(item));

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <Button
          aria-owns={open ? 'cascading-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          Open for submenu
        </Button>
        <Menu
          id="cascading-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          {this.renderMenuItems(items)}
        </Menu>
      </div>
    );
  }
}

export default CascadingMenu;
