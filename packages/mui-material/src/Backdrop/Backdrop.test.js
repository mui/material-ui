import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer } from '@mui/internal-test-utils';
import Backdrop, { backdropClasses as classes } from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import describeConformance from '../../test/describeConformance';

describe('<Backdrop />', () => {
  const { clock, render } = createRenderer();

  describeConformance(<Backdrop open />, () => ({
    classes,
    inheritComponent: Fade,
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiBackdrop',
    testVariantProps: { invisible: true },
    slots: {
      root: {
        expectedClassName: classes.root,
      },
      transition: {
        testWithElement: null,
      },
    },
    skip: ['componentProp', 'componentsProp'],
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
