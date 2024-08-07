import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer, screen, fireEvent } from '@mui/internal-test-utils';
import { Menu } from '../Menu';
import { useMenuItem } from './useMenuItem';

describe('useMenuItem', () => {
  const { render } = createRenderer();

  describe('getRootProps', () => {
    it('returns props for root slot', () => {
      function TestMenuItem() {
        const rootRef = React.createRef<HTMLElement>();
        const { getRootProps } = useMenuItem({ rootRef });
        return <div {...getRootProps()} />;
      }

      function Test() {
        return (
          <Menu>
            <TestMenuItem />
          </Menu>
        );
      }

      const { getByRole } = render(<Test />);

      const menuItem = getByRole('menuitem');
      expect(menuItem).not.to.equal(null);
    });

    it('forwards external props including event handlers', () => {
      const handleClick = spy();

      function TestMenuItem() {
        const rootRef = React.createRef<HTMLElement>();
        const { getRootProps } = useMenuItem({ rootRef, id: 'test-menu-item-1' });
        return <div {...getRootProps({ 'data-testid': 'test-menu-item', onClick: handleClick })} />;
      }

      function Test() {
        return (
          <Menu>
            <TestMenuItem />
          </Menu>
        );
      }

      render(<Test />);

      const menuItem = screen.getByTestId('test-menu-item');
      expect(menuItem).not.to.equal(null);

      fireEvent.click(menuItem);
      expect(handleClick.callCount).to.equal(1);
    });
  });
});
