/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import Toolbar from 'src/Toolbar';
import ToolbarGroup from 'src/Toolbar/ToolbarGroup';
import FontIcon from 'src/FontIcon';
import getMuiTheme from 'src/styles/getMuiTheme';

describe('<Toolbar />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});

  it('should render children', () => {
    const wrapper = shallowWithContext(
      <Toolbar>
        <ToolbarGroup firstChild={true} />
      </Toolbar>

    );

    assert.ok(wrapper.find(ToolbarGroup), 'should contain the ToolbarGroup child');
  });

  it('should render FontIcon with custom color', () => {
    const wrapper = shallowWithContext(
      <Toolbar>
        <ToolbarGroup firstChild={true}>
          <FontIcon className="muidocs-icon-custom-sort" color="red" />
        </ToolbarGroup>
      </Toolbar>

    );

    assert.strictEqual(wrapper.find(FontIcon).node.props.color, 'red', 'FontIcon should have the color set to red');
  });
});
