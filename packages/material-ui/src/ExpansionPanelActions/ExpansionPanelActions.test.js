import React from 'react';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '../test-utils/describeConformance';
import ExpansionPanelActions from './ExpansionPanelActions';

describe('<ExpansionPanelActions />', () => {
  let mount;
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<ExpansionPanelActions>foo</ExpansionPanelActions>);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<ExpansionPanelActions>Conformance</ExpansionPanelActions>, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));
});
