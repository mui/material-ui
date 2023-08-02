import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, describeConformance } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import Skeleton, { skeletonClasses as classes } from '@mui/joy/Skeleton';

describe('<Skeleton />', () => {
  const { render } = createRenderer();

  describeConformance(<Skeleton />, () => ({
    classes,
    inheritComponent: 'span',
    render,
    ThemeProvider,
    muiName: 'JoySkeleton',
    refInstanceof: window.HTMLSpanElement,
    testComponentPropWith: 'div',
    skip: ['classesRoot', 'componentsProp', 'themeVariants'],
    slots: {
      root: {
        expectedClassName: classes.root,
      },
    },
  }));

  it('should render nothing if not loading', () => {
    const { container } = render(<Skeleton loading={false} />);
    expect(container.firstChild).to.equal(null);
  });

  it('should render children', () => {
    const { container, getByTestId } = render(
      <Skeleton loading={false}>
        <div data-testid="children" />
      </Skeleton>,
    );
    expect(container.firstChild).to.equal(getByTestId('children'));
  });
});
