import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer, screen, fireEvent } from '@mui/internal-test-utils';
import { DropdownContext, DropdownContextValue } from '@mui/base/useDropdown';
import { useMenuButton } from './useMenuButton';

const testContext: DropdownContextValue = {
  dispatch: () => {},
  popupId: 'menu-popup',
  registerPopup: () => {},
  registerTrigger: () => {},
  state: { open: true, changeReason: null },
  triggerElement: null,
};

describe('useMenuButton', () => {
  const { render } = createRenderer();

  describe('getRootProps', () => {
    it('returns props for root slot', () => {
      function TestMenuButton() {
        const { getRootProps } = useMenuButton();
        return <div {...getRootProps()} />;
      }

      function Test() {
        return (
          <DropdownContext.Provider value={testContext}>
            <TestMenuButton />
          </DropdownContext.Provider>
        );
      }

      const { getByRole } = render(<Test />);

      const button = getByRole('button');
      expect(button).not.to.equal(null);
    });

    it('forwards external props including event handlers', () => {
      const handleClick = spy();

      function TestMenuButton() {
        const { getRootProps } = useMenuButton();
        return (
          <div {...getRootProps({ 'data-testid': 'test-menu-button', onClick: handleClick })} />
        );
      }

      function Test() {
        return (
          <DropdownContext.Provider value={testContext}>
            <TestMenuButton />
          </DropdownContext.Provider>
        );
      }

      render(<Test />);

      const button = screen.getByTestId('test-menu-button');
      expect(button).not.to.equal(null);

      fireEvent.click(button);
      expect(handleClick.callCount).to.equal(1);
    });
  });
});
