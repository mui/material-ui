import React from 'react';
import { expect } from 'chai';
import { createMount } from 'test/utils';
import { Input } from '@material-ui/core';
import { isMuiElement } from '@material-ui/core/utils';
import PropTypes from 'prop-types';
import withTheme from './withTheme';
import ThemeProvider from '../ThemeProvider';

describe('withTheme', () => {
  const mount = createMount();

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
    expect(text()).to.equal('foo');
  });

  it('hoist statics', () => {
    const Test = () => null;
    Test.someStatic = 'will not get hoisted';
    const TestWithTheme = withTheme(Test);
    expect(TestWithTheme.someStatic).to.equal(Test.someStatic);
  });

  it('hoists mui internals', () => {
    expect(isMuiElement(<Input />, ['Input'])).to.equal(true);

    const ThemedInput = withTheme(Input);

    expect(isMuiElement(<ThemedInput />, ['Input'])).to.equal(true);
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
      mount(<ThemedTarget ref={ref} />);
      expect(ref.current instanceof TargetComponent).to.equal(true);
    });

    it('forwards refs to React.forwardRef types', () => {
      const ThemedTarget = withTheme(
        React.forwardRef((props, ref) => <div {...props} ref={ref} />),
      );

      const ref = React.createRef();
      mount(<ThemedTarget ref={ref} />);

      expect(ref.current.nodeName).to.equal('DIV');
    });

    describe('innerRef', () => {
      beforeEach(() => {
        PropTypes.resetWarningCache();
      });

      it('is deprecated', () => {
        const ThemedDiv = withTheme('div');

        expect(() => {
          PropTypes.checkPropTypes(
            ThemedDiv.propTypes,
            { innerRef: React.createRef() },
            'prop',
            'ThemedDiv',
          );
        }).toErrorDev('Warning: Failed prop type: Material-UI: The `innerRef` prop is deprecated');
      });
    });
  });

  it('should throw is the import is invalid', () => {
    expect(() => withTheme(undefined)).to.throw(
      'You are calling withTheme(Component) with an undefined component',
    );
  });
});
