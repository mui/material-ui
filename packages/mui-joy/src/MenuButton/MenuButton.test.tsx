import * as React from 'react';
import { createRenderer, describeConformance } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import MenuButton, { menuButtonClasses as classes } from '@mui/joy/MenuButton';
import { DropdownContext, DropdownContextValue } from '@mui/base/useMenu';

const testContext: DropdownContextValue = {
  dispatch: () => {},
  popupId: 'menu-popup',
  registerPopup: () => {},
  registerTrigger: () => {},
  state: { open: true },
  triggerElement: null,
};

describe('<MenuButton />', () => {
  const { render } = createRenderer();

  describeConformance(<MenuButton />, () => ({
    classes,
    inheritComponent: 'button',
    wrapMount: (mount) => (node: React.ReactNode) => {
      const wrapper = mount(
        <DropdownContext.Provider value={testContext}>{node}</DropdownContext.Provider>,
      );
      return wrapper.childAt(0);
    },
    muiName: 'JoyMenuButton',
    refInstanceof: window.HTMLButtonElement,
    render: (node) => {
      return render(
        <DropdownContext.Provider value={testContext}>{node}</DropdownContext.Provider>,
      );
    },
    slots: {
      root: { expectedClassName: classes.root },
    },
    skip: ['reactTestRenderer', 'componentsProp', 'classesRoot'],
    testRootOverrides: { slotName: 'root', slotClassName: classes.root },
    ThemeProvider,
  }));
});
