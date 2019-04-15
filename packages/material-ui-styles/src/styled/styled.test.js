import React from 'react';
import { assert } from 'chai';
import PropTypes from 'prop-types';
import styled from './styled';
import { SheetsRegistry } from 'jss';
import { createMount } from '@material-ui/core/test-utils';
import { createGenerateClassName } from '@material-ui/styles';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import StylesProvider from '../StylesProvider';

describe('styled', () => {
  let mount;
  let StyledButton;

  before(() => {
    // StrictModeViolation: uses makeStyles
    mount = createMount({ strict: false });
    StyledButton = styled('button')({
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 48,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    });
  });

  after(() => {
    mount.cleanUp();
  });

  it('should work as expected', () => {
    const sheetsRegistry = new SheetsRegistry();
    const generateClassName = createGenerateClassName();

    mount(
      <StylesProvider sheetsRegistry={sheetsRegistry} generateClassName={generateClassName}>
        <StyledButton>Styled Components</StyledButton>
      </StylesProvider>,
    );

    assert.strictEqual(sheetsRegistry.registry.length, 1);
    assert.deepEqual(sheetsRegistry.registry[0].classes, { root: 'button-root-1' });
  });

  describe('prop: clone', () => {
    it('should be able to clone the child element', () => {
      const wrapper = mount(
        <StyledButton clone>
          <div>Styled Components</div>
        </StyledButton>,
      );
      assert.strictEqual(wrapper.getDOMNode().nodeName, 'DIV');
      wrapper.setProps({
        clone: false,
      });
      assert.strictEqual(wrapper.getDOMNode().nodeName, 'BUTTON');
    });
  });

  it('should filter some props', () => {
    const style = props => ({
      background: props.color,
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 48,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    });
    style.filterProps = ['color'];
    style.propTypes = {};
    const StyledDiv = styled('div')(style);
    const wrapper = mount(
      <StyledDiv data-test="enzyme" color="blue">
        Styled Components
      </StyledDiv>,
    );
    assert.strictEqual(wrapper.find('div').props().color, undefined);
    assert.strictEqual(wrapper.find('div').props()['data-test'], 'enzyme');
  });

  describe('warnings', () => {
    beforeEach(() => {
      consoleErrorMock.spy();
    });

    afterEach(() => {
      consoleErrorMock.reset();
      PropTypes.resetWarningCache();
    });

    it('warns if it cant detect the secondary action properly', () => {
      mount(
        <StyledButton clone component="div">
          <div>Styled Components</div>
        </StyledButton>,
      );
      assert.strictEqual(consoleErrorMock.callCount(), 1);
      assert.include(
        consoleErrorMock.args()[0][0],
        'You can not use the clone and component properties at the same time',
      );
    });
  });

  it('should accept a child function', () => {
    mount(<StyledButton>{props => <div {...props}>Styled Components</div>}</StyledButton>);
  });
});
