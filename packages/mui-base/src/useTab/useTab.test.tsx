import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer, screen, fireEvent } from '@mui/internal-test-utils';
import { Tabs } from '../Tabs';
import { TabsList } from '../TabsList';
import { useTab } from './useTab';

describe('useTab', () => {
  const { render } = createRenderer();

  describe('getRootProps', () => {
    it('returns props for root slot', () => {
      function TestTab() {
        const rootRef = React.createRef<HTMLDivElement>();
        const { getRootProps } = useTab({ rootRef });
        return <div {...getRootProps()} />;
      }

      function Test() {
        return (
          <Tabs defaultValue={1}>
            <TabsList>
              <TestTab />
            </TabsList>
          </Tabs>
        );
      }

      const { getByRole } = render(<Test />);

      const tab = getByRole('tab');
      expect(tab).not.to.equal(null);
    });

    it('forwards external props including event handlers', () => {
      const handleClick = spy();

      function TestTab() {
        const rootRef = React.createRef<HTMLDivElement>();
        const { getRootProps } = useTab({ rootRef });
        return <div {...getRootProps({ 'data-testid': 'test-tab', onClick: handleClick })} />;
      }

      function Test() {
        return (
          <Tabs defaultValue={1}>
            <TabsList>
              <TestTab />
            </TabsList>
          </Tabs>
        );
      }

      render(<Test />);

      const tab = screen.getByTestId('test-tab');
      expect(tab).not.to.equal(null);

      fireEvent.click(tab);
      expect(handleClick.callCount).to.equal(1);
    });
  });
});
