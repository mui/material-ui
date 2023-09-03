import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import {
  act,
  createMount,
  createRenderer,
  describeConformanceUnstyled,
  fireEvent,
} from 'test/utils';
import { MenuButton, menuButtonClasses } from '@mui/base/MenuButton';
import { DropdownContext, DropdownContextValue, DropdownActionTypes } from '@mui/base/useDropdown';

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

  describeConformanceUnstyled(<MenuButton />, () => ({
    inheritComponent: 'button',
    render: (node) => {
      return render(
        <DropdownContext.Provider value={testContext}>{node}</DropdownContext.Provider>,
      );
    },
    mount: (node: React.ReactNode) => {
      const wrapper = mount(
        <DropdownContext.Provider value={testContext}>{node}</DropdownContext.Provider>,
      );
      return wrapper.childAt(0);
    },
    refInstanceof: window.HTMLButtonElement,
    muiName: 'MuiMenuButton',
    slots: {
      root: {
        expectedClassName: menuButtonClasses.root,
        testWithElement: null,
      },
    },
    skip: ['componentProp', 'reactTestRenderer'],
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

  describe('prop: focusableWhenDisabled', () => {
    it('has the aria-disabled instead of disabled attribute when disabled', () => {
      const { getByRole } = render(
        <DropdownContext.Provider value={testContext}>
          <MenuButton disabled focusableWhenDisabled />
        </DropdownContext.Provider>,
      );

      const button = getByRole('button');
      expect(button).to.have.attribute('aria-disabled');
      expect(button).not.to.have.attribute('disabled');
    });

    it('can receive focus when focusableWhenDisabled is set', () => {
      const { getByRole } = render(
        <DropdownContext.Provider value={testContext}>
          <MenuButton disabled focusableWhenDisabled />
        </DropdownContext.Provider>,
      );

      const button = getByRole('button');
      act(() => {
        button.focus();
      });

      expect(document.activeElement).to.equal(button);
    });
  });

  it('toggles the menu state when clicked', () => {
    const dispatchSpy = spy();
    const context = {
      ...testContext,
      state: { open: false },
      dispatch: dispatchSpy,
    };

    const { getByRole } = render(
      <DropdownContext.Provider value={context}>
        <MenuButton />
      </DropdownContext.Provider>,
    );

    const button = getByRole('button');
    button.click();

    expect(dispatchSpy.calledOnce).to.equal(true);
    expect(dispatchSpy.args[0][0]).to.contain({ type: DropdownActionTypes.toggle });
  });

  describe('keyboard navigation', () => {
    ['ArrowUp', 'ArrowDown'].forEach((key) =>
      it(`opens the menu when pressing ${key}`, () => {
        const dispatchSpy = spy();
        const context = {
          ...testContext,
          state: { open: false },
          dispatch: dispatchSpy,
        };

        const { getByRole } = render(
          <DropdownContext.Provider value={context}>
            <MenuButton />
          </DropdownContext.Provider>,
        );
        const button = getByRole('button');

        act(() => {
          button.focus();
        });

        fireEvent.keyDown(button, { key });

        expect(dispatchSpy.calledOnce).to.equal(true);
        expect(dispatchSpy.args[0][0]).to.contain({ type: DropdownActionTypes.open });
      }),
    );
  });

  describe('accessibility attributes', () => {
    it('has the aria-haspopup attribute', () => {
      const { getByRole } = render(
        <DropdownContext.Provider value={testContext}>
          <MenuButton />
        </DropdownContext.Provider>,
      );

      const button = getByRole('button');
      expect(button).to.have.attribute('aria-haspopup');
    });

    it('has the aria-expanded=false attribute when closed', () => {
      const context = {
        ...testContext,
        state: { open: false },
      };

      const { getByRole } = render(
        <DropdownContext.Provider value={context}>
          <MenuButton />
        </DropdownContext.Provider>,
      );
      const button = getByRole('button');
      expect(button).to.have.attribute('aria-expanded', 'false');
    });

    it('has the aria-expanded=true attribute when open', () => {
      const context = {
        ...testContext,
        state: { open: true },
      };

      const { getByRole } = render(
        <DropdownContext.Provider value={context}>
          <MenuButton />
        </DropdownContext.Provider>,
      );
      const button = getByRole('button');
      expect(button).to.have.attribute('aria-expanded', 'true');
    });

    it('has the aria-controls attribute', () => {
      const { getByRole } = render(
        <DropdownContext.Provider value={testContext}>
          <MenuButton />
        </DropdownContext.Provider>,
      );
      const button = getByRole('button');
      expect(button).to.have.attribute('aria-controls', 'menu-popup');
    });
  });
});
