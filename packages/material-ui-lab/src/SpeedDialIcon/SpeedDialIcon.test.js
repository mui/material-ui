import React from 'react';
import { assert } from 'chai';
import { createMount, createShallow, getClasses } from '@material-ui/core/test-utils';
import Icon from '@material-ui/core/Icon';
import SpeedDialIcon from './SpeedDialIcon';
import AddIcon from '../internal/svg-icons/Add';

describe('<SpeedDialIcon />', () => {
  let shallow;
  let mount;
  let classes;
  const icon = <Icon>font_icon</Icon>;

  before(() => {
    shallow = createShallow({ dive: true });
    mount = createMount({ strict: true });
    classes = getClasses(<SpeedDialIcon />);
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render the Add icon by default', () => {
    const wrapper = shallow(<SpeedDialIcon />);
    assert.strictEqual(wrapper.find(AddIcon).length, 1);
  });

  it('should render an Icon', () => {
    const wrapper = shallow(<SpeedDialIcon icon={icon} />);
    const iconWrapper = wrapper.childAt(0);
    assert.strictEqual(iconWrapper.find(Icon).length, 1);
  });

  it('should render an openIcon', () => {
    const wrapper = shallow(<SpeedDialIcon openIcon={icon} />);
    const iconWrapper = wrapper.childAt(0);
    assert.strictEqual(iconWrapper.find(Icon).length, 1);
  });

  it('should render with the root class', () => {
    const wrapper = shallow(<SpeedDialIcon />);
    assert.strictEqual(wrapper.name(), 'span');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should render the icon with the icon class', () => {
    const wrapper = shallow(<SpeedDialIcon />);
    const iconWrapper = wrapper.childAt(0);
    assert.strictEqual(iconWrapper.hasClass(classes.icon), true);
    assert.strictEqual(iconWrapper.hasClass(classes.iconOpen), false);
    assert.strictEqual(iconWrapper.hasClass(classes.iconWithOpenIconOpen), false);
  });

  it('should render the icon with the icon and iconOpen classes', () => {
    const wrapper = shallow(<SpeedDialIcon open />);
    const iconWrapper = wrapper.childAt(0);
    assert.strictEqual(iconWrapper.hasClass(classes.icon), true);
    assert.strictEqual(iconWrapper.hasClass(classes.iconOpen), true);
    assert.strictEqual(iconWrapper.hasClass(classes.iconWithOpenIconOpen), false);
  });

  it('should render the icon with the icon, iconOpen iconWithOpenIconOpen classes', () => {
    const wrapper = shallow(<SpeedDialIcon open openIcon={icon} />);
    const iconWrapper = wrapper.childAt(1);
    assert.strictEqual(iconWrapper.hasClass(classes.icon), true);
    assert.strictEqual(iconWrapper.hasClass(classes.iconOpen), true);
    assert.strictEqual(iconWrapper.hasClass(classes.iconWithOpenIconOpen), true);
  });

  it('should render the openIcon with the openIcon class', () => {
    const wrapper = shallow(<SpeedDialIcon openIcon={icon} />);
    const iconWrapper = wrapper.childAt(0);
    assert.strictEqual(iconWrapper.hasClass(classes.openIcon), true);
    assert.strictEqual(iconWrapper.hasClass(classes.openIconOpen), false);
  });

  it('should render the openIcon with the openIcon, openIconOpen classes', () => {
    const wrapper = shallow(<SpeedDialIcon open openIcon={icon} />);
    const iconWrapper = wrapper.childAt(0);
    assert.strictEqual(iconWrapper.hasClass(classes.openIcon), true);
    assert.strictEqual(iconWrapper.hasClass(classes.openIconOpen), true);
  });
});
