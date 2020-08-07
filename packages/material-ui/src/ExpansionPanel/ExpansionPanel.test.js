import * as React from 'react';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import Paper from '../Paper';
import ExpansionPanel from './ExpansionPanel';
import ExpansionPanelSummary from '../ExpansionPanelSummary';
import consoleErrorMock from 'test/utils/consoleErrorMock';

describe('<ExpansionPanel />', () => {
  // StrictModeViolation: uses Collapse
  const mount = createMount({ strict: false });
  let classes;
  const minimalChildren = [<ExpansionPanelSummary key="header" />];

  before(() => {
    classes = getClasses(<ExpansionPanel>{minimalChildren}</ExpansionPanel>);
  });

  beforeEach(() => {
    consoleErrorMock.spy();
  });

  afterEach(() => {
    consoleErrorMock.reset();
  });

  describeConformance(<ExpansionPanel>{minimalChildren}</ExpansionPanel>, () => ({
    classes,
    inheritComponent: Paper,
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));
});
