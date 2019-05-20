import React from 'react';
import { assert } from 'chai';
import {
  createMount,
  createShallow,
  createRender,
  // describeConformance,
  getClasses,
} from '@material-ui/core/test-utils';
import Button from '../Button';
import ButtonGroup from './ButtonGroup';

describe('<ButtonGroup />', () => {
  let mount;
  let shallow;
  let render;
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    shallow = createShallow({ dive: true });
    render = createRender();
    classes = getClasses(
      <ButtonGroup>
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
  });

  after(() => {
    mount.cleanUp();
  });

  // describeConformance(<ButtonGroup><Button>Conformance?</Button></ButtonGroup>, () => ({
  //   classes,
  //   mount,
  //   refInstanceof: window.HTMLDivElement,
  //   skip: ['componentProp'],
  // }));

  it('should render with the root class but no others', () => {
    const wrapper = shallow(
      <ButtonGroup>
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.contained), false);
    assert.strictEqual(wrapper.hasClass(classes.fullWidth), false);
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.grouped), true);
  });

  it('should render an outlined button', () => {
    const wrapper = shallow(
      <ButtonGroup>
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
    assert.strictEqual(wrapper.childAt(0).props().variant, 'outlined');
    assert.strictEqual(wrapper.childAt(0).props().color, 'default');
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.grouped), true);
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.groupedOutlined), true);
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.groupedOutlinedPrimary), false);
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.groupedOutlinedSecondary), false);
  });

  it('should render an outlined primary button', () => {
    const wrapper = shallow(
      <ButtonGroup color="primary">
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
    assert.strictEqual(wrapper.childAt(0).props().variant, 'outlined');
    assert.strictEqual(wrapper.childAt(0).props().color, 'primary');
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.grouped), true);
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.groupedOutlined), true);
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.groupedOutlinedPrimary), true);
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.groupedOutlinedSecondary), false);
  });

  it('should render an outlined secondary button', () => {
    const wrapper = shallow(
      <ButtonGroup color="secondary">
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
    assert.strictEqual(wrapper.childAt(0).props().variant, 'outlined');
    assert.strictEqual(wrapper.childAt(0).props().color, 'secondary');
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.grouped), true);
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.groupedOutlined), true);
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.groupedOutlinedPrimary), false);
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.groupedOutlinedSecondary), true);
  });

  it('should render a contained button', () => {
    const wrapper = shallow(
      <ButtonGroup variant="contained">
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
    assert.strictEqual(wrapper.childAt(0).props().variant, 'contained');
    assert.strictEqual(wrapper.childAt(0).props().color, 'default');
    assert.strictEqual(wrapper.hasClass(classes.contained), true);
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.grouped), true);
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.groupedContained), true);
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.groupedContainedPrimary), false);
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.groupedContainedSecondary), false);
  });

  it('should render a contained primary button', () => {
    const wrapper = shallow(
      <ButtonGroup variant="contained" color="primary">
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
    assert.strictEqual(wrapper.childAt(0).props().variant, 'contained');
    assert.strictEqual(wrapper.childAt(0).props().color, 'primary');
    assert.strictEqual(wrapper.hasClass(classes.contained), true);
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.grouped), true);
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.groupedContained), true);
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.groupedContainedPrimary), true);
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.groupedContainedSecondary), false);
  });

  it('should render a contained secondary button', () => {
    const wrapper = shallow(
      <ButtonGroup variant="contained" color="secondary">
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
    assert.strictEqual(wrapper.childAt(0).props().variant, 'contained');
    assert.strictEqual(wrapper.childAt(0).props().color, 'secondary');
    assert.strictEqual(wrapper.hasClass(classes.contained), true);
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.grouped), true);
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.groupedContained), true);
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.groupedContainedPrimary), false);
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.groupedContainedSecondary), true);
  });

  it('should render a small button', () => {
    const wrapper = shallow(
      <ButtonGroup size="small">
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
    assert.strictEqual(wrapper.childAt(0).props().size, 'small');
  });

  it('should render a large button', () => {
    const wrapper = shallow(
      <ButtonGroup size="large">
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
    assert.strictEqual(wrapper.find('button').hasClass(classes.sizeLarge), true);
  });

  it('Button should have a ripple by default', () => {
    const wrapper = shallow(
      <ButtonGroup>
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
    assert.strictEqual(wrapper.childAt(0).props().disableRipple, false);
  });

  it('should pass disableRipple to Button', () => {
    const wrapper = shallow(
      <ButtonGroup disableRipple>
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
    assert.strictEqual(wrapper.childAt(0).props().disableRipple, true);
  });

  it('Button should have a focusRipple by default', () => {
    const wrapper = shallow(
      <ButtonGroup>
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
    assert.strictEqual(wrapper.childAt(0).props().disableFocusRipple, false);
  });

  it('should pass disableFocusRipple to Button', () => {
    const wrapper = shallow(
      <ButtonGroup disableFocusRipple>
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
    assert.strictEqual(wrapper.childAt(0).props().disableFocusRipple, true);
  });

  it('should not be fullWidth by default', () => {
    const wrapper = shallow(
      <ButtonGroup>
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
    assert.strictEqual(wrapper.hasClass(classes.fullWidth), false);
    assert.strictEqual(wrapper.childAt(0).props().fullWidth, false);
  });

  it('should pass fullWidth to Button', () => {
    const wrapper = shallow(
      <ButtonGroup fullWidth>
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
    assert.strictEqual(wrapper.hasClass(classes.fullWidth), true);
    assert.strictEqual(wrapper.childAt(0).props().fullWidth, true);
  });

  describe('server-side', () => {
    // Only run the test on node.
    if (!/jsdom/.test(window.navigator.userAgent)) {
      return;
    }

    it('should server-side render', () => {
      const markup = render(
        <ButtonGroup>
          <Button>Hello World</Button>
        </ButtonGroup>,
      );
      assert.strictEqual(markup.text(), 'Hello World');
    });
  });
});
