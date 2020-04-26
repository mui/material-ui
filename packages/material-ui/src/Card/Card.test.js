import * as React from 'react';
import { expect } from 'chai';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import { createClientRender } from 'test/utils/createClientRender';
import describeConformance from '../test-utils/describeConformance';
import Card from './Card';
import Paper from '../Paper';

describe('<Card />', () => {
  let mount;
  let classes;
  const render = createClientRender();
  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<Card />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<Card />, () => ({
    classes,
    inheritComponent: Paper,
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));

  it('when raised should render Paper with 8dp', () => {
    const { container } = render(<Card raised />);
    expect(container.firstChild).to.have.class('MuiPaper-elevation8');
  });
});
