import * as React from 'react';
import { expect } from 'chai';
import { describeConformance, createRenderer, screen } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import List from '@mui/joy/List';
import ListDivider, { listDividerClasses as classes } from '@mui/joy/ListDivider';

describe('Joy <ListDivider />', () => {
  const { render } = createRenderer();

  describeConformance(<ListDivider />, () => ({
    classes,
    inheritComponent: 'li',
    render,
    ThemeProvider,
    muiName: 'JoyListDivider',
    refInstanceof: window.HTMLLIElement,
    testVariantProps: { inset: 'gutter' },
    skip: ['componentsProp', 'classesRoot'],
  }));

  it('should have role separator', () => {
    render(<ListDivider />);
    expect(screen.getByRole('separator')).to.have.class(classes.root);
  });

  it('should accept className prop', () => {
    const { container } = render(<ListDivider className="foo-bar" />);
    expect(container.firstChild).to.have.class('foo-bar');
  });

  describe('aria-orientation', () => {
    it('should not have aria-orientation by default', () => {
      // The
      render(<ListDivider />);
      expect(screen.getByRole('separator')).not.to.have.attribute('aria-orientation');
    });

    it('should have aria-orientation set to vertical', () => {
      render(
        <List orientation="horizontal">
          <ListDivider />
        </List>,
      );
      expect(screen.getByRole('separator')).to.have.attribute('aria-orientation', 'vertical');
    });

    it('should not add aria-orientation if role is custom', () => {
      render(
        <List orientation="horizontal">
          <ListDivider role="presentation" />
        </List>,
      );
      expect(screen.getByRole('presentation')).not.to.have.attribute('aria-orientation');
    });
  });
});
