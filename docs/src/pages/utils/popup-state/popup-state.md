---
title: PopupState React component
components: PopupState, Menu, Popover, Popper
---

# PopupState

<p class="description">PopupState takes care of the boilerplate for common Menu, Popover and Popper use cases.</p>

It is a [render props component](https://reactjs.org/docs/render-props.html) that
keeps track of the local state for a single popup, and passes the state and
mutation functions to a child render function.

## Bind functions

`@material-ui/core/PopupState` exports several helper functions you can use to
connect components easily:

* `bindMenu`: creates props to control a `Menu` component.
* `bindPopover`: creates props to control a `Popover` component.
* `bindPopper`: creates props to control a `Popper` component.
* `bindTrigger`: creates props for a component that opens the popup when clicked.
* `bindToggle`: creates props for a component that toggles the popup when clicked.
* `bindHover`: creates props for a component that opens the popup while hovered.

To use one of these functions, you should call it with the props `PopupState`
passed to your child function, and spread the return value into the desired
element:

```js
import * as React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from '@material-ui/core/PopupState';

const MenuPopupState = () => (
  <PopupState popupId="demoMenu">
    {popupState => (
      <React.Fragment>
        <Button variant="contained" {...bindTrigger(popupState)}>
          Open Menu
        </Button>
        <Menu {...bindMenu(popupState)}>
          <MenuItem onClick={popupState.close}>Cake</MenuItem>
          <MenuItem onClick={popupState.close}>Death</MenuItem>
        </Menu>
      </React.Fragment>
    )}
  </PopupState>
);

export default MenuPopupState;
```

## Examples

### Menu

{{"demo": "pages/utils/popup-state/MenuPopupState.js"}}

### Popover

{{"demo": "pages/utils/popup-state/PopoverPopupState.js"}}

### Mouse over Interaction

{{"demo": "pages/utils/popup-state/HoverPopoverPopupState.js"}}

### Popper

{{"demo": "pages/utils/popup-state/PopperPopupState.js"}}
