import * as React from 'react';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import ExpansionPanelDetails from './ExpansionPanelDetails';
import consoleErrorMock from 'test/utils/consoleErrorMock';

describe('<ExpansionPanelDetails />', () => {
  const mount = createMount();
  let classes;

  before(() => {
    classes = getClasses(<ExpansionPanelDetails>foo</ExpansionPanelDetails>);
  });

  beforeEach(() => {
    consoleErrorMock.spy();
  });

  afterEach(() => {
    consoleErrorMock.reset();
  });

  describeConformance(<ExpansionPanelDetails>Conformance</ExpansionPanelDetails>, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));
});
