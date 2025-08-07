import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import { ThemeProvider } from '@mui/joy/styles';
import MenuList, { menuListClasses as classes } from '@mui/joy/MenuList';
import describeConformance from '../../test/describeConformance';

describe('Joy <MenuList />', () => {
  const { render } = createRenderer();

  describeConformance(<MenuList />, () => ({
    classes,
    inheritComponent: 'ul',
    render,
    ThemeProvider,
    muiName: 'JoyMenuList',
    refInstanceof: window.HTMLUListElement,
    testVariantProps: { variant: 'solid' },
    testCustomVariant: true,
    skip: ['componentsProp', 'classesRoot'],
    slots: {
      root: {
        expectedClassName: classes.root,
      },
    },
  }));

  it('should have root className', () => {
    const { container } = render(<MenuList />);
    expect(container.firstChild).to.have.class(classes.root);
    expect(container.firstChild).to.have.class(classes.sizeMd);
  });

  it('should accept className prop', () => {
    const { container } = render(<MenuList className="foo-bar" />);
    expect(container.firstChild).to.have.class('foo-bar');
  });

  it('prop: size', () => {
    const screen = render(<MenuList size="sm" />);
    expect(screen.getByRole('menu')).to.have.class(classes.sizeSm);
  });

  it('prop: variant', () => {
    const screen = render(<MenuList variant="outlined" />);
    expect(screen.getByRole('menu')).to.have.class(classes.variantOutlined);
  });

  it('prop: color', () => {
    const screen = render(<MenuList color="primary" />);
    expect(screen.getByRole('menu')).to.have.class(classes.colorPrimary);
  });
});
