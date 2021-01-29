import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, createMount, describeConformanceV5 } from 'test/utils';
import FormGroup from './FormGroup';
import classes from './formGroupClasses';

describe('<FormGroup />', () => {
  const mount = createMount();
  const render = createClientRender();

  describeConformanceV5(<FormGroup />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    muiName: 'MuiFormGroup',
    refInstanceof: window.HTMLDivElement,
    testVariantProps: { row: true },
    skip: ['componentProp', 'componentsProp'],
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
