import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, getClasses, createMount, describeConformance } from 'test/utils';
import FormGroup from './FormGroup';

describe('<FormGroup />', () => {
  const mount = createMount();
  const render = createClientRender();
  let classes;

  before(() => {
    classes = getClasses(<FormGroup />);
  });

  describeConformance(<FormGroup />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));

  it('should render a div with a div child', () => {
    const { queryByTestId } = render(
      <FormGroup>
        <div data-testid="test-children" />
      </FormGroup>,
    );

    expect(queryByTestId('test-children')).to.not.equal(null);
  });
});
