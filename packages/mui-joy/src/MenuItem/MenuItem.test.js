import * as React from 'react';
import { expect } from 'chai';
import { describeConformance, createRenderer, act, fireEvent } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import MenuItem, { menuItemClasses as classes } from '@mui/joy/MenuItem';

describe('Joy <MenuItem />', () => {
  const { render } = createRenderer();

  describeConformance(<MenuItem />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    ThemeProvider,
    muiName: 'MuiMenuItem',
    refInstanceof: window.HTMLDivElement,
    testVariantProps: { color: 'primary' },
    skip: ['componentsProp', 'classesRoot'],
  }));

  it('should render with the selected class', () => {
    const { getByRole } = render(<MenuItem selected />);
    expect(getByRole('button')).to.have.class(classes.selected);
  });

  it('should render with the variant class', () => {
    const { getByRole } = render(<MenuItem variant="outlined" />);
    expect(getByRole('button')).to.have.class(classes.variantOutlined);
  });

  it('should render with primary color class', () => {
    const { getByRole } = render(<MenuItem color="primary" />);
    expect(getByRole('button')).to.have.class(classes.colorPrimary);
  });

  it('should accept className prop', () => {
    const { container } = render(<MenuItem className="foo-bar" />);
    expect(container.firstChild).to.have.class('foo-bar');
  });

  it('should be disabled', () => {
    const { container } = render(<MenuItem disabled />);
    expect(container.firstChild).to.have.class(classes.disabled);
  });

  describe('prop: focusVisibleClassName', () => {
    it('should have focusVisible classes', () => {
      const { getByRole } = render(<MenuItem />);
      const button = getByRole('button');

      act(() => {
        fireEvent.keyDown(document.activeElement || document.body, { key: 'Tab' });
        button.focus();
      });

      expect(button).to.have.class(classes.focusVisible);
    });
  });
});
