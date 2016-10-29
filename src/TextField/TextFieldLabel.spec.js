/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import TextFieldLabel from './TextFieldLabel';
import getMuiTheme from '../styles/getMuiTheme';

describe('<TextFieldLabel>', () => {
  it('uses focus styles', () => {
    const wrapper = shallow(
      <TextFieldLabel
        muiTheme={getMuiTheme()}
        shrink={false}
        style={{color: 'regularcolor'}}
        shrinkStyle={{color: 'focuscolor'}}
      />
    );

    expect(wrapper.type()).to.equal('label');
    expect(wrapper.prop('style').color).to.equal('regularcolor');

    wrapper.setProps({shrink: true});
    expect(wrapper.prop('style').color).to.equal('focuscolor');
  });

  it('displays an asterisk if isRequired is true', () => {
    const wrapper = shallow(
      <TextFieldLabel
        muiTheme={getMuiTheme()}
        isRequired={true}
        shrink={false}
        style={{color: 'regularcolor'}}
        shrinkStyle={{color: 'focuscolor'}}
        asteriskStyle={{color: 'asteriskcolor'}}
      />
    );

    expect(wrapper.type()).to.equal('label');
    expect(wrapper.text()).to.contain('*');
    expect(wrapper.find('span').first().prop('style').color).to.equal('asteriskcolor');
  });
});
