import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import ToolbarSeparator from 'src/Toolbar/ToolbarSeparator';
import getMuiTheme from 'src/styles/getMuiTheme';

describe('<ToolbarSeparator />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});

  it('should render <ToolbarSeparator />', () => {
    const wrapper = shallowWithContext(
      <ToolbarSeparator
        className={'className'}
        style={{color: 'transparentYellow'}}
      />
    );

    expect(wrapper.type()).to.equal('span');
    expect(wrapper.prop('className')).to.equal('className');
    expect(wrapper.prop('style').color).to.equal('transparentYellow');
  });
});
