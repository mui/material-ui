import * as React from 'react';
import { expect } from 'chai';
import { SinonSpy, spy } from 'sinon';
import useListbox from '@mui/base/useListbox';
import { createRenderer, createEvent, fireEvent } from 'test/utils';

describe('useListbox', () => {
  const { render } = createRenderer();
  describe('prop: id', () => {
    it('propagates it to the root element', () => {
      const Listbox = () => {
        const { getRootProps } = useListbox({ options: [], id: 'test-id' });
        return <ul {...getRootProps()} />;
      };
      const { getByRole } = render(<Listbox />);

      const listbox = getByRole('listbox');
      expect(listbox).to.have.attribute('id', 'test-id');
    });

    it('uses the provided id to create option ids', () => {
      const options = ['one', 'two'];
      const Listbox = () => {
        const { getRootProps, getOptionProps } = useListbox({ options, id: 'test-id' });
        return (
          <ul {...getRootProps()}>
            {options.map((o) => (
              <li key={o} {...getOptionProps(o)}>
                {o}
              </li>
            ))}
          </ul>
        );
      };
      const { getAllByRole } = render(<Listbox />);

      const optionElements = getAllByRole('option');
      optionElements.forEach((opt, index) =>
        expect(opt).to.have.attribute('id', `test-id-option-${index}`),
      );
    });

    it('generates a unique id if not provided explicitly', () => {
      const Listbox = () => {
        const { getRootProps } = useListbox({ options: [] });
        return <ul {...getRootProps()} />;
      };

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
        const Listbox = () => {
          const { getRootProps } = useListbox({ options: [], focusManagement: 'activeDescendant' });
          return <div {...getRootProps()} />;
        };

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
        const Listbox = () => {
          const { getRootProps } = useListbox({ options: [], focusManagement: 'DOM' });
          return <div {...getRootProps()} />;
        };

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
        const Listbox = () => {
          const { getRootProps } = useListbox({ options: [], focusManagement: 'DOM' });
          return <div {...getRootProps()} />;
        };

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
