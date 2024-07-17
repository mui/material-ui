import * as React from 'react';
import { createRenderer } from '@mui/internal-test-utils';
import CardActions, { cardActionsClasses as classes } from '@mui/material/CardActions';
import { expect } from 'chai';
import describeConformance from '../../test/describeConformance';

describe('<CardActions />', () => {
  const { render } = createRenderer();

  describeConformance(<CardActions />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiCardActions',
    testVariantProps: { disableSpacing: true },
    skip: ['componentProp', 'componentsProp'],
  }));

  it('should render a children element', function test() {
    const { queryByTestId } = render(
      <CardActions>
        <div data-testid="test-children" />
      </CardActions>,
    );

    expect(queryByTestId('test-children')).not.to.equal(null);
  });
});
