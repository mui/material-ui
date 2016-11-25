/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import TextFieldHelper from './TextFieldHelper';
import getMuiTheme from '../styles/getMuiTheme';

describe('<TextFieldHelper>', () => {
  it('should prefer errorText prop over helperText', () => {
    const themeDefaults = {
      textField: {
        hintColor: 'grey',
        errorColor: 'red',
      },
    };

    const wrapper = shallow(
      <TextFieldHelper
        helperText="Foo"
        muiTheme={getMuiTheme(themeDefaults)}
      />
    );

    expect(wrapper.type()).to.equal('div');

    expect(wrapper.prop('style').color).to.equal('grey');
    expect(wrapper.text()).to.equal('Foo');

    wrapper.setProps({errorText: 'Bar'});

    expect(wrapper.prop('style').color).to.equal('red');
    expect(wrapper.text()).to.equal('Bar');

    wrapper.setProps({errorText: false});

    expect(wrapper.prop('style').color).to.equal('grey');
    expect(wrapper.text()).to.equal('Foo');

    wrapper.setProps({errorText: null});

    expect(wrapper.prop('style').color).to.equal('grey');
    expect(wrapper.text()).to.equal('Foo');
  });

  it('should override default styles', () => {
    const wrapper = shallow(
      <TextFieldHelper
        style={{color: 'blue'}}
        muiTheme={getMuiTheme()}
      />
    );

    expect(wrapper.type()).to.equal('div');

    expect(wrapper.prop('style').color).to.equal('blue');
  });

  it('should adjust styles for floating label', () => {
    const wrapper = shallow(
      <TextFieldHelper
        muiTheme={getMuiTheme()}
      />
    );

    expect(wrapper.type()).to.equal('div');

    expect(wrapper.prop('style').bottom).to.equal(2);

    wrapper.setProps({adjustForFloatingLabel: true});

    expect(wrapper.prop('style').bottom).to.equal(15);

    wrapper.setProps({adjustForFloatingLabel: false});

    expect(wrapper.prop('style').bottom).to.equal(2);
  });

  it('should adjust styles for multi line with floating label', () => {
    const wrapper = shallow(
      <TextFieldHelper
        muiTheme={getMuiTheme()}
        adjustForFloatingLabel={true}
      />
    );

    expect(wrapper.type()).to.equal('div');

    expect(wrapper.prop('style').bottom).to.equal(15);

    wrapper.setProps({adjustForMultiLine: true});

    expect(wrapper.prop('style').bottom).to.equal(3);

    wrapper.setProps({adjustForMultiLine: false});

    expect(wrapper.prop('style').bottom).to.equal(15);
  });
});
