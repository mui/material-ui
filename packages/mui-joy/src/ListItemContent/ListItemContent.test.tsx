import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import { ThemeProvider } from '@mui/joy/styles';
import ListItemContent, { listItemContentClasses as classes } from '@mui/joy/ListItemContent';
import describeConformance from '../../test/describeConformance';

describe('Joy <ListItemContent />', () => {
  const { render } = createRenderer();

  describeConformance(<ListItemContent />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    ThemeProvider,
    muiName: 'JoyListItemContent',
    refInstanceof: window.HTMLDivElement,
    skip: ['componentsProp', 'classesRoot', 'themeVariants'],
    slots: {
      root: {
        expectedClassName: classes.root,
      },
    },
  }));

  it('should have root className', () => {
    const { container } = render(<ListItemContent />);
    expect(container.firstChild).to.have.class(classes.root);
  });

  it('should accept className prop', () => {
    const { container } = render(<ListItemContent className="foo-bar" />);
    expect(container.firstChild).to.have.class('foo-bar');
  });
});
