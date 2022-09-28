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
        components?: { root?: React.ElementType; decorator?: React.ElementType };
        componentsProps?: {
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
        <Item className="foo-bar" componentsProps={{ decorator: { className: 'foo-bar' } }} />,
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
      const { getByRole } = render(<Item componentsProps={{ decorator: { size: 'sm' } }} />);
      expect(getByRole('button').firstChild).to.have.class('size-sm');
    });

    it('componentsProps has higher priority', () => {
      const { getByRole } = render(
        <Item data-item="foo" componentsProps={{ root: { 'data-item': 'bar' } }} />,
      );
      expect(getByRole('button')).to.have.attribute('data-item', 'bar');
    });

    it('can change root leaf component with `component` prop', () => {
      const { getByRole } = render(<Item component="a" href="/" />);
      expect(getByRole('link')).toBeVisible();
    });

    it('use componentsProps `component` over `component` prop', () => {
      const { getByRole } = render(
        <Item component="div" componentsProps={{ root: { component: 'a', href: '/' } }} />,
      );
      expect(getByRole('link')).toBeVisible();
    });

    it('can change decorator leaf component', () => {
      const { getByRole } = render(<Item componentsProps={{ decorator: { component: 'div' } }} />);
      expect(getByRole('button').firstChild).to.have.tagName('div');
    });
  });

  describe('multiple slots with unstyled popper', () => {
    const ItemRoot = styled('div')({});
    const ItemListbox = styled('ul')({});
    const ItemOption = styled('div')({});

    const Item = (props: {
      component?: React.ElementType;
      components?: {
        root?: React.ElementType;
        listbox?: React.ElementType;
        option?: React.ElementType;
      };
      componentsProps?: {
        root?: SlotComponentProps<'button', Record<string, any>, {}>;
        listbox?: SlotComponentProps<'span', Record<string, any>, {}>;
        option?: SlotComponentProps<'div', Record<string, any>, {}>;
      };
    }) => {
      const ref = React.useRef(null);
      const [SlotRoot, rootProps] = useSlot('root', {
        ref,
        className: 'root',
        elementType: ItemRoot,
        externalForwardedProps: props,
        ownerState: {},
      });
      const [SlotListbox, listboxProps] = useSlot('listbox', {
        className: 'listbox',
        elementType: PopperUnstyled,
        externalForwardedProps: props,
        ownerState: {},
        additionalProps: {
          open: true,
          role: 'menu',
          anchorEl: () => document.createElement('div'),
        },
      });
      const [SlotOption, optionProps] = useSlot('option', {
        className: 'option',
        elementType: ItemOption,
        externalForwardedProps: props,
        ownerState: {},
        additionalProps: {
          role: 'menuitem',
        },
      });
      return (
        <React.Fragment>
          <SlotRoot {...rootProps} />
          <SlotListbox component={ItemListbox} {...listboxProps}>
            <SlotOption as="li" {...optionProps} />
          </SlotListbox>
        </React.Fragment>
      );
    };

    it('should render popper with styled-component', () => {
      const { getByRole } = render(<Item />);
      expect(getByRole('menu')).toBeVisible();
      expect(getByRole('menu')).to.have.tagName('ul');
      expect(getByRole('menu')).to.have.class('listbox');
      expect(getByRole('menuitem')).to.have.tagName('li');
    });

    it('the listbox slot should be replaceable', () => {
      const Listbox = () => <ul />;
      const { getByRole } = render(<Item components={{ listbox: Listbox }} />);
      expect(getByRole('list')).toBeVisible();
      expect(getByRole('list')).not.to.have.attribute('class');
    });

    it('the listbox leaf component can be changed', () => {
      const { getByRole } = render(<Item componentsProps={{ listbox: { component: 'div' } }} />);
      expect(getByRole('menu')).to.have.tagName('div');
    });

    it('the option leaf component can be changed', () => {
      const { getByRole } = render(<Item componentsProps={{ option: { component: 'div' } }} />);
      expect(getByRole('menuitem')).to.have.tagName('div');
    });
  });
});
