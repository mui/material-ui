import React from 'react';
import { assert } from 'chai';
import PropTypes from 'prop-types';
import styled from './styled';
import { SheetsRegistry } from 'jss';
import { createMount } from '@material-ui/core/test-utils';
import { createMuiTheme } from '@material-ui/core/styles';
import { createGenerateClassName } from '@material-ui/styles';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import StylesProvider from '../StylesProvider';
import ThemeProvider from '../ThemeProvider';
import { styleFunction } from '@material-ui/core/Box';
import { indigo } from '@material-ui/core/colors';

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
    let wrapper;

    before(() => {
      wrapper = mount(
        <StyledButton clone data-test="enzyme">
          <div>Styled Components</div>
        </StyledButton>,
      );
    });

    it('should be able to pass props to cloned element', () => {
      assert.strictEqual(wrapper.find('div').props()['data-test'], 'enzyme');
    });

    it('should be able to clone the child element', () => {
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

  it('renders correct css with cache', () => {
    const sheetsRegistry = new SheetsRegistry();
    const generateClassName = createGenerateClassName();

    const useStylesCache = new Map();
    const CachedBox = styled('div')(styleFunction, {
      name: 'MuiBox',
      _useStylesCache: useStylesCache,
    });

    const theme = createMuiTheme({
      palette: {
        primary: {
          main: indigo[400],
        },
      },
      overrides: {
        MuiBox: {
          root: {
            background: 'transparent',
          },
        },
      },
    });

    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <StylesProvider
          sheetsRegistry={sheetsRegistry}
          sheetsCache={new Map()}
          generateClassName={generateClassName}
        >
          <CachedBox color="primary.main" fontSize={{ xs: 'h6.fontSize' }} onClick={() => {}} />
          <CachedBox color="primary.main" fontSize={{ xs: 'h5.fontSize' }} onClick={() => {}} />
          <CachedBox color="primary.main" fontSize={{ xs: 'h5.fontSize' }} onFocus={() => {}} />
        </StylesProvider>
      </ThemeProvider>,
    );
    assert.strictEqual(sheetsRegistry.registry.length, 2); // third box should use cached style
    assert.strictEqual([...useStylesCache.values()].reduce((sum, entry) => sum + entry.size, 0), 2);
    assert.deepEqual(sheetsRegistry.registry[0].classes, { root: 'MuiBox-root-1' });
    assert.deepEqual(sheetsRegistry.registry[0].rules.map.root.style, {
      color: indigo[400],
      background: 'transparent',
    });
    assert.deepEqual(
      sheetsRegistry.registry[0].rules.map['@media (min-width:0px)'].rules.map.root.style,
      {
        'font-size': theme.typography.h6.fontSize,
      },
    );
    assert.deepEqual(
      sheetsRegistry.registry[1].rules.map['@media (min-width:0px)'].rules.map.root.style,
      {
        'font-size': theme.typography.h5.fontSize,
      },
    );

    wrapper.unmount();
    assert.strictEqual(sheetsRegistry.registry.length, 0);
    assert.strictEqual(useStylesCache.size, 0);
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
        'You can not use the clone and component prop at the same time',
      );
    });

    it('warns when function is specified for style attribute', () => {
      const CachedBox = styled('div')(styleFunction, { name: 'MuiBox' });
      mount(
        <React.Fragment>
          <CachedBox
            fontSize={{ xs: 'h6.fontSize', sm: () => 'h4.fontSize', md: () => 'h3.fontSize' }}
          />
        </React.Fragment>,
      );
      assert.include(
        consoleErrorMock.args()[0][0],
        'You can not pass a function as style attribute',
      );
    });
  });

  it('should accept a child function', () => {
    mount(<StyledButton>{props => <div {...props}>Styled Components</div>}</StyledButton>);
  });
});
