import * as React from 'react';
import { getClasses, createMount, describeConformance, createClientRender } from 'test/utils';
import DialogTitle from './DialogTitle';

describe('<DialogTitle />', () => {
  const mount = createMount();
  const render = createClientRender();
  let classes;

  before(() => {
    classes = getClasses(<DialogTitle>foo</DialogTitle>);
  });

  describeConformance(<DialogTitle>foo</DialogTitle>, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));

  it('should render JSX children', () => {
    const children = <span data-testid="test-children" />;
    const { getByTestId } = render(<DialogTitle disableTypography>{children}</DialogTitle>);

    getByTestId('test-children');
  });

  it('should render string children as given string', () => {
    const children = 'Hello';
    const { getByText } = render(<DialogTitle>{children}</DialogTitle>);

    getByText('Hello');
  });
});
