import React from 'react';
import { assert } from 'chai';
import { createMount } from '@material-ui/core/test-utils';
import { Input } from '@material-ui/core';
import { isMuiElement } from '@material-ui/core/utils';
import PropTypes from 'prop-types';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import withTheme from './withTheme';
import ThemeProvider from '../ThemeProvider';

describe('withTheme', () => {
  let mount;

  before(() => {
    mount = createMount({ strict: true });
  });

  after(() => {
    mount.cleanUp();
  });

  it('should inject the theme', () => {
    const ref = React.createRef();
    const text = () => ref.current.textContent;
    function Test(props) {
      return <span ref={ref}>{props.theme.foo}</span>;
    }

    Test.propTypes = {
      theme: PropTypes.object,
    };

    const TestWithTheme = withTheme(Test);

    mount(
      <ThemeProvider theme={{ foo: 'foo' }}>
        <TestWithTheme />
      </ThemeProvider>,
    );
    assert.strictEqual(text(), 'foo');
  });

  it('hoist statics', () => {
    const Test = () => null;
    Test.someStatic = 'will not get hoisted';
    const TestWithTheme = withTheme(Test);
    assert.strictEqual(TestWithTheme.someStatic, Test.someStatic);
  });

  it('hoists mui internals', () => {
    assert.strictEqual(isMuiElement(<Input />, ['Input']), true);

    const ThemedInput = withTheme(Input);

    assert.strictEqual(isMuiElement(<ThemedInput />, ['Input']), true);
  });

  describe('refs', () => {
    it('forwards ref to class components', () => {
      // eslint-disable-next-line react/prefer-stateless-function
      class TargetComponent extends React.Component {
        render() {
          return null;
        }
      }
      const ThemedTarget = withTheme(TargetComponent);

      const ref = React.createRef();
      mount(
        <React.Fragment>
          <ThemedTarget ref={ref} />
        </React.Fragment>,
      );

      assert.instanceOf(ref.current, TargetComponent);
    });

    it('forwards refs to React.forwardRef types', () => {
      const ThemedTarget = withTheme(
        React.forwardRef((props, ref) => <div {...props} ref={ref} />),
      );

      const ref = React.createRef();
      mount(
        <React.Fragment>
          <ThemedTarget ref={ref} />
        </React.Fragment>,
      );

      assert.strictEqual(ref.current.nodeName, 'DIV');
    });

    describe('innerRef', () => {
      beforeEach(() => {
        consoleErrorMock.spy();
      });

      afterEach(() => {
        consoleErrorMock.reset();
        PropTypes.resetWarningCache();
      });

      it('is deprecated', () => {
        const ThemedDiv = withTheme('div');

        mount(
          <React.Fragment>
            <ThemedDiv innerRef={React.createRef()} />
          </React.Fragment>,
        );

        assert.strictEqual(consoleErrorMock.callCount(), 1);
        assert.include(
          consoleErrorMock.args()[0][0],
          'Warning: Failed prop type: Material-UI: the `innerRef` prop is deprecated',
        );
      });
    });
  });

  it('should throw is the import is invalid', () => {
    assert.throw(
      () => withTheme(undefined),
      'You are calling withTheme(Component) with an undefined component',
    );
  });
});
