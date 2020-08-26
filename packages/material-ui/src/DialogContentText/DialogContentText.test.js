import * as React from 'react';
import { createClientRender, getClasses, describeConformance, createMount } from 'test/utils';
import DialogContentText from './DialogContentText';
import Typography from '../Typography';

describe('<DialogContentText />', () => {
  const mount = createMount();
  const render = createClientRender();
  let classes;

  before(() => {
    classes = getClasses(<DialogContentText />);
  });

  describeConformance(<DialogContentText>foo</DialogContentText>, () => ({
    classes,
    inheritComponent: Typography,
    mount,
    refInstanceof: window.HTMLParagraphElement,
    skip: ['componentProp'],
  }));

  describe('prop: children', () => {
    it('should render children', () => {
      const children = <span data-testid="test-children" />;
      const { getByTestId } = render(<DialogContentText>{children}</DialogContentText>);

      getByTestId('test-children');
    });
  });
});
