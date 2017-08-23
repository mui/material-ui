import React from 'react';
import { assert } from 'chai';
import { spy, stub } from 'sinon';
import { createShallow, createMount, getClasses } from '../test-utils';
import ToggleButton, { styleSheet } from './ToggleButton';
import ToggleButtonOption from './ToggleButtonOption';

describe('<ToggleButton/>', () => {
  let mount;
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ untilSelector: 'ToggleButton' });
    classes = getClasses(styleSheet);
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render with root class', () => {
    const wrapper = shallow(
      <ToggleButton>
        <ToggleButtonOption/>
      </ToggleButton>
    );
    assert.strictEqual(wrapper.name(), 'div');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  //Test for rendering proper children check Tabs?

  //Prop tests
  describe('prop : active', () => {
    it('should render with active class', () => {

    });
  });

  describe('prop : exclusive', () => {
    it('should have only one option selected after clicking multiple options', () => {

    });
  });

  describe('prop : selectedOptions', () => {
    it('should pass props to children specified within this prop', () => {
      //Should also be active
    });
  });

  describe('prop : toggleIcons', () => {
    it('should render with toggleIcon class', () => {

    });

    it('should not render with active class', () => {

    });
  });

  //Behaviour Tests
  describe('user click', () => {
    //calls appropriate things
  });

});
