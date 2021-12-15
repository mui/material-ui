import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, describeConformance } from 'test/utils';
import FormGroup, { formGroupClasses as classes } from '@mui/material/FormGroup';

describe('<FormGroup />', () => {
  const { render } = createRenderer();

  describeConformance(<FormGroup />, () => ({
    classes,
    inheritComponent: 'div',
    render,
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

    expect(queryByTestId('test-children')).not.to.equal(null);
  });
});
