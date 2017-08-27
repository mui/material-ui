// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow, createMount, getClasses } from '../test-utils';
import ToggleButtonOption, { styleSheet } from './ToggleButtonOption';
import Icon from '../Icon';

describe('<ToggleButtonOption/>', () => {
  let shallow;
  let mount;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    mount = createMount();
    classes = getClasses(styleSheet);
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render with root and rootButton classes', () => {
    const wrapper = shallow(<ToggleButtonOption />);
    assert.strictEqual(wrapper.name(), 'withStyles(ButtonBase)');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.rootButton), true);
  });

  describe('prop: color', () => {
    it('should render with colorDefault class when toggle is set and no color is specified', () => {
      const wrapper = shallow(<ToggleButtonOption toggle />);
      assert.strictEqual(wrapper.hasClass(classes.colorDefault), true);
    });

    it('should render with colorPrimary class when toggle is set and color = primary', () => {
      const wrapper = shallow(<ToggleButtonOption toggle color="primary" />);
      assert.strictEqual(wrapper.hasClass(classes.colorPrimary), true);
    });

    it('should render with colorAccent class when toggle is set and color = accent', () => {
      const wrapper = shallow(<ToggleButtonOption toggle color="accent" />);
      assert.strictEqual(wrapper.hasClass(classes.colorAccent), true);
    });

    it('should render with colorContrast class when toggle is set and color = contrast', () => {
      const wrapper = shallow(<ToggleButtonOption toggle color="contrast" />);
      assert.strictEqual(wrapper.hasClass(classes.colorContrast), true);
    });
  });

  describe('prop: disabled', () => {
    it('should not render with colorDefault and button classes when specified', () => {
      const wrapper = shallow(<ToggleButtonOption disabled />);
      assert.strictEqual(wrapper.hasClass(classes.colorDefault), false);
      assert.strictEqual(wrapper.hasClass(classes.button), false);
    });

    it('should not render with toggleDefault class when specified and is selected', () => {
      const wrapper = shallow(<ToggleButtonOption selected disabled />);
      assert.strictEqual(wrapper.hasClass(classes.toggleDefault), false);
    });
  });

  describe('prop: divider', () => {
    it('should render with divider class when specified', () => {
      const wrapper = shallow(<ToggleButtonOption divider />);
      assert.strictEqual(wrapper.hasClass(classes.divided), true);
    });
  });

  describe('prop: icon', () => {
    it('should contain Icon element', () => {
      const wrapper = shallow(
        <ToggleButtonOption icon={<Icon className="material-icons">mood</Icon>} />,
      );
      assert.strictEqual(wrapper.find(Icon).length, 1, 'should have an Icon');
    });

    it('should render with iconAndText class is a label is specified as well', () => {
      const wrapper = shallow(
        <ToggleButtonOption icon={<Icon className="material-icons">mood</Icon>} label="Mood" />,
      );
      assert.strictEqual(wrapper.hasClass(classes.iconAndText), true);
    });
  });

  describe('prop: selected', () => {
    it('should render with buttonSelected and textSelected classes', () => {
      const wrapper = shallow(<ToggleButtonOption selected />);
      assert.strictEqual(wrapper.hasClass(classes.buttonSelected), true);
      assert.strictEqual(wrapper.find('div').hasClass(classes.textSelected), true);
    });
  });

  describe('prop: toggle', () => {
    it('should render with rootToggle class', () => {
      const wrapper = shallow(<ToggleButtonOption toggle />);
      assert.strictEqual(wrapper.hasClass(classes.rootToggle), true);
      assert.strictEqual(wrapper.hasClass(classes.rootButton), false);
    });

    it('should render with toggleDefault class when no color is specified and is selected', () => {
      const wrapper = shallow(<ToggleButtonOption toggle selected />);
      assert.strictEqual(wrapper.hasClass(classes.toggleDefault), true);
    });

    it('should render with togglePrimary class when color = primary and is selected', () => {
      const wrapper = shallow(<ToggleButtonOption toggle selected color="primary" />);
      assert.strictEqual(wrapper.hasClass(classes.togglePrimary), true);
    });

    it('should render with toggleAccent class when color = accent and is selected', () => {
      const wrapper = shallow(<ToggleButtonOption toggle selected color="accent" />);
      assert.strictEqual(wrapper.hasClass(classes.toggleAccent), true);
    });

    it('should render with toggleContrast class when color = contrast and is selected', () => {
      const wrapper = shallow(<ToggleButtonOption toggle selected color="contrast" />);
      assert.strictEqual(wrapper.hasClass(classes.toggleContrast), true);
    });
  });

  describe('prop: label', () => {
    it('should render a string', () => {
      const wrapper = mount(<ToggleButtonOption label="Toggle" />);
      assert.strictEqual(wrapper.childAt(0).text(), 'Toggle');
    });
  });
});
