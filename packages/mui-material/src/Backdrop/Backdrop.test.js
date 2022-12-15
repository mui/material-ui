import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer, describeConformance } from 'test/utils';
import Backdrop, { backdropClasses as classes } from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';

describe('<Backdrop />', () => {
  const { clock, render } = createRenderer();

  describeConformance(<Backdrop open />, () => ({
    classes,
    inheritComponent: Fade,
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiBackdrop',
    testVariantProps: { invisible: true },
    testLegacyComponentsProp: true,
    slots: {
      root: {
        expectedClassName: classes.root,
      },
    },
    skip: [
      'componentProp',
      'componentsProp',
      // react-transition-group issue
      'reactTestRenderer',
      'slotPropsCallback', // not supported yet
    ],
  }));

  it('should render a backdrop div with content of nested children', () => {
    const { container } = render(
      <Backdrop open>
        <h1>Hello World</h1>
      </Backdrop>,
    );
    expect(container.querySelector('h1')).to.have.text('Hello World');
  });

  describe('prop: transitionDuration', () => {
    clock.withFakeTimers();

    it('delays appearance of its children', () => {
      const handleEntered = spy();
      render(
        <Backdrop open transitionDuration={1954} onEntered={handleEntered}>
          <div />
        </Backdrop>,
      );

      expect(handleEntered.callCount).to.equal(0);

      clock.tick(1954);

      expect(handleEntered.callCount).to.equal(1);
    });
  });
});
