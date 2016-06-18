/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import IconButton from 'src/IconButton';
import FontIcon from 'src/FontIcon';
import getMuiTheme from 'src/styles/getMuiTheme';

describe('<IconButton />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});


  it('should render children with custom color', () => {
    const wrapper = shallowWithContext(
      <IconButton>
        <FontIcon className="material-icons" color="red">home</FontIcon>
      </IconButton>
    );

    assert.ok(wrapper.find(FontIcon), 'should contain the FontIcon child');
    assert.strictEqual(wrapper.find(FontIcon).node.props.color, 'red', 'FontIcon should have color set to red');
    assert.strictEqual(
      wrapper.find(FontIcon).node.props.style.color,
      undefined,
      'FontIcon style object has no color property'
    );
  });
});
