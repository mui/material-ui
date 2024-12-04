import * as React from 'react';
import { expect } from 'chai';
import { render } from '@mui/internal-test-utils';
import { CompoundComponentContext, useCompoundParent } from './useCompoundParent';
import { useCompoundItem } from './useCompoundItem';

type ItemValue = { value: string; ref: React.RefObject<HTMLSpanElement | null> };

describe('compound components', () => {
  describe('useCompoundParent', () => {
    it('knows about children from the whole subtree', () => {
      let parentSubitems: Map<string, ItemValue>;

      function Parent(props: React.PropsWithChildren<{}>) {
        const { children } = props;
        const { subitems, contextValue } = useCompoundParent<string, ItemValue>();

        parentSubitems = subitems;

        return (
          <CompoundComponentContext.Provider value={contextValue}>
            {children}
          </CompoundComponentContext.Provider>
        );
      }

      function Child(props: React.PropsWithChildren<{ id: string; value: string }>) {
        const { id, value, children } = props;
        const ref = React.useRef<HTMLSpanElement>(null);
        useCompoundItem(
          id,
          React.useMemo(() => ({ value, ref }), [value]),
        );

        return <span ref={ref}>{children}</span>;
      }

      render(
        <Parent>
          <Child id="1" value="one" />
          <Child id="2" value="two">
            <Child id="2.1" value="two.one" />
            <Child id="2.2" value="two.two" />
          </Child>
          <Child id="3" value="three">
            <Child id="3.1" value="three.one">
              <Child id="3.1.1" value="three.one.one" />
            </Child>
          </Child>
        </Parent>,
      );

      expect(Array.from(parentSubitems!.keys())).to.deep.equal([
        '1',
        '2',
        '2.1',
        '2.2',
        '3',
        '3.1',
        '3.1.1',
      ]);

      expect(Array.from(parentSubitems!.values()).map((v) => v.value)).to.deep.equal([
        'one',
        'two',
        'two.one',
        'two.two',
        'three',
        'three.one',
        'three.one.one',
      ]);
    });

    it('knows about children rendered by other components', () => {
      let parentSubitems: Map<string, ItemValue>;

      function Parent(props: React.PropsWithChildren<{}>) {
        const { children } = props;
        const { subitems, contextValue } = useCompoundParent<string, ItemValue>();

        parentSubitems = subitems;

        return (
          <CompoundComponentContext.Provider value={contextValue}>
            {children}
          </CompoundComponentContext.Provider>
        );
      }

      function Child(props: { id: string; value: string }) {
        const { id, value } = props;
        const ref = React.useRef<HTMLSpanElement>(null);
        useCompoundItem(
          id,
          React.useMemo(() => ({ value, ref }), [value]),
        );

        return <span ref={ref} />;
      }

      function Wrapper() {
        return (
          <React.Fragment>
            <Child id="1" value="one" />
            <Child id="2" value="two" />
            <Child id="3" value="three" />
          </React.Fragment>
        );
      }

      render(
        <Parent>
          <Child id="0" value="zero" />
          <Wrapper />
          <Child id="4" value="four" />
        </Parent>,
      );

      expect(Array.from(parentSubitems!.keys())).to.deep.equal(['0', '1', '2', '3', '4']);

      expect(Array.from(parentSubitems!.values()).map((v) => v.value)).to.deep.equal([
        'zero',
        'one',
        'two',
        'three',
        'four',
      ]);
    });

    // https://github.com/mui/material-ui/issues/36800
    it('maintains the correct order of children when they are inserted in the middle', () => {
      let parentSubitems: Map<string, ItemValue>;
      let subitemsToRender = ['1', '4', '5'];

      function Parent(props: React.PropsWithChildren<{}>) {
        const { children } = props;
        const { subitems, contextValue } = useCompoundParent<string, ItemValue>();

        parentSubitems = subitems;

        return (
          <CompoundComponentContext.Provider value={contextValue}>
            {children}
          </CompoundComponentContext.Provider>
        );
      }

      function Child(props: React.PropsWithChildren<{ id: string; value: string }>) {
        const { id, value, children } = props;
        const ref = React.useRef<HTMLSpanElement>(null);
        useCompoundItem(
          id,
          React.useMemo(() => ({ value, ref }), [value]),
        );

        return <span ref={ref}>{children}</span>;
      }

      const { rerender } = render(
        <Parent>
          {subitemsToRender.map((item) => (
            <Child key={item} id={item} value={item} />
          ))}
        </Parent>,
      );

      subitemsToRender = ['1', '2', '3', '4', '5'];

      rerender(
        <Parent>
          {subitemsToRender.map((item) => (
            <Child key={item} id={item} value={item} />
          ))}
        </Parent>,
      );

      expect(Array.from(parentSubitems!.keys())).to.deep.equal(['1', '2', '3', '4', '5']);
    });

    // TODO: test if removed children are removed from the map

    // TODO: test if parent is notified about updated metadata
  });

  describe('useCompoundItem', () => {
    it('knows its position within the parent and total number of registered items', () => {
      function Parent(props: React.PropsWithChildren<{}>) {
        const { children } = props;
        const { contextValue } = useCompoundParent<
          string,
          { ref: React.RefObject<HTMLSpanElement | null> }
        >();

        return (
          <CompoundComponentContext.Provider value={contextValue}>
            {children}
          </CompoundComponentContext.Provider>
        );
      }

      function Child() {
        const id = React.useId();
        const ref = React.useRef<HTMLSpanElement>(null);
        const { index, totalItemCount } = useCompoundItem(
          id,
          React.useMemo(() => ({ ref }), []),
        );

        return (
          <span data-testid="child" ref={ref}>
            {index + 1} of {totalItemCount}
          </span>
        );
      }

      const { getAllByTestId } = render(
        <Parent>
          <Child />
          <Child />
          <React.Fragment>
            <p>Unrelated element 1</p>
            <Child />
          </React.Fragment>
          <p>Unrelated element 2</p>
          <div>
            <Child />
          </div>
        </Parent>,
      );

      const children = getAllByTestId('child');

      children.forEach((child, index) => {
        expect(child.innerHTML).to.equal(`${index + 1} of 4`);
      });
    });

    it('gets assigned a generated id if none is provided', () => {
      function Parent(props: React.PropsWithChildren<{}>) {
        const { children } = props;
        const { contextValue } = useCompoundParent<
          number,
          { ref: React.RefObject<HTMLLIElement | null> }
        >();

        return (
          <CompoundComponentContext.Provider value={contextValue}>
            <ul>{children}</ul>
          </CompoundComponentContext.Provider>
        );
      }

      function idGenerator(existingIds: Set<string>) {
        return `item-${existingIds.size}`;
      }

      function Child() {
        const ref = React.useRef<HTMLLIElement>(null);
        const { id } = useCompoundItem<string, { ref: React.RefObject<HTMLLIElement | null> }>(
          idGenerator,
          React.useMemo(() => ({ ref }), []),
        );

        return <li ref={ref}>{id}</li>;
      }

      const { getAllByRole } = render(
        <Parent>
          <Child />
          <Child />
          <Child />
        </Parent>,
      );

      const children = getAllByRole('listitem');
      expect(children[0].innerHTML).to.equal('item-0');
      expect(children[1].innerHTML).to.equal('item-1');
      expect(children[2].innerHTML).to.equal('item-2');
    });
  });
});
