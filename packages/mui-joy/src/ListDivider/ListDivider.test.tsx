import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, screen } from '@mui/internal-test-utils';
import { ThemeProvider } from '@mui/joy/styles';
import List from '@mui/joy/List';
import ListDivider, { listDividerClasses as classes } from '@mui/joy/ListDivider';
import describeConformance from '../../test/describeConformance';

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
    slots: {
      root: {
        expectedClassName: classes.root,
      },
    },
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

  describe('semantics', () => {
    it('should be `li` with role `separator` by default', () => {
      render(<ListDivider />);

      expect(screen.getByRole('separator')).to.have.tagName('li');
    });

    it('should still be `li` if List is a `ul` with role `menu`', () => {
      render(
        <List role="menu">
          <ListDivider />
        </List>,
      );

      expect(screen.getByRole('separator')).to.have.tagName('li');
    });

    it('should be `div` if `List` is not one of `ol, ul, menu`', () => {
      const { container } = render(
        <List component="div" role="menu">
          <ListDivider />
        </List>,
      );
      expect(screen.queryByRole('separator')).to.equal(null);
      expect(container.firstChild?.firstChild).to.have.tagName('div');
    });
  });
});
