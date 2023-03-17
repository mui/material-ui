import * as React from 'react';
import { expect } from 'chai';
import { SinonSpy, spy } from 'sinon';
import { createRenderer, createEvent, fireEvent } from 'test/utils';
import useList, { ListContext } from './useList';
import useListItem from './useListItem';

describe('useList', () => {
  const { render } = createRenderer();
  describe('prop: id', () => {
    it('propagates it to the root element', () => {
      function Listbox() {
        const { getRootProps } = useList({ items: [], id: 'test-id' });
        return <ul role="listbox" {...getRootProps()} />;
      }
      const { getByRole } = render(<Listbox />);

      const listbox = getByRole('listbox');
      expect(listbox).to.have.attribute('id', 'test-id');
    });

    it('uses the provided id to create option ids', () => {
      const items = ['one', 'two'];

      function ListItem({ children }: React.PropsWithChildren<{}>) {
        const id = React.useId();
        const { getRootProps, selected } = useListItem({ item: id });
        return (
          <li role="option" aria-selected={selected} {...getRootProps()}>
            {children}
          </li>
        );
      }

      function Listbox() {
        const { getRootProps, contextValue } = useList({ items, id: 'test-id' });
        return (
          <ListContext.Provider value={contextValue}>
            <ul role="listbox" {...getRootProps()}>
              {items.map((item) => (
                <ListItem key={item}>{item}</ListItem>
              ))}
            </ul>
          </ListContext.Provider>
        );
      }

      const { getAllByRole } = render(<Listbox />);

      const options = getAllByRole('option');
      options.forEach((opt, index) =>
        expect(opt).to.have.attribute('id', `test-id-option-${index}`),
      );
    });

    it('generates a unique id if not provided explicitly', () => {
      function Listbox() {
        const { getRootProps } = useList({ items: [] });
        return <ul role="listbox" {...getRootProps()} />;
      }

      const { getAllByRole } = render(
        <React.Fragment>
          <Listbox />
          <Listbox />
        </React.Fragment>,
      );

      const listboxes = getAllByRole('listbox');
      expect(listboxes[0].id).not.to.equal(listboxes[1].id);
    });
  });

  describe('preventing default behavior on keyDown', () => {
    ['ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown', 'Enter', ' '].forEach((key) =>
      it(`prevents default behavior when ${key} is pressed in activeDescendant focus management mode`, () => {
        function Listbox() {
          const { getRootProps } = useList({ items: [], focusManagement: 'activeDescendant' });
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
          const { getRootProps } = useList({ items: [], focusManagement: 'DOM' });
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
          const { getRootProps } = useList({ items: [], focusManagement: 'DOM' });
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
});
