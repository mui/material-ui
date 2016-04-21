import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import RaisedButton from 'material-ui/RaisedButton';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import {assert} from 'chai';
import mount from 'enzyme/mount';
import getMuiTheme from 'styles/getMuiTheme';

describe('<RaisedButton />', () => {
  const muiTheme = getMuiTheme();
  const container = document.createElement('div');
  document.body.appendChild(container);
  const mountWithContext = (node) =>
    mount(node, {
      attachTo: container,
      context: {muiTheme},
    });

  it('renders a hover overlay of equal height to the button', () => {
    const wrappers = [
      () => mountWithContext(
        <RaisedButton>Hello World</RaisedButton>
      ),
      () => mountWithContext(
        <RaisedButton
          backgroundColor="#a4c639"
          icon={<ActionAndroid />}
        />
      ),
    ];

    wrappers.forEach((createWrapper) => {
      const wrapper = createWrapper();
      wrapper.simulate('mouseEnter');

      const overlay = wrapper.ref('overlay');
      const button = ReactDOM.findDOMNode(
        TestUtils.findRenderedDOMComponentWithTag(
          wrapper.instance(),
          'button'
        )
      );

      assert.strictEqual(
        overlay.node.clientHeight,
        button.clientHeight,
        'overlay height should match the button height'
      );
    });
  });
});
