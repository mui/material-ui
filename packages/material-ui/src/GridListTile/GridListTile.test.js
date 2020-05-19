import * as React from 'react';
import { expect } from 'chai';
import { spy, useFakeTimers } from 'sinon';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import GridListTile from './GridListTile';

describe('<GridListTile />', () => {
  const mount = createMount();
  let classes;

  before(() => {
    classes = getClasses(<GridListTile />);
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

      expect(wrapper.containsMatchingElement(children)).to.equal(true);
    });

    it('should not change non image child', () => {
      const children = <div />;
      const wrapper = mount(<GridListTile>{children}</GridListTile>);
      expect(wrapper.containsMatchingElement(children)).to.equal(true);
    });
  });

  function mountMockImage(imgEl) {
    const Image = React.forwardRef((props, ref) => {
      React.useImperativeHandle(ref, () => imgEl, []);

      return <img alt="test" {...props} />;
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
        parentElement: { offsetWidth: 4, offsetHeight: 3 },
        classList: { remove: spy(), add: spy() },
        removeEventListener: () => {},
      };
      mountMockImage(imgEl);
      expect(imgEl.classList.remove.callCount).to.equal(1);
      expect(imgEl.classList.remove.args[0][0]).to.equal(classes.imgFullWidth);
      expect(imgEl.classList.add.callCount).to.equal(1);
      expect(imgEl.classList.add.args[0][0]).to.equal(classes.imgFullHeight);
    });

    it('should fit the width', () => {
      const imgEl = {
        complete: true,
        width: 4,
        height: 3,
        parentElement: { offsetWidth: 16, offsetHeight: 9 },
        classList: { remove: spy(), add: spy() },
        removeEventListener: () => {},
      };
      mountMockImage(imgEl);
      expect(imgEl.classList.remove.callCount).to.equal(1);
      expect(imgEl.classList.remove.args[0][0]).to.equal(classes.imgFullHeight);
      expect(imgEl.classList.add.callCount).to.equal(1);
      expect(imgEl.classList.add.args[0][0]).to.equal(classes.imgFullWidth);
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
        parentElement: { offsetWidth: 16, offsetHeight: 9 },
        classList: { remove: spy(), add: spy() },
        removeEventListener: () => {},
      };
      mountMockImage(imgEl);
      expect(imgEl.classList.remove.callCount).to.equal(1);
      expect(imgEl.classList.remove.args[0][0]).to.equal(classes.imgFullHeight);
      expect(imgEl.classList.add.callCount).to.equal(1);
      expect(imgEl.classList.add.args[0][0]).to.equal(classes.imgFullWidth);

      window.dispatchEvent(new window.Event('resize', {}));
      expect(imgEl.classList.remove.callCount).to.equal(1);
      clock.tick(166);

      expect(imgEl.classList.remove.callCount).to.equal(2);
      expect(imgEl.classList.remove.callCount).to.equal(2);
      expect(imgEl.classList.remove.args[1][0]).to.equal(classes.imgFullHeight);
      expect(imgEl.classList.add.callCount).to.equal(2);
      expect(imgEl.classList.add.args[1][0]).to.equal(classes.imgFullWidth);
    });
  });
});
