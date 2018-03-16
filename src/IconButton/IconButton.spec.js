import React from 'react';
import ReactDOM from 'react-dom';
import { spy } from 'sinon';
import { assert } from 'chai';
import PropTypes from 'prop-types';
import { createShallow, createMount, getClasses } from '../test-utils';
import Icon from '../Icon';
import ButtonBase from '../ButtonBase';
import IconButton from './IconButton';

describe('<IconButton />', () => {
  let shallow;
  let classes;
  let mount;

  before(() => {
    shallow = createShallow({ dive: true });
    mount = createMount();
    classes = getClasses(<IconButton />);
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render a ButtonBase', () => {
    const wrapper = shallow(<IconButton>book</IconButton>);
    assert.strictEqual(wrapper.type(), ButtonBase);
  });

  it('should render an inner label span (bloody safari)', () => {
    const wrapper = shallow(<IconButton>book</IconButton>);
    const label = wrapper.childAt(0);
    assert.strictEqual(label.hasClass(classes.label), true, 'should have the label class');
    assert.strictEqual(label.is('span'), true, 'should be a span');
  });

  it('should render the child normally inside the label span', () => {
    const child = <p>H</p>;
    const wrapper = shallow(<IconButton>{child}</IconButton>);
    const label = wrapper.childAt(0);
    const icon = label.childAt(0);
    assert.strictEqual(icon.equals(child), true, 'should be the child');
  });

  it('should render Icon children with right classes', () => {
    const childClassName = 'child-woof';
    const iconChild = <Icon className={childClassName} />;
    const wrapper = shallow(<IconButton>{iconChild}</IconButton>);
    const label = wrapper.childAt(0);
    const renderedIconChild = label.childAt(0);
    assert.strictEqual(renderedIconChild.type(), Icon);
    assert.strictEqual(renderedIconChild.hasClass(childClassName), true, 'child should be icon');
  });

  it('should have a ripple by default', () => {
    const wrapper = shallow(<IconButton>book</IconButton>);
    assert.strictEqual(wrapper.props().disableRipple, undefined);
  });

  it('should pass disableRipple to ButtonBase', () => {
    const wrapper = shallow(<IconButton disableRipple>book</IconButton>);
    assert.strictEqual(wrapper.props().disableRipple, true);
  });

  it('should spread props on ButtonBase', () => {
    const wrapper = shallow(
      <IconButton data-test="hello" disableRipple>
        book
      </IconButton>,
    );
    assert.strictEqual(wrapper.prop('data-test'), 'hello', 'should be spread on the ButtonBase');
    assert.strictEqual(wrapper.props().disableRipple, true);
  });

  it('should render with the user and root classes', () => {
    const wrapper = shallow(<IconButton className="woofIconButton">book</IconButton>);
    assert.strictEqual(wrapper.hasClass('woofIconButton'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should pass centerRipple={true} to ButtonBase', () => {
    const wrapper = shallow(<IconButton>book</IconButton>);
    assert.strictEqual(wrapper.props().centerRipple, true, 'should set centerRipple to true');
  });

  describe('prop: disabled', () => {
    it('should disable the component', () => {
      const wrapper = shallow(<IconButton disabled>book</IconButton>);
      assert.strictEqual(wrapper.props().disabled, true, 'should pass the property down the tree');
      assert.strictEqual(wrapper.hasClass(classes.disabled), true, 'should add the disabled class');
    });
  });

  describe('prop: ref', () => {
    it('should give a reference on the native button', () => {
      function IconButtonRef(props) {
        return <IconButton ref={props.rootRef} />;
      }
      IconButtonRef.propTypes = {
        rootRef: PropTypes.func.isRequired,
      };

      const ref = spy();
      mount(<IconButtonRef rootRef={ref} />);
      assert.strictEqual(ref.callCount, 1);
      assert.strictEqual(ReactDOM.findDOMNode(ref.args[0][0]).type, 'button');
    });
  });
});
