import * as React from 'react';
import { expect } from 'chai';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '../test-utils/describeConformance';
import { createClientRender } from 'test/utils/createClientRender';
import OutlinedInput from './OutlinedInput';
import InputBase from '../InputBase';

describe('<OutlinedInput />', () => {
  let classes;
  let mount;
  const render = createClientRender();

  before(() => {
    classes = getClasses(<OutlinedInput />);
    mount = createMount({ strict: true });
  });

  describeConformance(<OutlinedInput labelWidth={0} />, () => ({
    classes,
    inheritComponent: InputBase,
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
    after: () => mount.cleanUp(),
  }));

  it('should render a NotchedOutline', () => {
    const { container } = render(
      <OutlinedInput classes={{ notchedOutline: 'notched-outlined' }} labelWidth={0} />,
    );

    expect(container.querySelector('.notched-outlined')).not.to.equal(null);
  });
});
