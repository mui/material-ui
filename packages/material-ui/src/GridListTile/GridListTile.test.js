import React from 'react';
import { assert } from 'chai';
import { spy, useFakeTimers } from 'sinon';
import { createMount, describeConformance, getClasses } from '@material-ui/core/test-utils';
import { setRef } from '../utils/reactHelpers';
import GridListTile from './GridListTile';

describe('<GridListTile />', () => {
  let mount;
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<GridListTile />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<GridListTile />, () => ({
    classes,
    inheritComponent: 'li',
    mount,
    refInstanceof: window.HTMLLIElement,
    testComponentPropWith: 'div',
  }));

  const tileData = {
    img: 'images/grid-list/00-52-29-429_640.jpg',
    title: 'Breakfast',
    author: 'jill111',
  };

  describe('prop: children', () => {
    it('should render children by default', () => {
      const children = <img src={tileData.img} alt="foo" />;
      const wrapper = mount(<GridListTile>{children}</GridListTile>);

      assert.strictEqual(wrapper.containsMatchingElement(children), true);
    });

    it('should not change non image child', () => {
      const children = <div />;
      const wrapper = mount(<GridListTile>{children}</GridListTile>);
      assert.strictEqual(wrapper.containsMatchingElement(children), true);
    });
  });

  function mountMockImage(imgEl) {
    const Image = React.forwardRef((props, ref) => {
      return (
        <img
          alt="test"
          ref={() => {
            setRef(ref, imgEl);
          }}
          {...props}
        />
      );
    });
    Image.muiName = 'Image';

    return mount(
      <GridListTile>
        <Image />
        {null}
      </GridListTile>,
    );
  }

  describe('mount image', () => {
    it('should handle missing image', () => {
      mountMockImage(null);
    });

    it('should fit the height', () => {
      const imgEl = {
        complete: true,
        width: 16,
        height: 9,
        parentNode: { offsetWidth: 4, offsetHeight: 3 },
        classList: { remove: spy(), add: spy() },
        removeEventListener: () => {},
      };
      mountMockImage(imgEl);
      assert.strictEqual(imgEl.classList.remove.callCount, 1);
      assert.strictEqual(imgEl.classList.remove.args[0][0], classes.imgFullWidth);
      assert.strictEqual(imgEl.classList.add.callCount, 1);
      assert.strictEqual(imgEl.classList.add.args[0][0], classes.imgFullHeight);
    });

    it('should fit the width', () => {
      const imgEl = {
        complete: true,
        width: 4,
        height: 3,
        parentNode: { offsetWidth: 16, offsetHeight: 9 },
        classList: { remove: spy(), add: spy() },
        removeEventListener: () => {},
      };
      mountMockImage(imgEl);
      assert.strictEqual(imgEl.classList.remove.callCount, 1);
      assert.strictEqual(imgEl.classList.remove.args[0][0], classes.imgFullHeight);
      assert.strictEqual(imgEl.classList.add.callCount, 1);
      assert.strictEqual(imgEl.classList.add.args[0][0], classes.imgFullWidth);
    });
  });

  describe('resize', () => {
    let clock;

    before(() => {
      clock = useFakeTimers();
    });

    after(() => {
      clock.restore();
    });

    it('should handle the resize event', () => {
      const imgEl = {
        complete: true,
        width: 4,
        height: 3,
        parentNode: { offsetWidth: 16, offsetHeight: 9 },
        classList: { remove: spy(), add: spy() },
        removeEventListener: () => {},
      };
      mountMockImage(imgEl);
      assert.strictEqual(imgEl.classList.remove.callCount, 1);
      assert.strictEqual(imgEl.classList.remove.args[0][0], classes.imgFullHeight);
      assert.strictEqual(imgEl.classList.add.callCount, 1);
      assert.strictEqual(imgEl.classList.add.args[0][0], classes.imgFullWidth);

      window.dispatchEvent(new window.Event('resize', {}));
      assert.strictEqual(imgEl.classList.remove.callCount, 1);
      clock.tick(166);

      assert.strictEqual(imgEl.classList.remove.callCount, 2);
      assert.strictEqual(imgEl.classList.remove.callCount, 2);
      assert.strictEqual(imgEl.classList.remove.args[1][0], classes.imgFullHeight);
      assert.strictEqual(imgEl.classList.add.callCount, 2);
      assert.strictEqual(imgEl.classList.add.args[1][0], classes.imgFullWidth);
    });
  });
});
