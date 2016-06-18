/* eslint-env mocha */
import React from 'react';
import {mount} from 'enzyme';
import {assert} from 'chai';
import AppBar from 'src/AppBar';
import IconButton from 'src/IconButton';
import FontIcon from 'src/FontIcon';
import getMuiTheme from 'src/styles/getMuiTheme';

describe('<AppBar />', () => {
  const muiTheme = getMuiTheme();
  const mountWithContext = (node) => mount(node, {context: {muiTheme}});

  it('renders a FontIcon inside the iconElementLeft with custom color', () => {
    const wrapper = mountWithContext(
      <AppBar
        iconElementLeft={
          <IconButton>
            <FontIcon className="material-icons" color="red">home</FontIcon>
          </IconButton>
        }
      />
    );

    assert.strictEqual(wrapper.find(FontIcon).node.props.color, 'red', 'FontIcon should have color set to red');
    assert.strictEqual(
      wrapper.find(FontIcon).node.props.style.color,
      undefined,
      'FontIcon`s style object should not contain the color property'
    );
  });

  it('renders a FontIcon inside the iconElementRight with custom color', () => {
    const wrapper = mountWithContext(
      <AppBar
        iconElementRight={
          <IconButton>
            <FontIcon className="material-icons" color="red">home</FontIcon>
          </IconButton>
        }
      />
    );

    assert.strictEqual(wrapper.find(FontIcon).node.props.color, 'red', 'FontIcon should have color set to red');
    assert.strictEqual(
      wrapper.find(FontIcon).node.props.style.color,
      undefined,
      'FontIcon`s style object should not contain the color property'
    );
  });
});
