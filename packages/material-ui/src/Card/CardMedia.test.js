import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import CardMedia from './CardMedia';

describe('<CardMedia />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ untilSelector: 'CardMedia' });
    classes = getClasses(<CardMedia image="/foo.jpg" />);
  });

  it('should have the root and custom class', () => {
    const wrapper = shallow(<CardMedia className="woofCardMedia" image="/foo.jpg" />);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass('woofCardMedia'), true);
  });

  it('should have the backgroundImage specified', () => {
    const wrapper = shallow(<CardMedia image="/foo.jpg" />);
    assert.strictEqual(wrapper.prop('style').backgroundImage, 'url(/foo.jpg)');
  });

  it('should spread custom props on the root node', () => {
    const wrapper = shallow(<CardMedia image="/foo.jpg" data-my-prop="woofCardMedia" />);
    assert.strictEqual(
      wrapper.prop('data-my-prop'),
      'woofCardMedia',
      'custom prop should be woofCardMedia',
    );
  });

  it('should have backgroundImage specified even though custom styles got passed', () => {
    const wrapper = shallow(<CardMedia image="/foo.jpg" style={{ height: 200 }} />);
    assert.strictEqual(wrapper.prop('style').backgroundImage, 'url(/foo.jpg)');
    assert.strictEqual(wrapper.prop('style').height, 200);
  });

  it('should be possible to overwrite backgroundImage via custom styles', () => {
    const wrapper = shallow(
      <CardMedia image="/foo.jpg" style={{ backgroundImage: 'url(/bar.jpg)' }} />,
    );
    assert.strictEqual(wrapper.prop('style').backgroundImage, 'url(/bar.jpg)');
  });

  describe('prop: component', () => {
    it('should render `img` component when `img` specified', () => {
      const wrapper = shallow(<CardMedia image="/foo.jpg" component="img" />);
      assert.strictEqual(wrapper.type(), 'img');
    });

    it('should have `src` prop when media component specified', () => {
      const wrapper = shallow(<CardMedia image="/foo.jpg" component="iframe" />);
      assert.strictEqual(wrapper.prop('src'), '/foo.jpg');
    });

    it('should not have default inline style when media component specified', () => {
      const wrapper = shallow(<CardMedia src="/foo.jpg" component="picture" />);
      assert.strictEqual(wrapper.prop('style'), undefined);
    });

    it('should not have `src` prop if not media component specified', () => {
      const wrapper = shallow(<CardMedia image="/foo.jpg" component="table" />);
      assert.strictEqual(wrapper.prop('src'), undefined);
    });
  });
});
