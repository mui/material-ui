import * as React from 'react';
import { expect } from 'chai';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import TabIndicator from './TabIndicator';

describe('<TabIndicator />', () => {
  let shallow;
  let classes;
  const defaultProps = {
    direction: 'left',
    orientation: 'horizontal',
    color: 'secondary',
  };
  const style = { left: 1, width: 2 };

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<TabIndicator {...defaultProps} />);
  });

  it('should render with the root class', () => {
    const wrapper = shallow(<TabIndicator {...defaultProps} />);
    expect(wrapper.name()).to.equal('span');
    expect(wrapper.hasClass(classes.root)).to.equal(true);
  });

  describe('prop: style', () => {
    it('should be applied on the root element', () => {
      const wrapper = shallow(<TabIndicator {...defaultProps} style={style} />);
      expect(wrapper.props().style).to.equal(style);
    });
  });

  describe('prop: className', () => {
    it('should append the className on the root element', () => {
      const wrapper = shallow(<TabIndicator {...defaultProps} className="foo" />);
      expect(wrapper.name()).to.equal('span');
      expect(wrapper.hasClass('foo')).to.equal(true);
    });
  });
});
