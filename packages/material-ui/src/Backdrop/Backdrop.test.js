import * as React from 'react';
import { expect } from 'chai';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '../test-utils/describeConformance';
import Backdrop from './Backdrop';
import Fade from '../Fade';

describe('<Backdrop />', () => {
  let mount;
  let classes;

  before(() => {
    // StrictModeViolation: uses Fade
    mount = createMount({ strict: false });
    classes = getClasses(<Backdrop open />);
  });

  after(() => {
    mount.cleanUp();
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
    const wrapper = mount(
      <Backdrop open className="woofBackdrop">
        <h1>Hello World</h1>
      </Backdrop>,
    );
    expect(wrapper.contains(<h1>Hello World</h1>)).to.equal(true);
  });
});
