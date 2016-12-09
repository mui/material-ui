/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import Step from 'src/Stepper/Step';
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
        <Step /><Step />
      </Stepper>
    );

    assert.equal(wrapper.find(StepConnector).length, 1, 'should contain a <StepConnector /> child');
  });

  it('should allow the developer to specify a custom step connector', () => {
    const wrapper = shallowWithContext(
      <Stepper
        connector={<FontIcon className="material-icons">arrow-forward</FontIcon>}
      >
        <Step /><Step />
      </Stepper>
    );

    assert.equal(wrapper.find(FontIcon).length, 1, 'should contain a <FontIcon /> child');
    assert.equal(wrapper.find(StepConnector).length, 0, 'should not contain a <StepConnector /> child');
  });

  it('should allow the step connector to be removed', () => {
    const wrapper = shallowWithContext(
      <Stepper connector={null}>
        <Step /><Step />
      </Stepper>
    );

    assert.equal(wrapper.find(StepConnector).length, 0, 'should not contain a <StepConnector /> child');
  });
});
