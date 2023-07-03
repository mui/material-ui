import * as React from 'react';
import { createMount, createRenderer, describeConformance } from 'test/utils';
import MenuButton, { menuButtonClasses as classes } from '@mui/joy/MenuButton';
import { DropdownContext, DropdownContextValue } from '@mui/base/useMenu';
import Button from '../Button';

const testContext: DropdownContextValue = {
  dispatch: () => {},
  popupId: 'menu-popup',
  registerPopup: () => {},
  registerTrigger: () => {},
  state: { open: true },
  triggerElement: null,
};

describe('<MenuButton />', () => {
  const mount = createMount();
  const { render } = createRenderer();

  describeConformance(<MenuButton />, () => ({
    classes,
    inheritComponent: Button,
    mount: (node: React.ReactNode) => {
      const wrapper = mount(
        <DropdownContext.Provider value={testContext}>{node}</DropdownContext.Provider>,
      );
      return wrapper.childAt(0);
    },
    muiName: 'MuiMenu',
    refInstanceof: window.HTMLButtonElement,
    render: (node) => {
      return render(
        <DropdownContext.Provider value={testContext}>{node}</DropdownContext.Provider>,
      );
    },
    skip: ['reactTestRenderer', 'propsSpread', 'componentProp', 'slotsProp'],
    testRootOverrides: { slotName: 'root', slotClassName: classes.root },
  }));
});
