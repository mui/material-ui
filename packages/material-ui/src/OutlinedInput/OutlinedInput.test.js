import * as React from 'react';
import { expect } from 'chai';
import { getClasses } from 'test/utils';
import createMount from 'test/utils/createMount';
import { createClientRender } from 'test/utils/createClientRender';
import describeConformance from 'test/utils/describeConformance';
import OutlinedInput from './OutlinedInput';
import InputBase from '../InputBase';

describe('<OutlinedInput />', () => {
  let classes;
  const mount = createMount();
  const render = createClientRender();

  before(() => {
    classes = getClasses(<OutlinedInput />);
  });

  describeConformance(<OutlinedInput labelWidth={0} />, () => ({
    classes,
    inheritComponent: InputBase,
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));

  it('should render a NotchedOutline', () => {
    const { container } = render(
      <OutlinedInput classes={{ notchedOutline: 'notched-outlined' }} labelWidth={0} />,
    );

    expect(container.querySelector('.notched-outlined')).not.to.equal(null);
  });
});
