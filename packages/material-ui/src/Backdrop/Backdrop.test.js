import * as React from 'react';
import { expect } from 'chai';
import { createMount, createClientRender, describeConformanceV5 } from 'test/utils';
import Backdrop, { backdropClasses as classes } from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

describe('<Backdrop />', () => {
  const render = createClientRender();
  const mount = createMount();

  describeConformanceV5(<Backdrop open />, () => ({
    classes,
    inheritComponent: Fade,
    render,
    mount,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiBackdrop',
    testVariantProps: { invisible: true },
    skip: [
      'componentProp',
      'componentsProp',
      // react-transition-group issue
      'reactTestRenderer',
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
});
