import React from 'react';
import { expect } from 'chai';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '../test-utils/describeConformance';
import { createClientRender } from 'test/utils/createClientRender';
import FilledInput from './FilledInput';
import InputBase from '../InputBase';

describe('<FilledInput />', () => {
  let classes;
  let mount;
  const render = createClientRender();

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<FilledInput />);
  });

  describeConformance(<FilledInput open />, () => ({
    classes,
    inheritComponent: InputBase,
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
    after: () => mount.cleanUp(),
  }));

  it('should have the underline class', () => {
    const { container } = render(<FilledInput />);
    const rootNode = container.firstChild;
    expect(rootNode).to.have.class(classes.underline);
  });

  it('can disable the underline', () => {
    const { container } = render(<FilledInput disableUnderline />);
    const rootNode = container.firstChild;
    expect(rootNode).not.to.have.class(classes.underline);
  });
});
