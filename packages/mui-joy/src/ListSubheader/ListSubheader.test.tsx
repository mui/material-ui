import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { describeConformance, createRenderer, describeJoyColorInversion } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import ListSubheader, { listSubheaderClasses as classes } from '@mui/joy/ListSubheader';
import ListSubheaderDispatch from './ListSubheaderContext';

describe('Joy <ListSubheader />', () => {
  const { render } = createRenderer();

  describeConformance(<ListSubheader />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    ThemeProvider,
    muiName: 'JoyListSubheader',
    refInstanceof: window.HTMLDivElement,
    testVariantProps: { variant: 'solid' },
    testCustomVariant: true,
    skip: ['componentsProp', 'classesRoot'],
    slots: {
      root: {
        expectedClassName: classes.root,
      },
    },
  }));

  describeJoyColorInversion(<ListSubheader variant="soft" />, {
    muiName: 'JoyListSubheader',
    classes,
  });

  it('should have root className', () => {
    const { container } = render(<ListSubheader />);
    expect(container.firstChild).to.have.class(classes.root);
  });

  it('should accept className prop', () => {
    const { container } = render(<ListSubheader className="foo-bar" />);
    expect(container.firstChild).to.have.class('foo-bar');
  });

  it('should have variant class', () => {
    const { container } = render(<ListSubheader variant="soft" />);
    expect(container.firstChild).to.have.class(classes.variantSoft);
  });

  it('should have color class', () => {
    const { container } = render(<ListSubheader color="success" />);
    expect(container.firstChild).to.have.class(classes.colorSuccess);
  });

  it('should call dispatch context with the generated id', () => {
    const dispatch = spy();
    const { container } = render(
      <ListSubheaderDispatch.Provider value={dispatch}>
        <ListSubheader />
      </ListSubheaderDispatch.Provider>,
    );

    // @ts-ignore
    expect(dispatch.firstCall.calledWith(container.firstChild?.id)).to.equal(true);
  });
});
