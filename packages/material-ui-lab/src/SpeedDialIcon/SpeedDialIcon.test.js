import React from 'react';
import { assert } from 'chai';
import { createMount, getClasses, findOutermostIntrinsic } from '@material-ui/core/test-utils';
import Icon from '@material-ui/core/Icon';
import SpeedDialIcon from './SpeedDialIcon';
import describeConformance from '@material-ui/core/test-utils/describeConformance';

describe('<SpeedDialIcon />', () => {
  let mount;
  let classes;
  const icon = <Icon>font_icon</Icon>;

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<SpeedDialIcon />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<SpeedDialIcon />, () => ({
    classes,
    inheritComponent: 'span',
    mount,
    refInstanceof: window.HTMLSpanElement,
    skip: ['componentProp'],
  }));

  it('should render the Add icon by default', () => {
    const wrapper = mount(<SpeedDialIcon />);
    assert.strictEqual(
      findOutermostIntrinsic(wrapper).find('svg[data-mui-test="AddIcon"]').length,
      1,
    );
  });

  it('should render an Icon', () => {
    const wrapper = mount(<SpeedDialIcon icon={icon} />);
    const iconWrapper = findOutermostIntrinsic(wrapper).childAt(0);
    assert.strictEqual(iconWrapper.find(Icon).length, 1);
  });

  it('should render an openIcon', () => {
    const wrapper = mount(<SpeedDialIcon openIcon={icon} />);
    const iconWrapper = findOutermostIntrinsic(wrapper).childAt(0);
    assert.strictEqual(iconWrapper.find(Icon).length, 1);
  });

  it('should render the icon with the icon class', () => {
    const wrapper = mount(<SpeedDialIcon />);
    const iconWrapper = findOutermostIntrinsic(wrapper).childAt(0);
    assert.strictEqual(iconWrapper.hasClass(classes.icon), true);
    assert.strictEqual(iconWrapper.hasClass(classes.iconOpen), false);
    assert.strictEqual(iconWrapper.hasClass(classes.iconWithOpenIconOpen), false);
  });

  it('should render the icon with the icon and iconOpen classes', () => {
    const wrapper = mount(<SpeedDialIcon open />);
    const iconWrapper = findOutermostIntrinsic(wrapper).childAt(0);
    assert.strictEqual(iconWrapper.hasClass(classes.icon), true);
    assert.strictEqual(iconWrapper.hasClass(classes.iconOpen), true);
    assert.strictEqual(iconWrapper.hasClass(classes.iconWithOpenIconOpen), false);
  });

  it('should render the icon with the icon, iconOpen iconWithOpenIconOpen classes', () => {
    const wrapper = mount(<SpeedDialIcon open openIcon={icon} />);
    const iconWrapper = findOutermostIntrinsic(wrapper).childAt(1);
    assert.strictEqual(iconWrapper.hasClass(classes.icon), true);
    assert.strictEqual(iconWrapper.hasClass(classes.iconOpen), true);
    assert.strictEqual(iconWrapper.hasClass(classes.iconWithOpenIconOpen), true);
  });

  it('should render the openIcon with the openIcon class', () => {
    const wrapper = mount(<SpeedDialIcon openIcon={icon} />);
    const iconWrapper = findOutermostIntrinsic(wrapper).childAt(0);
    assert.strictEqual(iconWrapper.hasClass(classes.openIcon), true);
    assert.strictEqual(iconWrapper.hasClass(classes.openIconOpen), false);
  });

  it('should render the openIcon with the openIcon, openIconOpen classes', () => {
    const wrapper = mount(<SpeedDialIcon open openIcon={icon} />);
    const iconWrapper = findOutermostIntrinsic(wrapper).childAt(0);
    assert.strictEqual(iconWrapper.hasClass(classes.openIcon), true);
    assert.strictEqual(iconWrapper.hasClass(classes.openIconOpen), true);
  });
});
