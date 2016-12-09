/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import StepConnector from 'src/Stepper/StepConnector';
import Stepper from 'src/Stepper/Stepper';
import FontIcon from 'src/FontIcon';
import getMuiTheme from 'src/styles/getMuiTheme';

describe('<Stepper />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});

  it('should have a default step connector', () => {
    const wrapper = shallowWithContext(
      <Stepper>
        <Step></Step>
        <Step></Step>
      </Stepper>
    );

    assert.ok(wrapper.find(StepConnector), 'should contain a <StepConnector /> child');
  });

  it('should allow the developer to specify a custom step connector', () => {
    const wrapper = shallowWithContext(
      <Stepper
        connector={<FontIcon className="material-icons">arrow-forward</FontIcon>}
      >
        <Step></Step>
        <Step></Step>
      </Stepper>
    );

    assert.ok(wrapper.find(FontIcon), 'should contain a <FontIcon /> child');
    assert.notOk(wrapper.find(StepConnector), 'should not contain a <StepConnector /> child');
  });

  it('should allow the step connector to be removed', () => {
    const wrapper = shallowWithContext(
      <Stepper connector={null}>
        <Step></Step>
        <Step></Step>
      </Stepper>
    );

    assert.notOk(wrapper.find(StepConnector), 'should not contain a <StepConnector /> child');
  });
