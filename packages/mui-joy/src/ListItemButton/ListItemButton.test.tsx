import * as React from 'react';
import { expect } from 'chai';
import {
  describeConformance,
  describeJoyColorInversion,
  createRenderer,
  act,
  fireEvent,
} from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import ListItemButton, { listItemButtonClasses as classes } from '@mui/joy/ListItemButton';

describe('Joy <ListItemButton />', () => {
  const { render } = createRenderer();

  describeConformance(<ListItemButton />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    ThemeProvider,
    muiName: 'JoyListItemButton',
    refInstanceof: window.HTMLDivElement,
    testVariantProps: { color: 'primary' },
    testCustomVariant: true,
    skip: ['componentsProp', 'classesRoot'],
    slots: {
      root: {
        expectedClassName: classes.root,
      },
    },
  }));

  describeJoyColorInversion(<ListItemButton />, { muiName: 'JoyListItemButton', classes });

  it('should render with the selected class', () => {
    const { getByRole } = render(<ListItemButton selected />);
    expect(getByRole('button')).to.have.class(classes.selected);
  });

  it('should render with the variant class', () => {
    const { getByRole } = render(<ListItemButton variant="outlined" />);
    expect(getByRole('button')).to.have.class(classes.variantOutlined);
  });

  it('should render with primary color class', () => {
    const { getByRole } = render(<ListItemButton color="primary" />);
    expect(getByRole('button')).to.have.class(classes.colorPrimary);
  });

  it('should accept className prop', () => {
    const { container } = render(<ListItemButton className="foo-bar" />);
    expect(container.firstChild).to.have.class('foo-bar');
  });

  it('should be disabled', () => {
    const { container } = render(<ListItemButton disabled />);
    expect(container.firstChild).to.have.class(classes.disabled);
  });

  it('should accept custom role', () => {
    const { getByRole } = render(<ListItemButton role="menuitem" />);
    expect(getByRole('menuitem')).toBeVisible();
  });

  describe('prop: focusVisibleClassName', () => {
    it('should have focusVisible classes', () => {
      const { getByRole } = render(<ListItemButton />);
      const button = getByRole('button');

      act(() => {
        fireEvent.keyDown(document.activeElement || document.body, { key: 'Tab' });
        button.focus();
      });

      expect(button).to.have.class(classes.focusVisible);
    });
  });
});
