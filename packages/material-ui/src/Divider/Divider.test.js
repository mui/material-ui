import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import Divider from './Divider';
import Typography from '../Typography';
import consoleErrorMock from 'test/utils/consoleErrorMock';

describe('<Divider />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<Divider />);
  });

  it('should render a hr', () => {
    const wrapper = shallow(<Divider />);
    const hr = wrapper.childAt(0);
    assert.strictEqual(hr.name(), 'hr');
  });

  it('should render with the root and default class', () => {
    const wrapper = shallow(<Divider />);
    const hr = wrapper.childAt(0);
    assert.strictEqual(hr.hasClass(classes.root), true);
  });

  it('should set the absolute class', () => {
    const wrapper = shallow(<Divider absolute />);
    const hr = wrapper.childAt(0);
    assert.strictEqual(hr.hasClass(classes.absolute), true);
  });

  it('should set the light class', () => {
    const wrapper = shallow(<Divider light />);
    const hr = wrapper.childAt(0);
    assert.strictEqual(hr.hasClass(classes.light), true);
  });

  describe('prop: subheader', () => {
    it('should render a Typography component', () => {
      const wrapper = shallow(<Divider subheader="test" />);
      const wrappedTypography = wrapper.find(Typography);
      const typography = wrappedTypography.childAt(0);
      assert.strictEqual(wrappedTypography.type(), Typography);
      assert.strictEqual(wrappedTypography.hasClass(classes.subheader), true);
      assert.strictEqual(typography.text(), 'test');
    });

    it('should not render a Typography component when null or not present', () => {
      const wrapper = shallow(<Divider />);
      assert.strictEqual(wrapper.childAt(1).exists(), false);
    });
  });

  describe('prop: variant', () => {
    it('should default to variant={"fullBleed"}', () => {
      const wrapper = shallow(<Divider />);
      const hr = wrapper.childAt(0);
      assert.strictEqual(hr.hasClass(classes.inset), false);
      assert.strictEqual(hr.hasClass(classes.middle), false);
    });

    describe('prop: variant={"fullBleed"} ', () => {
      it('should render with the root and default class', () => {
        const wrapper = shallow(<Divider />);
        const hr = wrapper.childAt(0);
        assert.strictEqual(hr.hasClass(classes.root), true);
      });
    });

    describe('prop: variant={"inset"} ', () => {
      it('should set the inset class', () => {
        const wrapper = shallow(<Divider variant={'inset'} />);
        const hr = wrapper.childAt(0);
        assert.strictEqual(hr.hasClass(classes.inset), true);
      });
    });

    describe('prop: variant={"middle"}', () => {
      before(() => {
        consoleErrorMock.spy();
      });

      after(() => {
        consoleErrorMock.reset();
      });

      it('should set the middle class', () => {
        const wrapper = shallow(<Divider variant={'middle'} />);
        const hr = wrapper.childAt(0);
        assert.strictEqual(hr.hasClass(classes.middle), true);
      });

      it('should throw error if subheader is supplied', () => {
        shallow(<Divider variant={'middle'} subheader="test" />);
        assert.match(
          consoleErrorMock.args()[0][0],
          /`subheader` property with the variant `middle`. This will have no effect./,
        );
      });
    });
  });
});
