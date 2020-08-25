import * as React from 'react';
import { getClasses, createMount, describeConformance, createClientRender } from 'test/utils';
import DialogContent from './DialogContent';

describe('<DialogContent />', () => {
  const mount = createMount();
  const render = createClientRender();
  let classes;

  before(() => {
    classes = getClasses(<DialogContent />);
  });

  describeConformance(<DialogContent />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));

  it('should render children', () => {
    const children = <p data-testid="test-children" />;
    const { getByTestId } = render(<DialogContent>{children}</DialogContent>);

    getByTestId('test-children');
  });
});
