/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import Toolbar from 'src/Toolbar';
import ToolbarTitle from 'src/Toolbar/ToolbarTitle';
import ToolbarGroup from 'src/Toolbar/ToolbarGroup';
import ToolbarSeparator from 'src/Toolbar/ToolbarSeparator';
import DropDownMenu from 'src/DropDownMenu';
import FontIcon from 'src/FontIcon';
import RaisedButton from 'src/RaisedButton';
import FlatButton from 'src/FlatButton';
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

    assert.strictEqual(wrapper.find(ToolbarGroup).length, 1, 'should contain the ToolbarGroup child');
  });

  it('should render DropDownMenu with underlineStyle props', () => {
    const customStyles = {
      borderColor: 'orange',
    };
    const wrapper = shallowWithContext(
      <Toolbar>
        <ToolbarGroup firstChild={true}>
          <DropDownMenu underlineStyle={customStyles} />
        </ToolbarGroup>
      </Toolbar>
    );

    assert.strictEqual(wrapper.find(DropDownMenu).node.props.underlineStyle, customStyles,
      'DropDownMenu should have border color set to orange');
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

  it('should render ToolbarTitle with its text', () => {
    const wrapper = shallowWithContext(
      <Toolbar>
        <ToolbarGroup firstChild={true} >
          <ToolbarTitle text="Toolbar Title text" />
        </ToolbarGroup>
      </Toolbar>
    );

    assert.strictEqual(wrapper.find(ToolbarTitle).node.props.text, 'Toolbar Title text',
      'ToolbarTitle should have text set to "Toolbar Title text"');
  });

  it('should render RaisedButton, FlatButton and ToolbarSeparator with labels', () => {
    const wrapper = shallowWithContext(
      <Toolbar>
        <ToolbarGroup >
          <RaisedButton label="RaisedButton" />
          <FlatButton label="FlatButton" />
          <ToolbarSeparator label="ToolbarSeparator" />
        </ToolbarGroup>
      </Toolbar>
    );
    const [raised, flat, separator] = wrapper.find(ToolbarGroup).node.props.children;

    assert.strictEqual(raised.props.label, 'RaisedButton', 'RaisedButton should have proper label');
    assert.strictEqual(flat.props.label, 'FlatButton', 'FlatButton should have proper label');
    assert.strictEqual(separator.props.label, 'ToolbarSeparator', 'ToolbarSeparator should have proper label');
  });
});
