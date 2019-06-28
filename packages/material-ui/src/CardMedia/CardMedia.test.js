import React from 'react';
import { assert } from 'chai';
import { createMount, findOutermostIntrinsic, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '../test-utils/describeConformance';
import CardMedia from './CardMedia';

describe('<CardMedia />', () => {
  let mount;
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<CardMedia image="/foo.jpg" />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<CardMedia image="/foo.jpg" />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
  }));

  it('should have the backgroundImage specified', () => {
    const wrapper = mount(<CardMedia image="/foo.jpg" />);
    assert.strictEqual(
      findOutermostIntrinsic(wrapper).props().style.backgroundImage,
      'url("/foo.jpg")',
    );
  });

  it('should have backgroundImage specified even though custom styles got passed', () => {
    const wrapper = mount(<CardMedia image="/foo.jpg" style={{ height: 200 }} />);
    assert.strictEqual(
      findOutermostIntrinsic(wrapper).props().style.backgroundImage,
      'url("/foo.jpg")',
    );
    assert.strictEqual(findOutermostIntrinsic(wrapper).props().style.height, 200);
  });

  it('should be possible to overwrite backgroundImage via custom styles', () => {
    const wrapper = mount(
      <CardMedia image="/foo.jpg" style={{ backgroundImage: 'url(/bar.jpg)' }} />,
    );
    assert.strictEqual(
      findOutermostIntrinsic(wrapper).props().style.backgroundImage,
      'url(/bar.jpg)',
    );
  });

  describe('prop: component', () => {
    it('should have `src` prop when media component specified', () => {
      const wrapper = mount(<CardMedia image="/foo.jpg" component="iframe" />);
      assert.strictEqual(findOutermostIntrinsic(wrapper).props().src, '/foo.jpg');
    });

    it('should not have `src` prop when picture media component specified', () => {
      const wrapper = mount(
        <CardMedia component="picture">
          <source media="(min-width: 600px)" srcSet="big-cat.jpg" />
          <img src="cat.jpg" alt="hello" />
        </CardMedia>,
      );
      assert.strictEqual(findOutermostIntrinsic(wrapper).props().src, undefined);
    });

    it('should not have default inline style when media component specified', () => {
      const wrapper = mount(<CardMedia src="/foo.jpg" component="picture" />);
      assert.strictEqual(findOutermostIntrinsic(wrapper).props().style, undefined);
    });

    it('should not have `src` prop if not media component specified', () => {
      const wrapper = mount(<CardMedia image="/foo.jpg" component="table" />);
      assert.strictEqual(findOutermostIntrinsic(wrapper).props().src, undefined);
    });
  });
});
