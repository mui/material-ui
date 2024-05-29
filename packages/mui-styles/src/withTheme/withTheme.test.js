import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import Input from '@mui/material/Input';
import { isMuiElement } from '@mui/material/utils';
import PropTypes from 'prop-types';
import withTheme from './withTheme';
import ThemeProvider from '../ThemeProvider';

describe('withTheme', () => {
  const { render } = createRenderer();

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

    render(
      <ThemeProvider theme={{ foo: 'foo' }}>
        <TestWithTheme />
      </ThemeProvider>,
    );
    expect(text()).to.equal('foo');
  });

  it('hoist statics', () => {
    function Test() {
      return null;
    }
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
      render(<ThemedTarget ref={ref} />);
      expect(ref.current instanceof TargetComponent).to.equal(true);
    });

    it('forwards refs to React.forwardRef types', () => {
      const ThemedTarget = withTheme(
        React.forwardRef((props, ref) => <div {...props} ref={ref} />),
      );

      const ref = React.createRef();
      render(<ThemedTarget ref={ref} />);

      expect(ref.current.nodeName).to.equal('DIV');
    });
  });

  it('should throw is the import is invalid', () => {
    expect(() => withTheme(undefined)).to.throw(
      'You are calling withTheme(Component) with an undefined component',
    );
  });
});
