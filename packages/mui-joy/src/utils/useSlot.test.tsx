import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from 'test/utils';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { SlotComponentProps } from '@mui/base/utils';
import { styled } from '../styles';
import useSlot from './useSlot';

describe('useSlot', () => {
  const { render } = createRenderer();

  describe('single slot', () => {
    const ItemRoot = styled('button')({});
    const Item = React.forwardRef<
      HTMLButtonElement,
      { component?: React.ElementType; href?: string }
    >((props, ref) => {
      const [SlotRoot, rootProps] = useSlot('root', {
        ref,
        className: 'root',
        elementType: ItemRoot,
        externalForwardedProps: props,
        ownerState: {},
      });
      return <SlotRoot {...rootProps} />;
    });

    it('should render correct tag', () => {
      const { getByRole } = render(<Item />);
      expect(getByRole('button')).toBeVisible();
    });

    it('should change leaf component and spread props', () => {
      const { getByRole } = render(<Item component="a" href="/" />);
      expect(getByRole('link')).toBeVisible();
    });
  });

  describe('multiple slots', () => {
    const ItemRoot = styled('button')({});
    const ItemDecorator = styled('span')({});
    const Item = React.forwardRef<
      HTMLButtonElement,
      {
        className?: string;
        component?: React.ElementType;
        href?: string;
        slots?: { root?: React.ElementType; decorator?: React.ElementType };
        slotsProps?: {
          root?: SlotComponentProps<'button', Record<string, any>, {}>;
          decorator?: SlotComponentProps<'span', { size?: 'sm' | 'md' } & Record<string, any>, {}>;
        };
      }
    >((props, ref) => {
      const [SlotRoot, rootProps] = useSlot('root', {
        ref,
        className: 'root',
        elementType: ItemRoot,
        externalForwardedProps: props,
        ownerState: {},
      });
      const [SlotDecorator, decoratorProps] = useSlot('decorator', {
        className: 'decorator',
        elementType: ItemDecorator,
        externalForwardedProps: props,
        ownerState: {},
        getSlotOwnerState: (mergedProps) => ({
          size: mergedProps.size ?? 'md',
        }),
      });
      return (
        <SlotRoot {...rootProps}>
          <SlotDecorator
            {...decoratorProps}
            className={`${decoratorProps.className} size-${decoratorProps.ownerState.size}`}
          />
        </SlotRoot>
      );
    });

    it('should render both tags', () => {
      const { getByRole } = render(<Item />);
      expect(getByRole('button')).toBeVisible();
      expect(getByRole('button').firstChild).to.have.tagName('span');
    });

    it('should have classes', () => {
      const { getByRole } = render(<Item />);
      expect(getByRole('button')).to.have.class('root');
      expect(getByRole('button').firstChild).to.have.class('decorator');
    });

    it('should append classes', () => {
      const { getByRole } = render(
        <Item className="foo-bar" slotsProps={{ decorator: { className: 'foo-bar' } }} />,
      );
      expect(getByRole('button')).to.have.class('root');
      expect(getByRole('button')).to.have.class('foo-bar');
      expect(getByRole('button').firstChild).to.have.class('decorator');
      expect(getByRole('button').firstChild).to.have.class('foo-bar');
    });

    it('slot has default size `md`', () => {
      const { getByRole } = render(<Item />);
      expect(getByRole('button').firstChild).to.have.class('size-md');
    });

    it('slot ownerstate should be overriable', () => {
      const { getByRole } = render(<Item slotsProps={{ decorator: { size: 'sm' } }} />);
      expect(getByRole('button').firstChild).to.have.class('size-sm');
    });

    it('slotsProps has higher priority', () => {
      const { getByRole } = render(
        <Item data-item="foo" slotsProps={{ root: { 'data-item': 'bar' } }} />,
      );
      expect(getByRole('button')).to.have.attribute('data-item', 'bar');
    });

    it('can change root leaf component with `component` prop', () => {
      const { getByRole } = render(<Item component="a" href="/" />);
      expect(getByRole('link')).toBeVisible();
    });

    it('use slotsProps `component` over `component` prop', () => {
      const { getByRole } = render(
        <Item component="div" slotsProps={{ root: { component: 'a', href: '/' } }} />,
      );
      expect(getByRole('link')).toBeVisible();
    });

    it('can change decorator leaf component', () => {
      const { getByRole } = render(<Item slotsProps={{ decorator: { component: 'div' } }} />);
      expect(getByRole('button').firstChild).to.have.tagName('div');
    });
  });

  describe('multiple slots with unstyled popper', () => {
    const ItemRoot = styled('div')({});
    const ItemListbox = styled('ul')({});

    const Item = ({ open = false, ...other }) => {
      const ref = React.useRef(null);
      const [SlotRoot, rootProps] = useSlot('root', {
        ref,
        className: 'root',
        elementType: ItemRoot,
        externalForwardedProps: other,
        ownerState: {},
      });
      const [SlotListbox, listboxProps] = useSlot('listbox', {
        className: 'listbox',
        elementType: PopperUnstyled,
        externalForwardedProps: other,
        ownerState: {},
        additionalProps: {
          open,
          role: 'menu',
          anchorEl: ref.current,
        },
        internalForwardedProps: {
          component: ItemListbox,
        },
      });
      return (
        <React.Fragment>
          <SlotRoot {...rootProps} />
          <SlotListbox {...listboxProps} />
        </React.Fragment>
      );
    };

    it('should render popper with styled-component', () => {
      const { getByRole } = render(<Item open />);
      expect(getByRole('menu')).toBeVisible();
      expect(getByRole('menu')).to.have.tagName('ul');
      expect(getByRole('menu')).to.have.class('listbox');
    });

    it('the listbox slot should be replaceable', () => {
      const Listbox = () => <ul />;
      const { getByRole } = render(<Item slots={{ listbox: Listbox }} />);
      expect(getByRole('list')).toBeVisible();
      expect(getByRole('list')).not.to.have.attribute('class');
    });

    it('the listbox leaf component can be changed', () => {
      const { getByRole } = render(<Item open slotsProps={{ listbox: { component: 'div' } }} />);
      expect(getByRole('menu')).to.have.tagName('div');
    });
  });
});
