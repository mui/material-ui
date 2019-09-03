import React from 'react';
import { expect } from 'chai';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '../test-utils/describeConformance';
import { cleanup, createClientRender } from 'test/utils/createClientRender';
import FilledInput from './FilledInput';
import InputBase from '../InputBase';

describe('<FilledInput />', () => {
  let classes;
  let mount;
  const render = createClientRender({ strict: true });

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<FilledInput />);
  });

  afterEach(() => {
    cleanup();
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
    const root = container.firstChild;
    expect(root).to.have.class(classes.underline);
  });

  it('can disable the underline', () => {
    const { container } = render(<FilledInput disableUnderline />);
    const root = container.firstChild;
    expect(root).not.to.have.class(classes.underline);
  });
});
