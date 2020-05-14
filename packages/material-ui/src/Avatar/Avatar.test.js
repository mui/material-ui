import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, fireEvent } from 'test/utils/createClientRender';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import { spy } from 'sinon';
import CancelIcon from '../internal/svg-icons/Cancel';
import describeConformance from '../test-utils/describeConformance';
import Avatar from './Avatar';

describe('<Avatar />', () => {
  const mount = createMount();
  let classes;
  const render = createClientRender();

  before(() => {
    classes = getClasses(<Avatar />);
  });

  describeConformance(<Avatar />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
  }));

  describe('image avatar', () => {
    it('should render a div containing an img', () => {
      const { container } = render(
        <Avatar
          className="my-avatar"
          src="something.jpg"
          alt="Hello World!"
          data-my-prop="woofAvatar"
        />,
      );
      const avatar = container.firstChild;
      const img = avatar.firstChild;
      expect(avatar.tagName).to.equal('DIV');
      expect(img.tagName).to.equal('IMG');
      expect(avatar).to.have.class(classes.root);
      expect(avatar).to.have.class('my-avatar');
      expect(avatar).to.have.attribute('data-my-prop', 'woofAvatar');
      expect(avatar).to.not.have.class(classes.colorDefault);
      expect(img).to.have.class(classes.img);
      expect(img).to.have.attribute('alt', 'Hello World!');
      expect(img).to.have.attribute('src', 'something.jpg');
    });

    it('should be able to add more props to the image', () => {
      const onError = spy();
      const { container } = render(<Avatar src="something.jpg" imgProps={{ onError }} />);
      const img = container.querySelector('img');
      fireEvent.error(img);
      expect(onError.callCount).to.equal(1);
    });
  });

  describe('image avatar with unrendered children', () => {
    it('should render a div containing an img, not children', () => {
      const { container } = render(<Avatar src="something.jpg">MB</Avatar>);
      const avatar = container.firstChild;
      const imgs = container.querySelectorAll('img');
      expect(imgs.length).to.equal(1);
      expect(avatar).to.have.text('');
    });

    it('should be able to add more props to the image', () => {
      const onError = spy();
      const { container } = render(<Avatar src="something.jpg" imgProps={{ onError }} />);
      const img = container.querySelector('img');
      fireEvent.error(img);
      expect(onError.callCount).to.equal(1);
    });
  });

  describe('font icon avatar', () => {
    let container;
    let avatar;
    let icon;

    before(() => {
      container = render(
        <Avatar className="my-avatar" data-my-prop="woofAvatar">
          <span className="my-icon-font">icon</span>
        </Avatar>,
      ).container;
      avatar = container.firstChild;
      icon = avatar.firstChild;
    });

    it('should render a div containing an font icon', () => {
      expect(avatar.tagName).to.equal('DIV');
      expect(icon.tagName).to.equal('SPAN');
      expect(icon).to.have.class('my-icon-font');
      expect(icon).to.have.text('icon');
    });

    it('should merge user classes & spread custom props to the root node', () => {
      expect(avatar).to.have.class(classes.root);
      expect(avatar).to.have.class('my-avatar');
      expect(avatar).to.have.attribute('data-my-prop', 'woofAvatar');
    });

    it('should apply the colorDefault class', () => {
      expect(avatar).to.have.class(classes.colorDefault);
    });
  });

  describe('svg icon avatar', () => {
    let container;
    let avatar;

    before(() => {
      container = render(
        <Avatar className="my-avatar" data-my-prop="woofAvatar">
          <CancelIcon />
        </Avatar>,
      ).container;
      avatar = container.firstChild;
    });

    it('should render a div containing an svg icon', () => {
      expect(avatar.tagName).to.equal('DIV');
      const cancelIcon = avatar.firstChild;
      expect(cancelIcon).to.have.attribute('data-mui-test', 'CancelIcon');
    });

    it('should merge user classes & spread custom props to the root node', () => {
      expect(avatar).to.have.class(classes.root);
      expect(avatar).to.have.class('my-avatar');
      expect(avatar).to.have.attribute('data-my-prop', 'woofAvatar');
    });

    it('should apply the colorDefault class', () => {
      expect(avatar).to.have.class(classes.colorDefault);
    });
  });

  describe('text avatar', () => {
    let container;
    let avatar;

    before(() => {
      container = render(
        <Avatar className="my-avatar" data-my-prop="woofAvatar">
          OT
        </Avatar>,
      ).container;
      avatar = container.firstChild;
    });

    it('should render a div containing a string', () => {
      expect(avatar.tagName).to.equal('DIV');
      expect(avatar.firstChild).to.text('OT');
    });

    it('should merge user classes & spread custom props to the root node', () => {
      expect(avatar).to.have.class(classes.root);
      expect(avatar).to.have.class('my-avatar');
      expect(avatar).to.have.attribute('data-my-prop', 'woofAvatar');
    });

    it('should apply the colorDefault class', () => {
      expect(avatar).to.have.class(classes.colorDefault);
    });
  });

  describe('falsey avatar', () => {
    let container;
    let avatar;

    before(() => {
      container = render(
        <Avatar className="my-avatar" data-my-prop="woofAvatar">
          {0}
        </Avatar>,
      ).container;
      avatar = container.firstChild;
    });

    it('should render with defaultColor class when supplied with a child with falsey value', () => {
      expect(avatar.tagName).to.equal('DIV');
      expect(avatar.firstChild).to.text('0');
    });

    it('should merge user classes & spread custom props to the root node', () => {
      expect(avatar).to.have.class(classes.root);
      expect(avatar).to.have.class('my-avatar');
      expect(avatar).to.have.attribute('data-my-prop', 'woofAvatar');
    });

    it('should apply the colorDefault class', () => {
      expect(avatar).to.have.class(classes.colorDefault);
    });
  });
});
