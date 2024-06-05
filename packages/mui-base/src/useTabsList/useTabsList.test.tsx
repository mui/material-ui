import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer, screen, fireEvent } from '@mui/internal-test-utils';
import { Tabs } from '../Tabs';
import { useTabsList } from './useTabsList';

describe('useTabsList', () => {
  const { render } = createRenderer();

  describe('getRootProps', () => {
    it('returns props for root slot', () => {
      function TestTabsList() {
        const rootRef = React.createRef<HTMLDivElement>();
        const { getRootProps } = useTabsList({ rootRef });
        return <div {...getRootProps()} />;
      }

      function Test() {
        return (
          <Tabs>
            <TestTabsList />
          </Tabs>
        );
      }

      const { getByRole } = render(<Test />);

      const tablist = getByRole('tablist');
      expect(tablist).not.to.equal(null);
    });

    it('forwards external props including event handlers', () => {
      const handleClick = spy();

      function TestTabsList() {
        const rootRef = React.createRef<HTMLDivElement>();
        const { getRootProps } = useTabsList({ rootRef });
        return <div {...getRootProps({ 'data-testid': 'test-tabslist', onClick: handleClick })} />;
      }

      function Test() {
        return (
          <Tabs>
            <TestTabsList />
          </Tabs>
        );
      }

      render(<Test />);

      const tabsList = screen.getByTestId('test-tabslist');
      expect(tabsList).not.to.equal(null);

      fireEvent.click(tabsList);
      expect(handleClick.callCount).to.equal(1);
    });
  });
});
