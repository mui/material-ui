/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import ListItem from 'src/List/ListItem';
import FontIcon from 'src/FontIcon';
import getMuiTheme from 'src/styles/getMuiTheme';

describe('<ListItem />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});

  it('should render rightIcon with custom color', () => {
    const wrapper = shallowWithContext(
      <ListItem
        rightIcon={<FontIcon className="material-icons" color="red">home</FontIcon>}
      />
    );

    assert.strictEqual(wrapper.find(FontIcon).node.props.color, 'red', 'FontIcon should have the color set to red');
  });

  it('should render leftIcon with custom color', () => {
    const wrapper = shallowWithContext(
      <ListItem
        leftIcon={<FontIcon className="material-icons" color="red">home</FontIcon>}
      />
    );

    assert.strictEqual(wrapper.find(FontIcon).node.props.color, 'red', 'FontIcon should have the color set to red');
  });
});
