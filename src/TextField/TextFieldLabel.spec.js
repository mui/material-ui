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

  describe('required', function() {
    describe('when true', function() {
      it('renders an asterik', function() {
        const wrapper = shallow(
          <TextFieldLabel muiTheme={getMuiTheme()} required={true}>
            my label
          </TextFieldLabel>
        );

        expect(wrapper.text()).to.contain('*');
      });

      describe('asteriskStyle', function() {
        it('adds the given styles to the asterik span', function() {
          const wrapper = shallow(
            <TextFieldLabel
              muiTheme={getMuiTheme()}
              required={true}
              asteriskStyle={{color: 'errorcolor'}}
            />
          );

          expect(wrapper.find('span').prop('style')).to.eql({color: 'errorcolor'});
        });
      });
    });

    describe('when false', function() {
      it('does not render an asterik', function() {
        const wrapper = shallow(
          <TextFieldLabel muiTheme={getMuiTheme()}>
            my label
          </TextFieldLabel>
        );

        expect(wrapper.text()).to.not.contain('*');
      });
    });
  });
});
