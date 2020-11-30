import * as React from 'react';
// import { expect } from 'chai';
// import { createClientRender } from 'test/utils/createClientRender';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import SwitchThumb from './SwitchThumb';

describe('<SwitchThumb />', () => {
  const mount = createMount();
  let classes;

  before(() => {
    classes = getClasses(<SwitchThumb />);
  });

  describeConformance(<SwitchThumb />, () => ({
    classes,
    inheritComponent: 'span',
    mount,
    refInstanceof: window.HTMLSpanElement,
    testComponentPropWith: 'span',
  }));
  // describe('prop: padding', () => {
  //   it('doesn not have a class for padding by default', () => {
  //     const { container } = renderInTable(<TableCell padding="default" />);
  //     expect(container.querySelector('td')).to.not.have.class(classes.paddingDefault);
  //   });

  //   it('has a class when `none`', () => {
  //     const { container } = renderInTable(<TableCell padding="none" />);
  //     expect(container.querySelector('td')).to.have.class(classes.paddingNone);
  //   });

  //   it('has a class when `checkbox`', () => {
  //     const { container } = renderInTable(<TableCell padding="checkbox" />);
  //     expect(container.querySelector('td')).to.have.class(classes.paddingCheckbox);
  //   });
  // });

  // it('has a class when `size="small"`', () => {
  //   const { container } = renderInTable(<TableCell size="small" />);
  //   expect(container.querySelector('td')).to.have.class(classes.sizeSmall);
  // });

  // it('should render children', () => {
  //   const children = <p data-testid="hello">Hello</p>;
  //   const { getByTestId } = renderInTable(<TableCell>{children}</TableCell>);
  //   expect(getByTestId('hello')).to.not.equal(null);
  // });
});
