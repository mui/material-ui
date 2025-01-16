import * as React from 'react';
import { expect } from 'chai';
import { SinonSpy, spy } from 'sinon';
import { createRenderer, createEvent, fireEvent } from '@mui/internal-test-utils';
import { useList } from './useList';

describe('useList', () => {
  const { render } = createRenderer();

  describe('preventing default behavior on keyDown', () => {
    ['ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown', 'Enter', ' '].forEach((key) =>
      it(`prevents default behavior when ${key} is pressed in activeDescendant focus management mode`, () => {
        function Listbox() {
          const { getRootProps } = useList({
            items: [],
            focusManagement: 'activeDescendant',
            getItemId: () => undefined,
          });
          return <div role="listbox" {...getRootProps()} />;
        }

        const { getByRole } = render(<Listbox />);
        const listbox = getByRole('listbox');
        listbox.focus();

        const event = createEvent.keyDown(listbox, {
          key,
        });

        event.preventDefault = spy();
        fireEvent(listbox, event);

        expect((event.preventDefault as SinonSpy).calledOnce).to.equal(true);
      }),
    );

    ['ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown'].forEach((key) =>
      it(`prevents default behavior when ${key} is pressed in DOM focus management mode`, () => {
        function Listbox() {
          const { getRootProps } = useList({
            items: [],
            focusManagement: 'DOM',
            getItemDomElement: () => null,
          });
          return <div role="listbox" {...getRootProps()} />;
        }

        const { getByRole } = render(<Listbox />);
        const listbox = getByRole('listbox');
        listbox.focus();

        const event = createEvent.keyDown(listbox, {
          key,
        });

        event.preventDefault = spy();
        fireEvent(listbox, event);

        expect((event.preventDefault as SinonSpy).calledOnce).to.equal(true);
      }),
    );

    ['Enter', ' '].forEach((key) =>
      it(`does not prevent default behavior when ${key} is pressed in DOM focus management mode`, () => {
        function Listbox() {
          const { getRootProps } = useList({
            items: [],
            focusManagement: 'DOM',
            getItemDomElement: () => null,
          });
          return <div role="listbox" {...getRootProps()} />;
        }

        const { getByRole } = render(<Listbox />);
        const listbox = getByRole('listbox');
        listbox.focus();

        const event = createEvent.keyDown(listbox, {
          key,
        });

        event.preventDefault = spy();
        fireEvent(listbox, event);

        expect((event.preventDefault as SinonSpy).notCalled).to.equal(true);
      }),
    );
  });

  describe('external props', () => {
    it('should pass arbitrary props to the root slot', () => {
      const handleClick = spy();

      function Listbox() {
        const { getRootProps } = useList({
          items: [],
          getItemId: () => undefined,
        });
        return (
          <div
            role="listbox"
            {...getRootProps({ 'data-testid': 'test-listbox', onClick: handleClick })}
          />
        );
      }

      const { getByRole } = render(<Listbox />);

      const listbox = getByRole('listbox');
      expect(listbox).to.have.attribute('data-testid', 'test-listbox');

      fireEvent.click(listbox);
      expect(handleClick.callCount).to.equal(1);
    });
  });
});
