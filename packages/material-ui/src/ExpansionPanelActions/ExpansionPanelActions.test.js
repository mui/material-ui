import * as React from 'react';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import ExpansionPanelActions from './ExpansionPanelActions';
import consoleErrorMock from 'test/utils/consoleErrorMock';

describe('<ExpansionPanelActions />', () => {
  const mount = createMount();
  let classes;

  before(() => {
    classes = getClasses(<ExpansionPanelActions>foo</ExpansionPanelActions>);
  });

  beforeEach(() => {
    consoleErrorMock.spy();
  });

  afterEach(() => {
    consoleErrorMock.reset();
  });

  describeConformance(<ExpansionPanelActions>Conformance</ExpansionPanelActions>, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));
});
