import * as React from 'react';
import { expect } from 'chai';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import Divider from './Divider';

describe('<Divider />', () => {
  const mount = createMount();
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<Divider />);
  });

  describeConformance(<Divider />, () => ({
    classes,
    inheritComponent: 'hr',
    mount,
    refInstanceof: window.HTMLHRElement,
    testComponentPropWith: 'div',
  }));

  it('should set the absolute class', () => {
    const wrapper = shallow(<Divider absolute />);
    expect(wrapper.hasClass(classes.absolute)).to.equal(true);
  });

  it('should set the light class', () => {
    const wrapper = shallow(<Divider light />);
    expect(wrapper.hasClass(classes.light)).to.equal(true);
  });

  it('should set the flexItem class', () => {
    const wrapper = shallow(<Divider flexItem />);
    expect(wrapper.hasClass(classes.flexItem)).to.equal(true);
  });

  describe('prop: variant', () => {
    it('should default to variant="fullWidth"', () => {
      const wrapper = shallow(<Divider />);
      expect(wrapper.hasClass(classes.inset)).to.equal(false);
      expect(wrapper.hasClass(classes.middle)).to.equal(false);
    });

    describe('prop: variant="fullWidth" ', () => {
      it('should render with the root and default class', () => {
        const wrapper = shallow(<Divider />);
        expect(wrapper.hasClass(classes.root)).to.equal(true);
      });
    });

    describe('prop: variant="inset" ', () => {
      it('should set the inset class', () => {
        const wrapper = shallow(<Divider variant="inset" />);
        expect(wrapper.hasClass(classes.inset)).to.equal(true);
      });
    });

    describe('prop: variant="middle"', () => {
      it('should set the middle class', () => {
        const wrapper = shallow(<Divider variant="middle" />);
        expect(wrapper.hasClass(classes.middle)).to.equal(true);
      });
    });
  });

  describe('role', () => {
    it('avoids adding implicit aria semantics', () => {
      const wrapper = mount(<Divider />);
      expect(wrapper.find('hr').props().role).to.equal(undefined);
    });

    it('adds a proper role if none is specified', () => {
      const wrapper = mount(<Divider component="div" />);
      expect(wrapper.find('div').props().role).to.equal('separator');
    });

    it('overrides the computed role with the provided one', () => {
      // presentation is the only valid aria role
      const wrapper = mount(<Divider role="presentation" />);
      expect(wrapper.find('hr').props().role).to.equal('presentation');
    });
  });
});
