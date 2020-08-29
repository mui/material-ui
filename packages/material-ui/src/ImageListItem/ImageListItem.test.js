import * as React from 'react';
import { expect } from 'chai';
import { getClasses, createMount, describeConformance } from 'test/utils';
import ImageListItem from './ImageListItem';

describe('<ImageListItem />', () => {
  const mount = createMount();
  let classes;

  before(() => {
    classes = getClasses(<ImageListItem />);
  });

  describeConformance(<ImageListItem />, () => ({
    classes,
    inheritComponent: 'li',
    mount,
    refInstanceof: window.HTMLLIElement,
    testComponentPropWith: 'div',
  }));

  const itemData = {
    img: 'images/image-list/00-52-29-429_640.jpg',
    title: 'Breakfast',
    author: 'jill111',
  };

  describe('prop: children', () => {
    it('should render children by default', () => {
      const children = <img src={itemData.img} alt="foo" />;
      const wrapper = mount(<ImageListItem>{children}</ImageListItem>);

      expect(wrapper.containsMatchingElement(children)).to.equal(true);
    });

    it('should not change non image child', () => {
      const children = <div />;
      const wrapper = mount(<ImageListItem>{children}</ImageListItem>);
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
      <ImageListItem>
        <Image />
        {null}
      </ImageListItem>,
    );
  }

  describe('mount image', () => {
    it('should handle missing image', () => {
      mountMockImage(null);
    });
  });
});
