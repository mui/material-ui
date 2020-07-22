import * as React from 'react';
import { expect } from 'chai';
import { getClasses, createMount, createClientRender, describeConformance } from 'test/utils';
import FilledInput from './FilledInput';
import InputBase from '../InputBase';

describe('<FilledInput />', () => {
  let classes;
  const mount = createMount();
  const render = createClientRender();

  before(() => {
    classes = getClasses(<FilledInput />);
  });

  describeConformance(<FilledInput open />, () => ({
    classes,
    inheritComponent: InputBase,
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
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
