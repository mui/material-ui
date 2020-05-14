import * as React from 'react';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import ExpansionPanelActions from './ExpansionPanelActions';

describe('<ExpansionPanelActions />', () => {
  const mount = createMount();
  let classes;

  before(() => {
    classes = getClasses(<ExpansionPanelActions>foo</ExpansionPanelActions>);
  });

  describeConformance(<ExpansionPanelActions>Conformance</ExpansionPanelActions>, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));
});
