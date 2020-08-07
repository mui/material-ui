import * as React from 'react';
import { expect } from 'chai';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import Backdrop from './Backdrop';
import Fade from '../Fade';

describe('<Backdrop />', () => {
  // StrictModeViolation: uses Fade
  const mount = createMount({ strict: false });
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
    const wrapper = mount(
      <Backdrop open className="woofBackdrop">
        <h1>Hello World</h1>
      </Backdrop>,
    );
    expect(wrapper.contains(<h1>Hello World</h1>)).to.equal(true);
  });
});
