import * as React from 'react';
import { expect } from 'chai';
import { getClasses, createMount, createClientRender, describeConformance } from 'test/utils';
import Backdrop from './Backdrop';
import Fade from '../Fade';

describe('<Backdrop />', () => {
  const mount = createMount({ strict: true });
  const render = createClientRender();
  let classes;

  before(() => {
    classes = getClasses(<Backdrop open />);
  });

  describeConformance(<Backdrop open />, () => ({
    classes,
    inheritComponent: Fade,
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: [
      'componentProp',
      // react-transition-group issue
      'reactTestRenderer',
    ],
  }));

  it('should render a backdrop div with content of nested children', () => {
    const { container } = render(
      <Backdrop open className="woofBackdrop">
        <h1>Hello World</h1>
      </Backdrop>,
    );
    expect(container.querySelector('h1')).to.have.text('Hello World');
  });
});
