import * as React from 'react';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import ExpansionPanelSummary from './ExpansionPanelSummary';
import ButtonBase from '../ButtonBase';
import consoleErrorMock from 'test/utils/consoleErrorMock';

describe('<ExpansionPanelSummary />', () => {
  const mount = createMount();
  let classes;

  before(() => {
    // requires mocking the TransitionComponent of `ExpansionPanel`
    classes = getClasses(<ExpansionPanelSummary />);
  });

  beforeEach(() => {
    consoleErrorMock.spy();
  });

  afterEach(() => {
    consoleErrorMock.reset();
  });

  describeConformance(<ExpansionPanelSummary />, () => ({
    classes,
    inheritComponent: ButtonBase,
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));
});
