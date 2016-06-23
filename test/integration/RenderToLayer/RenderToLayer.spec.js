/* eslint-env mocha */
import {assert} from 'chai';
import React, {Component, PropTypes} from 'react';
import {mount} from 'enzyme';
import RenderToLayer from 'src/internal/RenderToLayer';

describe('<RenderToLayer />', () => {
  it('should pass updated muiTheme context if muiTheme context changes', () => {
    class Child extends Component {
      static contextTypes = {
        muiTheme: PropTypes.object.isRequired,
      };

      render() {
        return <div>{this.context.muiTheme.foo}</div>;
      }
    }

    class Parent extends Component {
      static childContextTypes = {
        muiTheme: PropTypes.object.isRequired,
      };

      state = {
        muiTheme: {
          zIndex: {
            layer: 1,
          },
          foo: 'initial',
        },
      };

      getChildContext() {
        return {
          muiTheme: this.state.muiTheme,
        };
      }

      renderLayer = () => {
        return <Child />;
      };

      render() {
        return <RenderToLayer render={this.renderLayer} open={true} />;
      }
    }

    const instance = mount(<Parent />);
    const portal = document.body.lastChild;

    assert.strictEqual(portal.firstChild.innerHTML, 'initial');
    instance.setState({
      muiTheme: {
        zIndex: {
          layer: 1,
        },
        foo: 'changed',
      },
    });
    assert.strictEqual(portal.firstChild.innerHTML, 'changed');
  });
});
