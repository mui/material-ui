import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer, describeConformance } from 'test/utils';
import { DropdownContext, DropdownContextValue } from '@mui/base/useDropdown';
import { ThemeProvider } from '@mui/joy/styles';
import MenuButton, { menuButtonClasses as classes } from '@mui/joy/MenuButton';

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
    testVariantProps: { variant: 'soft' },
    ThemeProvider,
  }));

  describe('prop: disabled', () => {
    it('should render a disabled button', () => {
      const { getByRole } = render(
        <DropdownContext.Provider value={testContext}>
          <MenuButton disabled />
        </DropdownContext.Provider>,
      );

      const button = getByRole('button');
      expect(button).to.have.property('disabled', true);
    });

    it('should not open the menu when clicked', () => {
      const dispatchSpy = spy();
      const context = {
        ...testContext,
        state: { open: false },
        dispatch: dispatchSpy,
      };

      const { getByRole } = render(
        <DropdownContext.Provider value={context}>
          <MenuButton disabled />
        </DropdownContext.Provider>,
      );

      const button = getByRole('button');
      button.click();

      expect(dispatchSpy.called).to.equal(false);
    });
  });
});
