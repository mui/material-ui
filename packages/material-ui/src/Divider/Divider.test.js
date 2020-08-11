import * as React from 'react';
import { expect } from 'chai';
import {
  createShallow,
  getClasses,
  createMount,
  describeConformance,
  createClientRender,
} from 'test/utils';
import Divider from './Divider';

describe('<Divider />', () => {
  const mount = createMount();
  let shallow;
  let render;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    render = createClientRender();
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

  describe('prop: children', () => {
    it('should render with the children', () => {
      const text = 'test content';
      const { container } = render(<Divider>{text}</Divider>);
      expect(container.querySelectorAll('span').length).to.equal(1);
      expect(container.querySelectorAll('span')[0].textContent).to.equal(text);
    });

    it('should set the default text class', () => {
      const wrapper = shallow(<Divider>content</Divider>);
      expect(wrapper.hasClass(classes.text)).to.equal(true);
    });

    describe('prop: orientation', () => {
      it('should set the textVertical class', () => {
        const { container } = render(<Divider orientation="vertical">content</Divider>);
        expect(container.querySelectorAll(`.${classes.textVertical}`).length).to.equal(1);
        expect(container.querySelectorAll(`.${classes.spanTextVertical}`).length).to.equal(1);
      });
    });

    describe('prop: textAlign', () => {
      it('should set the textAlignRight class', () => {
        const { container } = render(<Divider textAlign="right">content</Divider>);
        expect(container.querySelectorAll(`.${classes.textAlignRight}`).length).to.equal(1);
      });

      it('should set the textAlignLeft class', () => {
        const { container } = render(<Divider textAlign="left">content</Divider>);
        expect(container.querySelectorAll(`.${classes.textAlignLeft}`).length).to.equal(1);
      });

      it('should not set the textAlignRight class if orientation="vertical"', () => {
        const { container } = render(
          <Divider textAlign="right" orientation="vertical">
            content
          </Divider>,
        );
        expect(container.querySelectorAll(`.${classes.textAlignRight}`).length).to.equal(0);
      });

      it('should not set the textAlignLeft class if orientation="vertical"', () => {
        const { container } = render(
          <Divider textAlign="left" orientation="vertical">
            content
          </Divider>,
        );
        expect(container.querySelectorAll(`.${classes.textAlignLeft}`).length).to.equal(0);
      });
    });
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
