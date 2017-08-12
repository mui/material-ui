// @flow

import React from 'react';
import { spy } from 'sinon';
import { assert } from 'chai';
import { JssProvider, SheetsRegistry } from 'react-jss';
import { create } from 'jss';
import preset from 'jss-preset-default';
import withStyles from './withStyles';
import MuiThemeProvider from './MuiThemeProvider';
import createMuiTheme from './theme';
import createGenerateClassName from './createGenerateClassName';
import { createShallow, createMount, getClasses } from '../test-utils';
import consoleErrorMock from '../../test/utils/consoleErrorMock';

const Empty = () => <div />;
Empty.propTypes = {}; // Breaks the referential transparency for testing purposes.

describe('withStyles', () => {
  let shallow;
  let mount;

  before(() => {
    shallow = createShallow();
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  describe('props', () => {
    let StyledComponent1;
    let classes;

    before(() => {
      const styles = {
        root: {
          display: 'flex',
        },
      };
      StyledComponent1 = withStyles(styles, { name: 'MuiTextField' })(Empty);
      classes = getClasses(<StyledComponent1 />);
    });

    it('should provide a classes property', () => {
      const wrapper = shallow(<StyledComponent1 />);
      assert.deepEqual(wrapper.props().classes, classes, 'Should provide the classes property');
    });

    describe('prop: classes', () => {
      before(() => {
        consoleErrorMock.spy();
      });

      after(() => {
        consoleErrorMock.reset();
      });

      it('should accept a classes property', () => {
        const wrapper = shallow(<StyledComponent1 classes={{ root: 'h1' }} />);
        assert.deepEqual(wrapper.props().classes, {
          root: `${classes.root} h1`,
        });
        assert.strictEqual(consoleErrorMock.callCount(), 0);
      });

      it('should ignore undefined property', () => {
        const wrapper = shallow(<StyledComponent1 classes={{ root: undefined }} />);
        assert.deepEqual(wrapper.props().classes, {
          root: `${classes.root}`,
        });
        assert.strictEqual(consoleErrorMock.callCount(), 0);
      });

      it('should warn if providing a unknown key', () => {
        const wrapper = shallow(<StyledComponent1 classes={{ bar: 'foo' }} />);

        assert.deepEqual(wrapper.props().classes, {
          root: classes.root,
          bar: 'undefined foo',
        });
        assert.strictEqual(consoleErrorMock.callCount(), 1);
        assert.match(
          consoleErrorMock.args()[0][0],
          /Material-UI: the key `bar` provided to the classes property object is not implemented/,
        );
      });
    });

    describe('prop: innerRef', () => {
      it('should provide a ref on the inner component', () => {
        const handleRef = spy();
        mount(<StyledComponent1 innerRef={handleRef} />);
        assert.strictEqual(handleRef.callCount, 1);
      });
    });
  });

  describe('mount', () => {
    let sheetsRegistry;
    let jss;

    beforeEach(() => {
      jss = create(preset());
      jss.options.createGenerateClassName = createGenerateClassName;
      sheetsRegistry = new SheetsRegistry();
    });

    it('should run lifecycles with no theme', () => {
      const styles = {
        root: {
          display: 'flex',
        },
      };
      const StyledComponent = withStyles(styles)(Empty);

      const wrapper = mount(
        <MuiThemeProvider theme={createMuiTheme()}>
          <JssProvider registry={sheetsRegistry} jss={jss}>
            <StyledComponent />
          </JssProvider>
        </MuiThemeProvider>,
      );
      assert.strictEqual(sheetsRegistry.registry.length, 1);
      assert.deepEqual(sheetsRegistry.registry[0].classes, {
        root: 'Empty-root-1',
      });
      wrapper.update();
      assert.strictEqual(sheetsRegistry.registry.length, 1, 'should only attach once');
      assert.deepEqual(sheetsRegistry.registry[0].classes, {
        root: 'Empty-root-1',
      });
      wrapper.setProps({
        theme: createMuiTheme(),
      });
      assert.strictEqual(sheetsRegistry.registry.length, 1, 'should only attach once');
      assert.deepEqual(sheetsRegistry.registry[0].classes, {
        root: 'Empty-root-1',
      });

      wrapper.unmount();
      assert.strictEqual(sheetsRegistry.registry.length, 0);
    });

    it('should work when depending on a theme', () => {
      const styles = (theme: Object) => ({
        root: {
          padding: theme.spacing.unit,
        },
      });
      const StyledComponent = withStyles(styles, { name: 'MuiTextField' })(Empty);

      const wrapper = mount(
        <MuiThemeProvider theme={createMuiTheme()}>
          <JssProvider registry={sheetsRegistry} jss={jss}>
            <StyledComponent />
          </JssProvider>
        </MuiThemeProvider>,
      );
      assert.strictEqual(sheetsRegistry.registry.length, 1, 'should only attach once');
      assert.deepEqual(sheetsRegistry.registry[0].classes, {
        root: 'MuiTextField-root-1',
      });
      wrapper.setProps({
        theme: createMuiTheme(),
      });
      assert.strictEqual(sheetsRegistry.registry.length, 1, 'should only attach once');
      assert.deepEqual(sheetsRegistry.registry[0].classes, {
        root: 'MuiTextField-root-2',
      });
    });

    it('should support the overrides key', () => {
      const styles = {
        root: {
          padding: 8,
        },
      };
      const StyledComponent = withStyles(styles, { name: 'MuiTextField' })(Empty);

      mount(
        <MuiThemeProvider
          theme={createMuiTheme({
            overrides: {
              MuiTextField: {
                root: {
                  padding: 9,
                },
              },
            },
          })}
        >
          <JssProvider registry={sheetsRegistry} jss={jss}>
            <StyledComponent />
          </JssProvider>
        </MuiThemeProvider>,
      );

      assert.strictEqual(sheetsRegistry.registry.length, 1, 'should only attach once');
      assert.deepEqual(sheetsRegistry.registry[0].rules.raw, {
        root: {
          padding: 9,
        },
      });
    });
  });
});
