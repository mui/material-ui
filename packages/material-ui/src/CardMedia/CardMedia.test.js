import React from 'react';
import { assert } from 'chai';
import {
  createMount,
  createShallow,
  describeConformance,
  getClasses,
} from '@material-ui/core/test-utils';
import CardMedia from './CardMedia';

describe('<CardMedia />', () => {
  let mount;
  let shallow;
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    shallow = createShallow({ untilSelector: 'CardMedia' });
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
    const wrapper = shallow(<CardMedia image="/foo.jpg" />);
    assert.strictEqual(wrapper.props().style.backgroundImage, 'url("/foo.jpg")');
  });

  it('should have backgroundImage specified even though custom styles got passed', () => {
    const wrapper = shallow(<CardMedia image="/foo.jpg" style={{ height: 200 }} />);
    assert.strictEqual(wrapper.props().style.backgroundImage, 'url("/foo.jpg")');
    assert.strictEqual(wrapper.props().style.height, 200);
  });

  it('should be possible to overwrite backgroundImage via custom styles', () => {
    const wrapper = shallow(
      <CardMedia image="/foo.jpg" style={{ backgroundImage: 'url(/bar.jpg)' }} />,
    );
    assert.strictEqual(wrapper.props().style.backgroundImage, 'url(/bar.jpg)');
  });

  describe('prop: component', () => {
    it('should render `img` component when `img` specified', () => {
      const wrapper = shallow(<CardMedia image="/foo.jpg" component="img" />);
      assert.strictEqual(wrapper.type(), 'img');
    });

    it('should have `src` prop when media component specified', () => {
      const wrapper = shallow(<CardMedia image="/foo.jpg" component="iframe" />);
      assert.strictEqual(wrapper.props().src, '/foo.jpg');
    });

    it('should not have default inline style when media component specified', () => {
      const wrapper = shallow(<CardMedia src="/foo.jpg" component="picture" />);
      assert.strictEqual(wrapper.props().style, undefined);
    });

    it('should not have `src` prop if not media component specified', () => {
      const wrapper = shallow(<CardMedia image="/foo.jpg" component="table" />);
      assert.strictEqual(wrapper.props().src, undefined);
    });
  });
});
