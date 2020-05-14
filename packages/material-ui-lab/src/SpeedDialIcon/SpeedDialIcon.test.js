import * as React from 'react';
import { expect } from 'chai';
import { getClasses, findOutermostIntrinsic } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import Icon from '@material-ui/core/Icon';
import SpeedDialIcon from './SpeedDialIcon';
import describeConformance from '@material-ui/core/test-utils/describeConformance';

describe('<SpeedDialIcon />', () => {
  const mount = createMount();
  let classes;
  const icon = <Icon>font_icon</Icon>;

  before(() => {
    classes = getClasses(<SpeedDialIcon />);
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
    expect(findOutermostIntrinsic(wrapper).find('svg[data-mui-test="AddIcon"]').length).to.equal(1);
  });

  it('should render an Icon', () => {
    const wrapper = mount(<SpeedDialIcon icon={icon} />);
    const iconWrapper = findOutermostIntrinsic(wrapper).childAt(0);
    expect(iconWrapper.find(Icon).length).to.equal(1);
  });

  it('should render an openIcon', () => {
    const wrapper = mount(<SpeedDialIcon openIcon={icon} />);
    const iconWrapper = findOutermostIntrinsic(wrapper).childAt(0);
    expect(iconWrapper.find(Icon).length).to.equal(1);
  });

  it('should render the icon with the icon class', () => {
    const wrapper = mount(<SpeedDialIcon />);
    const iconWrapper = findOutermostIntrinsic(wrapper).childAt(0);
    expect(iconWrapper.hasClass(classes.icon)).to.equal(true);
    expect(iconWrapper.hasClass(classes.iconOpen)).to.equal(false);
    expect(iconWrapper.hasClass(classes.iconWithOpenIconOpen)).to.equal(false);
  });

  it('should render the icon with the icon and iconOpen classes', () => {
    const wrapper = mount(<SpeedDialIcon open />);
    const iconWrapper = findOutermostIntrinsic(wrapper).childAt(0);
    expect(iconWrapper.hasClass(classes.icon)).to.equal(true);
    expect(iconWrapper.hasClass(classes.iconOpen)).to.equal(true);
    expect(iconWrapper.hasClass(classes.iconWithOpenIconOpen)).to.equal(false);
  });

  it('should render the icon with the icon, iconOpen iconWithOpenIconOpen classes', () => {
    const wrapper = mount(<SpeedDialIcon open openIcon={icon} />);
    const iconWrapper = findOutermostIntrinsic(wrapper).childAt(1);
    expect(iconWrapper.hasClass(classes.icon)).to.equal(true);
    expect(iconWrapper.hasClass(classes.iconOpen)).to.equal(true);
    expect(iconWrapper.hasClass(classes.iconWithOpenIconOpen)).to.equal(true);
  });

  it('should render the openIcon with the openIcon class', () => {
    const wrapper = mount(<SpeedDialIcon openIcon={icon} />);
    const iconWrapper = findOutermostIntrinsic(wrapper).childAt(0);
    expect(iconWrapper.hasClass(classes.openIcon)).to.equal(true);
    expect(iconWrapper.hasClass(classes.openIconOpen)).to.equal(false);
  });

  it('should render the openIcon with the openIcon, openIconOpen classes', () => {
    const wrapper = mount(<SpeedDialIcon open openIcon={icon} />);
    const iconWrapper = findOutermostIntrinsic(wrapper).childAt(0);
    expect(iconWrapper.hasClass(classes.openIcon)).to.equal(true);
    expect(iconWrapper.hasClass(classes.openIconOpen)).to.equal(true);
  });
});
