import * as React from 'react';
import { expect } from 'chai';
import { describeConformance, createRenderer } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import List, { listClasses as classes } from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';

describe('Joy <List />', () => {
  const { render } = createRenderer();

  describeConformance(<List />, () => ({
    classes,
    inheritComponent: 'ul',
    render,
    ThemeProvider,
    muiName: 'JoyList',
    refInstanceof: window.HTMLUListElement,
    skip: ['componentsProp', 'classesRoot', 'themeVariants'],
  }));

  it('should have root className', () => {
    const { container } = render(<List />);
    expect(container.firstChild).to.have.class(classes.root);
    expect(container.firstChild).to.have.class(classes.sizeMd);
  });

  it('should accept className prop', () => {
    const { container } = render(<List className="foo-bar" />);
    expect(container.firstChild).to.have.class('foo-bar');
  });

  it('should have sm classes', () => {
    const { container } = render(<List size="sm" />);
    expect(container.firstChild).to.have.class(classes.sizeSm);
  });

  it('should have lg classes', () => {
    const { container } = render(<List size="lg" />);
    expect(container.firstChild).to.have.class(classes.sizeLg);
  });

  it('should have nested classes', () => {
    const { getByRole } = render(
      <ListItem nested>
        <List />
      </ListItem>,
    );
    expect(getByRole('list')).to.have.class(classes.nested);
  });

  it('should have row classes', () => {
    const { getByRole } = render(<List row />);
    expect(getByRole('list')).to.have.class(classes.row);
  });
});
